import Image from 'next/image'

type MdxImageProps = React.ComponentPropsWithoutRef<'img'>

export function MdxImage({ src, alt }: MdxImageProps) {
  if (!src || typeof src !== 'string') return null

  return (
    <span className="my-8 block overflow-hidden rounded-[1.75rem] border border-beige bg-white p-2 shadow-sm">
      <Image
        src={src}
        alt={alt || ''}
        width={1200}
        height={800}
        sizes="(max-width: 768px) 100vw, 896px"
        className="h-auto w-full rounded-[1.25rem] object-cover"
      />
    </span>
  )
}
