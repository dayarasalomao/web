// =================================================================
// SITE CONFIGURATION
// =================================================================

export const SITE_URL = 'https://dayarasalomao.vercel.app'
// FIXME: add this back when we have a domain
// export const SITE_URL = 'https://dradayarasalomao.com.br'

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
export const SEO_BUSINESS_NAME = 'Dra. Dayara Salomão'
export const SEO_SPECIALTY = 'Coloproctologista'
export const SEO_LOCATION = 'Curitiba'

export const SEO_TITLE = `${SEO_DOCTOR_NAME} | ${SEO_SPECIALTY} em ${SEO_LOCATION}`
export const SEO_DESCRIPTION = `${SEO_DOCTOR_NAME} é especialista em coloproctologia em ${SEO_LOCATION}. Tratamentos minimamente invasivos com laser para hemorroidas, fissura anal, fístula anal e outras doenças anais. Agende sua consulta no Eco Medical Center.`
export const SEO_KEYWORDS = `coloproctologista ${SEO_LOCATION.toLowerCase()}, proctologista ${SEO_LOCATION.toLowerCase()}, hemorroidas, fissura anal, fístula anal, tratamento laser, cirurgia minimamente invasiva, Dayara Salomão, eco medical center, HPV anal, cisto pilonidal, constipação, síndrome intestino irritável`

export const SEO_OG_DESCRIPTION = `Especialista em coloproctologia em ${SEO_LOCATION} com tratamentos minimamente invasivos usando laser e outras tecnologias modernas. Atendimento no Eco Medical Center - Água Verde.`
export const SEO_TWITTER_DESCRIPTION = `Especialista em coloproctologia com tratamentos minimamente invasivos usando laser. Atendimento em ${SEO_LOCATION} no Eco Medical Center.`

export const SEO_IMAGE = '/assets/dayara-profissional-vermelho.JPG'
export const SEO_IMAGE_ALT = `${SEO_DOCTOR_NAME} - ${SEO_SPECIALTY} em ${SEO_LOCATION}`

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
  'Cirurgia de hemorroidas com laser de CO2',
  'Cirurgia de fístula anal a laser',
  'Tratamento de fissura anal',
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
  '/assets/dayara-profissional-vermelho.JPG',
  '/assets/dayara-profissional-escuro.JPG',
  '/assets/dayara-clinica.JPG',
  '/assets/operando-claro.jpg',
  '/assets/operando-longe.jpg',
  '/assets/day-clinica-pe.JPG',
  '/core/lettering-blue.png',
  '/core/logo.png',
]
