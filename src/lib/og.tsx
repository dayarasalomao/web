import fs from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'
import sharp from 'sharp'
import {
  BUSINESS_CLINIC_NAME,
  CRM_FULL,
  RQE_FULL,
  SEO_DOCTOR_NAME,
  SEO_LOCATION,
  SEO_SPECIALTY,
} from '@/constants'

export { isTeachingFigure } from './og-figure.ts'

/**
 * Social preview images (Open Graph / Twitter) use the site's own pictures:
 * a real photo of the doctor for site pages, and the figure the article
 * shows for blog posts. Text-only banners and stock illustrations read as
 * generic in search and chat previews.
 *
 * Sources are WebP; the image renderer only decodes PNG/JPEG, so each one is
 * converted with sharp at build time. Output is PNG, which every chat app
 * (WhatsApp included) previews.
 */
export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

/** Real photos of the doctor, by where they are used. */
export const OG_PHOTOS = {
  default: '/assets/day-clinica-pe.webp',
  about: '/assets/dayara-profissional-vermelho.webp',
  treatment: '/assets/dayara-clinica.webp',
  location: '/assets/dayara-frente-pose.webp',
} as const

const COLORS = { background: '#F4F3F2', ink: '#16323B', accent: '#A35442', muted: '#52666B' }
const PHOTO_WIDTH = 470
const STRIP_HEIGHT = 86

const readPublic = (publicPath: string) => fs.readFile(path.join(process.cwd(), 'public', publicPath))

const toPngDataUri = async (publicPath: string, width: number, height: number, fit: 'cover' | 'contain') => {
  const png = await sharp(await readPublic(publicPath))
    .resize(width, height, { fit, position: 'north', background: COLORS.background })
    .png()
    .toBuffer()
  return `data:image/png;base64,${png.toString('base64')}`
}

interface PhotoCardOptions {
  photo: string
  eyebrow?: string
  /** Page subject; defaults to the doctor's name. */
  title?: string
  subtitle?: string
}

/** Text on the left, a real photo of the doctor on the right. */
export async function renderPhotoCard({
  photo,
  eyebrow = `Atendimento em ${SEO_LOCATION}/MS`,
  title = SEO_DOCTOR_NAME,
  subtitle = `${SEO_SPECIALTY} em ${SEO_LOCATION}`,
}: PhotoCardOptions) {
  const src = await toPngDataUri(photo, PHOTO_WIDTH, OG_SIZE.height, 'cover')
  const isName = title === SEO_DOCTOR_NAME

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: COLORS.background, color: COLORS.ink, fontFamily: 'Arial, sans-serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: OG_SIZE.width - PHOTO_WIDTH, padding: '0 64px 0 72px' }}>
          <div style={{ display: 'flex', color: COLORS.accent, fontSize: 24, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>
            {eyebrow}
          </div>
          <div style={{ display: 'flex', marginTop: 26, fontFamily: 'Georgia, serif', fontSize: title.length > 60 ? 40 : title.length > 34 ? 50 : 62, fontWeight: 700, lineHeight: 1.08 }}>
            {title}
          </div>
          <div style={{ display: 'flex', marginTop: 18, fontSize: 30, fontWeight: 600, lineHeight: 1.25 }}>
            {isName ? subtitle : `${SEO_DOCTOR_NAME} · ${SEO_SPECIALTY}`}
          </div>
          <div style={{ display: 'flex', marginTop: 30, color: COLORS.muted, fontSize: 19, lineHeight: 1.4 }}>
            {BUSINESS_CLINIC_NAME} · {CRM_FULL} · {RQE_FULL}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> only */}
        <img src={src} width={PHOTO_WIDTH} height={OG_SIZE.height} alt="" style={{ objectFit: 'cover' }} />
      </div>
    ),
    OG_SIZE,
  )
}

/** The article's own figure, whole, with a slim strip naming the doctor. */
export async function renderFigureCard(figure: string) {
  const height = OG_SIZE.height - STRIP_HEIGHT
  const src = await toPngDataUri(figure, OG_SIZE.width, height, 'contain')

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: COLORS.background, fontFamily: 'Arial, sans-serif' }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> only */}
        <img src={src} width={OG_SIZE.width} height={height} alt="" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: STRIP_HEIGHT, padding: '0 56px', background: COLORS.ink, color: '#FFFFFF', fontSize: 26 }}>
          <div style={{ display: 'flex', fontFamily: 'Georgia, serif', fontWeight: 700 }}>{SEO_DOCTOR_NAME}</div>
          <div style={{ display: 'flex', opacity: 0.85 }}>{SEO_SPECIALTY} · {SEO_LOCATION}/MS</div>
        </div>
      </div>
    ),
    OG_SIZE,
  )
}
