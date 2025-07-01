export default function Hero() {
  return (
    <section
      id="hero"
      className="bg-gradient-to-br from-blue-50 to-white py-16 lg:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Doctor's Image Placeholder */}
          <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full border-4 border-blue-200 bg-gray-100 flex items-center justify-center order-1 lg:order-2 flex-shrink-0">
            <span className="text-gray-500 text-sm text-center">
              Foto da
              <br />
              Dra. Dayara
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Dra. Dayara Salomão
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed">
              Tratamento minimamente invasivo com laser e outras tecnologias
              para doenças da região anal.
            </p>
            <a
              href="#contato"
              className="inline-block bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors duration-200 shadow-lg"
            >
              Agendar Consulta
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
