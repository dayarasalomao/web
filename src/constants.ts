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

export const BUSINESS_TELEPHONE_NUMBER = '(67) 3320-9500'

export const BUSINESS_CLINIC_NAME = 'Instituto do Aparelho Digestivo'
export const BUSINESS_STREET = 'R. Alagoas'
export const BUSINESS_STREET_NUMBER = '700'
export const BUSINESS_UNIT = 'Sala 8'
export const BUSINESS_NEIGHBORHOOD = 'Jardim dos Estados'
export const BUSINESS_ADDRESS_LOCALITY = 'Campo Grande'
export const BUSINESS_ADDRESS_REGION = 'Mato Grosso do Sul'
export const BUSINESS_ADDRESS_REGION_CODE = 'MS'
export const BUSINESS_POSTAL_CODE = '79020-120'
export const BUSINESS_ADDRESS_LINE = `${BUSINESS_STREET}, ${BUSINESS_STREET_NUMBER} - ${BUSINESS_NEIGHBORHOOD}`
export const BUSINESS_ADDRESS_DETAIL = `${BUSINESS_UNIT}, ${BUSINESS_ADDRESS_LOCALITY} - ${BUSINESS_ADDRESS_REGION_CODE}, CEP ${BUSINESS_POSTAL_CODE}`
export const BUSINESS_FULL_ADDRESS = `${BUSINESS_STREET}, ${BUSINESS_STREET_NUMBER}, ${BUSINESS_UNIT}, ${BUSINESS_NEIGHBORHOOD}, ${BUSINESS_ADDRESS_LOCALITY} - ${BUSINESS_ADDRESS_REGION_CODE}, CEP ${BUSINESS_POSTAL_CODE}`
export const BUSINESS_LOCATION_LABEL = `${BUSINESS_CLINIC_NAME}, ${BUSINESS_NEIGHBORHOOD}, ${BUSINESS_ADDRESS_LOCALITY}/${BUSINESS_ADDRESS_REGION_CODE}`
export const BUSINESS_FOOTER_LOCATION = `${BUSINESS_CLINIC_NAME} - ${BUSINESS_ADDRESS_LOCALITY}, ${BUSINESS_ADDRESS_REGION_CODE}`

// =================================================================
// SEO & METADATA CONSTANTS
// =================================================================
export const SEO_DOCTOR_NAME = 'Dra. Dayara Salomão'
export const SEO_SPECIALTY = 'Coloproctologista'
export const SEO_LOCATION = BUSINESS_ADDRESS_LOCALITY

export const SEO_TITLE = `${SEO_DOCTOR_NAME} | ${SEO_SPECIALTY} em ${SEO_LOCATION}`
export const SEO_DESCRIPTION = `Coloproctologista em ${SEO_LOCATION} no ${BUSINESS_CLINIC_NAME}. Avaliação e tratamentos para hemorroidas, fissura, fístula, HPV anal e cisto pilonidal.`
export const SEO_KEYWORDS = `coloproctologista ${SEO_LOCATION.toLowerCase()}, proctologista ${SEO_LOCATION.toLowerCase()}, hemorroidas, fissura anal, fístula anal, tratamento laser, cirurgia minimamente invasiva, Dayara Salomão, ${BUSINESS_CLINIC_NAME}, HPV anal, cisto pilonidal, constipação, síndrome intestino irritável, ligadura elástica, VAAFT, FiLaC, EPSiT, laser de CO2`

export const SEO_OG_DESCRIPTION = `Atendimento especializado em coloproctologia em ${SEO_LOCATION}, com foco em avaliação acolhedora e tratamentos minimamente invasivos com laser e tecnologias modernas no ${BUSINESS_CLINIC_NAME}.`
export const SEO_TWITTER_DESCRIPTION = `Coloproctologista em ${SEO_LOCATION}. Atendimento no ${BUSINESS_CLINIC_NAME} para doenças anorretais e tratamentos minimamente invasivos.`

export const SEO_IMAGE = '/assets/dayara-profissional-vermelho.webp'
export const SEO_IMAGE_ALT = `${SEO_DOCTOR_NAME} - ${SEO_SPECIALTY} em ${SEO_LOCATION}`

export const TWITTER_HANDLE = '@dradayarasalomao'

export const BLOG_DEFAULT_OG_IMAGE = SEO_IMAGE
export const BLOG_DEFAULT_OG_IMAGE_ALT = `Blog da ${SEO_DOCTOR_NAME} - ${SEO_SPECIALTY} em ${SEO_LOCATION}`

// =================================================================
// PROFESSIONAL CREDENTIALS (Used in Physician JSON-LD + Footer)
// =================================================================
export const CRM_NUMBER = '16556'
export const CRM_STATE = 'MS'
export const CRM_FULL = `CRM-${CRM_STATE} ${CRM_NUMBER}`
export const RQE_NUMBER = '9819'
export const RQE_FULL = `RQE ${RQE_NUMBER}`
export const CFM_REGISTRY_URL = `https://portal.cfm.org.br/busca-medicos/profissionais?crm=${CRM_NUMBER}&uf=${CRM_STATE}`

// TODO(campo-grande): still points at the Curitiba/CRM-PR Doctoralia
// profile — the real profile hasn't been updated to Campo Grande yet.
// Swap this once a confirmed Campo Grande Doctoralia URL exists; do not
// guess a slug, it will 404 until the profile is actually migrated.
export const DOCTORALIA_URL =
  'https://www.doctoralia.com.br/dayara-salomao/coloproctologista/curitiba'

export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/c8dqJpaqs1wb8Cnm6'

// =================================================================
// BUSINESS INFORMATION (Used in JSON-LD Schema)
// =================================================================
export const BUSINESS_NAME = SEO_DOCTOR_NAME
export const BUSINESS_ALTERNATE_NAME = 'Dayara Salomão Coloproctologista'
export const BUSINESS_DESCRIPTION = SEO_OG_DESCRIPTION
export const BUSINESS_SPECIALTY = 'Coloproctology'
export const BUSINESS_PHONE = BUSINESS_TELEPHONE_NUMBER
export const BUSINESS_EMAIL = CONTACT_EMAIL

// =================================================================
// LOCATION DATA
// =================================================================
export const BUSINESS_ADDRESS = {
  streetAddress: BUSINESS_ADDRESS_LINE,
  addressLocality: BUSINESS_ADDRESS_LOCALITY,
  addressRegion: BUSINESS_ADDRESS_REGION,
  addressCountry: 'BR',
  postalCode: BUSINESS_POSTAL_CODE,
}

// Confirmed from the clinic's own Google Maps listing
// (https://maps.app.goo.gl/c8dqJpaqs1wb8Cnm6, resolved 2026-07-18).
export const BUSINESS_GEO = {
  latitude: -20.4530096,
  longitude: -54.5956825,
}

export const BUSINESS_HOURS = 'Mo-Fr 09:00-18:00'
export const BUSINESS_PAYMENT = 'Cash, Credit Card, Health Insurance'
export const BUSINESS_CURRENCY = 'BRL'

// =================================================================
// PHYSICIAN DATA (Used in JSON-LD Schema)
// =================================================================
export const PHYSICIAN_DATA = {
  name: 'Dayara Salomão',
  medicalSpecialty: BUSINESS_SPECIALTY,
  university: 'Pontifícia Universidade Católica do Paraná',
  clinic: BUSINESS_CLINIC_NAME,
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
