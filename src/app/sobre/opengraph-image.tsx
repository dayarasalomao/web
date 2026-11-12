import { SEO_DOCTOR_NAME } from '@/constants'
import { OG_CONTENT_TYPE, OG_PHOTOS, OG_SIZE, renderPhotoCard } from '@/lib/og'

export const alt = `Retrato profissional da ${SEO_DOCTOR_NAME}`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function OpenGraphImage() {
  return renderPhotoCard({ photo: OG_PHOTOS.about, eyebrow: 'Sobre a médica' })
}
