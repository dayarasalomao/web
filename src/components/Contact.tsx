export default function Contact() {
  const contactInfo = [
    { label: 'Local', value: 'Eco Medical Center' },
    { label: 'WhatsApp', value: '(47) 99999-9999' },
    { label: 'Cidade', value: 'Porto União' },
    { label: 'Estado', value: 'Santa Catarina' },
  ]

  return (
    <section id="contato" className="py-16 lg:py-24 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Local &amp; Agendamento
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-blue-800 p-6 rounded-lg border border-blue-700"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-semibold text-blue-200 text-sm uppercase tracking-wide">
                      {info.label}:
                    </span>
                    <span className="text-lg font-medium">{info.value}</span>
                  </div>
                </div>
              ))}

              {/* Email Contact */}
              <div className="bg-blue-800 p-6 rounded-lg border border-blue-700">
                <a
                  href="mailto:contato@dayarasalomao.com.br"
                  className="flex items-center gap-3 hover:text-blue-200 transition-colors duration-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="font-medium">
                    contato@dayarasalomao.com.br
                  </span>
                </a>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col justify-center">
              <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-center">
                  Agende sua consulta
                </h3>
                <p className="text-gray-700 text-center mb-6">
                  Entre em contato para agendar sua consulta e receber o melhor
                  tratamento especializado.
                </p>
                <div className="space-y-4">
                  <a
                    href="https://wa.me/5547999999999"
                    className="block w-full bg-green-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="mailto:contato@dayarasalomao.com.br"
                    className="block w-full bg-blue-900 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200"
                  >
                    E-mail
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
