# Blog Content Playbook

## Estrutura de cada post

- Salve os artigos em `content/posts/<slug>.md`.
- O `slug` do frontmatter deve corresponder exatamente ao nome do arquivo.
- O `title` vai para o `<h1>` da página. Não repita esse título dentro do corpo do markdown.
- O primeiro parágrafo deve ser um gancho curto em itálico. Ele vira o resumo dos cards do blog.
- Use `##` para os blocos principais do texto e listas curtas para benefícios, indicações e diferenciais.

## Frontmatter mínimo

- `title`
- `metaDescription`
- `slug`
- `publishDate`
- `lastModified`
- `primaryKeyword`
- `secondaryKeywords`
- `targetAudience`
- `intent`

## Boas práticas editoriais

- Escreva sempre em português do Brasil.
- Prefira linguagem médica clara, sem sensacionalismo e sem promessas absolutas.
- Explique indicação, benefícios, limites e necessidade de avaliação presencial.
- Evite copiar briefing, rascunho comercial ou instruções de prompt para o markdown final.
- Se houver perguntas frequentes reais no conteúdo, registre em `faqs` para renderização visível e schema.
- Use `relatedPosts` para apontar a até quatro artigos de intenção complementar. Não relacione o post a ele mesmo nem repita a mesma intenção em URLs diferentes.
- Artigos informacionais devem levar à página comercial principal do cluster; não devem disputar a intenção local ou de agendamento.
- Para conteúdo médico, inclua uma seção `## Fontes médicas` com diretrizes, sociedades médicas ou estudos primários adequados ao tema.

## Checklist antes de publicar

- Confirmar que o `metaDescription` está específico e não duplicado.
- Validar se o post aponta para uma tecnologia ou condição realmente tratada no site.
- Revisar data, ortografia, siglas médicas e consistência com `src/constants.ts`.
- Rodar `npm run build` e, se possível, `npm run e2e`.
