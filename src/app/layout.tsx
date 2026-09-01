import type { Metadata } from 'next'
import Script from 'next/script'
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
  SEO_LOCATION,
  SEO_SPECIALTY,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_EMAIL,
  BUSINESS_ADDRESS,
  TWITTER_HANDLE,
  CRM_FULL,
  RQE_FULL,
  MEDICAL_PROCEDURES,
} from '@/constants'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleTagManager } from '@next/third-parties/google'
import { GOOGLE_TAG_ID, ANALYTICS_ENABLED } from '@/constants'
import { buildGlobalGraph, serializeJsonLd } from '@/lib/structured-data'
import { DEFAULT_ROBOTS } from '@/lib/seo'
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton'

const montserrat = Montserrat({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  applicationName: BUSINESS_NAME,
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  category: 'health',
  classification: 'Medical business website',
  authors: [{ name: SEO_DOCTOR_NAME, url: SITE_URL }],
  creator: SEO_DOCTOR_NAME,
  publisher: SEO_DOCTOR_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  robots: DEFAULT_ROBOTS,
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
    creator: TWITTER_HANDLE,
  },
  other: {
    'contact:email': BUSINESS_EMAIL,
    'contact:phone_number': BUSINESS_PHONE,
    'contact:postal_address': `${BUSINESS_ADDRESS.streetAddress}, ${BUSINESS_ADDRESS.addressLocality}, ${BUSINESS_ADDRESS.addressRegion}`,
    'business:contact_data:locality': BUSINESS_ADDRESS.addressLocality,
    'business:contact_data:region': BUSINESS_ADDRESS.addressRegion,
    'business:contact_data:country_name': 'Brasil',
    'medical:specialty': SEO_SPECIALTY,
    'medical:service_area': SEO_LOCATION,
    'medical:credentials': `${CRM_FULL}, ${RQE_FULL}`,
    'medical:procedures': MEDICAL_PROCEDURES.join(', '),
    'article:author': SEO_DOCTOR_NAME,
  },
}

const jsonLd = buildGlobalGraph()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <head>
        {/*
          Dev-only inspector. It must not run `beforeInteractive`: react-grab
          decorates same-origin iframes (the location map), and doing that
          before React hydrates produces an unrecoverable hydration mismatch.
          Loading it after hydration keeps the tool without corrupting the tree.
        */}
        {process.env.NODE_ENV === 'development' && (
          <Script
            src="https://unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://va.vercel-scripts.com" />
        <link rel="llms" href="/llms.txt" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
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
        <FloatingWhatsAppButton />

        {/* Analytics - Only load in production or debug mode */}
        {ANALYTICS_ENABLED &&
          GOOGLE_TAG_ID &&
          GOOGLE_TAG_ID.startsWith('GTM-') && (
            <GoogleTagManager gtmId={GOOGLE_TAG_ID} />
          )}

        {/* Vercel Analytics */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
