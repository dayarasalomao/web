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

Mapeamento reverso: três testes novos de model e dois e2e cobrem F2/3; todos os asserts mantêm valores concretos. O snapshot histórico agora protege image/primeira Markdown original, pois o usuário autorizou covers distintas. Expectations antigas de cardImage/dimensões foram atualizadas à seleção de cover; asserts de imagens fornecidas e textos/ressalvas continuam. Datas exatas de lastModified ajustadas para23 posts com atualização visual, sem mudar accessedAt. Nenhum teste removido/ignorado. Testes de83? Não: suite atual131, baseline126, acrescidos2 assets+3 model. E2e baseline59, acrescidos2 nesta etapa.
