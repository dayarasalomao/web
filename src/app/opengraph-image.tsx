import { SEO_IMAGE_ALT } from '@/constants'
import { OG_CONTENT_TYPE, OG_PHOTOS, OG_SIZE, renderPhotoCard } from '@/lib/og'

export const alt = SEO_IMAGE_ALT
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function OpenGraphImage() {
  return renderPhotoCard({ photo: OG_PHOTOS.default })
}
