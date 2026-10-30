# Equipe e marquee contábil

A página inicial agora apresenta a equipe após Sobre a EASY. O marquee vem depois da equipe, antes das vantagens, preservando o ManifestoStrip da abertura.

## Arquivos criados

- `src/assets/team/carol-avatar-3d.png`
- `src/assets/team/jully-avatar-3d.png`
- `src/assets/team/mari-avatar-3d.png`
- `src/assets/team/nina-avatar-3d.png`
- `src/data/team.ts`
- `src/components/cards/TeamCard.astro`
- `src/components/sections/TeamSection.astro`
- `src/components/ui/Marquee.astro`
- `docs/team-marquee.md` e `docs/reports/team-marquee.json`

Os PNGs originais em `../LOGO/AVATARES/3d/` foram copiados e preservados; os arquivos em `src/assets/team/` conferem por SHA-256. A página carrega as variantes WebP produzidas pelo Astro, com lazy loading, dimensões explícitas e srcset de 240 a 960 px. A moldura mantém o avatar completo, sem recortar rosto ou corpo.

## Arquivos editados

- `src/pages/index.astro`: importa e posiciona TeamSection e Marquee.
- `src/components/sections/BenefitsSection.astro`: kicker passa para 05.
- `src/components/sections/FaqSection.astro`: kicker passa para 06.
- `src/components/sections/ContactSection.astro`: kicker passa para 07.
- `docs/components.md`: referências para os novos componentes.

Os estilos são locais aos componentes e usam os tokens de cores e fontes existentes. A grade possui uma coluna abaixo de 640 px, duas entre 640 e 1023 px e quatro a partir de 1024 px. Cards têm borda sutil, fundo branco, moldura lavanda e hover discreto de -2 px, respeitando redução de movimento.

## Dados e reutilização

Nomes, funções, apresentações e imagens ficam em `src/data/team.ts`. Cada integrante tem um `number` único, utilizado também na associação acessível do card com o título.

```astro
---
import TeamSection from '../components/sections/TeamSection.astro';
import Marquee from '../components/ui/Marquee.astro';
---

<TeamSection />
<Marquee />
```

Marquee aceita `id`, `items` e `duration` (segundos; padrão de 70 s). Ao usar mais de uma instância na mesma página, informe IDs diferentes.

```astro
<Marquee id="valores-easy" items={['GESTÃO COM CLAREZA', 'ATENDIMENTO PRÓXIMO']} duration={40} />
```

O loop usa duas cópias de mesma largura e anima somente `transform` com timing linear. Hover em dispositivos com mouse pausa o movimento; o controle Pausar letreiro funciona como checkbox nativo, por toque ou teclado, sem JavaScript. Marcado significa pausado; desmarcar retoma do mesmo ponto. As cópias visuais estão ocultas de tecnologias assistivas; a lista é fornecida uma única vez para leitores de tela.

Com `prefers-reduced-motion: reduce`, o movimento e o controle são removidos e a lista visual fica estática, com wrap e sem duplicação. A versão de impressão também fica estática.

## Verificação

- `npm run build`: concluído com zero erros.
- Chrome headless: 320, 360, 375, 390, 412, 640, 768, 1024 e 1440 px; sem overflow da página mesmo desativando seu clipping e sem erros de JavaScript.
- Quatro avatares decodificados em todas as larguras; grid de 1/2/4 colunas confirmado.
- Em 390 px com densidade 3x, os quatro avatares selecionaram a variante WebP de 960 px.
- Pausa por controle, retomada pelo teclado, hover e redução de movimento testados.
- Loop verificado com grupos de larguras iguais. A animação se moveu durante amostragem local de requestAnimationFrame, com intervalo mediano de aproximadamente 8,3 ms; essa amostragem registra a cadência do navegador no ambiente de QA.
- Variantes WebP dos avatares: aproximadamente 4–28 KB, conforme a resolução, frente a cerca de 1,7 MB por PNG original.

[Evidências resumidas dos testes](reports/team-marquee.json). Screenshots e scripts de QA ficam em `../.easy-qa/`, fora da aplicação. Nenhuma dependência foi adicionada ao projeto.
