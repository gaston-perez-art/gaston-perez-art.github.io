// Portadas de los casos de empresa: color y logo de cada marca, más una
// interfaz ilustrada. Son recreaciones en SVG de pantallas públicas del producto
// (o abstractas), sin datos reales ni internos.

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

// ---------------------------------------------------------------- recreaciones fieles
const T = (x, y, txt, size = 9, color = '#333', weight = 400, extra = '') =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}" ${extra}>${txt}</text>`;
const sombra = (w, h, r = 12) => `<rect x="8" y="22" width="${w}" height="${h}" rx="${r + 2}" fill="#000" opacity=".16"/><rect x="3" y="10" width="${w}" height="${h}" rx="${r + 1}" fill="#000" opacity=".12"/>`;
// Ventana de navegador con barra superior y URL.
const ventana = (w, h, url, contenido, oscura = false) => `
  ${sombra(w, h)}
  <rect width="${w}" height="${h}" rx="12" fill="#fff"/>
  <path d="M0 12a12 12 0 0 1 12-12h${w - 24}a12 12 0 0 1 12 12v12H0z" fill="${oscura ? '#202124' : '#ececee'}"/>
  ${[0, 1, 2].map((i) => `<circle cx="${14 + i * 11}" cy="12" r="3.6" fill="${['#ff5f57', '#febc2e', '#28c840'][i]}"/>`).join('')}
  <rect x="${w / 2 - 110}" y="5" width="220" height="14" rx="7" fill="${oscura ? '#35363a' : '#fff'}"/>
  ${T(w / 2, 15, url, 7.5, oscura ? '#bdc1c6' : '#777', 400, 'text-anchor="middle"')}
  <g transform="translate(0,24)">${contenido}</g>`;
const svgMock = (cuerpo, rot = 0, vb = '-20 -20 600 460') =>
  `<svg class="mock fiel" viewBox="${vb}" aria-hidden="true" font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif"><g transform="rotate(${rot} 280 210)">${cuerpo}</g></svg>`;
const icono = (x, y, c = '#9aa0a6') => `<rect x="${x}" y="${y - 7}" width="9" height="9" rx="2.5" fill="none" stroke="${c}" stroke-width="1.2"/>`;

const FIELES = {
  // Gestor de pedidos de Mercado Pago Delivery, hoy con la barra amarilla de Mercado Libre.
  mercadolibre: () => {
    const W = 540, H = 360;
    const menu = ['Inicio', 'Tu perfil', 'Ayuda', '', 'Tu dinero', 'Actividad', 'Enviar dinero', '', 'Cobrar en tu local', 'Link de pago', 'Delivery'];
    let y = 62, items = '';
    menu.forEach((m) => {
      if (!m) { items += `<rect x="12" y="${y - 6}" width="106" height="1" fill="#eee"/>`; y += 8; return; }
      items += icono(14, y) + T(30, y, m, 7.5, '#333'); y += 17;
    });
    ['Gestor de pedidos', 'Catálogo para Delivery', 'Configurar tiempos', 'Informes', 'Planes de suscripción'].forEach((m, i) => {
      items += T(30, y, m, 7, i === 0 ? '#3483fa' : '#333', i === 0 ? 600 : 400); y += 15;
    });
    const tabs = [['Para preparar', '1 pedido', '#3483fa'], ['En preparación', '0 pedidos', '#333'], ['En camino', '0 pedidos', '#3483fa'], ['Finalizados', '1 pedido', '#3483fa']];
    const c = `
      <rect width="${W}" height="${H - 24}" fill="#ededed"/>
      <rect width="${W}" height="34" fill="#ffe600"/>
      <circle cx="20" cy="17" r="9" fill="#fff" opacity=".8"/>${T(34, 14, 'Hola', 6.5, '#555')}${T(34, 24, 'Nivel 1, Mercado Puntos', 7, '#333', 600)}
      ${T(142, 21, 'Gestor de Pedidos', 9, '#333', 600)}
      <rect y="34" width="128" height="${H - 58}" fill="#fff"/>
      ${items}
      <g transform="translate(150,48)">
        <rect width="370" height="34" rx="4" fill="#fff"/>
        <rect x="12" y="11" width="12" height="12" rx="3" fill="#e8f0fe"/>${T(32, 20, 'Local de prueba', 7.5, '#333', 600)}<circle cx="98" cy="17" r="2.5" fill="#00a650"/>${T(104, 20, 'Abierto las 24 hs.', 6.5, '#00a650')}
        <rect x="296" y="9" width="62" height="16" rx="4" fill="#3483fa"/>${T(327, 20, 'Cerrar local', 7, '#fff', 600, 'text-anchor="middle"')}
        <rect y="42" width="370" height="38" rx="4" fill="#fff"/>
        ${tabs.map(([a, b, col], i) => `${T(10 + i * 92, 58, a, 7.5, col, 600)}${T(10 + i * 92, 70, b, 6.5, '#888')}${i === 1 ? `<rect x="${i * 92}" y="42" width="92" height="2" fill="#333"/>` : ''}`).join('')}
        <rect y="92" width="370" height="20" rx="3" fill="#e5e5e5"/><rect y="92" width="2.5" height="20" fill="#3483fa"/>
        <circle cx="14" cy="102" r="4" fill="#3483fa"/>${T(24, 105, 'Para iniciar su recorrido, los repartidores deben escanear las etiquetas impresas.', 6.5, '#444')}
        <rect y="120" width="200" height="16" rx="8" fill="#e2e2e2"/>${T(16, 131, 'Buscar por número de pedido, cliente o producto', 6.5, '#999')}
        ${T(370, 131, 'Consulta las preguntas frecuentes', 6.5, '#3483fa', 400, 'text-anchor="end"')}
        <rect y="144" width="370" height="126" rx="4" fill="#e6e6e6"/>
        <g transform="translate(165,160)" fill="none" stroke="#555" stroke-width="1.3">
          <path d="M0 14h40v34H0z" fill="#fff"/><path d="M-3 14l5-12h36l5 12" fill="#fff"/><path d="M-3 14q5.5 6 11 0q5.5 6 11 0q5.5 6 11 0q5.5 6 11 0"/>
          <rect x="6" y="24" width="10" height="14"/><rect x="22" y="26" width="5" height="9"/><rect x="29" y="26" width="5" height="9"/>
        </g>
        ${T(185, 230, 'Aún no tienes pedidos', 8.5, '#333', 600, 'text-anchor="middle"')}
        ${T(185, 243, 'Aquí podrás gestionar todos los pedidos que recibas al abrir el local.', 6.5, '#777', 400, 'text-anchor="middle"')}
      </g>`;
    return svgMock(`<g transform="translate(70,40)">${ventana(W, H, 'mercadolibre.com.ar/delivery/gestor-de-pedidos', c)}</g>`, -3);
  },

  // Visión general del portal de partners de Rappi.
  rappi: () => {
    const W = 560, H = 370;
    const sec = [['INICIO', ['Visión general', 'Notificaciones', 'Centro de ayuda']], ['ANÁLISIS', ['Top Restaurantes', 'Recomendaciones', 'Nivel de servicio', 'Reseñas', 'Ventas']], ['MARKETING', ['RappiAds']]];
    let y = 58, side = '';
    sec.forEach(([h, items]) => {
      side += T(12, y, h, 6, '#999', 600, 'letter-spacing="1"'); y += 16;
      items.forEach((it) => {
        const on = it === 'Visión general';
        if (on) side += `<rect x="0" y="${y - 10}" width="2.5" height="14" fill="#4b6cf7"/>`;
        side += `<circle cx="17" cy="${y - 3}" r="4" fill="none" stroke="#555" stroke-width="1.1"/>` + T(28, y, it, 7.5, '#222', on ? 600 : 400);
        y += 17;
      });
      y += 6;
    });
    const linea = (pts, col, dash = '') => `<polyline points="${pts}" fill="none" stroke="${col}" stroke-width="1.6" ${dash}/>`;
    const c = `
      <rect width="${W}" height="38" fill="#fff"/><rect y="38" width="${W}" height="1" fill="#eee"/>
      <text x="14" y="26" font-size="17" font-weight="800" font-style="italic" fill="#ff441f" font-family="Georgia, serif">Rappi</text>
      <rect x="352" y="10" width="62" height="18" rx="9" fill="#f4f4f4"/><rect x="360" y="15" width="11" height="8" fill="#d52b1e"/><rect x="360" y="15" width="5" height="4" fill="#0033a0"/>${T(376, 23, 'Chile', 8, '#222', 600)}
      <circle cx="430" cy="19" r="8" fill="#f4f4f4"/>
      ${T(446, 17, 'tu restaurante', 6.5, '#222', 600)}${T(446, 27, 'Administrador', 6.5, '#888')}<circle cx="532" cy="19" r="9" fill="#44c08a"/>
      <rect y="39" width="120" height="${H - 63}" fill="#fff"/><rect x="120" y="39" width="1" height="${H - 63}" fill="#eee"/>
      ${side}
      <rect x="121" y="39" width="${W - 121}" height="${H - 63}" fill="#fafafa"/>
      <g transform="translate(136,50)">
        ${T(0, 12, 'Filtros', 7.5, '#222', 600)}
        ${['Marca: Tu marca', 'Sucursales: Todas', 'Período: Últimos 7 días'].map((f, i) => `<rect x="${36 + i * 112}" y="2" width="104" height="15" rx="4" fill="#fff" stroke="#eee"/>${T(42 + i * 112, 12, f, 6.5, '#555')}`).join('')}
        ${T(0, 48, 'Visión general', 17, '#111', 700)}
        ${['Ventas', 'Órdenes', 'Ticket promedio', 'Clientes'].map((t, i) => T([0, 40, 84, 150][i], 72, t, 7.5, i ? '#333' : '#4b6cf7')).join('')}<rect y="76" width="26" height="2" fill="#4b6cf7"/>
        <rect y="88" width="260" height="190" rx="6" fill="#fff" stroke="#eee"/>
        <rect x="10" y="98" width="115" height="48" rx="5" fill="#fff" stroke="#eee"/>${T(18, 112, 'Venta bruta', 7, '#222', 600)}${T(18, 130, '$ 0', 12, '#111', 700)}${T(18, 141, 'Total de órdenes: 0', 5.8, '#666')}
        <rect x="134" y="98" width="115" height="48" rx="5" fill="#fff" stroke="#eee"/>${T(142, 112, 'Ticket promedio', 7, '#222', 600)}${T(142, 130, '$ 0', 12, '#111', 700)}${T(142, 141, 'Órdenes Pro: $ 0', 5.8, '#666')}
        ${T(10, 162, 'Comparación en valor de ventas', 7, '#222', 600)}
        <rect x="10" y="168" width="6" height="6" fill="#ff441f"/>${T(20, 174, 'Período anterior', 6, '#555')}<rect x="80" y="168" width="6" height="6" fill="#7a3ff2"/>${T(90, 174, 'Período actual', 6, '#555')}
        ${[0, 1, 2, 3].map((i) => `<line x1="30" x2="250" y1="${186 + i * 22}" y2="${186 + i * 22}" stroke="#f1f1f1"/>`).join('')}
        ${linea('30,250 70,236 110,244 150,214 190,226 230,200 250,206', '#ff441f')}
        ${linea('30,256 70,246 110,226 150,232 190,204 230,212 250,190', '#7a3ff2', 'stroke-dasharray="3 3"')}
        <rect x="272" y="88" width="132" height="190" rx="6" fill="#fff" stroke="#eee"/>
        ${T(282, 106, 'Calificación actual', 7.5, '#222', 600)}${T(282, 116, 'Próxima actualización: Marzo', 5.8, '#777')}
        <circle cx="384" cy="104" r="20" fill="#111"/><text x="384" y="102" font-size="7.5" font-weight="800" font-style="italic" fill="#fff" text-anchor="middle" font-family="Georgia, serif">Rappi</text><text x="384" y="112" font-size="8" font-weight="900" fill="#ffd400" text-anchor="middle">TOP</text>
        <path d="M290 136l9-5 9 5v10l-9 5-9-5z" fill="#e8eefc"/>${T(316, 146, 'Básico', 11, '#111', 700)}
        ${T(282, 170, 'Si mejorás tu servicio, podés', 6.3, '#333')}${T(282, 179, 'ganar estos beneficios:', 6.3, '#333')}
        ${[0, 1, 2].map((i) => `<rect x="282" y="${190 + i * 24}" width="8" height="12" rx="2" fill="none" stroke="#555"/><rect x="296" y="${192 + i * 24}" width="${90 - i * 14}" height="5" rx="2.5" fill="#e9e9e9"/><rect x="296" y="${200 + i * 24}" width="${60 - i * 8}" height="4" rx="2" fill="#f1f1f1"/>`).join('')}
      </g>`;
    return svgMock(`<g transform="translate(40,30)">${ventana(W, H, 'partners.rappi.com/home', c, true)}</g>`, -7);
  },

  // Home de Bigbox (aproximada) y el canje del agasajado en el celular.
  bigbox: () => {
    const W = 500, H = 330;
    const fotos = [['#c8846a', '#5b3a2e'], ['#6f8fa8', '#23384a'], ['#b9a36b', '#4d4126'], ['#8aa37a', '#2f3f27']];
    const cats = ['Estadías', 'Gastronomía', 'Aventura', 'Bienestar', 'Regalos'];
    const c = `
      <defs>${fotos.map(([a, b], i) => `<linearGradient id="bbf${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`).join('')}
        <linearGradient id="bbh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#111"/><stop offset=".55" stop-color="#2a2622"/><stop offset="1" stop-color="#8a6a52"/></linearGradient></defs>
      <rect width="${W}" height="${H - 24}" fill="#fff"/>
      <text x="16" y="26" font-size="17" font-weight="700" fill="#111" letter-spacing="-0.6">bigbox</text>
      <rect x="110" y="12" width="230" height="20" rx="10" fill="#f2f2f2"/>${T(124, 25, '¿Qué querés regalar?', 7.5, '#888')}
      ${T(400, 25, 'Canjear', 7.5, '#111', 600)}<rect x="440" y="13" width="44" height="18" rx="9" fill="#111"/>${T(462, 25, 'Ingresar', 7, '#fff', 600, 'text-anchor="middle"')}
      ${cats.map((k, i) => `<rect x="${16 + i * 70}" y="42" width="${k.length * 4.6 + 18}" height="16" rx="8" fill="${i ? '#fff' : '#111'}" stroke="#ddd"/>${T(25 + i * 70, 53, k, 7, i ? '#333' : '#fff', 600)}`).join('')}
      <rect x="16" y="68" width="${W - 32}" height="96" rx="10" fill="url(#bbh)"/>
      ${T(32, 104, 'Regalá experiencias', 15, '#fff', 700)}${T(32, 120, 'Que quien recibe elija la que más le guste.', 7.5, '#ddd')}
      <rect x="32" y="132" width="72" height="18" rx="9" fill="#fff"/>${T(68, 144, 'Ver boxes', 7.5, '#111', 600, 'text-anchor="middle"')}
      ${T(16, 186, 'Los más regalados', 10, '#111', 700)}
      ${fotos.map((f, i) => `<rect x="${16 + i * 118}" y="194" width="110" height="64" rx="8" fill="url(#bbf${i})"/>
        <rect x="${16 + i * 118}" y="264" width="${86 - i * 8}" height="6" rx="3" fill="#222"/><rect x="${16 + i * 118}" y="275" width="60" height="5" rx="2.5" fill="#ccc"/>
        ${T(16 + i * 118, 296, '$' + [89, 125, 64, 149][i] + '.900', 8, '#111', 700)}`).join('')}`;
    const tel = `
      ${sombra(150, 290, 24)}
      <rect width="150" height="290" rx="24" fill="#111"/><rect x="6" y="6" width="138" height="278" rx="19" fill="#fff"/>
      <rect x="58" y="12" width="34" height="8" rx="4" fill="#111"/>
      <text x="18" y="44" font-size="12" font-weight="700" fill="#111" letter-spacing="-0.4">bigbox</text>
      ${T(18, 64, 'Tu regalo', 10, '#111', 700)}${T(18, 76, 'De parte de Ana', 7, '#777')}
      <rect x="18" y="84" width="114" height="70" rx="8" fill="url(#bbf1)"/>
      ${T(18, 170, 'Elegí tu experiencia', 8, '#111', 600)}
      ${[0, 1].map((i) => `<rect x="${18 + i * 59}" y="178" width="55" height="40" rx="6" fill="url(#bbf${i * 2})"/>`).join('')}
      <rect x="18" y="236" width="114" height="22" rx="11" fill="#111"/>${T(75, 250, 'Canjear', 8, '#fff', 600, 'text-anchor="middle"')}`;
    return svgMock(`<g transform="translate(20,40)">${ventana(W, H, 'bigbox.com.ar', c)}</g><g transform="translate(410,110)">${tel}</g>`, -4, '-20 -20 600 460');
  },
};

function interfaz(slug) {
  if (FIELES[slug]) return FIELES[slug]();
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
