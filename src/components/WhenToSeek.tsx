export default function WhenToSeek() {
  const reasons = [
    'Sangramento anal ou dor',
    'Histórico de doenças inflamatórias intestinais',
    'Lesões, verrugas ou nódulos na região do ânus',
    'Dor ou desconforto durante evacuação',
  ]

  return (
    <section id="procurar" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Placeholder */}
          <div className="w-full lg:w-80 h-64 lg:h-80 rounded-lg border-2 border-gray-200 bg-gray-100 flex items-center justify-center flex-shrink-0">
            <span className="text-gray-500 text-sm text-center">
              Consulta médica
              <br />
              ou paciente
            </span>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Quando procurar um proctologista?
            </h2>
            <ul className="space-y-4">
              {reasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-900 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-lg text-gray-700">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
