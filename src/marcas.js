// Portadas de los casos de empresa: color y logo de cada marca, más una
// interfaz ilustrada. Las interfaces son abstractas a propósito: no son
// pantallas reales ni muestran datos internos.

const MARCAS = {
  bigbox: { bg: '#2f2559', fg: '#efeaff', ac: '#ff7a59', ac2: '#ffd166', logo: 'img/logos/bigbox.png', alto: 0.9 },
  mercadolibre: { bg: '#ffe600', fg: '#2d3277', ac: '#3483fa', ac2: '#00a650', logo: 'img/logos/mercadolibre.svg', alto: 1.05 },
  henry: { bg: '#0d0d0d', fg: '#f5f5f5', ac: '#ffff01', ac2: '#7b5cff', logo: 'img/logos/henry.svg', alto: 0.42 },
  rappi: { bg: '#ff441f', fg: '#fff4f0', ac: '#ff441f', ac2: '#29c46f', logo: 'img/logos/rappi.svg', alto: 0.85 },
};

// Piezas de interfaz (coordenadas dentro de cada pantalla).
const barra = (x, y, w, c = '#e6e6ea', h = 8) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${c}"/>`;
const caja = (x, y, w, h, c, r = 10) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${c}"/>`;
const pantalla = (id, x, y, w, h, contenido, oscura = false) => `
  <g transform="translate(${x},${y})">
    <rect x="6" y="16" width="${w}" height="${h}" rx="18" fill="#000" opacity=".18"/>
    <rect x="2" y="8" width="${w}" height="${h}" rx="17" fill="#000" opacity=".14"/>
    <rect width="${w}" height="${h}" rx="16" fill="${oscura ? '#1a1a1d' : '#ffffff'}"/>
    <g clip-path="none">${contenido}</g>
  </g>`;

function interfaz(slug) {
  const m = MARCAS[slug];
  const id = slug;
  let s = '';
  if (slug === 'bigbox') {
    const fotos = ['#ff7a59', '#ffd166', '#5ec2b7', '#8f7bff', '#f25f8b', '#4aa3ff'];
    s += pantalla(id, 0, 0, 330, 250, `
      ${barra(20, 20, 90, '#2f2559', 10)}${barra(240, 20, 70, '#ececf2', 10)}
      ${fotos.map((c, i) => `${caja(20 + (i % 3) * 100, 50 + Math.floor(i / 3) * 96, 90, 58, c, 8)}${barra(20 + (i % 3) * 100, 114 + Math.floor(i / 3) * 96, 70, '#e3e3ea', 6)}${barra(20 + (i % 3) * 100, 126 + Math.floor(i / 3) * 96, 40, '#efeff4', 6)}`).join('')}`);
    s += pantalla(id, 300, 150, 200, 210, `
      ${barra(18, 20, 80, '#2f2559', 9)}
      ${Array.from({ length: 28 }, (_, i) => `<circle cx="${30 + (i % 7) * 24}" cy="${52 + Math.floor(i / 7) * 24}" r="8" fill="${i === 17 ? '#ff7a59' : '#f1f0f6'}"/>`).join('')}
      ${caja(18, 158, 164, 34, '#2f2559', 17)}${barra(60, 171, 80, '#ffffff', 8)}`);
    s += pantalla(id, 40, 270, 220, 120, `
      <path d="M38 52c-9-7-14-12-14-18 0-5 4-8 8-8 3 0 5 2 6 4 1-2 3-4 6-4 4 0 8 3 8 8 0 6-5 11-14 18z" fill="#f25f8b"/>
      ${barra(70, 30, 120, '#2f2559', 9)}${barra(70, 48, 90, '#e3e3ea', 7)}${caja(20, 76, 180, 28, '#ffd166', 14)}`);
  }
  if (slug === 'mercadolibre') {
    s += pantalla(id, 0, 0, 340, 240, `
      ${caja(0, 0, 340, 36, '#ffe600', 16)}${caja(0, 20, 340, 16, '#ffe600', 0)}${barra(16, 14, 70, '#2d3277', 9)}
      <path d="M60 150a60 60 0 0 1 120 0" fill="none" stroke="#e8e8ee" stroke-width="16" stroke-linecap="round"/>
      <path d="M60 150a60 60 0 0 1 104 -41" fill="none" stroke="#00a650" stroke-width="16" stroke-linecap="round"/>
      ${barra(96, 160, 48, '#2d3277', 9)}
      ${[0, 1, 2, 3].map((i) => `<circle cx="214" cy="${78 + i * 36}" r="9" fill="${['#00a650', '#3483fa', '#00a650', '#ffb020'][i]}"/>${barra(232, 74 + i * 36, 80 - (i % 2) * 20, '#e6e6ec', 8)}`).join('')}
      ${barra(20, 200, 300, '#f3f3f6', 10)}`);
    s += pantalla(id, 290, 120, 210, 250, `
      ${barra(18, 18, 90, '#2d3277', 9)}
      ${caja(18, 46, 140, 34, '#f1f1f5', 14)}${caja(52, 92, 140, 46, '#3483fa', 14)}${barra(66, 104, 100, '#ffffff', 7)}${barra(66, 118, 70, '#cfe1ff', 7)}
      ${caja(18, 150, 120, 34, '#f1f1f5', 14)}${caja(72, 196, 120, 34, '#3483fa', 14)}${barra(86, 209, 80, '#ffffff', 7)}`);
  }
  if (slug === 'henry') {
    s += pantalla(id, 0, 0, 350, 240, `
      ${caja(0, 0, 70, 240, '#f6f6f6', 16)}${caja(14, 24, 42, 10, '#111', 5)}${[0, 1, 2, 3].map((i) => caja(14, 56 + i * 24, 42, 12, i === 0 ? '#ffff01' : '#e4e4e4', 6)).join('')}
      ${barra(88, 22, 100, '#111', 10)}
      ${caja(88, 50, 120, 88, '#111', 12)}${barra(102, 66, 60, '#ffffff', 7)}${barra(102, 112, 90, '#333', 6)}${barra(102, 112, 56, '#ffff01', 6)}
      ${caja(218, 50, 116, 88, '#7b5cff', 12)}${barra(232, 66, 50, '#ffffff', 7)}${[0, 1, 2].map((i) => `<circle cx="${284 + i * 14}" cy="118" r="8" fill="${['#ffd166', '#ff7a59', '#5ec2b7'][i]}" stroke="#7b5cff" stroke-width="2"/>`).join('')}
      ${[0, 1, 2].map((i) => `<circle cx="96" cy="${166 + i * 24}" r="7" fill="#e4e4e4"/>${barra(110, 162 + i * 24, 150 - i * 30, '#ececec', 8)}`).join('')}`);
    s += pantalla(id, 300, 110, 200, 260, `
      ${barra(18, 20, 80, '#ffffff', 9)}
      ${caja(18, 44, 164, 92, '#2a2a2e', 10)}<path d="M92 76l24 14-24 14z" fill="#ffff01"/>
      ${[0, 1, 2, 3].map((i) => `<circle cx="28" cy="${158 + i * 24}" r="6" fill="${i < 2 ? '#ffff01' : '#3a3a40'}"/>${barra(42, 154 + i * 24, 120 - i * 14, '#3a3a40', 8)}`).join('')}`, true);
    s += pantalla(id, 70, 260, 120, 140, `
      ${barra(14, 16, 60, '#111', 8)}${caja(14, 34, 92, 52, '#7b5cff', 10)}${barra(24, 46, 50, '#ffffff', 6)}${barra(14, 98, 92, '#ececec', 7)}${barra(14, 114, 70, '#ececec', 7)}`);
  }
  if (slug === 'rappi') {
    s += pantalla(id, 0, 0, 360, 230, `
      ${barra(20, 20, 110, '#1a1a1a', 10)}
      ${[0, 1, 2].map((i) => `
        ${caja(20 + i * 110, 48, 100, 160, i === 1 ? '#ff441f' : '#f6f4f3', 12)}
        ${barra(32 + i * 110, 64, 50, i === 1 ? '#ffffff' : '#1a1a1a', 8)}
        ${barra(32 + i * 110, 84, 70, i === 1 ? '#ffd0c4' : '#ddd8d6', 14)}
        ${[0, 1, 2].map((k) => barra(32 + i * 110, 116 + k * 18, 70 - k * 10, i === 1 ? '#ffb5a3' : '#e6e1df', 7)).join('')}
        ${caja(32 + i * 110, 174, 76, 22, i === 1 ? '#ffffff' : '#1a1a1a', 11)}`).join('')}`);
    s += pantalla(id, 300, 130, 200, 240, `
      ${barra(18, 20, 90, '#1a1a1a', 9)}
      ${[52, 80, 64, 104, 92, 124].map((h, i) => caja(22 + i * 27, 140 - h, 18, h, i === 5 ? '#29c46f' : '#ffd0c4', 5)).join('')}
      ${[0, 1, 2].map((i) => `<circle cx="30" cy="${168 + i * 24}" r="8" fill="#ff441f"/>${barra(46, 164 + i * 24, 110 - i * 20, '#efeae8', 8)}`).join('')}`);
  }
  return `<svg class="mock" viewBox="-30 -30 580 460" aria-hidden="true">
    <g transform="rotate(-12 260 200)">${s}</g>
  </svg>`;
}

// Logo de la marca: imagen si hay archivo, si no el nombre en texto.
function logo(slug, a, cls = 'case-logo') {
  const m = MARCAS[slug];
  if (!m.logo) return `<span class="${cls} ${cls}-txt">${m.texto}</span>`;
  return `<img class="${cls}" src="${a}${m.logo}" alt="" style="--logo-h:${m.alto}">`;
}

const estilo = (slug) => {
  const m = MARCAS[slug];
  return `--b-bg:${m.bg};--b-fg:${m.fg};--b-ac:${m.ac}`;
};

module.exports = { MARCAS, interfaz, logo, estilo };
