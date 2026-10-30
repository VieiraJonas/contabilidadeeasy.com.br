# Icones vetoriais

Use `Icon.astro` para simbolos decorativos. A geometria fica em `src/lib/icons.ts`; todos os SVGs herdam `currentColor` e usam `aria-hidden="true"`. Botoes apenas com icone precisam de um nome acessivel no elemento interativo.

```astro
---
import Icon from '../components/ui/Icon.astro';
---
<a href="#contato">Fale com a EASY <Icon name="arrow-up-right" /></a>
```

`IconText.astro` converte simbolos dos dados em SVG durante o build. No catalogo, `decorateIcons` e `setIconText` tratam os rotulos gerados por JavaScript. Nao use caracteres Unicode decorativos diretamente no HTML: o iOS pode apresenta-los como emojis coloridos.

Validacao: build concluido; pagina inicial e catalogo conferidos em 320, 360, 390, 412, 768, 1024 e 1440 px, sem overflow horizontal ou erros de JavaScript. Menu movel e estados dinamicos do catalogo verificados no Chrome com emulacao de toque.
