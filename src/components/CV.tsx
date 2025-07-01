export default function CV() {
  const qualifications = [
    'Médica pela PUC-PR formada em 2019',
    'Residência médica em Cirurgia Geral - Santa Casa de Curitiba',
    'Residência em Coloproctologia 2024',
    'Curso de Proctologia Minimamente Invasiva pelo IRCAD',
    'Pós-graduação em disfunções do assoalho pélvico (UNIFAL)',
  ]

  return (
    <section id="curriculo" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Professional Photo Placeholder */}
          <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-lg border-4 border-blue-200 bg-gray-100 flex items-center justify-center flex-shrink-0">
            <span className="text-gray-500 text-sm text-center">
              Foto profissional
              <br />
              da Dra. Dayara
            </span>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Currículo
            </h2>
            <div className="space-y-6">
              {qualifications.map((qualification, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-800 font-medium leading-relaxed">
                      {qualification}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
