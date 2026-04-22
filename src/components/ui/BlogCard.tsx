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
        <span className="rounded-full border border-copper/20 bg-copper/10 px-3 py-1 text-xs font-medium text-copper">
          {post.primaryKeyword}
        </span>
        <Link
          href={`/blog/${post.slug}`}
          className="rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-xs font-medium text-teal transition-colors hover:bg-teal hover:text-white"
        >
          Ler artigo
        </Link>
      </div>
    </article>
  )
}
