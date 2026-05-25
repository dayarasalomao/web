import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { MedicalSignature } from '@/components/ui/MedicalSignature'
import { MdxImage } from '@/components/ui/MdxImage'
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog'
import { buildPostMetadata } from '@/lib/seo'
import { buildBlogPostGraph, serializeJsonLd } from '@/lib/structured-data'
import { getTreatmentByRelatedBlogSlug } from '@/lib/treatments'
import { SEO_DOCTOR_NAME, WHATSAPP_URL } from '@/constants'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post não encontrado',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return buildPostMetadata(post)
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const schema = buildBlogPostGraph(post)
  const relatedTreatment = getTreatmentByRelatedBlogSlug(post.slug)

  return (
    <main id="main-content" className="min-h-screen bg-cream py-8 lg:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />

      <article className="container">
        <Breadcrumb
          items={[
            { label: 'Início', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title },
          ]}
        />

        <header className="mx-auto mb-12 max-w-4xl border-b border-beige pb-8">
          <div className="mb-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
            <span className="rounded-full border border-copper/20 bg-copper/10 px-3 py-1 text-copper">
              {post.primaryKeyword}
            </span>
            <span className="rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-teal">
              {post.readingTime} min de leitura
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-semibold leading-tight text-teal lg:text-6xl">
            {post.title}
          </h1>

          <p className="mb-8 text-lg leading-relaxed text-gray-700 lg:text-xl">
            {post.metaDescription}
          </p>

          <div className="flex flex-col gap-3 text-sm text-gray-600 sm:flex-row sm:items-center sm:gap-6">
            <span>
              Por <strong className="text-teal">{SEO_DOCTOR_NAME}</strong>
            </span>
            <time dateTime={post.publishDate}>
              {new Date(post.publishDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
            </time>
            <span>
              Última atualização:{' '}
              {new Date(post.lastModified).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
            </span>
          </div>
        </header>

        <div
          className="mx-auto max-w-4xl text-gray-700
            [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-teal lg:[&_h2]:text-3xl
            [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-teal
            [&_p]:mb-5 [&_p]:text-base [&_p]:leading-8 lg:[&_p]:text-lg
            [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6
            [&_li]:leading-8
            [&_strong]:font-semibold [&_strong]:text-teal"
        >
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
            components={{ img: MdxImage }}
          />
        </div>

        {post.faqs?.length ? (
          <section id="faq" className="mx-auto mt-16 max-w-4xl">
            <h2 className="mb-6 text-3xl font-semibold text-teal">Perguntas frequentes</h2>
            <div className="space-y-4">
              {post.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group overflow-hidden rounded-[1.5rem] border border-beige bg-white/95 shadow-sm transition-colors duration-300 open:border-copper/40"
                >
                  <summary className="flex w-full cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 text-left text-lg font-semibold text-teal [&::-webkit-details-marker]:hidden">
                    <span className="flex-1">{faq.question}</span>
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-beige/50 text-teal transition-all duration-300 group-open:rotate-180 group-open:bg-copper/10 group-open:text-copper">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path
                          d="m5 7.5 5 5 5-5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-open:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-base leading-relaxed text-gray-700">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        {relatedTreatment ? (
          <section className="mx-auto mt-16 max-w-4xl rounded-[2rem] border border-beige bg-white/95 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-copper">
              Tratamento relacionado
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-teal">
              {relatedTreatment.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gray-700">
              {relatedTreatment.summary}
            </p>
            <Link
              href={`/tratamentos/${relatedTreatment.slug}`}
              className="mt-5 inline-flex font-medium text-copper transition-colors hover:text-teal"
            >
              Ver detalhes do tratamento
            </Link>
          </section>
        ) : null}

        <div className="mx-auto mt-8 max-w-4xl">
          <CallToActionCard
            title="Precisa de avaliação especializada?"
            body={
              <p>
                Se você apresenta sintomas, dor ou sangramento, uma consulta é importante
                para definir o diagnóstico e a melhor conduta para o seu caso.
              </p>
            }
            actions={
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Agendar consulta
              </Link>
            }
            footer={<MedicalSignature disclaimer={post.disclaimer} />}
          />
        </div>

        <footer className="mx-auto mt-8 flex max-w-4xl flex-col gap-4 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/blog" className="font-medium text-copper transition-colors hover:text-teal">
            ← Voltar para o blog
          </Link>
          <span>
            Artigo informativo. Em caso de sintomas, procure avaliação médica presencial.
          </span>
        </footer>
      </article>
    </main>
  )
}
