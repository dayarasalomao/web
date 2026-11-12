import { SEO_DOCTOR_NAME } from '@/constants'
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog'
import { isTeachingFigure, OG_CONTENT_TYPE, OG_PHOTOS, OG_SIZE, renderFigureCard, renderPhotoCard } from '@/lib/og'

export const alt = `Artigo da ${SEO_DOCTOR_NAME}`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

/** The teaching figure the article shows; the doctor's photo when it has none. */
export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPostBySlug((await params).slug)
  if (post?.image && isTeachingFigure(post.image.src)) return renderFigureCard(post.image.src)
  return renderPhotoCard({ photo: OG_PHOTOS.default, eyebrow: 'Conteúdo educativo', ...(post ? { title: post.title } : {}) })
}
