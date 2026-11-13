# Auditoria de descoberta — Dra. Dayara Salomão

Registro de 12 de novembro de 2026. Nada disto foi publicado em produção.

A ausência numa seleção de assistente não prova deficiência do site. O site já é encontrado. O problema verificável de identidade está na ficha do Instituto.

## Leitura principal

A página do Instituto do Aparelho Digestivo (`https://www.institutodigestivo.com.br/sobre-nos`) publica, no cartão da Dra. Dayara, CRM/MS 16556 e em seguida “Ginecologia e Obstetrícia” com “RQE Nº: 6348 - RQE N: 9819”. O parágrafo seguinte a chama de cirurgiã proctologista, membro da SBCP e da SBLMC, com pós-graduação em Disfunções do Assoalho Pélvico pela UNIFAL-MG. O RQE 6348 também aparece no cartão da Dra. Tamires Richards de Andrade. O site da Dayara publica só CRM-MS 16556 e RQE 9819, como coloproctologista. Quem cruza as duas páginas pode atribuir ginecologia a ela ou descartar a coloproctologia.

## O que o site já faz bem

- Home, `/sobre` e `/locais-de-atendimento/campo-grande` respondem 200 para Googlebot, Bingbot e OAI-SearchBot.
- `index, follow`, canonical correto, CRM e RQE no HTML inicial, sem depender de JavaScript.
- Sitemap publicado com 61 URLs, sem Curitiba. `/locais-de-atendimento/curitiba` responde 404.
- `/about` responde 308 para `/sobre`. `/contact` e `/contato` vão para Campo Grande. `/privacy` vai para a política.
- `robots.txt` libera `OAI-SearchBot` (busca do ChatGPT) e, à parte, `GPTBot` (treinamento). `Google-Extended` não está bloqueado, então o uso para treinamento do Gemini também segue o `User-agent: *`.
- Nome, CRM-MS 16556, PUC-PR, Instituto, R. Alagoas 700 e telefone (67) 3320-9500 batem entre o site dela e a página do Instituto. O WhatsApp de agendamento do site é outro número: (67) 2180-3675. O Instituto usa 3320-9500 também no WhatsApp.

O Google diz que AI Overviews e AI Mode usam os mesmos fundamentos de SEO. Não há otimização que garanta inclusão, e indexar não é garantido. Fonte: [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features), atualizado em 10 dez 2025. No Search Console, esse tráfego entra no tipo Web, sem filtro separado.

A OpenAI separa `OAI-SearchBot` (aparecer na busca do ChatGPT) de `GPTBot` (treinamento). Fonte: [Overview of OpenAI Crawlers](https://developers.openai.com/api/docs/bots). A Central de Ajuda pede permitir o OAI-SearchBot e os IPs publicados em [openai.com/searchbot.json](https://openai.com/searchbot.json).

## Não verificado

- Situação do CRM-MS 16556 e a especialidade do RQE 9819. A busca do CFM (`https://portal.cfm.org.br/busca-medicos/`) depende de JavaScript e reCAPTCHA. Não há URL estável do resultado. O site já aponta para o formulário.
- Firewall da Vercel por IP. Um user-agent falso que recebe 200, a partir daqui, não prova que o IP real do robô passa. Como testar: logs do firewall da Vercel, inspeção de URL no Search Console e confronto do IP com `https://openai.com/searchbot.json`, `https://openai.com/gptbot.json` e as listas do Googlebot e do Bingbot.
- Search Console e cliques. Não havia acesso nesta auditoria.
- Diretório público da SBCP e da Sociedade Brasileira de Laser. As duas sociedades estão declaradas no site dela e no texto do Instituto. Não inventar link.
- Nome completo do “Hospital Mackenzie”. Só o site dela traz a residência em coloproctologia.
- Horário completo do Instituto no Google. O site deixa claro que segunda a sexta, 9h–18h, é o horário dela, não o da clínica.

## Credenciais

| Item | Fonte nesta auditoria | O que fazer |
| --- | --- | --- |
| Nome, CRM-MS 16556, PUC-PR, Instituto, Alagoas 700, (67) 3320-9500 | Site dela e página do Instituto | Manter. WhatsApp de agendamento continua (67) 2180-3675. |
| Residência em Cirurgia Geral, Santa Casa de Curitiba, 2022 | Só o site dela | Pedir comprovante. |
| Residência em Coloproctologia, Hospital Mackenzie, 2024 | Só o site dela | Pedir o nome completo do hospital. Não completar por dedução. |
| Curso no IRCAD América Latina, 2025 | Só o site dela | Tratado como curso de aperfeiçoamento, não como RQE. |
| Pós em assoalho pélvico, UNIFAL-MG, 2026 | Site dela; Instituto diz que ela possui a pós; a referência editorial antiga dizia “pós-graduanda” | Não publicar “concluída” nem “em andamento” até ela confirmar. |
| SBCP e SBLMC | Site dela e texto do Instituto | Manter a declaração. Sem link até haver página pública. |
| Ginecologia e RQE 6348 | Só a ficha do Instituto | Não publicar no site dela. Pedir correção ao Instituto. |
| Docência, preceptoria, publicações | Não aparecem no material publicado | Não incluir sem documento. |

## O que este branch muda, ainda sem publicar

- Graduação, residência médica, curso de aperfeiçoamento e pós-graduação ficam com rótulos diferentes. A pós deixa de ser descrita como “especialização avançada”.
- O hero mostra CRM-MS 16556, RQE 9819 e explica que coloproctologia também é chamada de proctologia.
- Saíram formulações de “excelência” sem comprovação no hero, no currículo, no contato e na introdução dos depoimentos. Os depoimentos em si não foram reescritos.
- O horário de segunda a sexta, 9h–18h, fica atribuído à Dra. Dayara na página de Campo Grande e no Markdown. No JSON-LD, esse horário vai para a médica (`hoursAvailable`), não para o Instituto.
- `medicalSpecialty: Coloproctology` saiu. Esse valor não existe em `schema.org/MedicalSpecialty`. Cirurgia ou Gastroenterologia descreveriam outra prática. A especialidade visível ficou em `hasOccupation` (“Coloproctologista”) e `knowsAbout`.
- A clínica deixa de ser marcada como se só fizesse coloproctologia.

Texto da home:

> A coloproctologia — também chamada de proctologia — cuida das doenças do cólon, do reto e da região anal. O atendimento é no Instituto do Aparelho Digestivo.
>
> A consulta começa pela avaliação. Procedimentos minimamente invasivos, inclusive com laser, só entram na conversa quando o exame indica.

Ainda restam, de propósito, trechos como “melhores resultados no tratamento”, “Atendimento Extraordinário” e “tecnologia avançada” em cards de tratamento. Não há documento que os sustente.

Não foi criada página nova, texto oculto, avaliação inventada nem instrução para manipular assistentes.

## Perguntas para a reunião

- Resultado atual da busca do CFM para CRM-MS 16556, com a especialidade vinculada ao RQE 9819.
- Nome completo do hospital da residência em coloproctologia.
- A pós da UNIFAL-MG em 2026 está concluída ou em andamento?
- Comprovantes e links públicos da SBCP e da Sociedade Brasileira de Laser em Medicina e Cirurgia.
- Correção da ficha do Instituto, para retirar ginecologia e o RQE 6348.
- URL estável do perfil no Google, no lugar de `share.google`, e o perfil de Campo Grande na Doctoralia, se existir.
- Docência, preceptoria ou publicações somente com o documento correspondente.
- Confirmar que segunda a sexta, 9h–18h, é o horário dela, e não o expediente do Instituto.

## Como medir, quando retomar

No Search Console, Desempenho, tipo Web. Esse total já inclui AI Overviews e AI Mode. Acompanhar consultas com coloproctologista, proctologista e Campo Grande, mais cliques e indexação de `/`, `/sobre` e `/locais-de-atendimento/campo-grande`. Os botões de WhatsApp já marcam conversão (`data-conversion`). Uma resposta isolada de assistente não é indicador de sucesso.

Para o firewall: logs da Vercel, inspeção de URL no Search Console e comparação do IP com as listas publicadas da OpenAI, do Googlebot e do Bingbot.
