import { SEO_DOCTOR_NAME } from '@/constants'

interface MedicalSignatureProps {
  disclaimer?: string
}

const DEFAULT_DISCLAIMER =
  'Este artigo não substitui consulta médica. Em caso de sintomas persistentes, procure avaliação presencial.'

export function MedicalSignature({ disclaimer }: MedicalSignatureProps) {
  return (
    <figure className="m-0">
      <blockquote className="m-0 text-sm leading-relaxed text-gray-600">
        Conteúdo elaborado com finalidade educativa por{' '}
        <strong className="font-semibold text-teal">{SEO_DOCTOR_NAME}</strong>,
        coloproctologista.
      </blockquote>
      <figcaption className="mt-2 text-sm leading-relaxed text-gray-500">
        {disclaimer ?? DEFAULT_DISCLAIMER}
      </figcaption>
    </figure>
  )
}
