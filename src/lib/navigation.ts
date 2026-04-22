export interface NavItem {
  href: string
  label: string
  match?: string
  external?: boolean
}

export const GLOBAL_HEADER_NAV_ITEMS: NavItem[] = [
  { href: '/tratamentos', label: 'Tratamentos', match: '/tratamentos' },
  { href: '/blog', label: 'Blog', match: '/blog' },
  { href: 'https://wa.me/554135422095', label: 'Contato', external: true },
]

export const FOOTER_QUICK_LINKS: NavItem[] = [
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#doencas', label: 'Doenças' },
  { href: '/#tratamentos', label: 'Tratamentos na home' },
  { href: '/tratamentos', label: 'Página de Tratamentos' },
  { href: '/blog', label: 'Blog' },
  { href: '/#curriculo', label: 'Currículo' },
]
