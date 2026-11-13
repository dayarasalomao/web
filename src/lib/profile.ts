export interface ProfessionalQualification {
  /** Visible category. Residência, pós-graduação and a short course are not equivalent. */
  kindLabel: string
  title: string
  institution: string
  year: string
  description: string
}

export const PROFESSIONAL_QUALIFICATIONS: ProfessionalQualification[] = [
  {
    kindLabel: 'Graduação',
    title: 'Formação Médica',
    institution: 'Pontifícia Universidade Católica do Paraná (PUC-PR)',
    year: '2019',
    description: 'Graduação em Medicina.',
  },
  {
    kindLabel: 'Residência médica',
    title: 'Residência em Cirurgia Geral',
    institution: 'Santa Casa de Curitiba',
    year: '2022',
    description: 'Programa de residência médica em cirurgia geral.',
  },
  {
    kindLabel: 'Residência médica',
    title: 'Residência em Coloproctologia',
    institution: 'Hospital Mackenzie',
    year: '2024',
    description: 'Programa de residência médica nas doenças do cólon, reto e ânus.',
  },
  {
    kindLabel: 'Curso de aperfeiçoamento',
    title: 'Proctologia Minimamente Invasiva',
    institution: 'IRCAD América Latina',
    year: '2025',
    description: 'Curso em técnicas minimamente invasivas e cirurgia a laser.',
  },
  {
    kindLabel: 'Pós-graduação',
    title: 'Pós-graduação em Disfunções do Assoalho Pélvico',
    institution: 'UNIFAL-MG',
    year: '2026',
    description:
      'Pós-graduação em disfunções do assoalho pélvico. Não é residência médica nem o RQE.',
  },
]

export const PROFESSIONAL_MEMBERSHIPS = [
  'Sociedade Brasileira de Coloproctologia',
  'Sociedade Brasileira de Laser em Medicina e Cirurgia',
] as const

/** Date of the last editorial change to `/sobre`; feeds its schema and the sitemap. */
export const PROFILE_LAST_UPDATED = '2026-11-12'

export const PROFESSIONAL_PROFILE = {
  shortIntroduction:
    'Médica formada em 2019 pela PUC-PR e especialista em coloproctologia, dedicada à avaliação e ao tratamento de doenças do cólon, reto e ânus.',
  approach:
    'Sua abordagem combina escuta cuidadosa, formação cirúrgica e recursos minimamente invasivos quando eles são adequados ao diagnóstico e às necessidades de cada paciente.',
  quote:
    'Acredito que cada paciente merece um cuidado personalizado, com empatia e acolhimento, utilizando recursos adequados a cada indicação e sempre com foco no cuidado e no conforto.',
} as const
