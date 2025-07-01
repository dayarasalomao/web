export default function Diseases() {
  const diseases = [
    'Doença Hemorroidária',
    'Fissura Anal',
    'Fístula Anal',
    'Prurido (coceira) Anal',
    'HPV Anal',
    'Cisto Pilonidal',
    'Constipação',
    'Diarreia Crônica',
    'Síndrome do Intestino Irritável',
    'Incontinência Suprativa',
    'Doenças Inflamatórias Intestinais',
  ]

  return (
    <section id="doencas" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Doenças que trato
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diseases.map((disease, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-900 rounded-full flex-shrink-0"></div>
                <span className="text-gray-800 font-medium">{disease}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
