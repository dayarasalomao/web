import type { Metadata } from 'next'
import { Montserrat, Cinzel } from 'next/font/google'
import './globals.css'
import {
  SITE_URL,
  SEO_TITLE,
  SEO_DESCRIPTION,
  SEO_KEYWORDS,
  SEO_DOCTOR_NAME,
  SEO_OG_DESCRIPTION,
  SEO_TWITTER_DESCRIPTION,
  SEO_IMAGE,
  SEO_IMAGE_ALT,
  BUSINESS_NAME,
  BUSINESS_ALTERNATE_NAME,
  BUSINESS_DESCRIPTION,
  BUSINESS_SPECIALTY,
  BUSINESS_PHONE,
  BUSINESS_EMAIL,
  BUSINESS_ADDRESS,
  BUSINESS_GEO,
  BUSINESS_HOURS,
  BUSINESS_PAYMENT,
  BUSINESS_CURRENCY,
  PHYSICIAN_DATA,
  MEDICAL_PROCEDURES,
  BUSINESS_RATING,
} from '@/constants'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { GA_ID, GOOGLE_TAG_ID, ANALYTICS_ENABLED, GOOGLE_SITE_VERIFICATION } from '@/constants'

const montserrat = Montserrat({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: SEO_DOCTOR_NAME, url: SITE_URL }],
  creator: SEO_DOCTOR_NAME,
  publisher: SEO_DOCTOR_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    title: SEO_TITLE,
    description: SEO_OG_DESCRIPTION,
    images: [
      {
        url: SEO_IMAGE,
        width: 1200,
        height: 630,
        alt: SEO_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_TITLE,
    description: SEO_TWITTER_DESCRIPTION,
    images: [SEO_IMAGE],
    creator: '@dradayarasalomao',
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
  other: {
    'contact:email': BUSINESS_EMAIL,
    'contact:phone_number': BUSINESS_PHONE,
    'contact:postal_address': `${BUSINESS_ADDRESS.streetAddress}, ${BUSINESS_ADDRESS.addressLocality}, ${BUSINESS_ADDRESS.addressRegion}`,
    'business:contact_data:locality': BUSINESS_ADDRESS.addressLocality,
    'business:contact_data:region': BUSINESS_ADDRESS.addressRegion,
    'business:contact_data:country_name': 'Brasil',
    'article:author': SEO_DOCTOR_NAME,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: BUSINESS_NAME,
  alternateName: BUSINESS_ALTERNATE_NAME,
  description: BUSINESS_DESCRIPTION,
  url: SITE_URL,
  telephone: BUSINESS_PHONE,
  email: BUSINESS_EMAIL,
  medicalSpecialty: BUSINESS_SPECIALTY,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS_ADDRESS.streetAddress,
    addressLocality: BUSINESS_ADDRESS.addressLocality,
    addressRegion: BUSINESS_ADDRESS.addressRegion,
    addressCountry: BUSINESS_ADDRESS.addressCountry,
    postalCode: BUSINESS_ADDRESS.postalCode,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS_GEO.latitude,
    longitude: BUSINESS_GEO.longitude,
  },
  openingHours: BUSINESS_HOURS,
  paymentAccepted: BUSINESS_PAYMENT,
  currenciesAccepted: BUSINESS_CURRENCY,
  physician: {
    '@type': 'Physician',
    name: PHYSICIAN_DATA.name,
    medicalSpecialty: PHYSICIAN_DATA.medicalSpecialty,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: PHYSICIAN_DATA.university,
    },
    memberOf: {
      '@type': 'MedicalOrganization',
      name: PHYSICIAN_DATA.clinic,
    },
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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: BUSINESS_RATING.ratingValue,
    reviewCount: BUSINESS_RATING.reviewCount,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://va.vercel-scripts.com" />

        {/* Preload LCP image */}
        <link
          rel="preload"
          as="image"
          href="/assets/dayara-profissional-vermelho.webp"
          type="image/webp"
          // @ts-expect-error - fetchpriority is a valid HTML attribute
          fetchpriority="high"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${montserrat.variable} ${cinzel.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-copper focus:text-white focus:top-0 focus:left-0"
        >
          Pular para o conteúdo principal
        </a>
        {children}

        {/* Analytics - Only load in production or debug mode */}
        {ANALYTICS_ENABLED && (
          <>
            {/* Google Analytics 4 */}
            {GA_ID && <GoogleAnalytics gaId={GA_ID} />}

            {/* Google Tag Manager - Note: GT-PBKK48QK is a Google Tag, not GTM container */}
            {GOOGLE_TAG_ID && GOOGLE_TAG_ID.startsWith('GTM-') && (
              <GoogleTagManager gtmId={GOOGLE_TAG_ID} />
            )}
          </>
        )}

        {/* Vercel Analytics */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
