# Blog: posição das imagens e mídia nos cards

Escopo médio. Base: `1f2964c5feaf335d489248eafaf29f0bd05d0cb5`. 40 posts, 24 ilustrados (29 imagens), 16 sem imagem.

## Critérios de aceitação

- AC1: cada imagem fica junto ao trecho que explica seu conteúdo, por edição do Markdown. Nunca imagens consecutivas; figuras múltiplas ficam em seções H2 diferentes e em ordem editorial.
- AC2: antes do primeiro H2, no máximo uma imagem, somente se corresponder a `image.src`. Não inserir em listas/tabelas/FAQ/fontes/CTA. A interpretação da última seção clínica está aguardando esclarecimento do usuário.
- AC3: teste unitário analisa todos os posts e rejeita posições proibidas, com exemplos negativos para cada regra.
- AC4: `MdxImage` usa a legenda do frontmatter para a imagem correspondente; nas demais, usa o título Markdown. `role=group` e `aria-label` existem somente com legenda. Preservar alt, disclaimers e conteúdo clínico; não inventar legendas.
- AC5: `/blog` e `LatestArticles` mostram `cardImage` em painel 16:9, decorativo (`alt=""`), inteiro (`object-contain`), com `next/image fill`. Posts sem imagem usam marca decorativa no mesmo painel. O título continua sendo o único nome acessível do link.
- AC6: somente os dois primeiros cards de `/blog` carregam com prioridade; demais imagens e homepage carregam sob demanda. `sizes` do blog: `(max-width: 768px) 100vw, 50vw`; homepage ajusta a terceira coluna em 1280px. Não há rolagem horizontal em 375px.
- AC7: preservar seleção de `cardImage`, OG, sitemap e JSON-LD. Preservar ativos, frontmatter e significado do texto médico.
- AC8: lint, build, unitários, auditoria SEO e e2e aprovados; capturas desktop/375px de blog, homepage e três posts de duas imagens anexadas nesta pasta. Verificação independente com teste de regressão em cópia temporária.

Revisão clínica e de procedência continua necessária antes do merge conforme `CLAUDE.md`; esta tarefa não faz merge nem cria imagens.

## Colocação editorial

A tabela completa será adicionada após a leitura e edição dos trechos correspondentes.
