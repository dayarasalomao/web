import type { Thing, WithContext } from 'schema-dts'
import {
  BUSINESS_ADDRESS,
  BUSINESS_ALTERNATE_NAME,
  BUSINESS_CURRENCY,
  BUSINESS_DESCRIPTION,
  BUSINESS_EMAIL,
  BUSINESS_GEO,
  BUSINESS_HOURS,
  BUSINESS_NAME,
  BUSINESS_PAYMENT,
  BUSINESS_PHONE,
  BUSINESS_SPECIALTY,
  CFM_REGISTRY_URL,
  CONTACT_SOCIAL_MEDIA,
  CRM_FULL,
  CRM_STATE,
  DOCTORALIA_URL,
  GOOGLE_MAPS_URL,
  MEDICAL_PROCEDURES,
  PHYSICIAN_DATA,
  RQE_FULL,
  SEO_DESCRIPTION,
  SEO_IMAGE,
  SITE_URL,
} from '@/constants'
import type { BlogPost } from './blog'
import { buildCanonical } from './seo'
import type { Treatment } from './treatments'
import type { PracticeLocation } from './locations'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface ItemListEntry {
  name: string
  href: string
}

function toAbsoluteUrl(value: string): string {
  if (!value) return value
  if (value.startsWith('http://') || value.startsWith('https://')) return value
  return buildCanonical(value)
}

function sanitizeSameAs(values: Array<string | undefined>): string[] {
  return values.filter((value): value is string => Boolean(value))
}

export function serializeJsonLd(data: WithContext<Thing> | Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export interface FaqEntry {
  question: string
  answer: string
}

// FAQPage must mirror FAQ content that is visibly rendered on the page.
export function buildFaqGraph(faqs: FaqEntry[]): Thing {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
    // TODO: drop this cast by typing the graph nodes with schema-dts
    // generics instead of asserting, as the other builders in this file do.
  } as Thing
}

export function buildBreadcrumbGraph(items: BreadcrumbItem[]): Thing {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: toAbsoluteUrl(item.href) } : {}),
    })),
  } as Thing
}

export function buildItemListGraph(name: string, items: ItemListEntry[]): Thing {
  return {
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: toAbsoluteUrl(item.href),
    })),
  } as Thing
}

export function buildGlobalGraph(): Record<string, unknown> {
  const organizationId = `${SITE_URL}#organization`
  const physicianId = `${SITE_URL}#physician`
  const websiteId = `${SITE_URL}#website`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalOrganization',
        '@id': organizationId,
        name: BUSINESS_NAME,
        alternateName: BUSINESS_ALTERNATE_NAME,
        description: BUSINESS_DESCRIPTION,
        url: SITE_URL,
        logo: toAbsoluteUrl(SEO_IMAGE),
        image: toAbsoluteUrl(SEO_IMAGE),
        telephone: BUSINESS_PHONE,
        email: BUSINESS_EMAIL,
        medicalSpecialty: BUSINESS_SPECIALTY,
        address: {
          '@type': 'PostalAddress',
          streetAddress: BUSINESS_ADDRESS.streetAddress,
          addressLocality: BUSINESS_ADDRESS.addressLocality,
          addressRegion: BUSINESS_ADDRESS.addressRegion,
          postalCode: BUSINESS_ADDRESS.postalCode,
          addressCountry: BUSINESS_ADDRESS.addressCountry,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: BUSINESS_GEO.latitude,
          longitude: BUSINESS_GEO.longitude,
        },
        openingHours: BUSINESS_HOURS,
        paymentAccepted: BUSINESS_PAYMENT,
        currenciesAccepted: BUSINESS_CURRENCY,
        areaServed: {
          '@type': 'City',
          name: BUSINESS_ADDRESS.addressLocality,
        },
        sameAs: sanitizeSameAs([
          CONTACT_SOCIAL_MEDIA.instagram,
          CONTACT_SOCIAL_MEDIA.facebook,
          GOOGLE_MAPS_URL || undefined,
        ]),
        physician: {
          '@id': physicianId,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Tratamentos de Coloproctologia',
          itemListElement: MEDICAL_PROCEDURES.map((procedure) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'MedicalProcedure',
              name: procedure,
            },
          })),
        },
      },
      {
        '@type': 'Physician',
        '@id': physicianId,
        name: PHYSICIAN_DATA.name,
        description: SEO_DESCRIPTION,
        medicalSpecialty: BUSINESS_SPECIALTY,
        url: SITE_URL,
        image: toAbsoluteUrl(SEO_IMAGE),
        worksFor: {
          '@id': organizationId,
        },
        memberOf: {
          '@type': 'MedicalOrganization',
          name: PHYSICIAN_DATA.clinic,
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: PHYSICIAN_DATA.university,
        },
        sameAs: sanitizeSameAs([
          CONTACT_SOCIAL_MEDIA.instagram,
          CONTACT_SOCIAL_MEDIA.facebook,
          DOCTORALIA_URL || undefined,
          GOOGLE_MAPS_URL || undefined,
          CFM_REGISTRY_URL,
        ]),
        areaServed: {
          '@type': 'City',
          name: BUSINESS_ADDRESS.addressLocality,
        },
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'Registro Profissional',
            identifier: CRM_FULL,
            name: CRM_FULL,
            recognizedBy: {
              '@type': 'Organization',
              name: `Conselho Regional de Medicina do ${CRM_STATE}`,
              alternateName: `CRM-${CRM_STATE}`,
              url: CFM_REGISTRY_URL,
            },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'Qualificação de Especialista',
            identifier: RQE_FULL,
            name: RQE_FULL,
            recognizedBy: {
              '@type': 'Organization',
              name: `Conselho Regional de Medicina do ${CRM_STATE}`,
              alternateName: `CRM-${CRM_STATE}`,
              url: CFM_REGISTRY_URL,
            },
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: SITE_URL,
        name: BUSINESS_NAME,
        description: BUSINESS_DESCRIPTION,
        inLanguage: 'pt-BR',
        publisher: {
          '@id': organizationId,
        },
      },
    ],
  }
}

export function buildBlogPostGraph(post: BlogPost): Record<string, unknown> {
  const postUrl = buildCanonical(`/blog/${post.slug}`)
  const pageId = `${postUrl}#webpage`
  const articleId = `${postUrl}#article`
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Início', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title },
  ]

  const graph: Thing[] = [
    {
      '@type': 'MedicalWebPage',
      '@id': pageId,
      name: post.title,
      description: post.metaDescription,
      url: postUrl,
      inLanguage: 'pt-BR',
      isPartOf: {
        '@id': `${SITE_URL}#website`,
      },
      about: {
        '@id': articleId,
      },
    } as Thing,
    {
      '@type': 'Article',
      '@id': articleId,
      headline: post.title,
      description: post.metaDescription,
      url: postUrl,
      datePublished: post.publishDate,
      dateModified: post.lastModified,
      author: {
        '@id': `${SITE_URL}#physician`,
      },
      publisher: {
        '@id': `${SITE_URL}#organization`,
      },
      image: toAbsoluteUrl(post.cardImage?.src || SEO_IMAGE),
      keywords: [post.primaryKeyword, ...post.secondaryKeywords],
      mainEntityOfPage: {
        '@id': pageId,
      },
    } as Thing,
    buildBreadcrumbGraph(breadcrumbItems),
  ]

  if (post.faqs?.length) {
    graph.push(buildFaqGraph(post.faqs))
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

export function buildTreatmentGraph(treatment: Treatment): Record<string, unknown> {
  const treatmentUrl = buildCanonical(`/tratamentos/${treatment.slug}`)
  const pageId = `${treatmentUrl}#webpage`
  const procedureId = `${treatmentUrl}#procedure`

  const graph: Thing[] = [
    {
      '@type': 'MedicalWebPage',
      '@id': pageId,
      name: treatment.title,
      description: treatment.metaDescription,
      url: treatmentUrl,
      inLanguage: 'pt-BR',
      isPartOf: {
        '@id': `${SITE_URL}#website`,
      },
      about: {
        '@id': procedureId,
      },
    } as Thing,
    {
      '@type': 'MedicalProcedure',
      '@id': procedureId,
      name: treatment.title,
      description: treatment.summary,
      url: treatmentUrl,
      procedureType: treatment.shortTitle,
      bodyLocation: 'Região anal e perianal',
      followup: treatment.carePath.join(' '),
      indication: treatment.indications.join(' '),
      howPerformed: treatment.overview.join(' '),
      mainEntityOfPage: {
        '@id': pageId,
      },
      performer: {
        '@id': `${SITE_URL}#physician`,
      },
    } as Thing,
    buildBreadcrumbGraph([
      { label: 'Início', href: '/' },
      { label: 'Tratamentos', href: '/tratamentos' },
      { label: treatment.title },
    ]),
  ]

  if (treatment.faqs?.length) {
    graph.push(buildFaqGraph(treatment.faqs))
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

export function buildLocationGraph(
  location: PracticeLocation,
): Record<string, unknown> | null {
  if (!location.address) return null

  const locationUrl = buildCanonical(`/locais-de-atendimento/${location.slug}`)
  const placeId = `${locationUrl}#practice-location`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalClinic',
        '@id': placeId,
        name: location.name,
        url: locationUrl,
        ...(location.phone || location.clinicPhone
          ? { telephone: location.phone ?? location.clinicPhone }
          : {}),
        address: {
          '@type': 'PostalAddress',
          streetAddress: [
            location.address.streetAddress,
            location.address.addressDetail,
          ]
            .filter(Boolean)
            .join(', '),
          addressLocality: location.address.addressLocality,
          addressRegion: location.address.addressRegion,
          postalCode: location.address.postalCode,
          addressCountry: location.address.addressCountry,
        },
        ...(location.geo
          ? {
              geo: {
                '@type': 'GeoCoordinates',
                latitude: location.geo.latitude,
                longitude: location.geo.longitude,
              },
            }
          : {}),
        ...(location.mapsUrl ? { sameAs: [location.mapsUrl] } : {}),
        ...(location.openingHours
          ? { openingHours: location.openingHours.schema }
          : {}),
      },
      {
        '@type': 'Physician',
        '@id': `${SITE_URL}#physician`,
        workLocation: {
          '@id': placeId,
        },
      },
      buildBreadcrumbGraph([
        { label: 'Início', href: '/' },
        { label: 'Locais de atendimento', href: '/locais-de-atendimento' },
        { label: location.city },
      ]),
      ...(location.faqs.length ? [buildFaqGraph(location.faqs)] : []),
    ],
  }
}
