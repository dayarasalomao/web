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
    width: 1024,
    height: 558,
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
  '/assets/blog/laser-co2-instrumento.webp': { width: 1024, height: 559 },
  '/assets/blog/hemorroidoplastia-laser-diodo.webp': { width: 1024, height: 844 },
  '/assets/blog/ligadura-elastica-etapas.webp': { width: 1024, height: 572 },
  '/assets/blog/laser-co2-regiao-perianal.webp': { width: 1024, height: 572 },
  '/assets/blog/prurido-anal-desconforto.webp': { width: 1024, height: 559 },
  '/assets/blog/fissura-anal-anatomia.webp': { width: 1024, height: 559 },
  '/assets/blog/pomadas-hemorroidas.webp': { width: 1024, height: 572 },
  '/assets/blog/hemorroida-externa-trombosada.webp': { width: 1024, height: 550 },
  '/assets/blog/trombectomia-hemorroidaria-ilustracao.webp': { width: 1024, height: 550 },
  '/assets/blog/capa-como-encontrar-coloproctologista-campo-grande-ms.webp': { width: 1672, height: 941 },
  '/assets/blog/capa-hemorroida-tem-cura-ou-passa-sozinha.webp': { width: 1672, height: 941 },
  '/assets/blog/capa-ligadura-elastica-doi-recuperacao-cuidados.webp': { width: 1672, height: 940 },
  '/assets/blog/capa-primeira-consulta-coloproctologista-como-se-preparar.webp': { width: 1672, height: 941 },
  '/assets/blog/capa-cisto-pilonidal-sinais-diagnostico.webp': { width: 1672, height: 941 },
  '/assets/blog/capa-hpv-anal-identificar-tratar.webp': { width: 1672, height: 941 },
  '/assets/blog/capa-fistula-anal-o-que-e-sintomas.webp': { width: 1672, height: 941 },
  '/assets/blog/capa-doenca-hemorroidaria-sintomas-graus.webp': { width: 1672, height: 941 },
  '/assets/blog/capa-doencas-inflamatorias-intestinais-crohn-retocolite.webp': { width: 1672, height: 941 },
  '/assets/blog/capa-historico-crohn-retocolite-familia-acompanhamento-coloproctologista.webp': { width: 1672, height: 941 },
  '/assets/blog/capa-hidradenite-supurativa-sintomas-tratamento.webp': { width: 1672, height: 941 },
  '/assets/blog/capa-sindrome-intestino-irritavel-sintomas-manejo.webp': { width: 1672, height: 941 },
  '/assets/blog/capa-diarreia-cronica-causas-sinais-alerta.webp': { width: 1672, height: 941 },
  '/assets/blog/capa-constipacao-intestinal-quando-investigar.webp': { width: 1672, height: 941 },
  '/assets/blog/capa-alteracoes-habito-intestinal-quando-avaliar.webp': { width: 1672, height: 941 },
  '/assets/blog/capa-plicoma-anal-laser-co2.webp': { width: 1672, height: 941 },
  '/assets/blog/capa-fistula-anal-laser-vaaft-filac.webp': { width: 1672, height: 941 },
  '/assets/blog/capa-toxina-botulinica-fissura-anal.webp': { width: 1672, height: 941 },
  '/assets/blog/capa-lesoes-verrugas-nodulos-regiao-anal-o-que-observar.webp': { width: 1672, height: 941 },
  '/assets/blog/capa-cisto-pilonidal-laser-epsit.webp': { width: 1672, height: 941 },
  '/assets/blog/capa-hemorroidectomia-laser-co2.webp': { width: 1672, height: 941 },
  '/assets/blog/capa-dor-ao-evacuar-quando-investigar.webp': { width: 1672, height: 941 },
  '/assets/blog/capa-sangramento-anal-dor-quando-procurar-coloproctologista-v2.webp': { width: 1671, height: 941 },
} as const satisfies Readonly<Record<string, EditorialImageDimensions>>

export function getEditorialImageDimensions(
  src: string,
): EditorialImageDimensions | undefined {
  return EDITORIAL_IMAGE_DIMENSIONS[src as keyof typeof EDITORIAL_IMAGE_DIMENSIONS]
}
