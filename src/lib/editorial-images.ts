export interface EditorialImageDimensions {
  width: number
  height: number
}

/**
 * Intrinsic dimensions for every image currently embedded in blog Markdown.
 * Keeping this list explicit lets next/image reserve the correct aspect ratio
 * even when an image is not the article's primary frontmatter image.
 */
export const EDITORIAL_IMAGE_DIMENSIONS = {
  '/assets/blog/abscesso-anal-drenagem-evolucao-fistula.webp': {
    width: 1024,
    height: 572,
  },
  '/assets/blog/cisto-pilonidal-convencional-x-laser-silac.webp': {
    width: 1600,
    height: 893,
  },
  '/assets/blog/cisto-pilonidal-tecnica-retalho.webp': {
    width: 1600,
    height: 873,
  },
  '/assets/blog/comparativo-instrumentos-cirurgicos.webp': {
    width: 1024,
    height: 682,
  },
  '/assets/blog/comparativo-tecnologias-cirurgia-proctologica.webp': {
    width: 1600,
    height: 893,
  },
  '/assets/blog/fistula-anal-etapas-formacao.webp': {
    width: 1376,
    height: 768,
  },
  '/assets/blog/hemorroida-x-plicoma-anal.webp': {
    width: 1600,
    height: 893,
  },
  '/assets/blog/instrumentos-eletrocauterio-laser-diodo-co2.webp': {
    width: 1600,
    height: 873,
  },
  '/assets/blog/plicoma-anal-ilustracao.webp': {
    width: 1600,
    height: 873,
  },
  '/assets/blog/plicoma-x-hpv-perianal.webp': {
    width: 1600,
    height: 873,
  },
  '/assets/blog/pos-operatorio-hemorroidas-comparativo.webp': {
    width: 1376,
    height: 768,
  },
} as const satisfies Readonly<Record<string, EditorialImageDimensions>>

export function getEditorialImageDimensions(
  src: string,
): EditorialImageDimensions | undefined {
  return EDITORIAL_IMAGE_DIMENSIONS[src as keyof typeof EDITORIAL_IMAGE_DIMENSIONS]
}
