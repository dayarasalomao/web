'use client'

import { useState } from 'react'
import { WHATSAPP_URL } from '@/constants'
import Link from 'next/link'
import LogoSvgComponent from '@/svgr/logo'

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
          {/* Enhanced SVG Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative group">
              <LogoSvgComponent
                className="h-12 lg:h-14 w-auto transition-all duration-300 "
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(163, 84, 66, 0.1))',
                  fill: 'var(--color-copper)',
                }}
                title="Dra. Dayara Salomão - Coloproctologista"
              />

              {/* Subtle background enhancement */}
              <div
                className="absolute inset-0 -z-10 rounded-lg opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                style={{ backgroundColor: 'var(--color-copper)' }}
              ></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
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
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
              <span
                className={`bg-gray-700 block h-0.5 w-6 rounded transition-all duration-300 origin-center ${
                  isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`bg-gray-700 block h-0.5 w-6 rounded transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`bg-gray-700 block h-0.5 w-6 rounded transition-all duration-300 origin-center ${
                  isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
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
                  <Link
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
                  </Link>
                </li>
              ))}
            </ul>
            <div className="px-4 pb-4 pt-2 border-t border-gray-200">
              {/* CTA Button */}
              <li key="agendar-consulta">
                <Link
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
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
                </Link>
              </li>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
