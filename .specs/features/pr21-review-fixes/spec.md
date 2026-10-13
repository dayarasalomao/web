# Correções da revisão da PR #21

Base da revisão: `356a7df`; base de implementação: `a068ecd`, incluindo a alteração concorrente de WhatsApp preservada. Escopo autorizado em 2026-10-12: corrigir dois P2 e três referências quebradas. Preservar alterações locais de WhatsApp já existentes.

## Critérios de aceite

- **SCHEMA-01:** os nós da médica nos grafos global e local declaram exatamente `['Person', 'Physician']`, mantendo `https://www.dayarasalomao.com.br/#physician`. `worksFor` aponta para o ID de MedicalClinic e `workLocation` para o mesmo local. Perfis sameAs da médica e clínica continuam separados; author/publisher/ProfilePage preservam seus IDs. `Person` permite os atributos pessoais; `Physician` mantém a identidade médica/local. JSON-LD com múltiplos tipos é permitido pelo JSON-LD 1.1.
- **AUDIT-01:** a contagem de entrada editorial usa o mesmo `getRelatedPosts` da página (limite padrão de quatro, ignorando inexistentes e a própria página). Referências depois desse limite não contam. Links Markdown no corpo para outro artigo também contam, inclusive com fragmento/query/trailing slash. Links para a própria página não contam. Tratamentos contam somente os artigos efetivamente retornados por `getRelatedPostsForTreatment`. Um artigo sem entradas recebe `weak-editorial-inbound`; o conteúdo atual continua com auditoria 0/0.
- **SOURCE-01:** as três referências de 2024 em doença hemorroidária, ligadura elástica e recuperação da ligadura usam exatamente `https://www.ascrsu.com/ascrs/repview?name=3_2851101_PDF&type=784-156`, PDF oficial de Hawkins et al., Dis Colon Rectum 2024;67:614–623, DOI 10.1097/DCR.0000000000003276. Link verificável HTTP 200/PDF, acessado em 2026-10-12, seção de fontes e Article.citation iguais. Última atualização dos artigos reflete esta mudança. Nenhuma afirmação clínica é alterada.
- **QA-01:** unitários, lint, build, e2e e auditoria passam; verificação independente com sensores em cópia temporária; commits apenas do escopo, enviados à PR #21.

## Execução lean

1. Schema → `src/lib/structured-data.ts`, teste de schema novo e ajuste do seletor em `tests/unit/lib.test.ts`; gate unitário + lint; commit `fix(seo): type physician entities for personal relationships`.
2. Links reais → `src/lib/seo-audit.ts`, testes isolados de contagem/alerta; gate unitário + audit:seo; commit `fix(seo): audit only rendered editorial inbound links`.
3. Fontes → três artigos, teste dos links/citações e e2e; gate lint/build/unitários/audit/e2e; commit `fix(content): restore ASCRS guideline references`.
4. Verificação independente e evidências → relatório/spec/estado; commit de documentação e envio à PR.

## Decisões e limites

Tipagem múltipla preserva os IDs e o modelo atual sem criar uma terceira entidade comercial. Não alterar títulos, URLs, cronologia clínica ou convenções de imagens nesta correção. A validação de disponibilidade da fonte é feita ao atualizar, não como dependência de rede dos testes unitários. O PDF foi aberto no portal oficial e identificado por título, autores, ano e DOI. Alterações de WhatsApp são de outro trabalho e não entram nos commits desta entrega.
