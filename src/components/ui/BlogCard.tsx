import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-[2rem] border border-beige bg-white/95 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:p-7">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-copper">
        <span>{new Date(post.publishDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
        <span className="text-beige">•</span>
        <span>{post.readingTime} min de leitura</span>
      </div>

      <h2 className="mb-4 text-2xl font-semibold leading-tight text-teal transition-colors group-hover:text-copper">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>

      <p className="mb-6 flex-1 text-base leading-relaxed text-gray-700">{post.excerpt}</p>

      <div className="flex flex-wrap gap-2">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 rounded-xl border border-teal/15 bg-teal/5 px-4 py-2 text-sm font-semibold text-teal transition-all duration-300 hover:border-teal hover:bg-teal hover:text-white"
        >
          <span>Ler artigo</span>
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              d="M7.5 5 12.5 10l-5 5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </article>
  )
}
