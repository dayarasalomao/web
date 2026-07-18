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
  whatsappUrl?: string
  mapsUrl?: string
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
  // Address, clinic, map and launch date are confirmed. Kept indexable:false
  // with no active local schema/geo/phone/CTA until the coordinated launch.
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
      neighborhood: 'Jardim dos Estados',
      addressLocality: 'Campo Grande',
      addressRegion: 'Mato Grosso do Sul',
      postalCode: '79020-120',
      addressCountry: 'BR',
    },
    // TODO(campo-grande): add confirmed `geo` (latitude/longitude).
    // TODO(campo-grande): add confirmed `phone` (DDD 67) and `whatsappUrl`.
    mapsUrl:
      'https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=br&sa=X&geocode=KaEUri6R6IaUMQkFnCP7Ozlw&daddr=R.+Alagoas,+700+-+Sl+8+-+Jardim+dos+Estados,+Campo+Grande+-+MS,+79020-120',
    roleDescription:
      'Atendimento em coloproctologia com foco em tratamentos minimamente invasivos.',
    services: CORE_SERVICES,
    relatedTreatmentSlugs: CORE_TREATMENT_SLUGS,
    relatedBlogSlugs: CORE_BLOG_SLUGS,
    faqs: [],
    indexable: false,
    showAppointmentCta: false,
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
