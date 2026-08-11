import { SEO_DOCTOR_NAME } from '@/constants'
import Link from 'next/link'

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
        <Link href="/sobre" className="font-semibold text-teal underline decoration-teal/30 underline-offset-2 hover:text-copper">
          {SEO_DOCTOR_NAME}
        </Link>
        , coloproctologista.
      </blockquote>
      <figcaption className="mt-2 text-sm leading-relaxed text-gray-500">
        {disclaimer ?? DEFAULT_DISCLAIMER}
      </figcaption>
    </figure>
  )
}
