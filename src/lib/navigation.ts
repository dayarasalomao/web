export interface NavItem {
  href: string
  label: string
  match?: string
  external?: boolean
}

// With one public location, navigation should bypass the redirect-only index.
// Keep `match` on the parent path so every location detail route stays active.
export const PRIMARY_LOCATION_PATH = '/locais-de-atendimento/campo-grande'

export const HOME_HEADER_NAV_ITEMS: NavItem[] = [
  { href: '/sobre', label: 'Sobre', match: '/sobre' },
  { href: '/tratamentos', label: 'Tratamentos', match: '/tratamentos' },
  { href: '/blog', label: 'Blog', match: '/blog' },
  { href: PRIMARY_LOCATION_PATH, label: 'Locais', match: '/locais-de-atendimento' },
  { href: '/#contato', label: 'Contato' },
]

export const SUBPAGE_HEADER_NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Início', match: '/' },
  { href: '/sobre', label: 'Sobre', match: '/sobre' },
  { href: '/tratamentos', label: 'Tratamentos', match: '/tratamentos' },
  { href: '/blog', label: 'Blog', match: '/blog' },
  { href: PRIMARY_LOCATION_PATH, label: 'Locais', match: '/locais-de-atendimento' },
  { href: '/#contato', label: 'Contato' },
]

export const FOOTER_QUICK_LINKS: NavItem[] = [
  { href: '/sobre', label: 'Sobre' },
  { href: '/#doencas', label: 'Doenças' },
  { href: '/#curriculo', label: 'Currículo' },
  { href: '/tratamentos', label: 'Tratamentos' },
  { href: '/blog', label: 'Blog' },
  { href: PRIMARY_LOCATION_PATH, label: 'Locais de atendimento' },
]
