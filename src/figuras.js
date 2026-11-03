// Diagramas e ilustraciones en SVG inline. Usan clases de estilos.css
// (.s-*) para que funcionen en modo claro y oscuro.

const nodo = (x, y, w, h, t1, t2, acc) => `
  <g transform="translate(${x},${y})">
    <rect width="${w}" height="${h}" rx="12" class="${acc ? 's-acc-bg' : 's-box'}"/>
    <text x="${w / 2}" y="${t2 ? h / 2 - 4 : h / 2 + 5}" text-anchor="middle" class="s-t">${t1}</text>
    ${t2 ? `<text x="${w / 2}" y="${h / 2 + 15}" text-anchor="middle" class="s-m">${t2}</text>` : ''}
  </g>`;

const flecha = (d) => `<path d="${d}" class="s-arrow" marker-end="url(#ah)"/>`;
const defs = `<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="s-arrowhead"/></marker></defs>`;

module.exports = {
  'loop-bigbox': `<svg viewBox="0 0 640 340" role="img" aria-label="Loop: el regalador compra, el agasajado canjea y agradece, el mensaje se abre el 78% de las veces y el regalador vuelve a comprar">
    ${defs}
    ${nodo(40, 30, 200, 64, 'Regalador compra', 'el regalo')}
    ${nodo(400, 30, 200, 64, 'Agasajado canjea', 'y vive la experiencia')}
    ${nodo(400, 240, 200, 64, 'Agradece', 'mensaje al regalador', true)}
    ${nodo(40, 240, 200, 64, 'Regalador vuelve', 'con un motivo concreto')}
    ${flecha('M246 62 L392 62')}
    ${flecha('M500 100 L500 232')}
    ${flecha('M394 272 L248 272')}
    ${flecha('M140 234 L140 102')}
    <text x="320" y="262" text-anchor="middle" class="s-big">78%</text>
    <text x="320" y="296" text-anchor="middle" class="s-m">tasa de apertura</text>
    <text x="320" y="176" text-anchor="middle" class="s-m">recompra 1,4% → 3,4%</text>
  </svg>`,

  'reputacion-ml': `<svg viewBox="0 0 640 260" role="img" aria-label="Métricas de operación se comparan contra umbrales y definen beneficios o penalizaciones">
    ${defs}
    ${nodo(20, 98, 170, 64, 'Métricas', 'de la operación')}
    ${nodo(240, 98, 160, 64, 'Umbrales', 'propios de delivery')}
    ${nodo(450, 30, 170, 64, 'Beneficios', '3 habilitados', true)}
    ${nodo(450, 166, 170, 64, 'Penalizaciones', 'validadas con Legales')}
    ${flecha('M196 130 L232 130')}
    ${flecha('M406 120 L444 70')}
    ${flecha('M406 140 L444 190')}
    <text x="320" y="230" text-anchor="middle" class="s-m">Issue Rate −1 pp</text>
  </svg>`,

  'confianza-donar': `<svg viewBox="0 0 640 300" role="img" aria-label="Tres capas de confianza: transparencia, confirmación humana e identidad verificada">
    <g transform="translate(40,20)">
      <rect width="560" height="76" rx="14" class="s-box"/>
      <text x="24" y="34" class="s-t">1 · Transparencia</text>
      <text x="24" y="56" class="s-m">El comprobante queda visible en el recorrido de la causa.</text>
    </g>
    <g transform="translate(40,112)">
      <rect width="560" height="76" rx="14" class="s-acc-bg"/>
      <text x="24" y="34" class="s-t">2 · Confirmación humana</text>
      <text x="24" y="56" class="s-m">El beneficiado confirma que llegó. Es el único que ve la plata.</text>
    </g>
    <g transform="translate(40,204)">
      <rect width="560" height="76" rx="14" class="s-box"/>
      <text x="24" y="34" class="s-t">3 · Identidad verificada</text>
      <text x="24" y="56" class="s-m">Quien pide y quien da son personas reales. Mentir expone.</text>
    </g>
  </svg>`,

  'dia-heart': `<svg viewBox="0 0 640 150" role="img" aria-label="Línea de tiempo: el día de la app va de 4 AM a 4 AM; una toma a las 00:30 cuenta para el día anterior">
    <line x1="40" y1="70" x2="600" y2="70" class="s-axis"/>
    <rect x="40" y="58" width="560" height="24" rx="12" class="s-acc-bg"/>
    <text x="40" y="112" text-anchor="middle" class="s-m">4:00</text>
    <text x="180" y="112" text-anchor="middle" class="s-m">mañana</text>
    <text x="320" y="112" text-anchor="middle" class="s-m">tarde</text>
    <text x="460" y="112" text-anchor="middle" class="s-m">noche</text>
    <text x="600" y="112" text-anchor="middle" class="s-m">4:00</text>
    <line x1="518" y1="40" x2="518" y2="90" class="s-mark"/>
    <circle cx="518" cy="70" r="7" class="s-dot"/>
    <text x="518" y="30" text-anchor="middle" class="s-t">00:30 · cuenta para hoy</text>
    <text x="320" y="140" text-anchor="middle" class="s-m">Un día de la app</text>
  </svg>`,

  'arte-heart': `<svg viewBox="0 0 390 844" preserveAspectRatio="xMidYMin slice" role="img" aria-label="Ilustración: un corazón con el trazo de un monitor y la frase Un día más">
    <rect width="390" height="844" class="s-art-bg"/>
    <text x="32" y="96" class="s-art-k">HOY</text>
    <text x="32" y="140" class="s-art-h">10 de 10</text>
    ${[0, 1, 2, 3].map((i) => `<rect x="32" y="${180 + i * 74}" width="326" height="60" rx="14" class="s-art-card"/><circle cx="62" cy="${210 + i * 74}" r="11" class="s-art-ok"/><rect x="88" y="${203 + i * 74}" width="${150 - i * 18}" height="12" rx="6" class="s-art-line"/>`).join('')}
    <path d="M195 640 C120 585 90 545 120 512 C142 488 178 496 195 522 C212 496 248 488 270 512 C300 545 270 585 195 640 Z" class="s-art-heart"/>
    <path d="M60 575 L140 575 L158 545 L178 605 L196 560 L210 575 L330 575" class="s-art-ekg"/>
    <text x="195" y="712" text-anchor="middle" class="s-art-h">Un día más</text>
  </svg>`,

  'arte-fulbito': `<svg viewBox="0 0 390 844" preserveAspectRatio="xMidYMin slice" role="img" aria-label="Ilustración: tabla de posiciones de un torneo de fútbol 5">
    <rect width="390" height="844" class="s-fb-bg"/>
    <text x="32" y="92" class="s-fb-h">APERTURA</text>
    <text x="32" y="130" class="s-fb-h">2026</text>
    <text x="32" y="160" class="s-fb-k">FÚTBOL EN FAMILIA</text>
    ${Array.from({ length: 12 }, (_, i) => `<rect x="${32 + i * 27.5}" y="190" width="22" height="5" rx="2" class="${i < 7 ? 's-fb-on' : 's-fb-off'}"/>`).join('')}
    ${Array.from({ length: 8 }, (_, i) => `<g transform="translate(32,${240 + i * 62})"><rect width="326" height="50" rx="10" class="s-fb-row${i === 0 ? ' s-fb-top' : ''}"/><text x="18" y="31" class="s-fb-n">${i + 1}</text><rect x="48" y="20" width="${140 - (i % 3) * 22}" height="10" rx="5" class="s-fb-name"/><text x="306" y="31" text-anchor="end" class="s-fb-n">${21 - i * 2}</text></g>`).join('')}
  </svg>`,
};
