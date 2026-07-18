'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { WHATSAPP_URL } from '@/constants'
import Link from 'next/link'
import {
  HOME_HEADER_NAV_ITEMS,
  SUBPAGE_HEADER_NAV_ITEMS,
  type NavItem,
} from '@/lib/navigation'

type HeaderMode = 'home' | 'subpage'

interface HeaderProps {
  mode?: HeaderMode
}

export default function Header({ mode = 'home' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const suppressAppointmentCta = pathname === '/locais-de-atendimento/campo-grande'
  const navItems = mode === 'subpage' ? SUBPAGE_HEADER_NAV_ITEMS : HOME_HEADER_NAV_ITEMS

  const isActiveItem = (item: NavItem) => {
    if (mode !== 'subpage' || !item.match) {
      return false
    }

    if (item.match === '/') {
      return pathname === '/'
    }

    return pathname === item.match || pathname.startsWith(`${item.match}/`)
  }

  const linkBaseClass =
    'text-sm transition-all duration-300 font-medium relative group py-2 whitespace-nowrap'

  const renderNavLink = (item: NavItem, mobile = false) => {
    const isActive = isActiveItem(item)

    if (mobile) {
      return (
        <Link
          href={item.href}
          {...(item.external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
          className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 ${
            isActive ? 'text-copper' : 'text-gray-700'
          }`}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-copper)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = isActive ? 'var(--color-copper)' : ''
          }}
          onClick={() => setIsMenuOpen(false)}
        >
          {item.label}
        </Link>
      )
    }

    return (
      <Link
        href={item.href}
        {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={`${linkBaseClass} ${isActive ? 'text-copper' : 'text-gray-700 hover:opacity-80'}`}
        style={
          {
            '--hover-color': 'var(--color-copper)',
          } as React.CSSProperties
        }
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--color-copper)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = isActive ? 'var(--color-copper)' : ''
        }}
      >
        {item.label}
        <span
          className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
            isActive ? 'w-full' : 'w-0 group-hover:w-full'
          }`}
          style={{ backgroundColor: 'var(--color-copper)' }}
        ></span>
      </Link>
    )
  }

  return (
    <header
      className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200"
      style={{ boxShadow: '0 2px 15px -3px rgb(0 0 0 / 0.1)' }}
    >
      <nav className="container py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div>
              <p className="text-lg sm:text-xl font-serif font-bold text-gray-800">
                Dra. Dayara Salomão
              </p>
              <p
                className="text-xs sm:text-sm font-medium"
                style={{ color: 'var(--color-copper)' }}
              >
                Coloproctologista
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-5">
            {navItems.map((item) => (
              <li key={item.href}>
                {renderNavLink(item)}
              </li>
            ))}
          </ul>

          {!suppressAppointmentCta ? (
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-conversion="whatsapp-header"
              className="btn btn-secondary hidden text-sm lg:inline-flex"
            >
              Agendar consulta
            </Link>
          ) : null}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
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
          <div id="mobile-navigation" className="md:hidden mt-6 card">
            <ul className="space-y-3 p-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  {renderNavLink(item, true)}
                </li>
              ))}
            </ul>
            {!suppressAppointmentCta ? (
              <div className="px-4 pb-4 pt-2 border-t border-gray-200">
              {/* CTA Button */}
              <ul className="py-2 px-3">
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
              </ul>
              </div>
            ) : null}
          </div>
        )}
      </nav>
    </header>
  )
}
