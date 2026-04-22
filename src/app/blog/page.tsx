import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { BlogCard } from '@/components/ui/BlogCard'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { getAllPosts } from '@/lib/blog'
import { DEFAULT_ROBOTS, buildCanonical, buildOgMetadata, buildTwitterMetadata } from '@/lib/seo'
import { buildBreadcrumbGraph, serializeJsonLd } from '@/lib/structured-data'
import { BLOG_DEFAULT_OG_IMAGE, SEO_DOCTOR_NAME, WHATSAPP_URL } from '@/constants'

const BLOG_TITLE = `Blog — ${SEO_DOCTOR_NAME} | Coloproctologia em Curitiba`
const BLOG_DESCRIPTION =
  'Conteúdos sobre hemorroidas, fissura anal, fístula, HPV perianal, cisto pilonidal e tecnologias minimamente invasivas em coloproctologia.'

export const metadata: Metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  alternates: {
    canonical: buildCanonical('/blog'),
  },
  openGraph: buildOgMetadata({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    url: buildCanonical('/blog'),
    image: BLOG_DEFAULT_OG_IMAGE,
  }),
  twitter: buildTwitterMetadata({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    image: BLOG_DEFAULT_OG_IMAGE,
  }),
  robots: DEFAULT_ROBOTS,
}

export default function BlogPage() {
  const posts = getAllPosts()
  const breadcrumbGraph = buildBreadcrumbGraph([
    { label: 'Início', href: '/' },
    { label: 'Blog' },
  ])

  return (
    <main id="main-content" className="min-h-screen bg-cream py-8 lg:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            '@context': 'https://schema.org',
            '@graph': [breadcrumbGraph],
          }),
        }}
      />

      <section className="container">
        <Breadcrumb items={[{ label: 'Início', href: '/' }, { label: 'Blog' }]} />

        <div className="mx-auto mb-14 max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-copper">
            Conteúdo médico em português claro
          </p>
          <h1 className="mb-6 text-4xl font-semibold leading-tight text-teal lg:text-6xl">
            Blog da Dra. Dayara Salomão
          </h1>
          <p className="text-lg leading-relaxed text-gray-700 lg:text-xl">
            Orientações sobre doenças anorretais, procedimentos modernos e cuidados em
            coloproctologia para ajudar você a tomar decisões com mais segurança.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-[2rem] border border-beige bg-white/90 px-8 py-16 text-center shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold text-teal">Em breve</h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-700">
              Novos artigos serão publicados aqui com orientações seguras e atualizadas
              sobre coloproctologia.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        <div className="mx-auto mt-16 max-w-4xl">
          <CallToActionCard
            title="Quer uma avaliação individualizada?"
            body={
              <p>
                O conteúdo do blog ajuda na orientação, mas a conduta correta depende da
                avaliação clínica. Se você tem sintomas persistentes, procure atendimento
                especializado.
              </p>
            }
            actions={
              <>
                <Link
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Agendar consulta
                </Link>
                <Link href="/tratamentos" className="btn btn-primary">
                  Ver tratamentos
                </Link>
              </>
            }
          />
        </div>

        <div className="pt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center font-medium text-copper transition-colors hover:text-teal"
          >
            ← Voltar ao início
          </Link>
        </div>
      </section>
    </main>
  )
}
