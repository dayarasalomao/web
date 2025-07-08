'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: '#sobre', label: 'Sobre' },
    { href: '#procurar', label: 'Quando Procurar?' },
    { href: '#doencas', label: 'Doenças' },
    { href: '#tratamentos', label: 'Tratamentos' },
    { href: '#depoimentos', label: 'Depoimentos' },
    { href: '#curriculo', label: 'Currículo' },
    { href: '#contato', label: 'Contato' },
  ]

  return (
    <header
      className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200"
      style={{ boxShadow: '0 2px 15px -3px rgb(0 0 0 / 0.1)' }}
    >
      <nav className="container py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <Image
              src="/core/logo.png"
              alt="Dra. Dayara Salomão"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
            <div className="flex flex-col">
              <span
                className="text-lg font-serif font-semibold tracking-wide"
                style={{ color: 'var(--color-copper)' }}
              >
                Dra. Dayara Salomão
              </span>
              <span className="text-xs text-gray-600 font-light">
                Coloproctologia
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-gray-700 hover:opacity-80 transition-all duration-300 font-medium relative group py-2 whitespace-nowrap"
                  style={
                    {
                      '--hover-color': 'var(--color-copper)',
                    } as React.CSSProperties
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-copper)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = ''
                  }}
                >
                  {item.label}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: 'var(--color-copper)' }}
                  ></span>
                </a>
              </li>
            ))}

            {/* CTA Button */}
            {/* <li key="agendar-consulta">
              <a
                href="#contato"
                className="text-sm text-gray-700 hover:opacity-80 transition-all duration-300 font-medium relative group py-2 whitespace-nowrap"
                style={
                  {
                    '--hover-color': 'var(--color-copper)',
                  } as React.CSSProperties
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-copper)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = ''
                }}
              >
                Agendar Consulta
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: 'var(--color-copper)' }}
                ></span>
              </a>
            </li> */}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`bg-gray-700 block h-0.5 w-6 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                }`}
              />
              <span
                className={`bg-gray-700 block h-0.5 w-6 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`bg-gray-700 block h-0.5 w-6 transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 card">
            <ul className="space-y-3 p-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block text-sm text-gray-700 hover:opacity-80 transition-colors duration-200 font-medium py-2 px-3 rounded-lg hover:bg-gray-100"
                    style={
                      {
                        '--hover-color': 'var(--color-copper)',
                      } as React.CSSProperties
                    }
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-copper)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = ''
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="px-4 pb-4 pt-2 border-t border-gray-200">
              <a
                href="#contato"
                className="btn btn-primary w-full text-center text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Agendar Consulta
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
