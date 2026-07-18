import Link from 'next/link'
import { BlogCard } from '@/components/ui/BlogCard'
import { getAllPosts } from '@/lib/blog'

export default function LatestArticles() {
  const posts = getAllPosts().slice(0, 3)

  if (!posts.length) return null

  return (
    <section className="bg-white py-16 lg:py-24" aria-labelledby="latest-articles-title">
      <div className="container">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-copper">
              Informação para decidir com clareza
            </p>
            <h2
              id="latest-articles-title"
              className="mb-4 text-3xl font-semibold leading-tight text-teal lg:text-5xl"
            >
              Artigos recentes sobre saúde anal e intestinal
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Conteúdo educativo para entender sintomas, possibilidades de tratamento e
              quando uma avaliação presencial pode ser necessária.
            </p>
          </div>
          <Link href="/blog" className="btn btn-primary self-start lg:self-auto">
            Ver todos os artigos
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
