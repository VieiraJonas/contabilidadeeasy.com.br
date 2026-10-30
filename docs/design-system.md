# EASY — Site e Design System

No projeto Astro, acesse `/` para o site e `/design-system/` para o catálogo. Use `npm run dev` para desenvolvimento e `npm run build` para gerar `dist/`. Fontes e logotipos são locais.

## Arquivos

- `src/pages/index.astro`, `src/styles/site.css`, `src/scripts/site.js`: serviços, segmentos, sobre a EASY, vantagens, dúvidas e contato.
- `src/pages/design-system.astro`: documentação em português, agora com identidade e serviços EASY.
- `src/styles/brand.css`: cores, fontes e papéis de marca compartilhados entre as duas páginas.
- `src/assets/`: logotipo original e fontes Montserrat e Mulish locais.
- `styles.css`: tokens semânticos, temas claro e escuro, componentes, responsividade, impressão e redução de movimento.
- `app.js`: navegação, busca, cálculo de contraste, cópia de cores e CSS, exportação JSON, formulário, abas, preferências, tabela, notificações e diálogo.

## Direção visual

Base modular e editorial de VOID/03 e Open Design, adaptada à EASY. `../LOGO/MODULOS.txt` informa o roxo aproximado #7B3F9F, letras geométricas recortadas e assinatura manuscrita. O logotipo original foi preservado. Montserrat e Mulish são escolhas para a interface; não são apresentadas como fontes originais do logotipo.

A estrutura de conteúdo e os serviços vêm da cópia local `../exatacontabilidadegri.com.br/index.html`: abertura de empresa, troca de contador, MEI, migração para ME, certificado digital, advocacia, comércio e prestação de serviços. Os textos foram reescritos. Contatos, endereço, CRC, responsáveis e promessas exclusivas da Exata não foram transferidos.

## Contato

WhatsApp: (27) 99616-9171 / 5527996169171. Endereço: Rua Joaquim da Silva Lima, 233, Centro, Loja 15, Guarapari – ES, CEP 29200-260.

Os links de serviços abrem mensagens específicas no WhatsApp. O formulário valida o nome e prepara a mensagem com empresa, serviço e observações. O usuário confere e envia no próprio WhatsApp. Há um link de continuação caso a nova janela seja bloqueada. Não há backend ou armazenamento de leads. E-mail e horários não foram informados.

## Uso

Para reutilizar componentes do catálogo, importe `src/styles/brand.css` e `src/styles/catalog.css`. `src/scripts/catalog.js` depende da estrutura do catálogo; a página inicial usa `site.js` e `site.css`. A exportação gera `easy-tokens.json` e permite copiar CSS. Os valores documentados são do tema claro; o tema escuro redefine os papéis semânticos no CSS.

O formulário do catálogo continua sendo demonstrativo e não envia dados. A tabela contém solicitações fictícias. A preferência de tema é persistida localmente quando o navegador permite. O formulário do site abre o WhatsApp apenas após ação explícita do usuário.

## Acessibilidade e adaptação

Inclui navegação por teclado, foco visível, link para pular a navegação, abas com setas/Home/End, diálogo nativo, mensagens de status, erros associados aos campos e respeito a `prefers-reduced-motion`. As razões de contraste são calculadas para os pares indicados. Esses recursos não substituem uma auditoria de acessibilidade no produto final.

O layout usa pontos de adaptação em 640, 1024 e 1200 px. Em telas pequenas, o menu vira uma faixa horizontal. Fontes de sistema mantêm o catálogo utilizável offline.


## Migração para Astro

As páginas usam `src/layouts/EasyLayout.astro`. Os arquivos de `public/` são servidos na raiz da aplicação. Links, imagens, estilos e scripts respeitam `import.meta.env.BASE_URL`; a URL do catálogo é `/design-system/`. Cada página carrega somente seus estilos e seu JavaScript. Os arquivos originais de SITE foram transferidos após validação do build.
