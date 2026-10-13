# Execução

## R1 — imagens editoriais

23 arquivos selecionados (16 ausentes, sete capas) gerados separadamente com image_gen built-in; prompts/fontes em generated-sources.json e docs/blog-generated-images-manifest.json. Duas versões de vídeo/laser que lembravam exame/procedimento clínico foram descartadas e refeitas com planejamento abstrato. Todas as imagens foram inspecionadas na saída da ferramenta. Originais continuam fora de public.

WebP qualidade 80 via sharp, sem recorte/redimensionamento: 1672×941 ou 1672×940, 2.30 MB total, máximo 152016 bytes. Caption identifica IA e caráter ilustrativo. Não inferir pacientes, consultório real ou fidelidade de instrumento/técnica. Revisão médica e visual da cliente permanece pendente antes do merge.

Gate: lint exit0, testes de assets2/2.

| AC | Evidência/assertion | Esperado | Coberto |
| --- | --- | --- | --- |
| F1 quantidade/tipo/unicidade | generated-blog-assets.test.ts:15–19 `assert.equal` count/kind/src/sha | 23, 16/7, 23 src e hashes únicos | Sim |
| F1 integridade/dimensões | generated-blog-assets.test.ts:27–32 format/width/height/ratio | WebP local, largura>=1200, 16:9 próximo | Sim |
| F1 otimização/procedência | generated-blog-assets.test.ts:33–37 bytes/hash/tool/prompt | <400KB por arquivo, hash exato, built-in com prompt | Sim |

Mapeamento reverso: os dois testes têm apenas asserts vinculados a F1; sem alterações aos testes antigos nesta etapa. Novos limites de qualidade/peso materializam o requisito de WebP otimizado com resolução para cards/OG. Gate conforme TESTING.md.

## R2 — integração e SEO

16 frontmatters image + figuras Markdown; sete coverImage que preservam as figuras originais no corpo. coverImage é validado com o mesmo contrato de src/alt/dimensões de image. Card/OG/Twitter/sitemap usam coverImage > image > primeira Markdown; JSON-LD acompanha a imagem editorial escolhida. Sem mudanças de estrutura do card ou de conteúdo clínico. Atualização visual datada 2026-10-13 nos 23 posts alterados; datas de fontes mantidas.

Gate aprovado: lint0, unitários131/131, e2e relevantes10/10. Comparação contra 9d9e7ac preservou prosa, títulos, keywords, FAQs, fontes e primárias preexistentes em todos os40 posts. Guardrails do corpo aprovadas em todos os40 posts.

| AC | Evidência/assertion | Esperado | Coberto |
| --- | --- | --- | --- |
| F2 cards completos/únicos | blog-covers.test.ts:18–20 `assert.equal` count/cardImage/Set | 40/40/40 | Sim |
| F2/3 manifesto integrado | blog-covers.test.ts:27/28 `assert.deepEqual` image/cover/card | src/alt/caption/dimensões exatos | Sim |
| F3 OG/Twitter/schema | blog-covers.test.ts:31/32/36–43 valores exatos | mesma imagem, dimensão, caption e ID, sem copyright inventado | Sim |
| F2 validação negativa | blog-covers.test.ts:64 `assert.equal(output, message)` em fixture isolada | cover inválida rejeitada, erro exato | Sim |
| F2 preservação/posições | blog-image-placement.test.ts:68/108/118 deepEqual | zero violações, mapa de45 imagens de corpo, originais iguais à base | Sim |
| F2 imagem de corpo mobile | blog-covers.spec.ts:10–16 alt/dimensões/caption/load/overflow | original render e divulgação IA, overflow0 | Sim |
| F2/3 cover e corpo | blog-covers.spec.ts:22–33 metadados/schema e ilustração antiga | cover para SEO, primária antiga continua visível | Sim |

Mapeamento reverso: três testes novos de model e dois e2e cobrem F2/3; todos os asserts mantêm valores concretos. O snapshot histórico agora protege image/primeira Markdown original, pois o usuário autorizou covers distintas. Expectations antigas de cardImage/dimensões foram atualizadas à seleção de cover; asserts de imagens fornecidas e textos/ressalvas continuam. Datas exatas de lastModified ajustadas para23 posts com atualização visual, sem mudar accessedAt. Nenhum teste removido/ignorado. Suite atual131, baseline126, acrescidos2 assets+3 model. E2e baseline59, acrescidos2 nesta etapa.

## R3 — rastreamento e QA de produção

Gates finais aprovados: lint0; build69 páginas; unitários131/131; audit:seo0 erros/0 alertas; e2e64/64 contra next start local http://127.0.0.1:3015 (Chromium,2 workers). Uma assertion nova de imagem lazy foi ajustada para aguardar `complete && naturalWidth>0` com expect.poll; esperado=true preservado, sem mascarar imagem quebrada ou remover teste.

Sitemap:60 URLs indexáveis exatas, cover escolhida primeiro e todas as imagens Markdown de cada post, com deduplicação por entrada. Todas as43 imagens de blog estão presentes;40 capas únicas respondem200/image-webp. Posts/páginas respondem200 com canonical correto; todos os40 artigos concordam entre OG/Twitter/Article. Privacidade, design-system e Curitiba não entram no sitemap. llms: todos os40 artigos/14 tratamentos e páginas principais já estavam cobertos; acrescentada procedência IA e descrição do sitemap completo. Robots aponta ao sitemap canônico.

Capturas finais:12 JPEGs, dez combinações page/viewport com overflow0, em screenshots.md/checks.json. Galeria das23 ilustrações em docs/blog-generated-images-review.md. Mensagem pt-BR salva em docs/client-updates/revisao-final-site-blog-2026-10-13.md; não enviada à cliente.

| AC | Evidência/assertion | Esperado | Coberto |
| --- | --- | --- | --- |
| F3/4 sitemap completo | release-qa.spec.ts:39/40 URLs exatas e únicas; :46–48 Set de imagens; :53 imagens por post em AST independente |60URLs,43imagens, mesmas capas/figuras sem repetição | Sim |
| F4 exclusões e assets | release-qa.spec.ts:41–43 exclusões; :55/56 status e content-type |noindex/retirada fora, imagem200/WebP | Sim |
| F4 llms/robots | release-qa.spec.ts:63–68 status/rotas/procedência/sitemap |catálogo inteiro e URL canônica | Sim |
| F3/4/5 páginas/metadados | release-qa.spec.ts:76/79/80 status/canonical/robots; :83/84/88 OG/Twitter/Article |200, URL canônica e imagem selecionada exata | Sim |
| F5 capturas/gates | screenshots.md + checks.json, comandos acima |todos os checks passam, desktop/mobile sem overflow | Sim |
| F6 mensagem | docs/client-updates/revisao-final-site-blog-2026-10-13.md:1–13 |pt-BR, resumo fiel, pede revisão artigos/imagens/IA antes de publicar | Sim |

Mapeamento reverso: três e2e novos cobrem apenas F3/4/5; imagem lazy continua ligada a F2. Conteúdo de docs cobre F6 por inspeção. Sem testes antigos removidos/ignorados ou assertions enfraquecidas. A imagem de corpo é analisada via AST no teste, independentemente da extração simples do sitemap. Review médico/procedência permanece requisito editorial antes do merge.

## R4 — imagem de telefone e legenda neutra

Preferência explícita do usuário: corrigir mãos/pose da imagem de telefone e retirar a menção à IA da legenda pública. Regenerada com referência de estilo via image_gen built-in, com vista de frente em3/4, uma mão no telefone e outra no colo; inspecionadas conexões braço/punho/mãos na saída. Nova URL v2 evita reutilização do cache antigo; arquivo substituído sem manter asset de produção sem uso. Dimensões reais1671×941, WebP76074bytes, SHA atualizado no manifest. Alt mantém o mesmo significado, e conteúdo médico/legendas antigas permanece intacto.

Caption das23 imagens novas agora: “Ilustração editorial; não representa paciente, consultório real ou procedimento médico.” Procedência IA segue no manifest, galeria e mensagem para a cliente, sem a antiga afirmação pública de que aparece nas legendas. AGENTS/CLAUDE/README/llms sincronizados com essa escolha.

Gate aprovado: lint0, unit131/131, build69, audit0/0 e e2e completo65/65 no build local de produção. Capturas atualizadas:14JPEGs,12combinações com overflow0; telefone desktop/mobile incluído.

F7: blog-covers.test.ts:25 caption exata para23 entries e :27 URLv2 exata; blog-covers.spec.ts:4–16 carrega URLv2, caption exata e overflow0 em1280/375px; :29 proíbe menção à IA na legenda; imagem revisada visualmente, sem testar anatomia por assertions de software. As evidências F1–6 e regressões clínicas/SEO continuam aprovadas. Nenhum teste removido/ignorado. Independent Verifier reiniciará no diff final, pois a rodada anterior foi interrompida por esta correção solicitada.
