# Execução

## E1 — imagem existente no EPSiT

Suposição confirmada pelo usuário: reutilizar a figura do próprio artigo, mesmo que compartilhada no comparativo de cirurgia pilonidal. Adicionada image enriquecida com dimensões1600×893 e legenda já existente, removida coverImage gerada. Arquivo retirado de public/registro; procedência mantida em docs/blog-generated-images-retired.json.

Gate aprovado após revalidação: lint0, unit131/131 e e2e EPSiT1/1. Os40 cards têm imagem e39 src distintos; a única duplicação é o par EPSiT/comparativo pilonidal. O teste afirma o par e o src exatos, não apenas uma contagem menor. Teste de baseline agora protege src e dimensões originais porque o usuário explicitamente autorizou reescrever alt/caption.

I1: blog-covers.test.ts:18–25 afirma40/40/39 e duplicação exata; generated-blog-assets.test.ts:13–17 afirma22 ativos,16+6 e hashes distintos; image-editorial-review.spec.ts:8/10/11/13 confirma src existente no card/body/OG/Twitter, :17/19 confirma404 do arquivo retirado e sua ausência no sitemap. Novo spec de revisão preserva as solicitações anteriores de posicionamento/ressalvas.

Nota de execução: o e2e inicial não iniciou porque o servidor existente estava em3000, não3003. O resultado foi registrado cedo demais no commit inicial; repetido na porta correta; foi observado o estado transitório de metadados durante navegação. O teste mantém o valor esperado e agora aguarda URL e contagem de tags estabilizadas.

Revalidação concluída: e2e1/1 com navegação e metadados estabilizados, lint0 repetido. Commit inicial será corrigido antes de enviar a branch.
