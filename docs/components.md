# Componentes Astro da página inicial

`src/pages/index.astro` compõe o layout e as dobras. O conteúdo repetido fica em `src/data/home.ts`, com interfaces TypeScript.

## Organização

- `src/components/layout/`: UtilityBar, SiteHeader, SiteFooter e FloatingContact.
- `src/components/sections/`: HeroSection, ManifestoStrip, ServicesSection, SegmentsSection, AboutSection, BenefitsSection, FaqSection e ContactSection.
- `src/components/ui/`: Button, SectionHeading, BrandLogo e FaqItem.
- `src/components/cards/`: ServiceCard, SegmentCard e BenefitCard.
- `src/components/forms/ContactForm.astro`: formulário de primeiro contato.

## Botões e links

```astro
---
import Button from '../components/ui/Button.astro';
---

<Button href="#contato" variant="primary" service="Abertura de empresa">
  Abrir minha empresa ↗
</Button>
<Button href="#servicos" variant="text">Conhecer serviços →</Button>
<Button type="submit" variant="primary">Preparar mensagem</Button>
```

Com `href`, Button gera um link nativo. Sem `href`, gera um botão nativo com `type="button"` por padrão. Atributos HTML e ARIA são repassados. Para links externos, informe `target="_blank"` e `rel="noopener noreferrer"`.

Variantes: `primary`, `outline`, `ghost` e `text`. Tamanhos: `default`, `small` e `large`; use as combinações estilizadas na folha da página. `class` acrescenta classes específicas. O slot recebe o rótulo e eventuais ícones.

`service` gera `data-service`, consumido pelo `public/site.js` na página inicial. Esse comportamento prepara uma conversa de WhatsApp para links de serviço.

## Cards e conteúdo

```astro
---
import ServiceCard from '../components/cards/ServiceCard.astro';
import { services } from '../data/home';
---

<div class="service-grid">
  {services.map((service) => <ServiceCard {...service} />)}
</div>
```

Edite `services`, `segments`, `benefits`, `questions` e `contactServices` em `src/data/home.ts`. Cada lista possui tipos compatíveis com as props de seu componente. Os cards mantêm a semântica `article`; a grade pertence à dobra.

SectionHeading recebe `eyebrow` e `description`; o slot define o título, incluindo quebras e ênfases. BrandLogo centraliza a imagem original e respeita o `BASE_URL`.

## Estilo e comportamento

O visual continua em `public/site.css` e `public/brand.css`, carregados por EasyLayout. `public/site.js` mantém o menu, links por serviço e formulário. A componentização não acrescenta wrappers ou bibliotecas no cliente.

IDs, campos, atributos `data-service` e relações de acessibilidade foram mantidos. Não repita ContactForm na mesma página sem adaptar seus IDs e o script. Os componentes são renderizados no build e não precisam de `client:load`.

Após mudanças estruturais, execute `npm run build`. Consulte também [a identidade e os serviços](design-system.md).
