import type { Metadata } from 'next'
import Link from 'next/link'
import { SEO_DOCTOR_NAME, BUSINESS_NAME, CONTACT_EMAIL, SITE_URL } from '@/constants'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { buildCanonical } from '@/lib/seo'

export const metadata: Metadata = {
  title: `Política de Privacidade | ${SEO_DOCTOR_NAME}`,
  description: 'Política de privacidade e proteção de dados do website da Dra. Dayara Salomão.',
  alternates: {
    canonical: buildCanonical('/politica-privacidade'),
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center text-copper hover:text-teal transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar ao site
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Breadcrumb
          items={[
            { label: 'Início', href: '/' },
            { label: 'Política de Privacidade' },
          ]}
        />
        <h1 className="font-serif text-4xl lg:text-5xl text-copper mb-4">
          Política de Privacidade
        </h1>
        <p className="text-gray-600 mb-8">
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </p>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-gray-700 leading-relaxed">
              O website <strong>{BUSINESS_NAME}</strong> (&quot;nós&quot;, &quot;nosso&quot; ou &quot;nos&quot;) está
              comprometido em proteger a privacidade e os dados pessoais de nossos visitantes
              e pacientes. Esta Política de Privacidade descreve como coletamos, usamos,
              armazenamos e protegemos suas informações pessoais em conformidade com a Lei
              Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="font-serif text-2xl text-teal mb-4">
              1. Informações que Coletamos
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>1.1 Informações fornecidas voluntariamente:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Informações de contato (nome, e-mail, telefone) quando você entra em
                  contato conosco através do WhatsApp ou outros meios de comunicação
                </li>
                <li>
                  Mensagens e consultas enviadas através de nossos canais de atendimento
                </li>
              </ul>

              <p className="mt-4">
                <strong>1.2 Informações coletadas automaticamente:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Dados de navegação e uso do website (páginas visitadas, tempo de
                  permanência, origem do acesso)
                </li>
                <li>
                  Informações técnicas (endereço IP, tipo de navegador, sistema
                  operacional, dispositivo)
                </li>
                <li>
                  Cookies e tecnologias similares para análise de desempenho e melhoria
                  da experiência do usuário
                </li>
              </ul>
            </div>
          </section>

          {/* Data Usage */}
          <section>
            <h2 className="font-serif text-2xl text-teal mb-4">
              2. Como Utilizamos suas Informações
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>Utilizamos suas informações pessoais para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Responder às suas consultas e solicitações de agendamento</li>
                <li>Fornecer informações sobre nossos serviços médicos</li>
                <li>Melhorar a funcionalidade e conteúdo do nosso website</li>
                <li>Analisar padrões de uso e preferências dos visitantes</li>
                <li>
                  Garantir a segurança e prevenir fraudes ou uso indevido do website
                </li>
                <li>Cumprir obrigações legais e regulatórias aplicáveis</li>
              </ul>
            </div>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="font-serif text-2xl text-teal mb-4">
              3. Compartilhamento de Dados
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Não vendemos, alugamos ou comercializamos suas informações pessoais.
                Podemos compartilhar dados apenas nas seguintes situações:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Prestadores de serviço:</strong> Com empresas que nos auxiliam na
                  operação do website (hospedagem, análise de dados, ferramentas de
                  comunicação), sempre sob acordos de confidencialidade
                </li>
                <li>
                  <strong>Obrigações legais:</strong> Quando exigido por lei, ordem
                  judicial ou autoridade competente
                </li>
                <li>
                  <strong>Proteção de direitos:</strong> Para proteger nossos direitos,
                  propriedade, segurança ou de terceiros
                </li>
              </ul>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="font-serif text-2xl text-teal mb-4">4. Cookies</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência
                de navegação. Os cookies são pequenos arquivos de texto armazenados em seu
                dispositivo que nos permitem:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Lembrar suas preferências e configurações</li>
                <li>Analisar o tráfego e comportamento dos visitantes</li>
                <li>Medir a efetividade do nosso conteúdo</li>
              </ul>
              <p className="mt-4">
                Você pode configurar seu navegador para recusar cookies, mas isso pode
                afetar a funcionalidade do website.
              </p>
            </div>
          </section>

          {/* LGPD Rights */}
          <section>
            <h2 className="font-serif text-2xl text-teal mb-4">
              5. Seus Direitos sob a LGPD
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>De acordo com a LGPD, você tem os seguintes direitos:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Confirmação e acesso:</strong> Saber se tratamos seus dados e
                  acessá-los
                </li>
                <li>
                  <strong>Correção:</strong> Solicitar correção de dados incompletos,
                  inexatos ou desatualizados
                </li>
                <li>
                  <strong>Anonimização, bloqueio ou eliminação:</strong> De dados
                  desnecessários, excessivos ou tratados em desconformidade
                </li>
                <li>
                  <strong>Portabilidade:</strong> Receber seus dados em formato
                  estruturado e interoperável
                </li>
                <li>
                  <strong>Eliminação:</strong> De dados tratados com seu consentimento
                </li>
                <li>
                  <strong>Informação:</strong> Sobre compartilhamento de dados com
                  terceiros
                </li>
                <li>
                  <strong>Revogação do consentimento:</strong> A qualquer momento
                </li>
              </ul>
              <p className="mt-4">
                Para exercer seus direitos, entre em contato conosco através do e-mail:{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-copper hover:text-teal transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="font-serif text-2xl text-teal mb-4">
              6. Segurança dos Dados
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Implementamos medidas técnicas e organizacionais apropriadas para proteger
                suas informações pessoais contra acesso não autorizado, alteração,
                divulgação ou destruição, incluindo:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Criptografia SSL/TLS para transmissão de dados</li>
                <li>Controles de acesso restrito a dados pessoais</li>
                <li>Monitoramento regular de segurança</li>
                <li>Backup e recuperação de dados</li>
              </ul>
              <p className="mt-4">
                Apesar de nossos esforços, nenhum sistema de segurança é completamente
                infalível. Não podemos garantir a segurança absoluta das informações
                transmitidas através da internet.
              </p>
            </div>
          </section>

          {/* External Links */}
          <section>
            <h2 className="font-serif text-2xl text-teal mb-4">
              7. Links para Sites Externos
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Nosso website pode conter links para sites de terceiros (como redes
                sociais). Não nos responsabilizamos pelas práticas de privacidade desses
                sites. Recomendamos que você leia as políticas de privacidade de cada site
                que visitar.
              </p>
            </div>
          </section>

          {/* Policy Changes */}
          <section>
            <h2 className="font-serif text-2xl text-teal mb-4">
              8. Alterações nesta Política
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente para
                refletir mudanças em nossas práticas ou por requisitos legais. A data da
                última atualização será sempre indicada no início deste documento.
                Recomendamos que você revise esta política regularmente.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="font-serif text-2xl text-teal mb-4">9. Contato</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Para dúvidas, solicitações ou exercício de seus direitos relacionados a
                esta Política de Privacidade, entre em contato:
              </p>
              <div className="bg-cream p-4 rounded-lg mt-4">
                <p>
                  <strong>E-mail:</strong>{' '}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-copper hover:text-teal transition-colors"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
                <p className="mt-2">
                  <strong>Website:</strong>{' '}
                  <a
                    href={SITE_URL}
                    className="text-copper hover:text-teal transition-colors"
                  >
                    {SITE_URL}
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <section className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Esta Política de Privacidade está em conformidade com a Lei Geral de
              Proteção de Dados (LGPD - Lei nº 13.709/2018) e demais legislações
              aplicáveis de proteção de dados no Brasil.
            </p>
          </section>
        </div>

        {/* Back to Home Button */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-copper text-white rounded-full hover:bg-teal transition-colors"
          >
            Voltar ao Site
          </Link>
        </div>
      </main>
    </div>
  )
}
