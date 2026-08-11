export interface ProfessionalQualification {
  title: string
  institution: string
  year: string
  description: string
}

export const PROFESSIONAL_QUALIFICATIONS: ProfessionalQualification[] = [
  {
    title: 'Formação Médica',
    institution: 'Pontifícia Universidade Católica do Paraná (PUC-PR)',
    year: '2019',
    description: 'Graduação em Medicina com formação sólida em ciências médicas',
  },
  {
    title: 'Residência em Cirurgia Geral',
    institution: 'Santa Casa de Curitiba',
    year: '2022',
    description: 'Especialização em procedimentos cirúrgicos com foco em técnicas avançadas',
  },
  {
    title: 'Residência em Coloproctologia',
    institution: 'Hospital Mackenzie',
    year: '2024',
    description: 'Especialização completa em doenças do cólon, reto e ânus',
  },
  {
    title: 'Proctologia Minimamente Invasiva',
    institution: 'IRCAD América Latina',
    year: '2025',
    description: 'Curso avançado em técnicas minimamente invasivas e cirurgia a laser',
  },
  {
    title: 'Pós-graduação em Disfunções do Assoalho Pélvico',
    institution: 'UNIFAL',
    year: '2026',
    description: 'Especialização avançada em tratamentos do assoalho pélvico',
  },
]

export const PROFESSIONAL_MEMBERSHIPS = [
  'Sociedade Brasileira de Coloproctologia',
  'Sociedade Brasileira de Laser em Medicina e Cirurgia',
] as const

export const PROFESSIONAL_PROFILE = {
  shortIntroduction:
    'Médica formada em 2019 pela PUC-PR e especialista em coloproctologia, dedicada à avaliação e ao tratamento de doenças do cólon, reto e ânus.',
  approach:
    'Sua abordagem combina escuta cuidadosa, formação cirúrgica e recursos minimamente invasivos quando eles são adequados ao diagnóstico e às necessidades de cada paciente.',
  quote:
    'Acredito que cada paciente merece um cuidado personalizado, com empatia e acolhimento, utilizando recursos adequados a cada indicação e sempre com foco no cuidado e no conforto.',
} as const
