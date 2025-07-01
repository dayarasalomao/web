export default function Treatments() {
  const treatments = [
    'Cirurgia de hemorroidas com laser de CO2',
    'Cirurgia de hemorroidas sem cortes',
    'Cirurgias de fístula anal a laser e videoassistida',
    'Cirurgia de cisto pilonidal a laser e videoassistida',
    'Cirurgia de plicoma e fissura anal',
    'Laser e fotobiomodulação para fissuras anais',
    'Eletrocoagulação de lesões de HPV',
  ]

  return (
    <section id="tratamentos" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Tratamentos
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Treatments List */}
            <div className="space-y-6">
              {treatments.map((treatment, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-800 font-medium leading-relaxed">
                      {treatment}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Optional Image Placeholder */}
            <div className="flex items-center">
              <div className="w-full h-64 lg:h-80 rounded-lg border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500 text-sm text-center">
                  Ambiente clínico
                  <br />
                  ou equipamentos
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
