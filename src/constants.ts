// =================================================================
// SITE CONFIGURATION
// =================================================================

export const SITE_URL = 'https://www.dayarasalomao.com.br/'

// =================================================================
// CONTACT INFORMATION (Used in components)
// =================================================================
export const CONTACT_EMAIL = 'dradayarasalomao@gmail.com'
export const CONTACT_SOCIAL_MEDIA = {
  instagram: 'https://www.instagram.com/dradayarasalomao',
  facebook: 'https://www.facebook.com/dradayarasalomao',
  twitter: 'https://www.twitter.com/dradayarasalomao',
}

export const WHATSAPP_NUMBER = '554135422095'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export const ECO_TELEPHONE_NUMBER = '(41) 3123-6550'

// =================================================================
// SEO & METADATA CONSTANTS
// =================================================================
export const SEO_DOCTOR_NAME = 'Dra. Dayara Salomão'
export const SEO_SPECIALTY = 'Coloproctologista'
export const SEO_LOCATION = 'Curitiba'

export const SEO_TITLE = `${SEO_DOCTOR_NAME} | ${SEO_SPECIALTY} em ${SEO_LOCATION}`
export const SEO_DESCRIPTION = `Coloproctologista em ${SEO_LOCATION} com atendimento no Eco Medical Center. Tratamentos para hemorroidas, fissura anal, fístula anal, HPV perianal, cisto pilonidal e outras doenças anorretais.`
export const SEO_KEYWORDS = `coloproctologista ${SEO_LOCATION.toLowerCase()}, proctologista ${SEO_LOCATION.toLowerCase()}, hemorroidas, fissura anal, fístula anal, tratamento laser, cirurgia minimamente invasiva, Dayara Salomão, Eco Medical Center, HPV anal, cisto pilonidal, constipação, síndrome intestino irritável, ligadura elástica, VAAFT, FiLaC, EPSiT, laser de CO2`

export const SEO_OG_DESCRIPTION = `Atendimento especializado em coloproctologia em ${SEO_LOCATION}, com foco em avaliação acolhedora e tratamentos minimamente invasivos com laser e tecnologias modernas no Eco Medical Center.`
export const SEO_TWITTER_DESCRIPTION = `Coloproctologista em ${SEO_LOCATION}. Atendimento no Eco Medical Center para doenças anorretais e tratamentos minimamente invasivos.`

export const SEO_IMAGE = '/assets/dayara-profissional-vermelho.webp'
export const SEO_IMAGE_ALT = `${SEO_DOCTOR_NAME} - ${SEO_SPECIALTY} em ${SEO_LOCATION}`

export const TWITTER_HANDLE = '@dradayarasalomao'

export const BLOG_DEFAULT_OG_IMAGE = SEO_IMAGE
export const BLOG_DEFAULT_OG_IMAGE_ALT = `Blog da ${SEO_DOCTOR_NAME} - ${SEO_SPECIALTY} em ${SEO_LOCATION}`

// =================================================================
// PROFESSIONAL CREDENTIALS (Used in Physician JSON-LD + Footer)
// =================================================================
export const CRM_NUMBER = '42596'
export const CRM_STATE = 'PR'
export const CRM_FULL = `CRM-${CRM_STATE} ${CRM_NUMBER}`
export const RQE_NUMBER = '33908'
export const RQE_FULL = `RQE ${RQE_NUMBER}`
export const CFM_REGISTRY_URL = `https://portal.cfm.org.br/busca-medicos/profissionais?crm=${CRM_NUMBER}&uf=${CRM_STATE}`

// TODO: confirm with user before production — public Doctoralia profile URL
export const DOCTORALIA_URL = ''

// TODO: confirm with user before production — Google Maps place URL (Eco Medical Center listing)
export const GOOGLE_MAPS_URL = ''

// =================================================================
// BUSINESS INFORMATION (Used in JSON-LD Schema)
// =================================================================
export const BUSINESS_NAME = SEO_DOCTOR_NAME
export const BUSINESS_ALTERNATE_NAME = 'Dayara Salomão Coloproctologista'
export const BUSINESS_DESCRIPTION = SEO_OG_DESCRIPTION
export const BUSINESS_SPECIALTY = 'Coloproctology'
export const BUSINESS_PHONE = ECO_TELEPHONE_NUMBER
export const BUSINESS_EMAIL = CONTACT_EMAIL

// =================================================================
// LOCATION DATA
// =================================================================
export const BUSINESS_ADDRESS = {
  streetAddress: 'Rua Góias, 70 - 3º andar',
  addressLocality: 'Curitiba',
  addressRegion: 'Paraná',
  addressCountry: 'BR',
  postalCode: '80620-010',
}

export const BUSINESS_GEO = {
  latitude: -25.4284,
  longitude: -49.2733,
}

export const BUSINESS_HOURS = 'Mo-Fr 08:00-18:00'
export const BUSINESS_PAYMENT = 'Cash, Credit Card, Health Insurance'
export const BUSINESS_CURRENCY = 'BRL'

// =================================================================
// PHYSICIAN DATA (Used in JSON-LD Schema)
// =================================================================
export const PHYSICIAN_DATA = {
  name: 'Dayara Salomão',
  medicalSpecialty: BUSINESS_SPECIALTY,
  university: 'Pontifícia Universidade Católica do Paraná',
  clinic: 'Eco Medical Center',
}

// =================================================================
// MEDICAL PROCEDURES (Used in JSON-LD Schema)
// =================================================================
export const MEDICAL_PROCEDURES = [
  'Hemorroidectomia com laser de CO2',
  'Cirurgia de hemorroidas sem corte',
  'Ligadura elástica para doença hemorroidária',
  'Tratamento de fístula anal com laser e vídeo',
  'Tratamento de cisto pilonidal com laser e EPSiT',
  'Remoção de plicoma anal com laser de CO2',
  'Toxina botulínica para fissura anal',
  'Tratamento de HPV perianal com laser de CO2',
  'Tratamento de prurido anal',
  'Tratamento de constipação intestinal',
  'Avaliação de diarreia crônica',
  'Tratamento da síndrome do intestino irritável',
  'Tratamento de hidradenite supurativa',
  'Acompanhamento de doenças inflamatórias intestinais',
]

// =================================================================
// RATINGS DATA (Used in JSON-LD Schema)
// =================================================================
export const BUSINESS_RATING = {
  ratingValue: '5.0',
  reviewCount: '10',
}

// =================================================================
// SITEMAP IMAGES (Used in sitemap.ts)
// =================================================================
export const SITEMAP_IMAGES = [
  '/assets/dayara-profissional-vermelho.webp',
  '/assets/dayara-profissional-escuro.webp',
  '/assets/dayara-clinica.webp',
  '/assets/operando-claro.webp',
  '/assets/operando-longe.webp',
  '/assets/day-clinica-pe.webp',
  '/core/lettering-blue.png',
  '/core/logo.png',
]

// =================================================================
// ANALYTICS CONFIGURATION
// =================================================================
export const GOOGLE_TAG_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || ''

// Analytics feature flags
export const ANALYTICS_ENABLED =
  process.env.NODE_ENV === 'production' ||
  process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true'
