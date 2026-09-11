export interface StrategicSearchTarget {
  query: string
  canonicalPath: string
  intent: 'local' | 'condition' | 'treatment' | 'recovery'
}

/**
 * Explicit ownership for the searches that matter most to the practice.
 * Multiple query variants can intentionally resolve to one strong page; the
 * map prevents a new near-duplicate page from being created for every wording.
 */
export const STRATEGIC_SEARCH_TARGETS: StrategicSearchTarget[] = [
  {
    query: 'coloproctologista campo grande',
    canonicalPath: '/locais-de-atendimento/campo-grande',
    intent: 'local',
  },
  {
    query: 'coloproctologista campo grande ms',
    canonicalPath: '/locais-de-atendimento/campo-grande',
    intent: 'local',
  },
  {
    query: 'proctologista campo grande',
    canonicalPath: '/locais-de-atendimento/campo-grande',
    intent: 'local',
  },
  {
    query: 'coloproctologia campo grande ms',
    canonicalPath: '/locais-de-atendimento/campo-grande',
    intent: 'local',
  },
  {
    query: 'doença hemorroidária sintomas',
    canonicalPath: '/blog/doenca-hemorroidaria-sintomas-graus',
    intent: 'condition',
  },
  {
    query: 'cirurgia de hemorroidas a laser',
    canonicalPath: '/tratamentos/hemorroidectomia-laser-co2',
    intent: 'treatment',
  },
  {
    query: 'recuperação após cirurgia de hemorroidas',
    canonicalPath: '/blog/pos-operatorio-cirurgia-hemorroidas-o-que-esperar',
    intent: 'recovery',
  },
]

export function getStrategicTarget(query: string): StrategicSearchTarget | undefined {
  const normalized = query.trim().toLocaleLowerCase('pt-BR')
  return STRATEGIC_SEARCH_TARGETS.find(
    (target) => target.query.toLocaleLowerCase('pt-BR') === normalized,
  )
}
