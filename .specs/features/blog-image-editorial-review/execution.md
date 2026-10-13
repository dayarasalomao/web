# Execução

## E1 — imagem existente no EPSiT

Suposição confirmada pelo usuário: reutilizar a figura do próprio artigo, mesmo que compartilhada no comparativo de cirurgia pilonidal. Adicionada image enriquecida com dimensões1600×893 e legenda já existente, removida coverImage gerada. Arquivo retirado de public/registro; procedência mantida em docs/blog-generated-images-retired.json.

Gate aprovado após revalidação: lint0, unit131/131 e e2e EPSiT1/1. Os40 cards têm imagem e39 src distintos; a única duplicação é o par EPSiT/comparativo pilonidal. O teste afirma o par e o src exatos, não apenas uma contagem menor. Teste de baseline agora protege src e dimensões originais porque o usuário explicitamente autorizou reescrever alt/caption.

I1: blog-covers.test.ts:18–25 afirma40/40/39 e duplicação exata; generated-blog-assets.test.ts:13–17 afirma22 ativos,16+6 e hashes distintos; image-editorial-review.spec.ts:8/10/11/13 confirma src existente no card/body/OG/Twitter, :17/19 confirma404 do arquivo retirado e sua ausência no sitemap. Novo spec de revisão preserva as solicitações anteriores de posicionamento/ressalvas.

Nota de execução: o e2e inicial não iniciou porque o servidor existente estava em3000, não3003. O resultado foi registrado cedo demais no commit inicial; repetido na porta correta; foi observado o estado transitório de metadados durante navegação. O teste mantém o valor esperado e agora aguarda URL e contagem de tags estabilizadas.

Revalidação concluída: e2e1/1 com navegação e metadados estabilizados, lint0 repetido. Commit inicial será corrigido antes de enviar a branch.

## E2 — catálogo editorial completo

42 imagens ativas inspecionadas em três contact sheets locais; alt físico e caption contextual definidos manualmente em docs/blog-image-editorial-review.json. Todas as45 figuras de corpo agora têm legenda visível. Adicionada image metadata nos seis posts ainda sem ela; figuras secundárias recebem título Markdown, com a ressalva do retalho transferida sem duplicação. Nenhum pixel alterado, sem nova geração de imagem.

Avisos clínicos originais preservados literalmente nos11 campos preservedDisclaimer. As22 imagens editoriais têm textos específicos por cena, sem a antiga legenda genérica nem menção pública à IA. As pessoas/cenários são chamados de ilustrativos, sem apresentá-los como pacientes/consulta real ou atribuir identidade à médica. A legenda de prurido já era específica e foi mantida; seu alt foi refinado.

Gate aprovado: lint0, unit134/134, cinco e2e5/5 incluindo todas as45 figuras dos40 artigos. Comparação SHA protege prosa e todos os metadados clínicos/títulos/resumos/FAQs/fontes da base5a275c9, excluindo apenas campos de imagens e a legenda avulsa migrada. Textos e pixels não foram alterados fora deste escopo.

| Critério | Evidência/assertion | Esperado | Coberto |
| --- | --- | --- | --- |
| I2/3 catálogo e imagens | image-editorial-review.test.ts:30–37 count/registro/hash/limites/caveats |42 arquivos íntegros e textos contextualizados | Sim |
| I2/4 metadata e figuras | image-editorial-review.test.ts:43/44/49/50/54/55/59 |40 primárias, alt/caption exatos,45 legendas de corpo | Sim |
| I3 prosa/mensagem médica | image-editorial-review.test.ts:72/73 hashes da base |nenhuma mudança de títulos/resumos/prosa/fontes/FAQ | Sim |
| I2/4 render | image-editorial-review.spec.ts:38–45 alt/caption/role/aria-label e total45 |legendas correspondem à revisão no navegador | Sim |

Mapeamento reverso: três unitários novos e o e2e global cobrem I2–4; testes existentes de captions foram atualizados ao novo texto por src. O teste de CO2 agora delimita a legenda à figura primária, pois a segunda figura também ganhou legenda. EPSiT comprova navegação do card e imagem de corpo e verifica OG/Twitter no documento completo (reload): dev/HMR pode manter temporariamente metadados da página anterior na navegação client. Nenhuma assertion de valor esperado foi relaxada; nenhum teste removido/ignorado. O preparo inicial em/tmp não encontrou gray-matter; corrigida resolução local e aplicação rerodada antes do gate aprovado.

Refinamento final da revisão: o alt do comparativo nomeia explicitamente hemorroida e plicoma, conforme os rótulos da figura, em vez de depender só do termo técnico tecido hemorroidário. A legenda mantém seu caráter educativo. Unit134/134, lint0 e smoke de três casos, incluindo as45 figuras, aprovados após o ajuste.
