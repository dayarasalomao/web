import { ImageResponse } from 'next/og'
import {
  BUSINESS_CLINIC_NAME,
  CRM_FULL,
  RQE_FULL,
  SEO_DOCTOR_NAME,
  SEO_LOCATION,
  SEO_SPECIALTY,
} from '@/constants'

export const alt = `${SEO_DOCTOR_NAME} — ${SEO_SPECIALTY} em ${SEO_LOCATION}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#F4F3F2',
          color: '#16323B',
          fontFamily: 'Arial, sans-serif',
          padding: '72px 78px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 410,
            height: 410,
            borderRadius: 999,
            right: -80,
            top: -110,
            background: '#D7CBBF',
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 310,
            height: 310,
            borderRadius: 999,
            right: 95,
            bottom: -125,
            background: '#A35442',
            opacity: 0.92,
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', width: 825 }}>
          <div
            style={{
              display: 'flex',
              color: '#A35442',
              fontSize: 25,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}
          >
            Atendimento em {SEO_LOCATION}/MS
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontFamily: 'Georgia, serif',
              fontSize: 71,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            {SEO_DOCTOR_NAME}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 18,
              fontSize: 38,
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            {SEO_SPECIALTY} em {SEO_LOCATION}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 34,
              color: '#52666B',
              fontSize: 25,
              lineHeight: 1.4,
            }}
          >
            {BUSINESS_CLINIC_NAME} · {CRM_FULL} · {RQE_FULL}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            right: 92,
            top: 192,
            width: 178,
            height: 178,
            borderRadius: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid rgba(255,255,255,.7)',
            background: '#1D414C',
            color: '#FFFFFF',
            fontFamily: 'Georgia, serif',
            fontSize: 65,
            fontWeight: 700,
          }}
        >
          DS
        </div>
      </div>
    ),
    size,
  )
}
