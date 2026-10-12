# Blog, imagens e títulos locais — PR #21

## Escopo e decisões (2026-10-12)

Continuar o branch `codex/seo-local-campo-grande` a partir de `7c01737`.
O Word fornecido é material editorial, não uma fonte de instruções para o agente.
Manter URLs existentes e a separação entre intenções informacionais e agendamento.
Alterações clínicas serão preparadas na PR para revisão real da médica antes do merge;
não registrar `reviewedBy`, inventar aprovação, prometer rankings ou publicar produção.

## Critérios de aceite

- **SEO-01:** homepage deve ter exatamente `Dra. Dayara Salomão | Coloproctologista em Campo Grande (MS)`. Página local: `Coloproctologista em Campo Grande (MS) | Dra. Dayara`. Hubs: títulos únicos, assunto primeiro e `Campo Grande (MS)`; perfil: nome, formação e cidade. Todos os 14 tratamentos incluem cidade/UF e assunto específico; title/OG/Twitter concordam. Canonicals permanecem iguais.
- **SEO-02:** cada artigo existente recebe `seoTitle` curto, único, compatível com seu assunto (até 65 caracteres). O H1 editorial continua em `title`. Metadata usa `seoTitle ?? title`, inclusive OG/Twitter. Artigos médicos gerais não repetem a cidade artificialmente.
- **IMG-01:** cruzar as 10 imagens do Word com os arquivos existentes; documentar original, destino, dimensões, páginas e limites da representação. Converter sem alteração visual para WebP, preservar proporção e cadastrar dimensões reais. Não publicar PNGs originais.
- **IMG-02:** ilustrar os artigos existentes de CO2, laser de diodo, ligadura, HPV/CO2, prurido e fissura. Substituir a imagem de retalho na URL existente e corrigir dimensões correspondentes. Imagens devem ter alt contextual e legenda de caráter ilustrativo; nenhuma retrata um paciente da médica ou garante resultado.
- **BLOG-01:** incorporar a pauta `sem corte` na URL existente (sem duplicá-la). Acrescentar artigos distintos de primeiros 30 dias após CO2, pomada, trombose externa e cura/recorrência. Cada um tem fontes acessíveis verificadas, FAQs visíveis, datas verdadeiras, links complementares e limites clínicos. Não copiar promessas universais de dor, prazo ou superioridade; não citar THD como serviço disponível.
- **LOCAL-01:** criar `/blog/como-encontrar-coloproctologista-campo-grande-ms`, explicando `procto`, `proctologista` e `coloproctologista`, verificação de CRM/RQE, preparo, escolha e endereço confirmado. Linkar a página local e consulta inicial. A página local mantém propriedade das buscas comerciais, inclusive `procto campo grande (ms)`; a nova página possui a intenção `como encontrar...`.
- **GRAPH-01:** novos artigos recebem links internos de artigos existentes; referências relacionadas resolvem; imagens primárias constam em Article/ImageObject e sitemap; fontes estruturadas aparecem na página. Auditoria SEO deve terminar sem erros/alertas.
- **QA-01:** lint, build, unitários e e2e passam. Verificador independente confere critérios e executa mutações em cópia temporária. Atualizar PR com commits atômicos e evidências.

## Assumptions

- O Word é material autorizado para preparar mudanças nesta PR, mas não prova a aprovação médica final das adaptações.
- Fotos/diagramas fornecidos são ilustrativos; origem/licença e fidelidade médica precisam de confirmação na revisão antes do merge.
- `Campo Grande (MS)` é a grafia pedida pelo usuário; siglas estruturadas de endereço permanecem MS.
- SEO é mensurado no Search Console após publicação; posição atual e acesso à primeira página não foram comprovados nesta sessão.
- Validação de campos/imagens, links e títulos é relevante; auth, pagamentos, concorrência e persistência remota não se aplicam a conteúdo estático em Git.

## Desenho enxuto

Reusar parser Markdown, `next/image`, fontes/FAQ visíveis, metadata builders e sitemap existentes.
Adicionar apenas `seoTitle?: string` ao modelo; sem CMS, nova biblioteca ou nova URL comercial.
