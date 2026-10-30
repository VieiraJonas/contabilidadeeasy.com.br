# Responsividade e performance — EASY

Validação em 30/10/2026, no build estático de produção. Identidade, cores, conteúdo da marca e IDs das duas páginas foram preservados por comparação do HTML.

## Resultado medido

Landing page, Chrome headless, Lighthouse mobile com throttling simulado padrão:

| Categoria | Pontuação |
| --- | ---: |
| Performance | 100 |
| Acessibilidade | 100 |
| Boas práticas | 100 |
| SEO | 100 |

LCP: aproximadamente 1,2 s. FCP: aproximadamente 1,2 s. TBT: 0 ms. CLS: aproximadamente 0,0001. São resultados locais de laboratório; a pontuação do domínio depende do deploy, CDN, rede e ambiente de execução. O Lighthouse não mede INP de campo nesta execução.

## Responsividade e interação

As páginas `/` e `/design-system/` foram testadas em 320, 375, 390, 412, 768, 1024 e 1440 px: 14 combinações sem overflow horizontal da página, erros de JavaScript ou alvos interativos visíveis abaixo de 48 × 48 px. Os campos de texto, selects e textareas têm fonte de pelo menos 16 px. A medição também desativou o clipping da página para verificar que as correções estruturais não dependem de esconder o overflow. Tabelas e blocos de tokens preservam sua rolagem interna.

O teste móvel exercitou abertura por toque, fechamento por âncora e Escape, retorno do foco e bloqueio/liberação do fundo. O formulário foi validado por toque, incluindo nome obrigatório, caracteres especiais, seleção de serviço, telefone de destino e link alternativo. `window.open` foi interceptado no teste: nenhuma mensagem foi enviada ao WhatsApp.

## Alterações por arquivo

| Arquivo | Alteração |
| --- | --- |
| `src/styles/site.css` | Grades com colunas flexíveis e `min-width: 0`; tipografia fluida mobile; hero em grade com imagem contida; alvos de 48 px; campos de 16 px; transição e bloqueio de fundo do menu. |
| `src/styles/brand.css` | Fontes locais processadas pelo Vite; `font-display: swap`; salvaguardas de box sizing, mídia e largura. |
| `src/styles/catalog.css` | Estilos específicos do catálogo; códigos com quebra; barra lateral e rail ajustados; controles e links de 48 px. |
| `src/layouts/EasyLayout.astro` | Import de CSS comum, preload de Montserrat/Mulish com URLs processadas e favicon otimizado de 64 px. |
| `src/pages/index.astro` | Import do CSS da landing e script processado pelo Astro como módulo. |
| `src/pages/design-system.astro` | CSS/JS específicos do catálogo e imagem responsiva otimizada. |
| `src/components/sections/HeroSection.astro` | `Image` de `astro:assets`, WebP com srcset/sizes, dimensões e prioridade alta somente no hero. |
| `src/components/ui/BrandLogo.astro` | Wordmark derivado da marca original, WebP responsivo, dimensões explícitas e lazy loading. |
| `src/components/layout/FloatingContact.astro` | Nome acessível alinhado ao rótulo visível. |
| `src/components/sections/ManifestoStrip.astro` | Seta decorativa oculta de leitores de tela e alvo de navegação ampliado. |
| `src/scripts/site.js` | Menu com foco contido, Escape, inert no fundo, rolagem preservada e fechamento por âncora; formulário e WhatsApp mantidos. |
| `src/scripts/catalog.js` | Script do catálogo migrado ao pipeline de bundling. |
| `src/assets/images/` e `src/assets/fonts/` | Imagens e fontes migradas de public para o pipeline de origem; original da marca preservado e margens transparentes removidas nas derivações. |
| `astro.config.mjs` | CSS externo com hash no build para cache independente. |
| `vercel.json` | Cache imutável de um ano apenas para os arquivos com hash em `/_astro/`. HTML mantém o comportamento padrão de atualização. |

Os antigos `public/site.css`, `brand.css`, `styles.css`, `site.js`, `app.js` e os assets migrados foram removidos para evitar duas fontes de manutenção. A landing não carrega CSS/JavaScript do catálogo. O build minifica os arquivos e emite nomes com hash. Classes controladas pelo JavaScript foram preservadas.

## Evidências e reprodução

- [Resumo Lighthouse](reports/lighthouse-summary.json).
- [Matriz de responsividade](reports/responsive-results.json).
- Relatório Lighthouse completo e screenshots ficam na pasta de QA do workspace `../.easy-qa/`.
- `npm run build` concluiu com zero erros, gerando as duas rotas e as imagens otimizadas.

O favicon passou de aproximadamente 41 KB para 2 KB; o header usa wordmarks WebP de aproximadamente 4–17 KB conforme a densidade da tela. O hero escolhe a variante pelo `srcset`, sem carregar o PNG original de 3125 × 1875 na página.

Playwright Core e Lighthouse foram instalados somente na pasta externa de QA. `package.json` e `package-lock.json` do projeto não receberam novas dependências.
