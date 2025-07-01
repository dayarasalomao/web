export default function About() {
  return (
    <section id="sobre" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex-1">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Quem é a Dra. Dayara?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Médica formada em 2019 pela PUC-PR, especialista em
              coloproctologia, atua nas doenças da região anal oferecendo
              tratamento minimamente invasivo com excelência técnica, empatia e
              acolhimento.
            </p>
          </div>

          {/* Image Placeholder */}
          <div className="w-full lg:w-80 h-64 lg:h-80 rounded-lg border-2 border-gray-200 bg-gray-100 flex items-center justify-center flex-shrink-0">
            <span className="text-gray-500 text-sm text-center">
              Dra. Dayara
              <br />
              em consulta
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
