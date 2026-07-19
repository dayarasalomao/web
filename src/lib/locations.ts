// =================================================================
// PRACTICE LOCATION MODEL
// =================================================================
// Single source of truth for where Dra. Dayara Salomão attends.
// The ACTIVE location derives from src/constants.ts (single source of
// truth, safe to index). Non-active locations (historical or planned)
// hardcode their own frozen facts, since constants.ts no longer
// describes them.
//
// See `.specs/features/campo-grande-seo-migration/design.md` and
// `.specs/features/campo-grande-launch-growth/spec.md`.
// =================================================================

import {
  BUSINESS_CLINIC_NAME,
  BUSINESS_STREET,
  BUSINESS_STREET_NUMBER,
  BUSINESS_UNIT,
  BUSINESS_NEIGHBORHOOD,
  BUSINESS_ADDRESS_LOCALITY,
  BUSINESS_ADDRESS_REGION,
  BUSINESS_ADDRESS_REGION_CODE,
  BUSINESS_POSTAL_CODE,
  BUSINESS_GEO,
  BUSINESS_TELEPHONE_NUMBER,
  BUSINESS_HOURS,
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

// Core coloproctology services offered at the active location. Colonoscopy
// is intentionally excluded: the doctor confirmed it will not be offered by
// her at Campo Grande.
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
  // ACTIVE — Campo Grande/MS. Cutover completed 2026-07-19. Address,
  // room, clinic phone, booking WhatsApp, weekday hours, geo and map
  // are confirmed and now drive src/constants.ts directly.
  // ---------------------------------------------------------------
  {
    slug: 'campo-grande',
    name: BUSINESS_CLINIC_NAME,
    status: 'active',
    city: BUSINESS_ADDRESS_LOCALITY,
    state: BUSINESS_ADDRESS_REGION,
    stateCode: BUSINESS_ADDRESS_REGION_CODE,
    address: {
      streetAddress: `${BUSINESS_STREET}, ${BUSINESS_STREET_NUMBER}`,
      addressDetail: BUSINESS_UNIT,
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
    // Keep the clinic phone separate from the doctor's appointment contact
    // until the clinic confirms that it books directly for her.
    // TODO(campo-grande): record a dedicated doctor phone if one is provided.
    clinicPhone: BUSINESS_TELEPHONE_NUMBER,
    whatsappUrl: WHATSAPP_URL,
    openingHours: {
      label: 'Segunda a sexta, das 9h às 18h',
      opens: '09:00',
      closes: '18:00',
      schema: BUSINESS_HOURS,
    },
    mapsUrl: GOOGLE_MAPS_URL,
    roleDescription:
      'Atendimento em coloproctologia com foco em tratamentos minimamente invasivos.',
    services: CORE_SERVICES,
    relatedTreatmentSlugs: CORE_TREATMENT_SLUGS,
    relatedBlogSlugs: CORE_BLOG_SLUGS,
    faqs: [
      {
        question: 'Quando a Dra. Dayara Salomão começou a atender em Campo Grande?',
        answer:
          'O atendimento no Instituto do Aparelho Digestivo, em Campo Grande/MS, começou em 5 de agosto de 2026.',
      },
      {
        question: 'Onde fica o consultório em Campo Grande?',
        answer:
          'No Instituto do Aparelho Digestivo, na R. Alagoas, 700, Sala 8, Jardim dos Estados, Campo Grande/MS, CEP 79020-120.',
      },
      {
        question: 'Como agendar consulta em Campo Grande?',
        answer:
          'O WhatsApp de agendamento é o mesmo já utilizado no site. O telefone geral do Instituto do Aparelho Digestivo é (67) 3320-9500.',
      },
      {
        question: 'Qual é o horário de atendimento em Campo Grande?',
        answer: 'O atendimento da Dra. Dayara é de segunda a sexta, das 9h às 18h.',
      },
      {
        question: 'Quais condições são atendidas em Campo Grande?',
        answer:
          'Consultas e tratamentos em coloproctologia, como doença hemorroidária, fissura anal, fístula anal, cisto pilonidal e HPV perianal, com avaliação individual de cada caso. A colonoscopia não é realizada pela Dra. Dayara nesse local.',
      },
    ],
    indexable: true,
    showAppointmentCta: true,
    launchDate: '2026-08-05',
    lastUpdated: '2026-07-19',
  },

  // ---------------------------------------------------------------
  // HISTORICAL — Curitiba/PR. Active practice location until the
  // 2026-07-19 cutover to Campo Grande/MS. Facts frozen at the time
  // of the move; this address is no longer bookable. Kept for
  // truthful record only — noindex, no appointment CTA, no active
  // local schema. See src/app/locais-de-atendimento/[slug]/page.tsx
  // for the historical-branch rendering.
  // ---------------------------------------------------------------
  {
    slug: 'curitiba',
    name: 'Eco Medical Center',
    status: 'historical',
    city: 'Curitiba',
    state: 'Paraná',
    stateCode: 'PR',
    address: {
      streetAddress: 'Rua Goiás, 70',
      addressDetail: '3º andar',
      neighborhood: 'Água Verde',
      addressLocality: 'Curitiba',
      addressRegion: 'Paraná',
      postalCode: '80620-060',
      addressCountry: 'BR',
    },
    geo: {
      latitude: -25.4646652,
      longitude: -49.2905794,
    },
    phone: '(41) 3123-6550',
    mapsUrl: 'https://maps.app.goo.gl/8pzUEGq1YnVFmsf4A',
    roleDescription:
      'Atendimento em coloproctologia realizado neste endereço até a mudança para Campo Grande/MS.',
    services: [],
    relatedTreatmentSlugs: [],
    relatedBlogSlugs: [],
    faqs: [],
    indexable: false,
    showAppointmentCta: false,
    lastUpdated: '2026-07-19',
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

// launchDate is a plain ISO date; format in UTC so the announced day never
// shifts with the server timezone.
const LAUNCH_DATE_LONG_FORMAT = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

export function formatLaunchDateLong(isoDate: string): string {
  return LAUNCH_DATE_LONG_FORMAT.format(new Date(`${isoDate}T00:00:00Z`))
}

const LAUNCH_DATE_SHORT_FORMAT = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'UTC',
})

export function formatLaunchDateShort(isoDate: string): string {
  return LAUNCH_DATE_SHORT_FORMAT.format(new Date(`${isoDate}T00:00:00Z`))
}

export function getActiveLocations(): PracticeLocation[] {
  return LOCATIONS.filter((location) => location.status === 'active')
}
