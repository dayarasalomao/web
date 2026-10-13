# Plano técnico de SEO local - Campo Grande/MS

## Objetivo

Fortalecer a associação entre Dra. Dayara Salomão, coloproctologia e Campo Grande/MS nos resultados orgânicos e locais, aproveitando o Perfil da Empresa no Google já verificado e o conteúdo existente.

Este plano não inclui contratação de plano pago da Doctoralia. Também não propõe criar dezenas de páginas locais ou adicionar marcação estruturada sem finalidade clara.

## Estado atual verificado

- O Perfil da Empresa no Google está verificado, vinculado ao site e exibe nota 5,0 com 20 avaliações.
- A homepage e a página local têm títulos, descrições, canonicals e H1 orientados a Campo Grande.
- A página `/locais-de-atendimento/campo-grande` já contém endereço, formas de contato, mapa, serviços, perguntas frequentes, formação, associações e links internos.
- O site já publica `MedicalOrganization`, `Physician`, `MedicalClinic`, `MedicalWebPage`, `MedicalProcedure`, `Article`, `ProfilePage`, `BreadcrumbList` e `FAQPage` em JSON-LD.
- O sitemap contém cerca de 55 URLs indexáveis, incluindo 35 artigos e 14 páginas de tratamento.
- As imagens visíveis na homepage têm texto alternativo e são servidas pelo `next/image`.
- Auditoria Lighthouse mobile de 11/09/2026: SEO 100, acessibilidade 100, performance 75, LCP laboratorial de aproximadamente 5,3 s.

## Princípios de implementação

1. Corrigir e conectar entidades antes de aumentar a quantidade de páginas.
2. Toda informação em JSON-LD deve ser verdadeira, visível ou verificável.
3. Não duplicar páginas para pequenas variações de palavra-chave.
4. Alterações de URL só devem ocorrer com evidência de canibalização no Search Console.
5. Conteúdo médico deve ter fontes identificáveis e revisão real da Dra. Dayara.
6. Otimizações de performance não podem quebrar mensuração de conversões.

## Fase 0 - Linha de base e mensuração

### T0.1 - Registrar a linha de base

Coletar no Google Search Console, para os últimos 28 e 90 dias:

- consultas contendo `campo grande`, `proctologista` e `coloproctologista`;
- impressões, cliques, CTR e posição média por consulta;
- páginas de destino correspondentes;
- páginas indexadas e motivos de exclusão;
- resultados ricos e problemas de dados estruturados.

### T0.2 - Separar fontes locais

Adicionar UTMs ao link do site no Perfil da Empresa no Google:

```text
?utm_source=google&utm_medium=organic&utm_campaign=google_business_profile
```

O canonical da página deve continuar sem UTMs.

### T0.3 - Confirmar eventos de conversão

Validar no GA4/GTM:

- clique em WhatsApp;
- clique em telefone;
- clique em "Como chegar";
- clique no site do Instituto;
- origem da conversão pela campanha do Perfil da Empresa.

**Critério de aceite:** existe um relatório simples com consultas, páginas e conversões que possa ser repetido mensalmente.

## Fase 1 - Entidade local e JSON-LD

### T1.1 - Cadastrar o perfil individual do Google

Adicionar em `src/constants.ts` uma constante específica para o Perfil da Empresa da Dra. Dayara, separada do link do mapa do Instituto.

Exemplo conceitual:

```ts
export const GOOGLE_BUSINESS_PROFILE_URL = 'URL_CANONICA_DO_PERFIL'
export const CLINIC_GOOGLE_MAPS_URL = 'URL_DO_INSTITUTO'
```

Usar a URL do perfil individual em `Physician.sameAs`. Manter a URL do Instituto em `MedicalClinic.sameAs`.

### T1.2 - Revisar o modelo das entidades

Revisar `buildGlobalGraph` e `buildLocationGraph` para manter IDs estáveis e relações claras:

- `Physician`: Dra. Dayara Salomão;
- `MedicalClinic`: Instituto do Aparelho Digestivo;
- `workLocation`: ligação da médica com a clínica;
- `sameAs`: somente perfis realmente pertencentes a cada entidade;
- `hasCredential`: CRM-MS 16556 e RQE 9819;
- `areaServed`: Campo Grande/MS.

Não adicionar um segundo `Organization` genérico. Avaliar se `MedicalOrganization` representa uma organização real da médica ou se o site pessoal deve ter `Physician` como entidade principal.

### T1.3 - Auditar fatos comerciais

Confirmar com a cliente antes de publicar:

- horário real de atendimento da Dra. Dayara;
- telefone que agenda diretamente para ela;
- meios de pagamento;
- convênios aceitos;
- procedimentos efetivamente disponíveis em Campo Grande.

Remover do JSON-LD qualquer campo não confirmado.

### T1.4 - Validar dados estruturados

Adicionar testes automatizados para garantir:

- JSON válido;
- IDs consistentes entre grafos;
- nenhuma URL vazia em `sameAs`;
- clínica e médica não compartilham perfis indevidamente;
- conteúdo FAQ visível é idêntico ao JSON-LD;
- datas estão em ISO 8601.

**Critério de aceite:** Rich Results Test e Schema Markup Validator sem erros; os dados publicados correspondem ao conteúdo visível.

## Fase 2 - Autoridade editorial e fontes médicas

### T2.1 - Criar um modelo de fontes

Estender o frontmatter de artigos com uma lista de fontes:

```yaml
sources:
  - title: Diretriz clínica
    organization: Nome da organização
    url: https://...
    publishedAt: 2024-01-01
    accessedAt: 2026-09-11
```

Atualizar os tipos em `src/lib/blog.ts` e validar os campos ao carregar o conteúdo.

### T2.2 - Renderizar bibliografia visível

Criar uma seção padronizada "Fontes médicas" no fim dos artigos. O texto deve continuar compreensível para pacientes e não deve simular revisão científica.

### T2.3 - Conectar fontes ao Article

Adicionar `citation` ao `Article` somente para as fontes que aparecem na página. Não usar `reviewedBy` sem uma revisão real e identificável.

### T2.4 - Priorizar por dados

Selecionar inicialmente de 6 a 8 páginas a partir de impressões e posição no Search Console. Para cada uma:

- conferir intenção de busca;
- atualizar conteúdo e data;
- acrescentar fontes primárias ou diretrizes;
- revisar clinicamente com a Dra. Dayara;
- melhorar links para condição, tratamento e página de Campo Grande;
- manter linguagem não sensacionalista.

**Critério de aceite:** páginas prioritárias mostram autora, CRM/RQE, data de atualização, fontes e links internos relevantes; `Article.citation` espelha as fontes visíveis.

## Fase 3 - Arquitetura e canibalização

### T3.1 - Criar o mapa palavra-chave -> URL

Manter um documento ou estrutura testável que atribua uma intenção principal a cada página. Exemplos:

- `coloproctologista campo grande` -> página local;
- `doença hemorroidária sintomas` -> artigo de condição;
- `cirurgia de hemorroidas a laser` -> tratamento correspondente;
- `recuperação após cirurgia de hemorroidas` -> artigo pós-operatório.

### T3.2 - Detectar duplicidade editorial

Criar um script de auditoria que reporte:

- `primaryKeyword` duplicada;
- títulos muito próximos;
- páginas sem links internos recebidos;
- artigos sem tratamento relacionado;
- tratamentos sem artigos de apoio;
- links internos quebrados.

### T3.3 - Fortalecer hubs existentes

Melhorar `/blog`, `/tratamentos` e a página local para que funcionem como hubs. Não criar uma nova página apenas para repetir conteúdo existente.

### T3.4 - Decidir consolidações com Search Console

Quando duas URLs disputarem a mesma consulta:

1. escolher a página principal;
2. incorporar o conteúdo útil da secundária;
3. atualizar links internos;
4. aplicar 301 apenas se a página secundária deixar de ter intenção própria;
5. atualizar sitemap e testes.

**Critério de aceite:** cada consulta estratégica tem uma página principal explícita e não existem páginas órfãs.

## Fase 4 - Imagens e compartilhamento

### T4.1 - Corrigir a imagem social padrão

A imagem padrão atual é vertical, mas os metadados declaram 1200 x 630. Criar um arquivo real em proporção 1.91:1, com versão de 1200 x 630, e usá-lo como `og:image` e imagem do Twitter.

### T4.2 - Adicionar imagens aos conteúdos prioritários

Cada imagem editorial deve ter:

- finalidade médica clara;
- nome de arquivo curto e descritivo;
- alt text que descreva a imagem, sem repetição artificial de palavras-chave;
- legenda contextual quando útil;
- dimensões conhecidas;
- validação da Dra. Dayara;
- ausência de dados identificáveis de pacientes.

### T4.3 - Aprimorar dados de imagem

Evoluir o frontmatter para armazenar `src`, `alt`, `caption`, largura e altura. Gerar `ImageObject` em artigos prioritários e incluir imagens relevantes no sitemap.

### T4.4 - Evitar imagens genéricas em escala

Priorizar diagramas próprios e fotografias reais. Não gerar dezenas de imagens decorativas semelhantes apenas para preencher páginas.

**Critério de aceite:** a imagem OG tem dimensões reais; páginas prioritárias têm imagens únicas, responsivas, contextualizadas e descobertas pelo sitemap/Article.

## Fase 5 - Performance

### T5.1 - Otimizar o LCP da homepage

O elemento LCP é o retrato do hero. A auditoria indicou que o navegador recebeu uma variante maior do que a área exibida.

- revisar `sizes` no componente `Hero`;
- testar qualidade e largura geradas;
- preservar `priority` e `fetchPriority="high"`;
- investigar o atraso de renderização provocado por animações/estilos iniciais.

### T5.2 - Reduzir JavaScript de terceiros

Auditar GTM e Google Ads:

- remover tags duplicadas ou não utilizadas;
- carregar scripts não essenciais depois da interação/consentimento quando aplicável;
- preservar eventos indispensáveis;
- testar conversões antes e depois.

### T5.3 - Limpar preconnects

Remover preconnects que não correspondem a solicitações críticas reais, especialmente se as fontes já são auto-hospedadas pelo `next/font`.

### T5.4 - Definir orçamento

Metas laboratoriais mobile iniciais:

- performance >= 85;
- LCP <= 2,5 s quando tecnicamente alcançável;
- CLS <= 0,1;
- TBT <= 200 ms.

Validar depois com dados de campo do Search Console/CrUX, quando disponíveis.

**Critério de aceite:** melhora reproduzível em três execuções mobile, sem perda de eventos de conversão.

## Fase 6 - Testes e documentação

Adicionar verificações para:

- metadata única e canonical correto;
- sitemap sem URLs redirecionadas ou `noindex`;
- imagens obrigatórias existentes;
- frontmatter válido;
- links internos válidos;
- JSON-LD serializável;
- página local contendo nome, cidade, endereço, CRM e RQE;
- nenhum retorno acidental de Curitiba nas superfícies públicas.

Atualizar `README.md`, `CLAUDE.md`, `AGENTS.md` e `public/llms.txt` quando o modelo de conteúdo, as entidades ou as convenções de imagens mudarem.

## Ordem recomendada de execução

1. Fase 0 - linha de base e UTMs.
2. Fase 1 - perfil Google e coerência das entidades.
3. Fase 5 - LCP e tags de terceiros.
4. Fase 2 - fontes médicas e atualização das páginas prioritárias.
5. Fase 3 - arquitetura e canibalização.
6. Fase 4 - imagens editoriais e OG.
7. Fase 6 - testes, documentação e auditoria final.

## Fora do escopo

- contratação de Doctoralia;
- criação em massa de páginas por bairro ou cidade;
- avaliações falsas, incentivadas ou roteirizadas;
- alteração de URLs sem dados do Search Console;
- marcação de avaliações do Google no site como `AggregateRating`;
- schema criado apenas para aumentar volume de JSON-LD;
- afirmações médicas ou comerciais não confirmadas pela cliente.
