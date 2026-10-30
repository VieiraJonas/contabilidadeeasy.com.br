/** Shared vector geometry. No font or emoji renderer is used for decorative icons. */
export const iconPaths = {
  asterisk: 'M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07',
  'arrow-up-right': 'M5 19 19 5M8 5h11v11',
  'arrow-right': 'M4 12h16M14 6l6 6-6 6',
  'arrow-down': 'M12 4v16M6 14l6 6 6-6',
  'arrow-up': 'M12 20V4M6 10l6-6 6 6',
  'arrow-turn-right': 'M5 4v12h14M14 11l5 5-5 5',
  swap: 'M4 8h16M15 3l5 5-5 5M20 16H4M9 11l-5 5 5 5',
  grid: 'M4 4h16v16H4ZM12 4v16M4 12h16',
  columns: 'M4 4h16v16H4ZM8 4v16M12 4v16M16 4v16',
  section: 'M17 5c0-4-10-4-10 0 0 4 10 4 10 8 0 4-10 4-10 0M7 19c0 4 10 4 10 0 0-4-10-4-10-8 0-4 10-4 10 0',
  check: 'M5 12l5 5L20 7',
  menu: 'M4 6h16M4 12h16M4 18h16',
  pause: 'M8 5v14M16 5v14',
  play: 'M8 4l12 8-12 8Z',
  moon: 'M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z',
  sun: 'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42',
  search: 'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0ZM15 15l6 6',
} as const;

export type IconName = keyof typeof iconPaths;

export const symbolIcons: Readonly<Record<string, IconName>> = {
  '✳': 'asterisk',
  '↗': 'arrow-up-right',
  '→': 'arrow-right',
  '↓': 'arrow-down',
  '↑': 'arrow-up',
  '↳': 'arrow-turn-right',
  '⇄': 'swap',
  '⊞': 'grid',
  '▥': 'columns',
  '§': 'section',
  '✓': 'check',
  '☰': 'menu',
  'Ⅱ': 'pause',
  '▷': 'play',
  '◐': 'moon',
  '◑': 'sun',
  '⌕': 'search',
};

const symbolPattern = new RegExp('([' + Object.keys(symbolIcons).join('') + '])', 'u');

export function splitIconText(text: string): string[] {
  return text.split(symbolPattern).filter(Boolean);
}

/** Used only for catalog labels generated in the browser. Static markup is rendered by Astro. */
export function decorateIcons(root: Node): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (node.parentElement?.closest('svg,script,style,pre,code,textarea,option,[data-keep-symbols]')) continue;
    if (symbolPattern.test(node.textContent || '')) nodes.push(node as Text);
  }
  for (const text of nodes) {
    const fragment = document.createDocumentFragment();
    for (const part of splitIconText(text.data)) {
      const name = Object.hasOwn(symbolIcons, part) ? symbolIcons[part] : undefined;
      if (!name) { fragment.append(document.createTextNode(part)); continue; }
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const attributes = {
        class: 'easy-icon', 'data-icon': name, viewBox: '0 0 24 24',
        width: '1em', height: '1em', fill: 'none', stroke: 'currentColor',
        'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
        'aria-hidden': 'true', focusable: 'false',
      };
      for (const [attribute, value] of Object.entries(attributes)) svg.setAttribute(attribute, value);
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', iconPaths[name]);
      svg.append(path);
      fragment.append(svg);
    }
    text.replaceWith(fragment);
  }
}

export function setIconText(element: HTMLElement, text: string): void {
  element.textContent = text;
  decorateIcons(element);
}
