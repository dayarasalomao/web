import Image from 'next/image'

export default function Footer() {
  const quickLinks = [
    { href: '#sobre', label: 'Sobre' },
    { href: '#doencas', label: 'Doenças' },
    { href: '#tratamentos', label: 'Tratamentos' },
    { href: '#curriculo', label: 'Currículo' },
  ]

  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      text: 'Eco Medical Center - Curitiba, PR',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      ),
      text: '(41) 3123-6550',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
      text: 'dradayarasalomao@gmail.com',
    },
  ]

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      }}
    >
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `linear-gradient(45deg, var(--color-copper) 1px, transparent 1px), linear-gradient(-45deg, var(--color-teal) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        ></div>
      </div>

      {/* Subtle glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 opacity-10 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--color-copper)' }}
        ></div>
        <div
          className="absolute -bottom-24 -right-24 w-96 h-96 opacity-10 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--color-teal)' }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-full p-2 border-2"
                style={{
                  borderColor: 'var(--color-copper)',
                  backgroundColor: 'rgba(163, 84, 66, 0.1)',
                }}
              >
                <Image
                  src="/core/logo.png"
                  alt="Dra. Dayara Salomão"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-white">
                  Dra. Dayara Salomão
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-straw)' }}>
                  Coloproctologia
                </p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-8 max-w-md">
              Especialista em coloproctologia oferecendo tratamento minimamente
              invasivo com excelência técnica, empatia e acolhimento para seu
              bem-estar.
            </p>

            {/* Credentials */}
            <div className="flex flex-wrap gap-3">
              <div
                className="px-4 py-2 rounded-full border text-sm"
                style={{
                  backgroundColor: 'rgba(163, 84, 66, 0.1)',
                  borderColor: 'var(--color-copper)',
                  color: 'var(--color-straw)',
                }}
              >
                CRM Ativo
              </div>
              <div
                className="px-4 py-2 rounded-full border text-sm"
                style={{
                  backgroundColor: 'rgba(29, 65, 76, 0.1)',
                  borderColor: 'var(--color-teal)',
                  color: 'var(--color-straw)',
                }}
              >
                Especialista RQE
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-white mb-6 border-b border-gray-600 pb-2">
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-3 group py-1"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:scale-150"
                      style={{ backgroundColor: 'var(--color-copper)' }}
                    ></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-white mb-6 border-b border-gray-600 pb-2">
              Contato
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: 'rgba(163, 84, 66, 0.15)',
                      color: 'var(--color-copper)',
                    }}
                  >
                    {info.icon}
                  </div>
                  <span className="text-gray-300 text-sm leading-relaxed">
                    {info.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-8">
              <a
                href="#contato"
                className="btn btn-primary text-sm inline-flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Agendar Consulta
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(163, 84, 66, 0.3)' }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; 2025 Dra. Dayara Salomão. Todos os direitos reservados.
            </p>

            {/* Additional Info */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
              <span>Atendimento humanizado e tecnologia avançada</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
