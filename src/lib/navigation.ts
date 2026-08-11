export interface NavItem {
  href: string
  label: string
  match?: string
  external?: boolean
}

export const HOME_HEADER_NAV_ITEMS: NavItem[] = [
  { href: '/sobre', label: 'Sobre', match: '/sobre' },
  { href: '/tratamentos', label: 'Tratamentos', match: '/tratamentos' },
  { href: '/blog', label: 'Blog', match: '/blog' },
  { href: '/locais-de-atendimento', label: 'Locais', match: '/locais-de-atendimento' },
  { href: '/#contato', label: 'Contato' },
]

export const SUBPAGE_HEADER_NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Início', match: '/' },
  { href: '/sobre', label: 'Sobre', match: '/sobre' },
  { href: '/tratamentos', label: 'Tratamentos', match: '/tratamentos' },
  { href: '/blog', label: 'Blog', match: '/blog' },
  { href: '/locais-de-atendimento', label: 'Locais', match: '/locais-de-atendimento' },
  { href: '/#contato', label: 'Contato' },
]

export const FOOTER_QUICK_LINKS: NavItem[] = [
  { href: '/sobre', label: 'Sobre' },
  { href: '/#doencas', label: 'Doenças' },
  { href: '/#curriculo', label: 'Currículo' },
  { href: '/tratamentos', label: 'Tratamentos' },
  { href: '/blog', label: 'Blog' },
  { href: '/locais-de-atendimento', label: 'Locais de atendimento' },
]
