import { SEO_DOCTOR_NAME, SEO_LOCATION } from '@/constants'
import { OG_CONTENT_TYPE, OG_PHOTOS, OG_SIZE, renderPhotoCard } from '@/lib/og'
import { getAllTreatmentSlugs, getTreatmentBySlug } from '@/lib/treatments'

export const alt = `Tratamento com a ${SEO_DOCTOR_NAME}`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return getAllTreatmentSlugs().map((slug) => ({ slug }))
}

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const treatment = getTreatmentBySlug((await params).slug)
  return renderPhotoCard({
    photo: OG_PHOTOS.treatment,
    eyebrow: `Tratamento em ${SEO_LOCATION}/MS`,
    ...(treatment ? { title: treatment.shortTitle } : {}),
  })
}
