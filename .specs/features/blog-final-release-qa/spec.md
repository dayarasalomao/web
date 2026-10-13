# Imagens completas e QA final antes de produção

Base: `9d9e7ac`. Extensão explicitamente solicitada pelo usuário: gerar imagens ausentes e capas distintas onde havia repetição, conferir QA/SEO/crawlers e redigir mensagem em pt-BR para a cliente. Não fazer merge nem publicar em produção.

## Critérios

- F1: gerar 23 ilustrações editoriais via ferramenta built-in: 16 para posts sem imagem e sete capas para resolver repetições nos cards. WebP local otimizado, dimensões reais, fontes/prompts e origem IA registrados; sem representar pacientes reais, técnicas clínicas ou resultados garantidos.
- F2: todos os 40 posts têm cardImage e os 40 src são distintos. `coverImage` opcional e validado precede `image` e primeira imagem Markdown na seleção. Diagramas originais do corpo, alt, legendas, texto clínico, títulos, fontes e URLs preservados. As 16 novas imagens de corpo seguem as guardrails, inclusive nenhuma após o último H2.
- F3: a imagem escolhida para o card corresponde à do OG/Twitter, Article/ImageObject e primaryImageOfPage. Sitemap inclui o mesmo src; dimensões reais e caption de origem. Não atribuir autoria/licença verificada às imagens além da procedência registrada.
- F4: llms.txt cobre todos os artigos e páginas públicas relevantes; sitemap tem todas as URLs indexáveis e suas imagens válidas, sem páginas privadas/noindex/redirect/404. Robots aponta ao sitemap canônico. Links internos, canonicals e entidades médica/clínica continuam corretos.
- F5: lint, build, unitários, audit:seo e e2e aprovados no código final; smoke do build de produção em desktop/375px, sitemap/llms/robots e carregamento de imagens. Capturas atualizadas para blog/homepage e exemplos de imagens novas/cover. Verifier independente e sensor em cópia temporária.
- F6: mensagem em pt-BR salva e entregue ao usuário, explicando trabalho realizado e solicitando revisão de artigos, imagens, legendas e novas ilustrações IA antes da publicação. Mensagem não enviada à cliente automaticamente.

Mudança de contrato autorizada: o snapshot histórico de cardImage da feature anterior passa a proteger as imagens educativas originais; as novas capas podem substituir apenas a escolha de mídia/SEO. Testes existentes de dimensões/schema serão ajustados para afirmar a imagem escolhida atual, preservando testes das ilustrações originais no corpo.

Revisão clínica/procedência continua necessária antes do merge conforme CLAUDE.md; QA técnico não substitui essa revisão.
