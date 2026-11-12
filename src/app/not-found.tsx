import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Stethoscope } from 'lucide-react'
import { SubpageShell } from '@/components/SubpageShell'
import { LinkCard } from '@/components/ui/LinkCard'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { SEO_DOCTOR_NAME, WHATSAPP_URL } from '@/constants'

export const metadata: Metadata = {
  title: `Página não encontrada | ${SEO_DOCTOR_NAME}`,
  description: `Esse endereço não existe no site da ${SEO_DOCTOR_NAME}.`,
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <SubpageShell>
      <main
        id="main-content"
        className="bg-cream py-10 selection:bg-straw selection:text-teal lg:py-16"
      >
        <div className="container">
          <header className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-tight text-teal lg:text-5xl">
              Página não encontrada
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-700 lg:text-xl">
              Esse endereço não existe no site da {SEO_DOCTOR_NAME}. O link pode estar
              desatualizado ou ter sido digitado incorretamente.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/" className="btn btn-primary w-full sm:w-auto">
                Ir para o início
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-conversion="whatsapp-not-found"
                className="btn btn-secondary w-full sm:w-auto"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Falar no WhatsApp
              </a>
            </div>
          </header>

          <section className="mt-14 lg:mt-16" aria-labelledby="not-found-paths">
            <h2
              id="not-found-paths"
              className="mb-8 font-serif text-2xl font-semibold text-teal lg:text-3xl"
            >
              Para onde seguir
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <LinkCard
                href="/tratamentos"
                icon={Stethoscope}
                title="Tratamentos"
                titleAs="h3"
                body="Os procedimentos em coloproctologia descritos no site."
                ctaLabel="Ver tratamentos"
              />
              <LinkCard
                href="/blog"
                icon={BookOpen}
                title="Blog"
                titleAs="h3"
                body="Orientações sobre sintomas e cuidados. A leitura não substitui uma consulta."
                ctaLabel="Ler o blog"
              />
            </div>
          </section>
        </div>
      </main>
    </SubpageShell>
  )
}
