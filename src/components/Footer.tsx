export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            &copy; 2025 Dra. Dayara Salomão — Todos os direitos reservados
          </p>

          {/* Navigation Links */}
          <nav className="flex gap-6">
            <a
              href="#hero"
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
            >
              Início
            </a>
            <span className="text-gray-600">|</span>
            <a
              href="#contato"
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
            >
              Contato
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
