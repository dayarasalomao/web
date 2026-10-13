# Design breve

- `LinkCard` recebe `media?: ReactNode`. Mídia fica dentro da borda, antes do texto; padding passa para um contêiner flexível de texto, preservando CTA no rodapé, barra cobre e link estendido.
- `BlogCard` usa painel 16:9 creme e `object-contain` em todas as ilustrações. Há um diagrama 1024×844 e rótulos nas bordas: preservar a figura inteira evita perda de informação. Sem zoom, para não cortar rótulos no hover.
- 16/40 posts não têm imagem. Painel `bg-beige/40` com `public/core/lettering-blue.png` decorativo mantém a altura das linhas consistente.
- Prioridade é prop explícita, ativada somente nos índices 0/1 da listagem. A homepage usa o mesmo card e `sizes` que contempla suas três colunas.
- Leituras relacionadas não usam `BlogCard`; conservar seu layout atual está dentro do escopo solicitado.
- Manter `span` para imagem/legenda no MDX: é válido dentro do parágrafo existente. Não acrescentar plugin, dependência ou transformação em runtime.
- Colocação definida no Markdown; nenhuma alteração em `src/lib/blog.ts` ou resolução de imagem SEO. Reaproveitar apenas legendas/disclaimers existentes com procedência documentada.
