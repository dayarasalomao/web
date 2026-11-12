import { SEO_DOCTOR_NAME } from '@/constants'
import { OG_CONTENT_TYPE, OG_PHOTOS, OG_SIZE, renderPhotoCard } from '@/lib/og'
import { getAllLocations, getLocationBySlug } from '@/lib/locations'

export const alt = `${SEO_DOCTOR_NAME} — local de atendimento`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return getAllLocations().map((location) => ({ slug: location.slug }))
}

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const location = getLocationBySlug((await params).slug)
  return renderPhotoCard({
    photo: OG_PHOTOS.location,
    ...(location ? { eyebrow: `Atendimento em ${location.city}/${location.stateCode}` } : {}),
  })
}
