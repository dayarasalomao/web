// =================================================================
// PRACTICE LOCATION MODEL
// =================================================================
// Single source of truth for where Dra. Dayara Salomão attends.
// Separates factual ACTIVE practice data (safe to index) from a
// PLANNED target market (Campo Grande/MS) that may show confirmed
// pre-launch facts on a noindex page, but must NOT emit active local
// schema, sitemap entries, or appointment CTAs until activation.
//
// See `.specs/features/campo-grande-seo-migration/design.md` and
// `.specs/features/campo-grande-launch-growth/spec.md`.
// =================================================================

import {
  BUSINESS_CLINIC_NAME,
  BUSINESS_ADDRESS_LINE,
  BUSINESS_NEIGHBORHOOD,
  BUSINESS_ADDRESS_LOCALITY,
  BUSINESS_ADDRESS_REGION,
  BUSINESS_ADDRESS_REGION_CODE,
  BUSINESS_POSTAL_CODE,
  BUSINESS_GEO,
  ECO_TELEPHONE_NUMBER,
  WHATSAPP_URL,
  GOOGLE_MAPS_URL,
} from '../constants.ts'

export type LocationStatus = 'active' | 'planned' | 'historical'

export interface LocationAddress {
  streetAddress: string
  addressDetail?: string
  neighborhood?: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  addressCountry: 'BR'
}

export interface LocationGeo {
  latitude: number
  longitude: number
}

export interface LocationFaq {
  question: string
  answer: string
}

export interface PracticeLocation {
  slug: string
  name: string
  status: LocationStatus
  city: string
  state: string
  stateCode: string
  address?: LocationAddress
  geo?: LocationGeo
  phone?: string
  clinicPhone?: string
  whatsappUrl?: string
  mapsUrl?: string
  openingHours?: {
    label: string
    opens: string
    closes: string
    schema: string
  }
  roleDescription: string
  services: string[]
  relatedTreatmentSlugs: string[]
  relatedBlogSlugs: string[]
  faqs: LocationFaq[]
  indexable: boolean
  showAppointmentCta: boolean
  launchDate?: string
  lastUpdated: string
}

// Core coloproctology services offered — reused for the active location and
// as a pre-launch editorial model. Colonoscopy is intentionally excluded:
// the doctor confirmed it will not be offered by her at the new location.
const CORE_SERVICES: string[] = [
  'Doença hemorroidária',
  'Fissura anal',
  'Fístula anal',
  'Cisto pilonidal',
  'HPV perianal',
  'Plicoma anal',
  'Prurido anal',
  'Constipação intestinal',
  'Síndrome do intestino irritável',
  'Doenças inflamatórias intestinais',
]

const CORE_TREATMENT_SLUGS: string[] = [
  'hemorroidectomia-laser-co2',
  'hemorroidas-sem-corte-laser-diodo',
  'toxina-botulinica-fissura-anal',
  'fistula-anal-laser-vaaft-filac',
  'cisto-pilonidal-laser-epsit',
  'hpv-perianal-laser-co2',
]

const CORE_BLOG_SLUGS: string[] = [
  'doenca-hemorroidaria-sintomas-graus',
  'fissura-anal-causas-sintomas',
  'fistula-anal-o-que-e-sintomas',
  'cisto-pilonidal-sinais-diagnostico',
]

export const LOCATIONS: PracticeLocation[] = [
  // ---------------------------------------------------------------
  // ACTIVE — Curitiba/PR (truthful current practice until move).
  // ---------------------------------------------------------------
  {
    slug: 'curitiba',
    name: BUSINESS_CLINIC_NAME,
    status: 'active',
    city: BUSINESS_ADDRESS_LOCALITY,
    state: BUSINESS_ADDRESS_REGION,
    stateCode: BUSINESS_ADDRESS_REGION_CODE,
    address: {
      streetAddress: BUSINESS_ADDRESS_LINE,
      neighborhood: BUSINESS_NEIGHBORHOOD,
      addressLocality: BUSINESS_ADDRESS_LOCALITY,
      addressRegion: BUSINESS_ADDRESS_REGION,
      postalCode: BUSINESS_POSTAL_CODE,
      addressCountry: 'BR',
    },
    geo: {
      latitude: BUSINESS_GEO.latitude,
      longitude: BUSINESS_GEO.longitude,
    },
    phone: ECO_TELEPHONE_NUMBER,
    whatsappUrl: WHATSAPP_URL,
    mapsUrl: GOOGLE_MAPS_URL,
    roleDescription:
      'Atendimento em coloproctologia com foco em tratamentos minimamente invasivos.',
    services: CORE_SERVICES,
    relatedTreatmentSlugs: CORE_TREATMENT_SLUGS,
    relatedBlogSlugs: CORE_BLOG_SLUGS,
    faqs: [],
    indexable: true,
    showAppointmentCta: true,
    lastUpdated: '2026-07-10',
  },

  // ---------------------------------------------------------------
  // PLANNED — Campo Grande/MS. Move is imminent (client confirmed
  // 2026-07-10). Dra. Dayara is already CRM-MS 16556 / RQE 9819.
  // Address, room, clinic phone, booking WhatsApp, weekday hours, map and
  // launch date are confirmed. Kept indexable:false with no active local
  // schema/geo until the coordinated launch.
  // DO NOT flip to 'active' merely because the date has passed.
  // ---------------------------------------------------------------
  {
    slug: 'campo-grande',
    name: 'Instituto do Aparelho Digestivo',
    status: 'planned',
    city: 'Campo Grande',
    state: 'Mato Grosso do Sul',
    stateCode: 'MS',
    address: {
      streetAddress: 'R. Alagoas, 700',
      addressDetail: 'Sala 8',
      neighborhood: 'Jardim dos Estados',
      addressLocality: 'Campo Grande',
      addressRegion: 'Mato Grosso do Sul',
      postalCode: '79020-120',
      addressCountry: 'BR',
    },
    // Coordinates from the clinic's own Google Maps listing
    // (https://maps.app.goo.gl/c8dqJpaqs1wb8Cnm6, resolved 2026-07-18).
    // Not emitted as GeoCoordinates while status is 'planned' — see
    // isLocationIndexable and buildLocationGraph gating.
    geo: {
      latitude: -20.4530096,
      longitude: -54.5956825,
    },
    // Keep the clinic phone separate from the doctor's appointment contact
    // until the clinic confirms that it books directly for her.
    // TODO(campo-grande): record a dedicated doctor phone if one is provided.
    clinicPhone: '(67) 3320-9500',
    whatsappUrl: WHATSAPP_URL,
    openingHours: {
      label: 'Segunda a sexta, das 9h às 18h',
      opens: '09:00',
      closes: '18:00',
      schema: 'Mo-Fr 09:00-18:00',
    },
    mapsUrl: 'https://maps.app.goo.gl/c8dqJpaqs1wb8Cnm6',
    roleDescription:
      'Atendimento em coloproctologia com foco em tratamentos minimamente invasivos.',
    services: CORE_SERVICES,
    relatedTreatmentSlugs: CORE_TREATMENT_SLUGS,
    relatedBlogSlugs: CORE_BLOG_SLUGS,
    // Answers restricted to facts confirmed by the client through 2026-07-18.
    // No prices, insurance or unconfirmed availability.
    faqs: [
      {
        question: 'Quando a Dra. Dayara Salomão começa a atender em Campo Grande?',
        answer:
          'O primeiro dia de atendimento no Instituto do Aparelho Digestivo, em Campo Grande/MS, está previsto para 5 de agosto de 2026.',
      },
      {
        question: 'Onde fica o consultório em Campo Grande?',
        answer:
          'No Instituto do Aparelho Digestivo, na R. Alagoas, 700, Sala 8, Jardim dos Estados, Campo Grande/MS, CEP 79020-120.',
      },
      {
        question: 'Como agendar consulta em Campo Grande?',
        answer:
          'O WhatsApp de agendamento permanece o mesmo já utilizado no site. O telefone geral do Instituto do Aparelho Digestivo é (67) 3320-9500.',
      },
      {
        question: 'Qual será o horário de atendimento em Campo Grande?',
        answer:
          'O atendimento da Dra. Dayara está previsto de segunda a sexta, das 9h às 18h.',
      },
      {
        question: 'Quais condições serão atendidas em Campo Grande?',
        answer:
          'Consultas e tratamentos em coloproctologia, como doença hemorroidária, fissura anal, fístula anal, cisto pilonidal e HPV perianal, com avaliação individual de cada caso. A colonoscopia não será realizada pela Dra. Dayara nesse local.',
      },
    ],
    indexable: false,
    showAppointmentCta: true,
    launchDate: '2026-08-05',
    lastUpdated: '2026-07-18',
  },
]

const locationsBySlug = new Map(
  LOCATIONS.map((location) => [location.slug, location]),
)

export function getAllLocations(): PracticeLocation[] {
  return LOCATIONS
}

export function getLocationBySlug(slug: string): PracticeLocation | null {
  return locationsBySlug.get(slug) ?? null
}

// A location is safe to index only when it is active, explicitly flagged
// indexable, and has a confirmed postal address. Planned locations may have
// a pre-launch page, but never enter the sitemap or active local schema.
export function isLocationIndexable(location: PracticeLocation): boolean {
  return (
    location.indexable &&
    location.status === 'active' &&
    location.address !== undefined
  )
}

export function getIndexableLocations(): PracticeLocation[] {
  return LOCATIONS.filter(isLocationIndexable)
}

export function getActiveLocations(): PracticeLocation[] {
  return LOCATIONS.filter((location) => location.status === 'active')
}
