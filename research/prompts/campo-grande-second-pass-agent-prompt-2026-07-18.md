# Prompt para novo agente — segunda passada da Dayara Salomão

Você é o revisor técnico, de SEO e de experiência do paciente para a segunda passada do projeto da Dra. Dayara Salomão. Existe uma implementação anterior funcional e um draft PR aberto. Sua missão é encontrar melhorias materiais que a primeira passada não capturou, implementar apenas o que puder ser comprovado e deixar o mesmo draft PR mais forte — sem publicar nada.

## Projeto e entrega

- Workspace: `/Users/diegovfeder/workspace/jobs/dayarasalomao`
- Site público: `https://www.dayarasalomao.com.br/`
- Repositório: `dayarasalomao/web`
- Branch esperada: `feat/campo-grande-launch-prep`
- Draft PR existente: `https://github.com/dayarasalomao/web/pull/11`
- Commits-base relevantes: `9eaf38f` e `0e04cbc`

Atualize o PR #11; não abra outro PR. Mantenha-o como draft. Não faça deploy, não promova o PR, não solicite indexação e não altere Google Business Profile, Doctoralia, analytics ou qualquer outro serviço externo.

O arquivo `docs/campo-grande-plano-dayara.pdf` pode estar não versionado. Ele pertence ao usuário: preserve-o e não o adicione ao commit sem necessidade explícita.

## Leia completamente antes de agir

- `AGENTS.md`
- `CLAUDE.md`
- `docs/cfm-compliance-guidelines.md`
- `docs/campo-grande-plano-dayara.md`
- `.specs/features/campo-grande-seo-migration/context.md`
- `.specs/features/campo-grande-seo-migration/spec.md`
- `.specs/features/campo-grande-seo-migration/design.md`
- `.specs/features/campo-grande-seo-migration/tasks.md`
- `.specs/features/campo-grande-launch-growth/spec.md`
- `research/seo-audit-campo-grande-2026-07-18.md`
- `research/seuseo-keywords-campo-grande-2026-08.csv`
- `research/prompts/campo-grande-launch-agent-prompt-2026-07-18.md`
- todo o diff do PR #11 e sua descrição atual

Se disponíveis, use as skills de SEO local, acessibilidade, Core Web Vitals, React/Next.js e Playwright. Elas devem orientar a verificação, não substituir evidência do HTML, do código e do navegador.

## Estado que já deve existir

- Modelo de locais com Curitiba ativa e Campo Grande planejada.
- Rotas `/locais-de-atendimento`, `/locais-de-atendimento/curitiba` e `/locais-de-atendimento/campo-grande`.
- Campo Grande em `noindex,follow`, fora do sitemap e sem CTA/telefone/WhatsApp local.
- CRM-MS 16556 / RQE 9819 no draft.
- FAQs visíveis e schema correspondente em tratamentos prioritários.
- Remoção de `aggregateRating` não verificável.
- CTA desktop/mobile, navegação de locais, aviso de transição e artigos recentes na homepage.
- Metadados de tratamentos derivados da localização ativa.
- Lint, 27 testes unitários, build, 9 E2E e checks remotos verdes no último estado conhecido.

Não reimplemente esses itens sem primeiro confirmar que estão errados ou incompletos.

## Fatos confirmados

- Clínica: Instituto do Aparelho Digestivo.
- Endereço: R. Alagoas, 700 — Jardim dos Estados — Campo Grande/MS — 79020-120.
- Primeiro atendimento: 05/08/2026.
- Registro: CRM-MS 16556 / RQE 9819.
- A médica informou que não realizará colonoscopia nesse local.
- O link do Maps foi fornecido e contém `Sl 8`.
- O GBP está em contestação/verificação.

## Fatos bloqueados

- Novo telefone e WhatsApp.
- Coordenadas geográficas.
- Confirmação textual de Sala 8.
- Resultado final do GBP.
- Se Curitiba deixará de ser atendida ou ficará simultaneamente ativa após a mudança.

Não invente DDD, telefone, sala, geo, horários, convênios, preços, disponibilidade ou vínculo societário com a clínica.

## Objetivo desta segunda passada

Faça primeiro uma revisão independente. Compare:

1. produção atual;
2. preview do PR #11;
3. código e dados do branch;
4. requisitos e fatos confirmados;
5. tracker de 60 keywords.

Produza uma lista curta com no máximo cinco oportunidades, classificadas por impacto, evidência, risco e esforço. Implemente somente oportunidades de alto valor que estejam dentro deste escopo e não dependam de fatos bloqueados.

## Áreas que merecem investigação

### 1. Coerência da transição local

- Confirme que nenhuma página planejada apresenta CTA, telefone, clínica, mapa ou NAP de Curitiba como se fosse de Campo Grande.
- Inspecione HTML visível, metadata, JSON-LD, breadcrumbs, footer, header, sitemap, `llms.txt` e links internos.
- O graph global pode continuar descrevendo o atendimento ativo em Curitiba enquanto isso for verdadeiro, mas não pode atribuir esses dados à página/local de Campo Grande.
- Confirme que a mudança não será ativada automaticamente apenas porque chegou 05/08.
- Verifique se a futura virada pode ser feita em um pequeno conjunto central de valores, com rollback documentado.

### 2. Ownership de intenção e canibalização

- Home/local: especialista e consulta na cidade ativa.
- Hemorroidas: dividir claramente ligadura, hemorroidectomia e técnicas minimamente invasivas sem três páginas competindo pela mesma intenção.
- Fissura/toxina, fístula/VAAFT/FiLaC, cisto/EPSiT e HPV: um owner comercial claro por cluster.
- Blog: dúvidas informacionais distintas, com links contextuais para o owner comercial.
- Não crie páginas por variações triviais de keyword ou bairro.

### 3. Conteúdo médico e CFM

Faça revisão frase a frase das áreas mais visíveis e páginas de tratamento. Procure promessas, absolutos e superioridade, mas não faça substituição global mecânica.

Reescreva somente quando necessário e preserve significado clínico. Não afirme que laser, VAAFT, FiLaC, EPSiT, toxina, ligadura ou qualquer cirurgia é sempre melhor, sem dor, sem corte, definitiva, mais segura ou indicada para todos.

Qualquer novo conteúdo clínico deve ser marcado para revisão médica quando não estiver diretamente sustentado por fonte aprovada do projeto.

### 4. Conversão e acessibilidade

- Verifique desktop e 390 px.
- Confirme foco, nome acessível, `aria-expanded`, ordem do teclado e fechamento do menu.
- Garanta que a barra móvel não cubra conteúdo, footer, formulário ou controles.
- CTAs devem explicar o próximo passo sem prometer resultado.
- Registre eventos de CTA de forma consistente, sem enviar sintomas ou dados de saúde.
- Preserve a identidade visual; não copie branding da Ana.

### 5. Performance e confiabilidade

- Identifique o LCP real em desktop e mobile, não por palpite.
- Apenas a imagem LCP deve receber preload/prioridade; imagens abaixo da dobra devem permanecer lazy.
- Verifique CLS, overflow, tamanhos responsivos e console.
- Diferencie 404 de endpoints Vercel no preview local de erros reais da aplicação.
- Revise a CSP por menor privilégio; não libere domínios amplos sem uma requisição observada e necessária.

### 6. Schema e entidade

- Um único conjunto coerente de Physician/MedicalOrganization/MedicalClinic/WebSite.
- Clínica como local de trabalho, não propriedade da médica.
- FAQ visível idêntica ao FAQPage.
- Sem ratings, reviews, horários, geo, telefone ou resultados inventados.
- Breadcrumb, Article, MedicalWebPage e MedicalProcedure devem refletir conteúdo visível.

## Limite de implementação

Você pode melhorar código, testes, documentação e conteúdo já sustentado pelos fatos. Não pode:

- ativar Campo Grande;
- transformar Curitiba em histórica;
- criar número ou NAP temporário;
- publicar conteúdo ou fazer deploy;
- alterar perfis externos;
- adicionar colonoscopia como serviço da médica em Campo Grande;
- reescrever em massa artigos que já ranqueiam sem evidência de problema.

Se não encontrar melhoria material, não crie churn. Documente que o estado atual passou e liste somente os próximos passos bloqueados.

## Verificação obrigatória

Use Node 22 quando necessário:

```bash
PATH=/Users/diegovfeder/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint
PATH=/Users/diegovfeder/.nvm/versions/node/v22.20.0/bin:$PATH npm run test:unit
PATH=/Users/diegovfeder/.nvm/versions/node/v22.20.0/bin:$PATH npm run build
PATH=/Users/diegovfeder/.nvm/versions/node/v22.20.0/bin:$PATH npm run e2e
git diff --check
```

Teste manualmente homepage, hub de locais, Curitiba, Campo Grande e os owners de hemorroidas, fissura, fístula, cisto e HPV. Registre screenshots desktop/mobile quando houver mudança visual.

## Entrega

1. Mostre a auditoria curta antes de editar.
2. Explique por que cada alteração supera o estado anterior.
3. Faça stage somente do escopo.
4. Faça commit claro e push na branch atual.
5. Atualize o draft PR #11 com antes/depois, testes, screenshots, bloqueios e rollback.
6. Confirme que todos os checks remotos terminaram verdes.
7. Não marque o PR como ready e não faça merge.

Relatório final: resultado, oportunidades avaliadas, melhorias implementadas, arquivos/URLs, conteúdo clínico alterado, schema, performance/acessibilidade, testes, commit, PR, bloqueios e plano exato da futura virada.

**No production deployment was performed.**
