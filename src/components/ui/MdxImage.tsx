import Image from 'next/image'
import type { BlogCardImage } from '@/lib/blog'
import { getEditorialImageDimensions } from '@/lib/editorial-images'

type MdxImageProps = React.ComponentPropsWithoutRef<'img'>

interface EditorialImageProps extends MdxImageProps {
  metadata?: BlogCardImage
}

export function MdxImage({ src, alt, metadata }: EditorialImageProps) {
  if (!src || typeof src !== 'string') return null

  const knownImage = metadata?.src === src ? metadata : undefined
  const dimensions = knownImage ?? getEditorialImageDimensions(src)
  const width = dimensions?.width ?? 1200
  const height = dimensions?.height ?? 800
  const resolvedAlt = knownImage?.alt ?? alt ?? ''

  return (
    <span
      role="group"
      aria-label={knownImage?.caption ? `Imagem: ${knownImage.caption}` : undefined}
      className="my-8 block overflow-hidden rounded-[1.75rem] border border-beige bg-white p-2 shadow-sm"
    >
      <Image
        src={src}
        alt={resolvedAlt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 896px"
        className="h-auto w-full rounded-[1.25rem] object-cover"
      />
      {knownImage?.caption ? (
        <span
          data-editorial-caption
          className="block px-3 pb-2 pt-3 text-sm leading-relaxed text-gray-600"
        >
          {knownImage.caption}
        </span>
      ) : null}
    </span>
  )
}
