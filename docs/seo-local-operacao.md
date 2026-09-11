# Operação mensal de SEO local — Campo Grande/MS

Este documento separa o que o site mede automaticamente do que precisa ser feito no Perfil da Empresa no Google, Search Console e Google Analytics. Não registrar valores estimados: preencher apenas com dados observados nas ferramentas.

## 1. Configuração única

No campo **Site** do Perfil da Empresa da Dra. Dayara, usar exatamente:

```text
https://www.dayarasalomao.com.br/?utm_source=google&utm_medium=organic&utm_campaign=google_business_profile
```

Essa URL identifica visitas vindas do perfil. O canonical do site permanece `https://www.dayarasalomao.com.br/`, sem parâmetros.

Confirmar no GA4/GTM que estes eventos chegam com nome e destino corretos:

| Ação | Evento | Onde testar |
| --- | --- | --- |
| Abrir WhatsApp | `whatsapp_click` | cabeçalho, hero, páginas e rodapé |
| Ligar | `phone_click` | contato e página local |
| Abrir rota/mapa | `maps_click` | contato, rodapé e página local |
| Abrir site do Instituto | `institution_click` | página de Campo Grande |

Depois de atualizar o Perfil da Empresa, fazer um acesso pelo botão **Site** e verificar no GA4 se a sessão contém:

- `source = google`;
- `medium = organic`;
- `campaign = google_business_profile`.

## 2. Registro inicial no Search Console

Exportar os períodos de **28 dias** e **90 dias** antes de avaliar mudanças. Aplicar separadamente filtros de consulta contendo:

- `campo grande`;
- `proctologista`;
- `coloproctologista`.

Para cada filtro, registrar:

| Período | Filtro | Cliques | Impressões | CTR | Posição média | Principal página de destino |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| 28 dias | campo grande |  |  |  |  |  |
| 28 dias | proctologista |  |  |  |  |  |
| 28 dias | coloproctologista |  |  |  |  |  |
| 90 dias | campo grande |  |  |  |  |  |
| 90 dias | proctologista |  |  |  |  |  |
| 90 dias | coloproctologista |  |  |  |  |  |

Guardar também uma exportação de **Indexação de páginas** e anotar erros de dados estruturados em **Melhorias**. A linha de base deve ter data e links para os arquivos exportados.

## 3. Rotina mensal de 30 minutos

1. Repetir os filtros de 28 e 90 dias no Search Console.
2. Comparar cliques, impressões, CTR e posição com o registro anterior.
3. No GA4, contar os quatro eventos e separar a campanha `google_business_profile`.
4. Identificar consultas com muitas impressões e posição entre 4 e 20.
5. Associar cada consulta a uma única URL principal usando `src/lib/seo-map.ts`.
6. Escolher no máximo dois conteúdos para melhoria naquele mês.
7. Registrar a alteração, a data e quem fez a revisão clínica.

## 4. Como escolher artigos para atualizar

Usar dados reais do Search Console. Uma página prioritária normalmente combina:

- impressões relevantes e posição entre 4 e 20;
- intenção compatível com o conteúdo existente;
- potencial de levar a uma página de tratamento ou à página de Campo Grande;
- conteúdo que a Dra. Dayara consegue revisar clinicamente.

Em cada atualização:

- confirmar se título e resposta principal correspondem à consulta;
- revisar afirmações médicas e `lastModified`;
- incluir fontes primárias, diretrizes ou sociedades médicas no frontmatter `sources`;
- usar links internos contextuais, sem repetir palavras-chave artificialmente;
- verificar autora, CRM-MS 16556, RQE 9819 e aviso educativo;
- pedir revisão clínica da Dra. Dayara antes da publicação.

Não consolidar nem redirecionar URLs somente porque os temas parecem próximos. Primeiro confirmar no Search Console que as páginas disputam a mesma consulta e intenção.

## 5. Fatos que ainda exigem confirmação da cliente

Antes de publicar ou ampliar schema, confirmar diretamente com a Dra. Dayara:

- horários em que ela realmente atende;
- número que agenda diretamente para ela;
- meios de pagamento e convênios;
- procedimentos efetivamente disponíveis em Campo Grande.

O site não deve inferir essas informações a partir dos dados gerais do Instituto.

## 6. Manutenção técnica

Antes de cada publicação relevante, executar:

```bash
npm run audit:seo
npm run test:unit
npm run lint
npm run build
```

O auditor verifica conflito de palavras-chave, páginas órfãs, relações entre artigos e tratamentos, destinos estratégicos e links internos quebrados. Alertas precisam ser avaliados; erros impedem a aprovação da alteração.

## 7. Última validação técnica

Em 11/09/2026, o build de produção local foi auditado três vezes com Lighthouse mobile e simulação padrão:

| Execução | Performance | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: |
| 1 | 90 | 3,537 s | 0,001 | 119 ms |
| 2 | 97 | 2,485 s | 0,001 | 91 ms |
| 3 | 97 | 2,483 s | 0,001 | 109 ms |
| **Mediana** | **97** | **2,485 s** | **0,001** | **109 ms** |

A mediana atende às metas iniciais de performance ≥ 85, LCP ≤ 2,5 s, CLS ≤ 0,1 e TBT ≤ 200 ms. A primeira execução fria ultrapassou a meta de LCP; por isso, acompanhar dados de campo no Search Console/CrUX após o deploy continua necessário.
