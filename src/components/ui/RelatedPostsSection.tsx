import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/lib/blog'

interface RelatedPostsSectionProps {
  posts: BlogPost[]
}

export function RelatedPostsSection({ posts }: RelatedPostsSectionProps) {
  if (posts.length === 0) return null

  return (
    <aside className="mx-auto mt-16 max-w-4xl border-t border-beige pt-8" aria-labelledby="related-posts-heading">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-copper">
        Próximas leituras
      </p>
      <h2 id="related-posts-heading" className="mt-2 text-2xl font-semibold text-teal">
        Continue entendendo o tema
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex min-h-40 flex-col rounded-[1.5rem] border border-beige bg-white/95 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-copper/40 hover:shadow-md"
          >
            <h3 className="text-lg font-semibold leading-snug text-teal group-hover:text-copper">
              {post.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">{post.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-copper">
              Ler artigo
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        ))}
      </div>
    </aside>
  )
}
