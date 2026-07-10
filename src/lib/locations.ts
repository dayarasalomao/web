// =================================================================
// PRACTICE LOCATION MODEL
// =================================================================
// Single source of truth for where Dra. Dayara Salomão attends.
// Separates factual ACTIVE practice data (safe to index) from a
// PLANNED target market (Campo Grande/MS) that must NOT emit active
// NAP, geo, schema, sitemap entries, or appointment CTAs until the
// real facts are confirmed by the client.
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
  lastUpdated: string
}

// Core coloproctology services offered — reused for both the active and
// (assumed-same) planned location until the client confirms otherwise.
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
  // Kept indexable:false with NO active NAP/geo/maps/CTA until the
  // facts below are confirmed. DO NOT flip to 'active' until then.
  // ---------------------------------------------------------------
  {
    slug: 'campo-grande',
    name: 'Campo Grande', // TODO(campo-grande): replace with confirmed clinic name.
    status: 'planned',
    city: 'Campo Grande',
    state: 'Mato Grosso do Sul',
    stateCode: 'MS',
    // TODO(campo-grande): add confirmed `address` (rua, número, bairro, CEP).
    // TODO(campo-grande): add confirmed `geo` (latitude/longitude).
    // TODO(campo-grande): add confirmed `phone` (DDD 67) and `whatsappUrl`.
    // TODO(campo-grande): add confirmed `mapsUrl` (Google Maps place link).
    roleDescription:
      'Atendimento em coloproctologia com foco em tratamentos minimamente invasivos.',
    services: CORE_SERVICES,
    relatedTreatmentSlugs: CORE_TREATMENT_SLUGS,
    relatedBlogSlugs: CORE_BLOG_SLUGS,
    faqs: [],
    indexable: false,
    showAppointmentCta: false,
    lastUpdated: '2026-07-10',
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
// indexable, and has a confirmed postal address. Planned locations without
// an address never leak into metadata, schema, or the sitemap.
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
