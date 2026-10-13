import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import type { Root, RootContent, Image, Heading } from 'mdast'
import type { Node, Parent } from 'unist'
import { getAllPosts, extractFirstImage } from '../../src/lib/blog.ts'
import { buildPostMetadata } from '../../src/lib/seo.ts'
import { buildBlogPostGraph } from '../../src/lib/structured-data.ts'

const specDir = '.specs/features/blog-image-placement'
const parser = unified().use(remarkParse).use(remarkGfm)
const terminalHeading = /^(?:fontes(?: médicas)?|referências(?: bibliográficas)?|perguntas frequentes|faq|agend(?:e|ar|amento)|próximas leituras|quando procurar|o que conversar|observações importantes|resumindo)/i

function textOf(node: Node): string {
  if ('value' in node) return String(node.value)
  return 'children' in node ? (node as Parent).children.map(textOf).join('') : ''
}

function imagesIn(root: Root) {
  const images: Array<{ image: Image; ancestors: Node[]; block: RootContent }> = []
  function walk(node: Node, ancestors: Node[], block: RootContent) {
    if (node.type === 'image') images.push({ image: node as Image, ancestors, block })
    if ('children' in node) {
      for (const child of (node as Parent).children) walk(child, [...ancestors, node], block)
    }
  }
  for (const block of root.children) walk(block, [root], block)
  return images
}

function placementErrors(content: string, leadSrc?: string): string[] {
  const tree = parser.parse(content)
  const headings = tree.children.filter((node): node is Heading => node.type === 'heading' && node.depth === 2)
  const images = imagesIn(tree)
  const errors: string[] = []
  const firstH2 = headings[0]?.position?.start.offset ?? Infinity
  const leadImages = images.filter(({ image }) => image.position!.start.offset! < firstH2)
  if (leadImages.length > 1) errors.push('multiple-lead-images')
  if (leadImages.some(({ image }) => image.url !== leadSrc)) errors.push('invalid-lead-image')

  for (const [index, { image, ancestors, block }] of images.entries()) {
    const start = image.position!.start.offset!
    const lastH2 = headings.at(-1)?.position?.start.offset
    if (lastH2 !== undefined && start > lastH2) errors.push('image-after-last-h2')
    const previous = images[index - 1]?.image
    if (previous && !content.slice(previous.position!.end.offset!, start).trim()) errors.push('adjacent-images')
    if (ancestors.some((node) => ['listItem', 'table', 'tableCell'].includes(node.type))) errors.push('image-in-list-or-table')
    if (headings.some((heading) => terminalHeading.test(textOf(heading)) && heading.position!.start.offset! < start)) errors.push('image-in-terminal-area')
    const after = tree.children.slice(tree.children.indexOf(block) + 1)
    if (!after.length || after.every((node) => node.type === 'paragraph' && node.children.every((child) => child.type === 'emphasis'))) errors.push('trailing-image')
    if (previous) {
      const separated = headings.some((heading) => heading.position!.start.offset! > previous.position!.end.offset! && heading.position!.start.offset! < start)
      if (!separated) errors.push('images-in-same-section')
    }
  }
  return [...new Set(errors)]
}

describe('blog image placement guardrails (AC1/2/3)', () => {
  for (const file of fs.readdirSync('content/posts').filter((name) => name.endsWith('.md'))) {
    it(`${file} keeps images in safe editorial positions`, () => {
      const { content, data } = matter(fs.readFileSync(path.join('content/posts', file), 'utf8'))
      assert.deepEqual(placementErrors(content, data.image?.src), [])
    })
  }

  const img = '![Esquema](/assets/blog/a.webp)'
  const img2 = '![Esquema 2](/assets/blog/b.webp "Legenda existente")'
  const negativeCases: Array<[string, string, string]> = [
    ['whitespace-adjacent images', `## Anatomia\n\nTexto.\n\n${img}\n \n${img2}\n\nExplicação.`, 'adjacent-images'],
    ['multiple lead images', `${img}\n\nTexto.\n\n${img2}\n\n## Anatomia\n\nTexto.`, 'multiple-lead-images'],
    ['non-frontmatter lead', `${img2}\n\n## Anatomia\n\nTexto.`, 'invalid-lead-image'],
    ['image in a list', `## Anatomia\n\n- Texto\n\n  ${img}\n\nExplicação.`, 'image-in-list-or-table'],
    ['image in a table', `## Anatomia\n\n| Figura |\n| --- |\n| ${img} |\n\nExplicação.`, 'image-in-list-or-table'],
    ['image in FAQ', `## Perguntas frequentes\n\nTexto.\n\n${img}\n\nExplicação.`, 'image-in-terminal-area'],
    ['image after sources', `## Fontes médicas\n\nTexto.\n\n## Outra seção\n\n${img}\n\nExplicação.`, 'image-in-terminal-area'],
    ['image after CTA', `## Agendar consulta\n\n${img}\n\nExplicação.`, 'image-in-terminal-area'],
    ['image at the end', `## Anatomia\n\nTexto.\n\n${img}`, 'trailing-image'],
    ['image and disclaimer at the end', `## Anatomia\n\nTexto.\n\n${img}\n\n*Imagem ilustrativa.*`, 'trailing-image'],
    ['two figures in one section', `## Anatomia\n\nTexto.\n\n${img}\n\nParágrafo.\n\n${img2}\n\nExplicação.`, 'images-in-same-section'],
    ['image after last H2 even with following prose', `## Anatomia\n\nTexto.\n\n${img}\n\nExplicação.`, 'image-after-last-h2'],
  ]
  for (const [name, content, error] of negativeCases) {
    it(`rejects ${name}`, () => assert.ok(placementErrors(content, '/assets/blog/a.webp').includes(error)))
  }
  it('allows a single frontmatter lead and a body figure before the final H2', () => {
    assert.deepEqual(placementErrors(`${img}\n\n## Anatomia\n\nTexto.\n\n${img2}\n\nExplicação.\n\n## Cuidados\n\nTexto.`, '/assets/blog/a.webp'), [])
  })

  it('matches every figure to the section documented in the editorial spec (AC1)', () => {
    const placements: Array<{ slug: string; src: string; section: string }> = [
      ...JSON.parse(fs.readFileSync(`${specDir}/placement.json`, 'utf8')),
      ...JSON.parse(fs.readFileSync('.specs/features/blog-final-release-qa/placement.json', 'utf8')),
    ]
    const actual = getAllPosts().flatMap((post) => {
      const root = parser.parse(post.content)
      return imagesIn(root).map(({ image }) => {
        const section = root.children.filter((node): node is Heading => node.type === 'heading' && node.depth === 2 && node.position!.start.offset! < image.position!.start.offset!).at(-1)
        return { slug: post.slug, src: image.url, section: section ? textOf(section) : 'Introdução' }
      })
    })
    const sort = (items: typeof actual) => items.sort((a, b) => `${a.slug}:${a.src}`.localeCompare(`${b.slug}:${b.src}`))
    assert.deepEqual(sort(actual), sort(placements.map(({ slug, src, section }) => ({ slug, src, section }))))
  })
})

it('preserves original editorial images while declared covers drive OG/Article URLs (AC7, F2/3)', () => {
  const baseline = JSON.parse(fs.readFileSync(`${specDir}/image-baseline.json`, 'utf8')) as Array<{ slug: string; cardImage?: unknown }>
  const posts = getAllPosts()
  assert.equal(posts.length, baseline.length)
  for (const original of baseline.filter((post) => post.cardImage)) {
    const post = posts.find((post) => post.slug === original.slug)!
    assert.deepEqual(post.image ?? extractFirstImage(post.content), original.cardImage)
  }
  for (const post of getAllPosts().filter((post) => post.cardImage)) {
    const imageUrl = `https://www.dayarasalomao.com.br${post.cardImage!.src}`
    const images = buildPostMetadata(post).openGraph?.images as Array<{ url: string }>
    assert.equal(new URL(images[0].url, 'https://www.dayarasalomao.com.br').href, imageUrl)
    const graph = buildBlogPostGraph(post) as { '@graph': Array<Record<string, unknown>> }
    const image = graph['@graph'].find((node) => node['@type'] === 'Article')?.image
    assert.equal(typeof image === 'string' ? image : (image as { contentUrl: string }).contentUrl, imageUrl)
  }
})
