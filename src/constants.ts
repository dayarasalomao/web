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

export const BUSINESS_CLINIC_NAME = 'Eco Medical Center'
export const BUSINESS_STREET = 'Rua Goiás'
export const BUSINESS_STREET_NUMBER = '70'
export const BUSINESS_FLOOR = '3º andar'
export const BUSINESS_NEIGHBORHOOD = 'Água Verde'
export const BUSINESS_ADDRESS_LOCALITY = 'Curitiba'
export const BUSINESS_ADDRESS_REGION = 'Paraná'
export const BUSINESS_ADDRESS_REGION_CODE = 'PR'
export const BUSINESS_POSTAL_CODE = '80620-060'
export const BUSINESS_ADDRESS_LINE = `${BUSINESS_STREET}, ${BUSINESS_STREET_NUMBER} - ${BUSINESS_NEIGHBORHOOD}`
export const BUSINESS_ADDRESS_DETAIL = `${BUSINESS_FLOOR}, ${BUSINESS_ADDRESS_LOCALITY} - ${BUSINESS_ADDRESS_REGION_CODE}, CEP ${BUSINESS_POSTAL_CODE}`
export const BUSINESS_FULL_ADDRESS = `${BUSINESS_STREET}, ${BUSINESS_STREET_NUMBER}, ${BUSINESS_FLOOR}, ${BUSINESS_NEIGHBORHOOD}, ${BUSINESS_ADDRESS_LOCALITY} - ${BUSINESS_ADDRESS_REGION_CODE}, CEP ${BUSINESS_POSTAL_CODE}`
export const BUSINESS_LOCATION_LABEL = `${BUSINESS_CLINIC_NAME}, ${BUSINESS_NEIGHBORHOOD}, ${BUSINESS_ADDRESS_LOCALITY}/${BUSINESS_ADDRESS_REGION_CODE}`
export const BUSINESS_FOOTER_LOCATION = `${BUSINESS_CLINIC_NAME} - ${BUSINESS_ADDRESS_LOCALITY}, ${BUSINESS_ADDRESS_REGION_CODE}`

// =================================================================
// SEO & METADATA CONSTANTS
// =================================================================
export const SEO_DOCTOR_NAME = 'Dra. Dayara Salomão'
export const SEO_SPECIALTY = 'Coloproctologista'
// Relocation note recorded 2026-05-26: the practice is expected to move
// from Curitiba/PR to Campo Grande/MS around July 2026. Do not add new
// Curitiba-targeted local SEO; retarget these local signals only after
// the move is confirmed.
export const SEO_LOCATION = BUSINESS_ADDRESS_LOCALITY

export const SEO_TITLE = `${SEO_DOCTOR_NAME} | ${SEO_SPECIALTY} em ${SEO_LOCATION}`
export const SEO_DESCRIPTION = `Coloproctologista em ${SEO_LOCATION} com atendimento no ${BUSINESS_CLINIC_NAME}. Tratamentos para hemorroidas, fissura anal, fístula anal, HPV perianal, cisto pilonidal e outras doenças anorretais.`
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
// TODO(campo-grande): Dra. Dayara is already registered in MS as
// CRM-MS 16556 / RQE 9819 (seen on her Instagram profile). Once she is
// practicing in Campo Grande, switch these to the MS registration — or
// display BOTH during the transition. Keep PR values until the move is
// live so the current Curitiba practice stays truthful.
export const CRM_NUMBER = '16556'
export const CRM_STATE = 'MS'
export const CRM_FULL = `CRM-${CRM_STATE} ${CRM_NUMBER}`
export const RQE_NUMBER = '9819'
export const RQE_FULL = `RQE ${RQE_NUMBER}`
export const CFM_REGISTRY_URL = `https://portal.cfm.org.br/busca-medicos/profissionais?crm=${CRM_NUMBER}&uf=${CRM_STATE}`

// TODO(campo-grande): update the Doctoralia city slug (.../curitiba) once
// her profile reflects Campo Grande.
export const DOCTORALIA_URL =
  'https://www.doctoralia.com.br/dayara-salomao/coloproctologista/curitiba'

// TODO(campo-grande): replace with the confirmed Campo Grande Google Maps
// place link when the new clinic is live.
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/8pzUEGq1YnVFmsf4A'

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
  streetAddress: BUSINESS_ADDRESS_LINE,
  addressLocality: BUSINESS_ADDRESS_LOCALITY,
  addressRegion: BUSINESS_ADDRESS_REGION,
  addressCountry: 'BR',
  postalCode: BUSINESS_POSTAL_CODE,
}

export const BUSINESS_GEO = {
  latitude: -25.4646652,
  longitude: -49.2905794,
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
