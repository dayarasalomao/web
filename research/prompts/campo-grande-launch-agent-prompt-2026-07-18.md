# Prompt para agente — lançamento da Dra. Dayara em Campo Grande

Você está trabalhando no site da Dra. Dayara Salomão e deve preparar, validar e versionar a migração de SEO/local e as melhorias de conversão para Campo Grande/MS.

## Workspace

`/Users/diegovfeder/workspace/jobs/dayarasalomao`

## Site público

`https://www.dayarasalomao.com.br/`

## Git e entrega

- Repositório: `dayarasalomao/web`.
- Branch atual esperada: `feat/campo-grande-launch-prep`.
- Já existe o draft PR [#11](https://github.com/dayarasalomao/web/pull/11).
- Trabalhe nessa branch e atualize o PR #11. Não abra um PR duplicado.
- Inspecione `git status`, o diff e o PR antes de editar.
- Preserve alterações existentes e não inclua arquivos temporários ou binários não relacionados.
- Ao concluir, rode toda a validação, faça commits pequenos e claros, envie a branch e mantenha o PR como **draft**.
- Não faça deploy, não promova o PR, não solicite indexação e não mude serviços externos.

## Leia antes de agir

Leia completamente:

- `AGENTS.md`
- `CLAUDE.md`
- `.specs/features/campo-grande-seo-migration/context.md`
- `.specs/features/campo-grande-seo-migration/spec.md`
- `.specs/features/campo-grande-seo-migration/design.md`
- `.specs/features/campo-grande-seo-migration/tasks.md`
- `.specs/features/campo-grande-launch-growth/spec.md`
- `docs/cfm-compliance-guidelines.md`
- `docs/campo-grande-plano-dayara.md`
- `research/seo-audit-campo-grande-2026-07-18.md`
- `research/seuseo-keywords-campo-grande-2026-08.csv`

O working tree pode conter uma primeira implementação das rotas de locais, FAQs, metadados localizáveis, melhorias de CTA, CSP e conteúdo. Revise, teste e aperfeiçoe esse trabalho; não o descarte nem o reimplemente às cegas.

## Fatos confirmados pela cliente em 17/07/2026

Estes dados foram fornecidos diretamente pela Dra. Dayara e podem ser usados no preparo:

- Cidade: Campo Grande/MS.
- Clínica: **Instituto do Aparelho Digestivo**.
- Endereço confirmado em texto: **R. Alagoas, 700 - Jardim dos Estados, Campo Grande - MS, 79020-120**.
- Primeiro dia de atendimento: **05/08/2026**.
- Registro que pode ser atualizado no site: **CRM-MS 16556 / RQE 9819**.
- A Dra. Dayara informou que **não realizará colonoscopia** nesse local.
- Google Maps fornecido:
  `https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=br&sa=X&geocode=KaEUri6R6IaUMQkFnCP7Ozlw&daddr=R.+Alagoas,+700+-+Sl+8+-+Jardim+dos+Estados,+Campo+Grande+-+MS,+79020-120`
- O Google Business Profile está em processo de contestação/verificação com declaração da clínica e inscrição no CRM.

## Fatos ainda bloqueados

- Novo telefone/WhatsApp: a cliente ainda decidirá entre número digital e chip com ligação.
- Coordenadas geográficas exatas.
- Confirmação textual de “Sala 8”.
- Aprovação final do Google Business Profile.

O link do Maps contém `Sl 8`, mas o endereço escrito pela cliente não contém sala. Não acrescente “Sala 8” ao endereço visível ou ao schema sem confirmação explícita. Não invente DDD 67, telefone, WhatsApp, geo, horários, convênios, preços ou disponibilidade.

## Postura de lançamento

Hoje é 18/07/2026 e o primeiro atendimento será em 05/08/2026. O trabalho deve ficar revisável no draft PR, não publicado.

- Armazene os fatos confirmados no modelo de localização planejada.
- Mantenha Campo Grande como `planned`, `indexable: false` e sem CTA local até a aprovação de publicação.
- A página planejada pode mostrar clínica, endereço e data confirmados, mas deve permanecer `noindex` e fora do sitemap.
- Não emita `MedicalClinic`, `PostalAddress`, `GeoCoordinates`, telefone ou `areaServed` de Campo Grande no JSON-LD global enquanto a localização não estiver ativa.
- Prepare uma virada explícita e pequena para o dia do lançamento; não use uma ativação automática silenciosa apenas baseada no relógio.
- Curitiba continua como atendimento ativo no site público até a publicação coordenada. Preserve “Santa Casa de Curitiba” e outras referências históricas verdadeiras após a mudança.
- O CRM-MS/RQE foi autorizado pela cliente e pode ser atualizado agora no código do draft. Verifique o link do CFM.

## Objetivo

Deixar o site pronto para uma virada coordenada de Curitiba para Campo Grande, fortalecer páginas de tratamento para consultas comerciais locais, melhorar a experiência móvel e a conversão, e reduzir risco de publicidade médica — sem publicar fatos incompletos.

## Trabalho obrigatório

### 1. Consolidar o modelo de locais

- Atualize `src/lib/locations.ts` com clínica, endereço, estado, CEP, Maps e data confirmados de Campo Grande.
- Acrescente um campo de data de início/lançamento com formato ISO, se o modelo ainda não tiver.
- Mantenha telefone, WhatsApp e geo ausentes.
- Garanta que `isLocationIndexable` continue exigindo estado ativo, flag indexável e endereço confirmado.
- Atualize testes para provar que Campo Grande possui fatos planejados, mas não vaza para sitemap/schema/CTA.

### 2. Finalizar as rotas de atendimento

Revise ou implemente:

- `/locais-de-atendimento`
- `/locais-de-atendimento/curitiba`
- `/locais-de-atendimento/campo-grande`

Requisitos:

- Hub indexável com locais ativos e um aviso separado sobre a mudança.
- Curitiba mantém NAP verdadeiro enquanto ativa.
- Campo Grande mostra clínica, endereço e início em 05/08/2026, mas usa `noindex,follow`, não aparece no sitemap e não oferece CTA local/WhatsApp.
- A rota planejada não deve exibir o endereço de Curitiba nem o botão flutuante de agendamento.
- Breadcrumb visível e schema correspondente.
- Schema de local somente para locais ativos; vínculo de trabalho não deve representar que a médica é proprietária da clínica.

### 3. Preparar a virada de 05/08

Crie ou atualize um checklist objetivo contendo:

- valores exatos antes/depois;
- Campo Grande `planned → active`;
- Curitiba `active → historical`, salvo se a cliente confirmar atendimento simultâneo;
- troca de título, descrição, H1, NAP, schema, sitemap e `llms.txt`;
- WhatsApp/telefone ainda exigido;
- geo ainda exigido;
- confirmação de Sala 8 ainda exigida;
- atualização de Doctoralia somente quando o perfil refletir Campo Grande;
- GBP e site alterados na mesma janela;
- validação e rollback.

Não execute a virada neste PR.

### 4. Metadados e ownership de palavras-chave

Use `research/seuseo-keywords-campo-grande-2026-08.csv`.

- Homepage/local ativo: `coloproctologista campo grande`, `proctologista campo grande`, consulta e médica mulher — somente após ativação.
- Páginas de hemorroidas: cirurgia, laser, sem corte, ligadura e hemorroidectomia.
- Toxina: fissura anal e toxina botulínica.
- Fístula: cirurgia, laser, VAAFT e FiLaC.
- Cisto: cirurgia, laser e EPSiT.
- HPV: tratamento de lesões/condiloma.
- Blog: perguntas informacionais e sintomas; não competir com a página comercial.

Os metadados de tratamento devem derivar da localização ativa para permitir uma virada centralizada. Calcule o título final e evite truncamento e repetição artificial.

### 5. FAQs e conteúdo de decisão

- FAQs devem ser visíveis e idênticas ao `FAQPage` emitido.
- Priorize hemorroidectomia, ligadura, fístula/VAAFT/FiLaC, fissura/toxina e cisto/EPSiT.
- Use linguagem condicional: `pode`, `em casos selecionados`, `depende do exame`.
- Não prometer menor dor, recuperação rápida, cura, ausência de corte universal ou superioridade.
- Não escrever conteúdo sobre colonoscopia nem adicioná-la a serviços, schema, keywords ou backlog.

### 6. Conversão e frontend

Preserve a identidade visual da Dayara. Reaproveite da arquitetura da Ana apenas padrões úteis, não branding ou fatos:

- CTA de agendamento claro no header desktop.
- Barra de WhatsApp compacta no mobile, sem cobrir conteúdo.
- Artigos recentes na homepage para descoberta e links internos.
- Rotas de local com boa hierarquia, cards legíveis e decisão clara.
- Rótulos e estados acessíveis no menu móvel.
- Atributos de conversão consistentes em CTAs para GTM.
- Sem JavaScript desnecessário ou bibliotecas pesadas.

### 7. Dados estruturados e trust

- Remova `aggregateRating` ou review schema não verificável.
- Preserve uma entidade `Physician` estável com CRM-MS/RQE autorizado.
- Modele a clínica como local de trabalho, não como negócio de propriedade da médica.
- Não emitir endereço/geo de Campo Grande no graph global antes da ativação.
- Não adicionar horários, telefone, avaliações ou procedimentos não confirmados.
- Article, MedicalWebPage, MedicalProcedure, Breadcrumb e FAQ devem corresponder ao conteúdo visível.

### 8. CSP, analytics e performance

- Verifique no navegador os bloqueios CSP do Google Ads/DoubleClick e permita apenas os domínios mínimos necessários.
- Confirme que GTM/GA não gera novos erros.
- Marque CTAs de WhatsApp/telefone/mapa com identificadores mensuráveis, sem coletar dados clínicos.
- Identifique LCP real em desktop/mobile e mantenha prioridade apenas na imagem correta.
- Use imagens responsivas e lazy loading abaixo da dobra.

### 9. Compliance e revisão de texto

Faça revisão manual de frases promocionais, especialmente:

- `melhor`
- `garante`
- `eficaz`
- `seguro`
- `recuperação rápida`
- `alta precisão`
- `sem corte`
- `tecnologia avançada`

Não faça substituição global mecânica. Diferencie nome conhecido de técnica, explicação clínica e promessa publicitária. Preserve CRM/RQE e aviso de conteúdo educativo.

## Verificação obrigatória

Use Node 22 quando o Node global não aceitar `--experimental-transform-types`:

```bash
PATH=/Users/diegovfeder/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint
PATH=/Users/diegovfeder/.nvm/versions/node/v22.20.0/bin:$PATH npm run test:unit
PATH=/Users/diegovfeder/.nvm/versions/node/v22.20.0/bin:$PATH npm run build
```

Depois:

1. Inicie preview local.
2. Teste 1440 px e 390 px.
3. Verifique homepage, hub de locais, Curitiba, Campo Grande, ligadura, fístula, cisto, fissura e HPV.
4. Confirme:
   - um H1;
   - canonical correto;
   - Campo Grande `noindex,follow`;
   - Campo Grande ausente do sitemap;
   - nenhuma CTA local ou NAP falso na página planejada;
   - FAQ visível = schema;
   - sem `aggregateRating`;
   - sem overflow horizontal;
   - menu e CTAs acessíveis;
   - sem erro de console relevante;
   - CSP de medição funcional.
5. Rode `git diff --check`.

## Entrega no draft PR #11

- Faça stage apenas dos arquivos relacionados.
- Não inclua `tmp/` nem PDFs duplicados/gerados sem necessidade.
- Commit sugerido: `feat(seo): prepare Campo Grande launch experience`.
- Envie a branch atual.
- Atualize a descrição do PR #11 com:
  - fatos confirmados;
  - mudanças de código e conteúdo;
  - screenshots;
  - comandos executados;
  - o que continua bloqueado;
  - checklist de lançamento;
  - afirmação explícita de que nada foi implantado.
- Mantenha o PR como draft.

## Relatório final do agente

Retorne:

1. resultado executivo;
2. arquivos alterados;
3. rotas e metadados afetados;
4. decisões de keyword ownership;
5. mudanças de schema;
6. mudanças de frontend/conversão;
7. revisão CFM;
8. testes e screenshots;
9. commit e link do draft PR;
10. itens bloqueados: WhatsApp/telefone, geo, Sala 8 e GBP;
11. passos exatos para a virada em 05/08/2026.

Não faça deploy.
