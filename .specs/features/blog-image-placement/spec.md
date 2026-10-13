# Blog: posição das imagens e mídia nos cards

Escopo médio. Base: `1f2964c5feaf335d489248eafaf29f0bd05d0cb5`. 40 posts, 24 ilustrados (29 imagens), 16 sem imagem.

## Critérios de aceitação

- AC1: cada imagem fica junto ao trecho que explica seu conteúdo, por edição do Markdown. Nunca imagens consecutivas; figuras múltiplas ficam em seções H2 diferentes e em ordem editorial.
- AC2: antes do primeiro H2, no máximo uma imagem, somente se corresponder a `image.src`. Não inserir em listas/tabelas/FAQ/fontes/CTA. Nenhuma imagem após o último H2, inclusive em última seção clínica: confirmado explicitamente pelo usuário. Proibir também imagens soltas ao final e após fontes/FAQ/CTA.
- AC3: teste unitário analisa todos os posts e rejeita posições proibidas, com exemplos negativos para cada regra.
- AC4: `MdxImage` usa a legenda do frontmatter para a imagem correspondente; nas demais, usa o título Markdown. `role=group` e `aria-label` existem somente com legenda. Preservar alt, disclaimers e conteúdo clínico; não inventar legendas.
- AC5: `/blog` e `LatestArticles` mostram `cardImage` em painel 16:9, decorativo (`alt=""`), inteiro (`object-contain`), com `next/image fill`. Posts sem imagem usam marca decorativa no mesmo painel. O título continua sendo o único nome acessível do link.
- AC6: somente os dois primeiros cards de `/blog` carregam com prioridade; demais imagens e homepage carregam sob demanda. `sizes` do blog: `(max-width: 768px) 100vw, 50vw`; homepage ajusta a terceira coluna em 1280px. Não há rolagem horizontal em 375px.
- AC7: preservar seleção de `cardImage`, OG, sitemap e JSON-LD. Preservar ativos, frontmatter e significado do texto médico.
- AC8: lint, build, unitários, auditoria SEO e e2e aprovados; capturas desktop/375px de blog, homepage e três posts de duas imagens anexadas nesta pasta. Verificação independente com teste de regressão em cópia temporária.

Revisão clínica e de procedência continua necessária antes do merge conforme `CLAUDE.md`; esta tarefa não faz merge nem cria imagens.

## Colocação editorial

| Post | Imagem | Seção | Motivo |
| --- | --- | --- | --- |
| cisto-pilonidal-cirurgia-convencional-x-laser | cisto-pilonidal-convencional-x-laser-silac.webp | Cirurgia convencional (excisão) | Comparação com laser depois da explicação da excisão convencional, antes da lista de fechamento. |
| cisto-pilonidal-cirurgia-convencional-x-laser | cisto-pilonidal-tecnica-retalho.webp | Cirurgia a laser de diodo (SiLaC/SiLaT) | Imediatamente antes do H2 de retalho, com a ressalva original; respeita a proibição literal de imagem após o último H2. |
| cisto-pilonidal-laser-epsit | cisto-pilonidal-convencional-x-laser-silac.webp | Como funciona a abordagem videoassistida com laser | Mostra a fibra SiLaC depois da explicação de sua inserção, fora da lista de etapas EPSiT. |
| drenagem-abscesso-perianal-e-risco-de-fistula | abscesso-anal-drenagem-evolucao-fistula.webp | Por que a forma como o abscesso é drenado importa tanto? | Mostra a persistência do canal e precede a lista de fatores relacionados à drenagem. |
| eletrocauterio-laser-diodo-laser-co2-diferencas | instrumentos-eletrocauterio-laser-diodo-co2.webp | O que essas tecnologias têm em comum | Introduz visualmente as três formas de energia usadas nos instrumentos. |
| eletrocauterio-laser-diodo-laser-co2-diferencas | comparativo-instrumentos-cirurgicos.webp | Laser de CO2 | Compara os instrumentos depois da definição do último, antes das aplicações e do H2 final. |
| fissura-anal-causas-sintomas | fissura-anal-anatomia.webp | O que é a fissura anal | Relaciona a anatomia à definição do corte na mucosa. |
| fistula-anal-laser-vaaft-filac | fistula-anal-etapas-formacao.webp | Por que a fístula não fecha sozinha | Mostra a infecção, o abscesso e a persistência do canal já descritos. |
| fistula-anal-o-que-e-sintomas | fistula-anal-etapas-formacao.webp | De onde ela vem | Ilustra o trajeto após drenagem do abscesso, explicado nos parágrafos anteriores. |
| hemorroida-externa-trombosada | hemorroida-externa-trombosada.webp | Como é uma hemorroida externa trombosada? | Preserva a posição junto à definição e à ressalva de que a imagem não diagnostica. |
| hemorroida-externa-trombosada | trombectomia-hemorroidaria-ilustracao.webp | Quais são as opções de tratamento? | Preserva a opção médica no tratamento e usa a ressalva existente como legenda Markdown. |
| hemorroida-ou-plicoma-como-diferenciar | hemorroida-x-plicoma-anal.webp | Resumo prático | Comparação anatômica junto à tabela que diferencia as duas condições. |
| hemorroidas-qual-tecnica-cirurgica-escolher | comparativo-tecnologias-cirurgia-proctologica.webp | E o laser de CO2? | As três tecnologias já foram apresentadas; permite comparar antes de discutir vantagens e limites. |
| hemorroidas-sem-corte-laser-diodo | hemorroidoplastia-laser-diodo.webp | Como funciona a tecnologia | A fibra interna é mostrada logo após a explicação de sua ação. |
| hemorroidectomia-laser-co2 | laser-co2-instrumento.webp | O que o laser de CO2 faz no tecido | A imagem do instrumento acompanha sua definição, com a legenda original do frontmatter. |
| hemorroidectomia-laser-co2 | instrumentos-eletrocauterio-laser-diodo-co2.webp | A confusão que vale desfazer | A comparação visual aparece depois da distinção entre diodo e CO2, sem interromper a lista. |
| hpv-anal-identificar-tratar | plicoma-x-hpv-perianal.webp | Nem toda lesão anal é HPV | Compara o aspecto das lesões depois da descrição do plicoma. |
| hpv-perianal-laser-co2 | plicoma-x-hpv-perianal.webp | Antes de tratar: é mesmo HPV? | Mostra a comparação depois das descrições de condiloma e plicoma. |
| hpv-perianal-laser-co2 | laser-co2-regiao-perianal.webp | Como é feito na prática | A aplicação do instrumento acompanha a explicação do ambiente de procedimento. |
| lesoes-verrugas-nodulos-regiao-anal-o-que-observar | plicoma-x-hpv-perianal.webp | Plicoma ou HPV: a confusão mais comum | Precede a lista de diferenças visuais, sem interromper a tabela anterior. |
| ligadura-elastica-hemorroidas-internas | ligadura-elastica-etapas.webp | Como funciona o procedimento? | As quatro etapas acompanham a explicação do anel e do aparelho usado. |
| plicoma-anal-causas-e-tratamento | plicoma-anal-ilustracao.webp | O que é o plicoma anal? | A prega de pele é mostrada logo após sua definição. |
| plicoma-anal-laser-co2 | plicoma-anal-ilustracao.webp | Antes da técnica: esse plicoma precisa sair? | Ilustra o aspecto benigno descrito antes de discutir necessidade de retirada. |
| plicoma-ou-hpv-perianal-como-diferenciar | plicoma-x-hpv-perianal.webp | Como diferenciar no dia a dia | Comparação visual imediatamente antes da lista de características. |
| pomada-hemorroida-resolve | pomadas-hemorroidas.webp | O que a pomada pode fazer | Acompanha a descrição dos produtos, preservando a legenda que não recomenda marcas. |
| por-que-a-fistula-anal-aparece | fistula-anal-etapas-formacao.webp | Como ela se forma, passo a passo | Diagrama das etapas junto à lista completa, antes de seu início. |
| pos-operatorio-cirurgia-hemorroidas-o-que-esperar | pos-operatorio-hemorroidas-comparativo.webp | Resumo comparativo | Linha do tempo junto à comparação de recuperação, após explicar cada técnica. |
| primeiros-30-dias-hemorroidectomia-laser-co2 | laser-co2-instrumento.webp | Introdução | Manter lead autorizado pelo frontmatter junto ao esclarecimento de que a cirurgia retira tecido. |
| prurido-anal-causas-cuidados | prurido-anal-desconforto.webp | Prurido anal e coceira anal são a mesma coisa | Ilustra o desconforto logo após a definição do sintoma, com a ressalva original. |
