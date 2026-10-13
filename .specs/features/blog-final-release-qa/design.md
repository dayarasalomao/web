# Design breve

1. Série editorial em creme/bege/teal/cobre, sem texto embutido. Cada imagem é arquivo próprio gerado separadamente. Arquivos originais fora de public; converter para WebP via sharp, preservando composição e dimensões.
2. Os 16 artigos sem imagem recebem frontmatter `image` e uma linha Markdown junto ao trecho correspondente, com legenda identificando IA. Os sete cards repetidos recebem `coverImage`, sem trocar os diagramas existentes no corpo.
3. Modelagem: reutilizar a validação de imagem existente para `coverImage`; seleção explícita `coverImage ?? image ?? extractFirstImage(content)`. `MdxImage` conserva metadata da ilustração do corpo. JSON-LD usa a imagem editorial principal escolhida (`coverImage ?? image`) para acompanhar OG/sitemap, com fallback prévio para posts legados.
4. Manter LinkCard/BlogCard, contain/16:9, sizes e eager/high dos primeiros dois cards. Não há alteração no layout nem novos plugins.
5. Atualizar guardrails/tabela para novas figuras e preservar baseline histórico para imagens originais. Novo manifest de assets é a fonte de procedência, nomes, alt/caption e dimensões, sem inventar copyright ou revisão médica.
6. Sitemap e llms verificáveis por catálogo do app, em testes contra os endpoints reais. Índice de review para a cliente e mensagem independente do ambiente de produção.
