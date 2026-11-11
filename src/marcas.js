// Portadas de los casos de empresa: color y logo de cada marca, más el producto
// "de juguete": la estructura real de sus pantallas, con bloques en lugar de
// texto y sin datos reales ni internos.

const MARCAS = {
  bigbox: { bg: '#f1f0ec', fg: '#111111', ac: '#111111', ac2: '#ffd166', logo: 'img/logos/bigbox-negro.png', alto: 0.9 },
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
  // Cada portada es el producto "de juguete": la estructura real de la pantalla,
  // con bloques en lugar de texto.
  const foto = (x, y, w, h, n, r = 8) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#ft-${id}-${n % 4})"/>`;
  const fotosDefs = (pares) => `<defs>${pares.map(([a, b], n) => `<linearGradient id="ft-${id}-${n}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`).join('')}</defs>`;
  const corazon = (x, y) => `<circle cx="${x}" cy="${y}" r="7" fill="#ffffff" opacity=".9"/><path d="M${x} ${y + 3}c-3-2.4-4.5-3.8-4.5-5.3 0-1.3 1-2.2 2.1-2.2.9 0 1.6.5 2.4 1.4.8-.9 1.5-1.4 2.4-1.4 1.1 0 2.1.9 2.1 2.2 0 1.5-1.5 2.9-4.5 5.3z" fill="#111"/>`;
  if (slug === 'bigbox') {
    s += fotosDefs([['#c98a62', '#4a2e22'], ['#7b8f6a', '#26301f'], ['#6f86a0', '#1f2c3b'], ['#b07a8a', '#3e2430']]);
    // Home: franja negra, header con buscador, menú, banner con fotos, "Lo más regalado".
    s += pantalla(id, 0, 0, 380, 262, `
      <path d="M0 16a16 16 0 0 1 16-16h348a16 16 0 0 1 16 16v4H0z" fill="#1d1d1d"/>${barra(150, 7, 80, '#ffffff', 5)}
      ${barra(16, 32, 52, '#111', 11)}<rect x="84" y="30" width="120" height="16" rx="5" fill="none" stroke="#d6d6d6"/>
      <rect x="300" y="30" width="64" height="16" rx="5" fill="none" stroke="#5b5bd6" stroke-width="1.5"/>${barra(312, 35, 40, '#5b5bd6', 6)}
      ${[0, 1, 2, 3, 4].map((k) => barra(16 + k * 46, 56, 36, '#3a3a3a', 6)).join('')}
      ${caja(16, 72, 348, 70, '#3b2f29', 8)}${barra(28, 92, 84, '#ffffff', 9)}${barra(28, 106, 60, '#ffffff', 9)}${caja(28, 122, 46, 13, '#e8776a', 4)}
      ${[0, 1, 2, 3].map((k) => foto(168 + k * 48, 80, 44, 54, k, 3)).join('')}
      <rect x="150" y="150" width="80" height="16" rx="5" fill="none" stroke="#5b5bd6" stroke-width="1.5"/>
      ${barra(16, 176, 76, '#111', 9)}${barra(98, 178, 26, '#5b5bd6', 6)}
      ${[0, 1, 2, 3].map((k) => `${foto(16 + k * 88, 192, 80, 54, k)}${corazon(84 + k * 88, 202)}${caja(22 + k * 88, 232, 40, 9, '#ffffff', 4.5)}`).join('')}`);
    // Detalle de una box en el celular.
    s += pantalla(id, 316, 120, 170, 260, `
      ${foto(10, 10, 150, 104, 0, 10)}${corazon(144, 26)}${caja(18, 96, 52, 11, '#ffffff', 5.5)}
      ${barra(14, 126, 80, '#111', 10)}<path d="M18 145l2 4 4.5.6-3.3 3 .8 4.4-4-2.2-4 2.2.8-4.4-3.3-3 4.5-.6z" fill="#f2b736"/>${barra(30, 146, 70, '#cfcfcf', 6)}
      ${barra(14, 164, 130, '#ececec', 6)}${barra(14, 175, 100, '#ececec', 6)}
      ${caja(14, 190, 60, 14, '#f1f1f1', 7)}${caja(80, 190, 60, 14, '#f1f1f1', 7)}
      ${barra(14, 214, 64, '#111', 10)}${caja(14, 232, 142, 20, '#e8776a', 6)}${barra(60, 239, 50, '#ffffff', 6)}`);
  }
  if (slug === 'mercadolibre') {
    // Gestor de pedidos: barra amarilla, menú lateral, local, pestañas y estado vacío.
    s += pantalla(id, 0, 0, 370, 252, `
      <path d="M0 16a16 16 0 0 1 16-16h338a16 16 0 0 1 16 16v14H0z" fill="#ffe600"/>
      <circle cx="18" cy="15" r="7" fill="#ffffff"/>${barra(30, 12, 40, '#2d3277', 6)}${barra(96, 11, 70, '#333', 8)}
      <rect y="30" width="82" height="222" fill="#ffffff"/><rect x="82" y="30" width="1" height="222" fill="#eeeeee"/>
      ${[0, 1, 2, 4, 5, 6, 8, 9, 10].map((k) => `<rect x="12" y="${44 + k * 15}" width="7" height="7" rx="2" fill="none" stroke="#999"/>${barra(24, 45 + k * 15, 40 - (k % 3) * 8, k === 10 ? '#3483fa' : '#d9d9d9', 5)}`).join('')}
      <rect x="83" y="30" width="287" height="222" fill="#ededed"/>
      ${caja(96, 42, 262, 26, '#ffffff', 4)}<circle cx="108" cy="55" r="4" fill="#00a650"/>${barra(118, 52, 70, '#333', 6)}${caja(310, 48, 40, 14, '#3483fa', 4)}
      ${caja(96, 74, 262, 30, '#ffffff', 4)}${[0, 1, 2, 3].map((k) => `${barra(104 + k * 65, 82, 42, k === 1 ? '#333' : '#3483fa', 6)}${barra(104 + k * 65, 92, 28, '#cfcfcf', 5)}`).join('')}<rect x="161" y="74" width="65" height="2" fill="#333"/>
      ${caja(96, 112, 262, 16, '#e2e2e2', 3)}<rect x="96" y="112" width="2.5" height="16" fill="#3483fa"/>${barra(108, 117, 170, '#bdbdbd', 5)}
      ${caja(96, 136, 262, 104, '#e4e4e4', 4)}
      <g transform="translate(208,156)"><path d="M0 12h38v32H0z" fill="#ffffff" stroke="#666" stroke-width="1.4"/><path d="M-4 12l5-11h36l5 11z" fill="#ffffff" stroke="#666" stroke-width="1.4"/><rect x="6" y="22" width="10" height="14" fill="none" stroke="#666" stroke-width="1.2"/><rect x="22" y="24" width="10" height="8" fill="none" stroke="#666" stroke-width="1.2"/></g>
      ${barra(186, 212, 80, '#555', 7)}${barra(166, 224, 120, '#c4c4c4', 5)}`);
    // En el celular: un pedido nuevo con sus estados.
    s += pantalla(id, 318, 112, 170, 262, `
      <path d="M0 16a16 16 0 0 1 16-16h138a16 16 0 0 1 16 16v14H0z" fill="#ffe600"/>${barra(14, 12, 60, '#333', 7)}
      ${[0, 1, 2].map((k) => `${caja(12, 42 + k * 70, 146, 60, '#f5f5f5', 8)}${barra(22, 52 + k * 70, 60, '#333', 7)}${caja(110, 50 + k * 70, 38, 11, ['#e6f7ee', '#e8f0fe', '#fff4d6'][k], 5.5)}${barra(22, 66 + k * 70, 100, '#d6d6d6', 5)}${caja(22, 78 + k * 70, 56, 14, '#3483fa', 4)}`).join('')}`);
    // El agente de soporte con IA del Help Center.
    s += pantalla(id, 40, 268, 200, 110, `
      ${caja(14, 14, 120, 22, '#f1f1f1', 11)}${caja(66, 44, 120, 30, '#3483fa', 12)}${barra(78, 52, 90, '#ffffff', 5)}${barra(78, 62, 60, '#cfe1ff', 5)}${caja(14, 82, 90, 18, '#f1f1f1', 9)}`);
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
    // Portal de partners: menú, filtros, "Visión general", métricas y el gráfico comparativo.
    s += pantalla(id, 0, 0, 380, 256, `
      ${barra(16, 14, 40, '#ff441f', 11)}${caja(270, 12, 40, 14, '#f3f3f3', 7)}<circle cx="324" cy="19" r="7" fill="#f3f3f3"/><circle cx="352" cy="19" r="8" fill="#44c08a"/>
      <rect y="38" width="380" height="1" fill="#eeeeee"/><rect x="84" y="38" width="1" height="218" fill="#eeeeee"/>
      ${[0, 1, 2, 4, 5, 6, 7, 8].map((k) => `${k === 0 ? '<rect x="0" y="50" width="2.5" height="11" fill="#4b6cf7"/>' : ''}<circle cx="16" cy="${56 + k * 19}" r="4" fill="none" stroke="#666" stroke-width="1.2"/>${barra(26, 53 + k * 19, 44 - (k % 3) * 8, k === 0 ? '#222' : '#cfcfcf', 6)}`).join('')}
      ${[0, 1, 2].map((k) => `<rect x="${100 + k * 82}" y="48" width="76" height="13" rx="4" fill="none" stroke="#e6e6e6"/>${barra(106 + k * 82, 52, 50, '#bdbdbd', 5)}`).join('')}
      ${barra(100, 72, 110, '#111', 13)}
      ${[0, 1, 2, 3].map((k) => barra(100 + k * 46, 94, 36, k ? '#cfcfcf' : '#4b6cf7', 5)).join('')}<rect x="100" y="102" width="36" height="2" fill="#4b6cf7"/>
      ${[0, 1].map((k) => `<rect x="${100 + k * 92}" y="112" width="84" height="44" rx="6" fill="#ffffff" stroke="#ececec"/>${barra(108 + k * 92, 120, 46, '#333', 6)}${barra(108 + k * 92, 132, 30, '#111', 10)}${barra(108 + k * 92, 146, 54, '#d6d6d6', 4)}`).join('')}
      <rect x="100" y="164" width="176" height="80" rx="6" fill="#ffffff" stroke="#ececec"/>
      ${[0, 1, 2].map((k) => `<rect x="110" y="${184 + k * 18}" width="156" height="1" fill="#f1f1f1"/>`).join('')}
      <polyline points="110,228 136,218 162,224 188,204 214,212 240,192 266,198" fill="none" stroke="#ff441f" stroke-width="2"/>
      <polyline points="110,234 136,226 162,212 188,216 214,196 240,202 266,184" fill="none" stroke="#7a3ff2" stroke-width="2" stroke-dasharray="3 3"/>
      <rect x="284" y="112" width="84" height="132" rx="6" fill="#ffffff" stroke="#ececec"/>
      <circle cx="346" cy="132" r="15" fill="#111"/>${barra(334, 126, 24, '#ffffff', 5)}${barra(336, 135, 20, '#ffd400', 6)}
      <path d="M294 158l8-4.5 8 4.5v9l-8 4.5-8-4.5z" fill="#e8eefc"/>${barra(316, 159, 36, '#111', 8)}
      ${[0, 1, 2].map((k) => barra(294, 184 + k * 16, 62 - k * 10, '#e6e6e6', 6)).join('')}`);
    // Planes de pago para restaurantes del long tail.
    s += pantalla(id, 300, 150, 196, 210, `
      ${barra(14, 16, 80, '#111', 9)}
      ${[0, 1, 2].map((k) => `${caja(12 + k * 60, 40, 54, 150, k === 1 ? '#ff441f' : '#f6f4f3', 9)}${barra(20 + k * 60, 54, 30, k === 1 ? '#ffffff' : '#111', 7)}${barra(20 + k * 60, 70, 38, k === 1 ? '#ffd0c4' : '#ddd8d6', 12)}${[0, 1, 2].map((r) => barra(20 + k * 60, 98 + r * 14, 36 - r * 6, k === 1 ? '#ffb5a3' : '#e6e1df', 5)).join('')}${caja(20 + k * 60, 164, 38, 16, k === 1 ? '#ffffff' : '#111', 8)}`).join('')}`);
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
