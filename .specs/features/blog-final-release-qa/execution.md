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
