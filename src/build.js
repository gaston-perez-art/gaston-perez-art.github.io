// Genera el sitio estático a partir de contenido.js (español, en la raíz)
// y contenido.en.js (inglés, en /en/).
// Uso: node src/build.js   (desde la raíz del repo)

const fs = require('fs');
const path = require('path');
const figuras = require('./figuras');
const marcas = require('./marcas');
const detalle = require('./detalle');

const ROOT = path.join(__dirname, '..');
// Versión de los estilos: cambia con cada edición, así el navegador nunca mezcla una página nueva con estilos viejos.
const VERSION_CSS = require('crypto').createHash('md5').update(fs.readFileSync(path.join(ROOT, 'estilos.css'))).digest('hex').slice(0, 8);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Textos de interfaz por idioma.
const UI = {
  es: {
    html: 'es', otro: 'en', otroNombre: 'EN', otroLabel: 'Read in English',
    skip: 'Ir al contenido', inicio: 'Inicio', nav: ['Trabajo', 'Proyectos', 'Sobre mí'], contacto: 'Contacto', principal: 'Principal',
    tema: 'Cambiar entre modo claro y oscuro',
    footBig: '¿Construimos algo?', footNota: 'Este sitio también lo construí yo: HTML y CSS generados desde un archivo de contenido.', codigo: 'Código',
    leerCaso: 'Leer el caso', verProyecto: 'Ver el proyecto', tradeoff: 'A cambio',
    herramientas: 'Herramientas', siguiente: 'Siguiente', trabajo: 'Trabajo', proyectos: 'Proyectos',
    notaEmpresa: 'Contado sin pantallas ni datos internos: la interfaz de la portada es una ilustración. Las métricas son las que comparto públicamente en mi perfil.',
    avail: 'Buenos Aires · abierto a nuevas conversaciones', verCasos: 'Ver casos', verConstrui: 'Ver lo que construí', empresas: 'Empresas', impacto: 'Impacto',
    secTrabajo: ['01 · Trabajo', 'Producto en empresas que operan a escala', 'Cuatro casos contados por sus decisiones: qué problema había, qué elegí, qué resigné y qué pasó.'],
    secProyectos: ['02 · Proyectos', 'Lo que construyo con mis manos', (n) => `${n} productos de punta a punta. Cada uno resuelve un problema real de alguien que conozco, y cada uno tiene una decisión que lo define.`],
    numeros: { 5: 'Cinco', 6: 'Seis', 7: 'Siete' },
    comienzos: 'Donde empecé', deslizar: 'Deslizá para ver el diagrama completo',
    marquee: ['Discovery', '0 → 1', 'Marketplaces', 'IA aplicada', 'Growth', 'E-commerce', 'Delivery', 'EdTech'],
    titulos: { trabajo: 'Trabajo', proyectos: 'Proyectos', proceso: 'Proceso', quien: 'Quién soy', contacto: 'Contacto' },
    quien: ['De la línea de montaje al producto.', 'Empecé en 2015 en una fábrica, coordinando logística y procesos. Aprendí tecnología en paralelo, cofundé mi primera app en 2018 y en 2021 llegué a producto. Desde entonces hice producto en Coderhouse, Rappi, Henry, Mercado Libre y Bigbox, y en 2026 cierro el círculo con un MBA.', 'Conocé mi historia'],
    hitos: [['2015', 'Penalty', 'Logística y procesos en una fábrica'], ['2018', 'Mobius', 'Cofundo mi primera app, con aprendizaje automático'], ['2021', 'Starter.pe y Coderhouse', 'Primer rol formal en producto'], ['2022', 'Rappi y Henry', 'Product Lead y dos productos de cero a uno'], ['2025', 'Mercado Libre', 'Portal de restaurantes de food delivery'], ['2026', 'Bigbox y MBA', 'E-commerce B2C en cinco países y defensa de tesis']],
    contactoTxt: ['¿Construimos algo?', 'Si estás armando un equipo de producto o tenés un problema que vale la pena resolver, escribime. Respondo cada mensaje.'],
    form: { nombre: 'Tu nombre', mail: 'tu@mail.com', mensaje: 'Contame en qué estás trabajando…', enviar: 'Enviar', asunto: 'Contacto desde el portfolio', nota: 'Se abre tu programa de correo con el mensaje listo.' },
    ciudad: 'Buenos Aires, Argentina', tldr: 'En 30 segundos', funciones: 'Qué se puede hacer', arquitectura: 'Cómo está construido', decisiones: 'Cómo lo pensé',
    secProceso: ['03 · Proceso', 'Cómo trabajo'],
    homeTitle: 'Gastón Pérez · Product Builder',
    homeDesc: 'Senior Product Manager y Product Builder. Casos de producto en Mercado Libre, Rappi, Henry y Bigbox, y los productos que construyo de punta a punta.',
    sobreEyebrow: 'Sobre mí · MBA Candidate', sobreH1: 'Hago producto desde hace <em>ocho años</em>.',
    trayectoria: 'Trayectoria', formacion: 'Formación y más', escribime: 'Escribime', sobreTitle: 'Sobre mí · Gastón Pérez',
  },
  en: {
    html: 'en', otro: 'es', otroNombre: 'ES', otroLabel: 'Leer en español',
    skip: 'Skip to content', inicio: 'Home', nav: ['Work', 'Projects', 'About'], contacto: 'Contact', principal: 'Main',
    tema: 'Switch between light and dark mode',
    footBig: 'Shall we build something?', footNota: 'I built this site too: HTML and CSS generated from a content file.', codigo: 'Code',
    leerCaso: 'Read the case', verProyecto: 'See the project', tradeoff: 'The cost',
    herramientas: 'Tools', siguiente: 'Next', trabajo: 'Work', proyectos: 'Projects',
    notaEmpresa: 'Told without internal screens or data: the interface on the cover is an illustration. The metrics are the ones I share publicly on my profile.',
    avail: 'Buenos Aires · open to new conversations', verCasos: 'See cases', verConstrui: 'See what I built', empresas: 'Companies', impacto: 'Impact',
    secTrabajo: ['01 · Work', 'Product at companies operating at scale', 'Four cases told through their decisions: what the problem was, what I chose, what I gave up and what happened.'],
    secProyectos: ['02 · Projects', 'What I build with my own hands', (n) => `${n} end-to-end products. Each one solves a real problem for someone I know, and each one has a decision that defines it.`],
    numeros: { 5: 'Five', 6: 'Six', 7: 'Seven' },
    comienzos: 'Where I started', deslizar: 'Swipe to see the full diagram',
    marquee: ['Discovery', '0 → 1', 'Marketplaces', 'Applied AI', 'Growth', 'E-commerce', 'Delivery', 'EdTech'],
    titulos: { trabajo: 'Work', proyectos: 'Projects', proceso: 'Process', quien: 'Who I am', contacto: 'Contact' },
    quien: ['From the assembly line to product.', 'I started in 2015 at a factory, coordinating logistics and processes. I learned technology on the side, co-founded my first app in 2018 and moved into product in 2021. Since then I have done product at Coderhouse, Rappi, Henry, Mercado Libre and Bigbox, and in 2026 I close the loop with an MBA.', 'Read my story'],
    hitos: [['2015', 'Penalty', 'Logistics and processes at a factory'], ['2018', 'Mobius', 'I co-found my first app, built with machine learning'], ['2021', 'Starter.pe and Coderhouse', 'First formal product role'], ['2022', 'Rappi and Henry', 'Product Lead and two products from zero to one'], ['2025', 'Mercado Libre', 'Food delivery restaurant portal'], ['2026', 'Bigbox and MBA', 'B2C e-commerce in five countries and thesis defense']],
    contactoTxt: ['Shall we build something?', 'If you are building a product team or have a problem worth solving, write to me. I answer every message.'],
    form: { nombre: 'Your name', mail: 'you@mail.com', mensaje: 'Tell me what you are working on…', enviar: 'Send', asunto: 'Contact from the portfolio', nota: 'Your email app opens with the message ready.' },
    ciudad: 'Buenos Aires, Argentina', tldr: 'In 30 seconds', funciones: 'What you can do', arquitectura: 'How it is built', decisiones: 'How I thought it through',
    secProceso: ['03 · Process', 'How I work'],
    homeTitle: 'Gastón Pérez · Product Builder',
    homeDesc: 'Senior Product Manager and Product Builder. Product cases at Mercado Libre, Rappi, Henry and Bigbox, and the products I build end to end.',
    sobreEyebrow: 'About · MBA Candidate', sobreH1: 'I have been doing product for <em>eight years</em>.',
    trayectoria: 'Experience', formacion: 'Education and more', escribime: 'Write to me', sobreTitle: 'About · Gastón Pérez',
  },
};

// Tema: oscuro por defecto; la elección se recuerda en el navegador.
const HEAD_TEMA = `<script>document.documentElement.classList.add('js');setTimeout(function(){if(!window.__ok)document.documentElement.classList.add('sin-anim')},2000);try{var t=localStorage.getItem('tema');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}</script>`;
const ICONO_TEMA = `<svg class="i-sol" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg><svg class="i-luna" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>`;

function generar(lang) {
  const t = UI[lang];
  const { SITE, HOME, CASOS, SOBRE } = require(lang === 'es' ? './contenido' : './contenido.en');
  const FIG = figuras(lang === 'en');
  const base = lang === 'es' ? 0 : 1; // profundidad de la raíz del idioma
  const empresas = CASOS.filter((c) => c.tipo === 'empresa');
  const principales = empresas.filter((c) => !c.menor);
  const comienzos = empresas.filter((c) => c.menor);
  const propios = CASOS.filter((c) => c.tipo === 'propio');

  // rel: ruta de la página dentro del idioma (ej. "trabajo/bigbox.html").
  function layout({ title, description, body, rel, active = '', conContacto = false }) {
    const depth = base + rel.split('/').length - 1;
    const a = '../'.repeat(depth); // hasta la raíz del sitio (assets)
    const r = '../'.repeat(depth - base); // hasta la raíz del idioma
    const otra = lang === 'es' ? `${a}en/${rel}` : `${a}${rel}`;
    const nav = [
      [t.nav[0], `${r}index.html#trabajo`, 'trabajo'],
      [t.nav[1], `${r}index.html#proyectos`, 'proyectos'],
      [t.nav[2], `${r}sobre-mi.html`, 'sobre'],
    ];
    return `<!doctype html>
<html lang="${t.html}" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${HEAD_TEMA}
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${lang === 'es' ? 'es_AR' : 'en_US'}">
<meta name="theme-color" content="#0b0b0c">
<link rel="alternate" hreflang="es" href="${SITE.url}/${rel}">
<link rel="alternate" hreflang="en" href="${SITE.url}/en/${rel}">
<link rel="icon" href="${a}img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${a}estilos.css?v=${VERSION_CSS}">
</head>
<body>
<div class="fx-luz" aria-hidden="true"></div>
<a class="skip" href="#contenido">${t.skip}</a>
<header class="nav">
  <div class="nav-in">
    <a class="logo" href="${r}index.html" aria-label="${t.inicio}">Gastón Pérez</a>
    <nav aria-label="${t.principal}">
      ${nav.map(([txt, h, k]) => `<a class="nav-l" href="${h}"${active === k ? ' aria-current="page"' : ''}>${txt}</a>`).join('\n      ')}
      <a class="nav-cta" href="${r}index.html#contacto">${t.contacto}</a>
    </nav>
    <div class="tools">
      <a class="tool tool-lang" href="${otra}" hreflang="${t.otro}" lang="${t.otro}" aria-label="${t.otroLabel}" title="${t.otroLabel}">${t.otroNombre}</a>
      <button class="tool tool-tema" type="button" aria-label="${t.tema}" title="${t.tema}">${ICONO_TEMA}</button>
    </div>
  </div>
</header>
<div id="contenido">
${body}
</div>
<footer class="foot${conContacto ? ' foot-slim' : ''}">
  <div class="lava lava-soft" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="w">
    ${conContacto ? '' : `<p class="foot-big">${t.footBig}</p>
    <p><a class="foot-mail" href="mailto:${SITE.email}">${SITE.email}</a></p>`}
    <p class="foot-links"><a href="${SITE.linkedin}">LinkedIn</a><a href="${SITE.github}">GitHub</a><a href="${SITE.adplist}">ADPList</a></p>
    <p class="muted small">${t.footNota} <a href="${SITE.github}/gaston-perez-art.github.io">${t.codigo}</a></p>
  </div>
</footer>
<script>
  document.querySelector('.tool-tema').addEventListener('click', () => {
    const h = document.documentElement;
    const nuevo = h.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    h.setAttribute('data-theme', nuevo);
    try { localStorage.setItem('tema', nuevo); } catch (e) {}
  });
  // Si algo falla, se muestra todo igual: el contenido nunca queda escondido.
  const mostrarTodo = () => document.querySelectorAll('.rev').forEach((el) => el.classList.add('in'));
  try {
  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Entrada escalonada: los hermanos de una misma grilla aparecen uno detrás de otro.
  document.querySelectorAll('.rev').forEach((el) => {
    const hermanos = [...el.parentElement.children].filter((x) => x.classList.contains('rev'));
    el.style.setProperty('--d', (hermanos.indexOf(el) % 4) * 90 + 'ms');
  });
  // Los números cuentan desde cero cuando aparecen.
  const contar = (el) => {
    if (quieto || el.dataset.ok || !el.textContent.includes('%')) return;
    el.dataset.ok = 1;
    const final = el.textContent;
    const nums = final.match(/\\d+(?:[.,]\\d+)?/g);
    if (!nums) return;
    const t0 = performance.now(), dur = 1100;
    const paso = (t) => {
      const k = Math.min(1, Math.max(0, (t - t0) / dur)), e = 1 - Math.pow(1 - k, 3);
      el.textContent = final.replace(/\\d+(?:[.,]\\d+)?/g, (n) => {
        const sep = n.includes(',') ? ',' : '.', dec = (n.split(/[.,]/)[1] || '').length;
        return (parseFloat(n.replace(',', '.')) * e).toFixed(dec).replace('.', sep);
      });
      if (k < 1) requestAnimationFrame(paso); else el.textContent = final;
    };
    requestAnimationFrame(paso);
  };
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.querySelectorAll('.count').forEach(contar);
    if (e.target.classList.contains('count')) contar(e.target);
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.rev, .stats, .case-body, .shead').forEach((el) => io.observe(el));
  // Formulario de contacto: arma el mail y abre el programa de correo.
  document.querySelectorAll('.ct-f').forEach((f) => f.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const d = new FormData(f);
    const cuerpo = d.get('mensaje') + '\\n\\n' + d.get('nombre') + ' · ' + d.get('mail');
    location.href = 'mailto:' + f.dataset.mail + '?subject=' + encodeURIComponent(f.dataset.asunto + ': ' + d.get('nombre')) + '&body=' + encodeURIComponent(cuerpo);
  }));
  // Una luz muy suave sigue al cursor (solo con mouse y si no se pidió menos movimiento).
  const luz = document.querySelector('.fx-luz');
  if (luz && !quieto && matchMedia('(pointer: fine)').matches) {
    let lx = innerWidth / 2, ly = innerHeight / 3, cx = lx, cy = ly, corriendo = false;
    const mover = () => {
      cx += (lx - cx) * 0.12; cy += (ly - cy) * 0.12;
      luz.style.transform = 'translate(' + (cx - 400) + 'px,' + (cy - 400) + 'px)';
      if (Math.abs(lx - cx) + Math.abs(ly - cy) > 0.5) requestAnimationFrame(mover); else corriendo = false;
    };
    addEventListener('pointermove', (e) => { lx = e.clientX; ly = e.clientY; luz.classList.add('on'); if (!corriendo) { corriendo = true; requestAnimationFrame(mover); } }, { passive: true });
    document.addEventListener('pointerleave', () => luz.classList.remove('on'));
  }
  // Parallax suave de las interfaces dentro de las portadas.
  const capas = [...document.querySelectorAll('[data-parallax]')];
  if (!quieto && capas.length && matchMedia('(pointer: fine) and (min-width: 900px)').matches) {
    let pedido = false;
    const mover = () => {
      pedido = false;
      const h = innerHeight;
      capas.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > h) return;
        const p = (r.top + r.height / 2 - h / 2) / h;
        el.style.setProperty('--py', (p * -36).toFixed(1) + 'px');
      });
    };
    addEventListener('scroll', () => { if (!pedido) { pedido = true; requestAnimationFrame(mover); } }, { passive: true });
    mover();
  }
  } catch (e) { mostrarTodo(); }
  window.__ok = true;
</script>
</body>
</html>
`;
  }

  function arte(c, r) {
    if (c.imagen) return `<div class="phone"><img src="${r}${c.imagen.src}" alt="${esc(c.imagen.alt)}" loading="lazy" width="390" height="844"></div>`;
    return `<div class="phone phone-art">${FIG[`arte-${c.arte}`]}</div>`;
  }

  const assets = (depth) => '../'.repeat(depth);

  function cardEmpresa(c) {
    return `<a class="case rev" href="trabajo/${c.slug}.html">
  ${portada(c, assets(base))}
  <div class="case-body">
    <p class="eyebrow">${esc(c.nombre)} · ${esc(c.periodo)}</p>
    <p class="case-metric"><span class="case-num count">${esc(c.portada.valor)}</span> <span class="case-numt">${esc(c.portada.texto)}</span></p>
    <h3>${esc(c.titulo)}</h3>
    <span class="more">${t.leerCaso}</span>
  </div>
</a>`;
  }

  // Los primeros lugares de trabajo: tarjetas chicas, sin portada.
  function cardComienzo(c) {
    return `<a class="start rev" href="trabajo/${c.slug}.html">
  <p class="eyebrow">${esc(c.nombre)} · ${esc(c.periodo)}</p>
  <h3>${esc(c.titulo)}</h3>
  <p>${esc(c.corto)}</p>
  <span class="more">${t.leerCaso}</span>
</a>`;
  }

  // Portada de marca: color, logo e interfaz ilustrada. Comparte nombre de transición
  // con la página del caso, así la tarjeta se expande al entrar.
  function portada(c, a, grande = false) {
    return `<div class="case-cover${grande ? ' case-cover-big' : ''}" style="${marcas.estilo(c.slug)};view-transition-name:cover-${c.slug}">
    ${marcas.logo(c.slug, a)}
    <div class="case-mock" data-parallax>${marcas.interfaz(c.slug)}</div>
  </div>`;
  }

  // Fondo de color propio para cada proyecto, igual en modo claro y oscuro.
  const TINTES = {
    donar: ['#5aa2f0', '#123a78'],
    'billetera-hogar': ['#f08a6c', '#3b1810'],
    heart: ['#e98a8a', '#4a1a22'],
    tecla: ['#f5c7a2', '#b9572f'],
    'entrena-con-jime': ['#e9b7c7', '#7d3b52'],
    fulbito: ['#6a5bd6', '#16122b'],
  };
  const tinte = (slug) => (TINTES[slug] ? `--t1:${TINTES[slug][0]};--t2:${TINTES[slug][1]}` : '');

  function cardPropio(c, i, lista) {
    // La primera va ancha; si sobra una sola en la última fila, va a lo ancho.
    const cls = i === 0 ? ' proj-wide' : i === lista.length - 1 && (lista.length + 1) % 3 === 1 ? ' proj-wide proj-full' : '';
    return `<a class="proj rev${cls}" href="proyectos/${c.slug}.html">
  <div class="proj-media tinte" style="view-transition-name:shot-${c.slug};${tinte(c.slug)}">${arte(c, assets(base))}</div>
  <div class="proj-body">
    <div class="proj-top"><h3>${esc(c.nombre)}</h3><span class="badge ${c.estado[0]}">${esc(c.estado[1])}</span></div>
    <p>${esc(c.corto)}</p>
    <span class="more">${t.verProyecto}</span>
  </div>
</a>`;
  }

  function bloque(b) {
    const [k, ...a] = b;
    if (k === 'h') return `<h2>${esc(a[0])}</h2>`;
    if (k === 'p') return `<p>${esc(a[0])}</p>`;
    if (k === 'lista') return `<ul class="list">${a[0].map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
    if (k === 'tabla')
      return `<div class="tbl"><table><thead><tr>${a[0].map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${a[1]
        .map((f) => `<tr>${f.map((x) => `<td>${esc(x)}</td>`).join('')}</tr>`)
        .join('')}</tbody></table></div>`;
    if (k === 'decision')
      return `<section class="dec rev"><h3>${esc(a[0])}</h3><p>${esc(a[1])}</p>${
        a[2] ? `<p class="dec-tr"><span>${t.tradeoff}</span>${esc(a[2])}</p>` : ''
      }</section>`;
    if (k === 'fig') return `<figure class="fig rev"><div class="fig-scroll">${FIG[a[0]]}</div><figcaption>${esc(a[1])}<span class="fig-hint">${t.deslizar}</span></figcaption></figure>`;
    throw new Error('bloque desconocido: ' + k);
  }

  function paginaCaso(c, i, lista) {
    const sig = lista[(i + 1) % lista.length];
    const carpeta = c.tipo === 'empresa' ? 'trabajo' : 'proyectos';
    const body = `<article class="cs">
  <header class="cs-head w">
    <a class="back" href="../index.html#${carpeta}">← ${c.tipo === 'empresa' ? t.trabajo : t.proyectos}</a>
    <p class="eyebrow">${esc(c.nombre)} · ${esc(c.periodo)}${c.estado ? ` · <span class="badge ${c.estado[0]}">${esc(c.estado[1])}</span>` : ''}</p>
    <h1>${esc(c.titulo)}</h1>
    <p class="lede">${esc(c.bajada)}</p>
    ${c.links && c.links.length ? `<p class="cta-row">${c.links.map(([x, h], k) => `<a class="btn${k ? ' btn-ghost' : ''}" href="${h}">${esc(x)} ↗</a>`).join('')}</p>` : ''}
    ${c.nota ? `<p class="note">${esc(c.nota)}</p>` : ''}
  </header>
  ${c.menor ? '' : c.tipo === 'propio' ? `<div class="cs-hero w-wide tinte" style="${tinte(c.slug)}"><div class="cs-shot" style="view-transition-name:shot-${c.slug}">${arte(c, assets(base + 1))}</div></div>` : `<div class="w-wide cs-cover">${portada(c, assets(base + 1), true)}</div>`}
  <div class="w">
    ${(() => {
      const d = detalle[lang][c.slug];
      if (!d) return '';
      return `<section class="tldr rev"><p class="tldr-k">${t.tldr}</p><dl>${d.resumen.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></section>`;
    })()}
    <dl class="meta">${c.meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
    ${(() => {
      const d = detalle[lang][c.slug];
      if (!d) return '';
      return `<h2 class="sec2">${t.funciones}</h2>
    <div class="feats">${d.funciones.map(([g, items]) => `<section class="feat rev"><h3>${esc(g)}</h3><ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></section>`).join('')}</div>
    <h2 class="sec2">${t.arquitectura}</h2>
    <ol class="stack rev">${d.arquitectura.map(([k, v]) => `<li><span class="stack-k">${esc(k)}</span><span>${esc(v)}</span></li>`).join('')}</ol>
    <h2 class="sec2">${t.decisiones}</h2>`;
    })()}
    ${c.resultados ? `<div class="results">${c.resultados.map(([n, x]) => `<div class="rev"><strong class="count">${esc(n)}</strong><span>${esc(x)}</span></div>`).join('')}</div>` : ''}
    <div class="prose">${c.cuerpo.map(bloque).join('\n')}</div>
    ${c.herramientas ? `<p class="tools-used"><span>${t.herramientas}</span>${esc(c.herramientas)}</p>` : ''}
    ${c.tipo === 'empresa' && !c.menor ? `<p class="note">${t.notaEmpresa}</p>` : ''}
  </div>
  <a class="next w" href="${sig.slug}.html"><span class="muted small">${t.siguiente}</span><span class="next-t">${esc(sig.nombre)} →</span></a>
</article>`;
    return layout({
      title: `${c.nombre} · Gastón Pérez`,
      description: c.bajada,
      body,
      rel: `${carpeta}/${c.slug}.html`,
      active: c.tipo === 'empresa' ? 'trabajo' : 'proyectos',
    });
  }

  // Título de sección: palabra condensada y una línea que se llena al bajar.
  const titulo = (txt, n) => `<div class="shead"><span class="shead-n">0${n}</span><h2 class="shead-t">${esc(txt)}</h2><span class="shead-l" aria-hidden="true"><i></i></span></div>`;

  // Una sola fila de palabras, alternando rellenas y con contorno, separadas por un punto.
  const marquee = () => {
    const items = t.marquee.map((x, k) => `<span class="${k % 2 ? 'mq-o' : ''}">${esc(x)}</span><i class="mq-dot"></i>`).join('');
    return `<section id="banda" class="mq" aria-hidden="true"><div class="mq-track">${items}${items}</div></section>`;
  };

  const LOGOS = [['Mercado Libre', 'img/logos/mercadolibre.svg', 30], ['Rappi', 'img/logos/rappi.svg', 24], ['Henry', 'img/logos/henry.svg', 14], ['Bigbox', 'img/logos/bigbox-negro.png', 20]];
  const logos = (a) => `<div class="logos-row" aria-label="${t.empresas}">${LOGOS.map(([n, src, h]) => `<img src="${a}${src}" alt="${n}" style="height:${h}px">`).join('')}<span class="logo-txt">coderhouse</span></div>`;

  const contacto = () => `
<section id="contacto" class="w-wide sec">
  ${titulo(t.titulos.contacto, 5)}
  <div class="ct">
    <div class="ct-l rev">
      <p class="ct-big">${t.contactoTxt[0]}</p>
      <p class="ct-txt">${t.contactoTxt[1]}</p>
      <p class="ct-dat">${t.ciudad}<br><a href="mailto:${SITE.email}">${SITE.email}</a><br><a href="${SITE.linkedin}">LinkedIn</a></p>
    </div>
    <form class="ct-f rev" data-mail="${SITE.email}" data-asunto="${esc(t.form.asunto)}">
      <div class="ct-2"><input name="nombre" required placeholder="${t.form.nombre}" aria-label="${t.form.nombre}"><input name="mail" type="email" required placeholder="${t.form.mail}" aria-label="${t.form.mail}"></div>
      <textarea name="mensaje" required rows="6" placeholder="${t.form.mensaje}" aria-label="${t.form.mensaje}"></textarea>
      <button type="submit">${t.form.enviar}</button>
      <p class="ct-nota">${t.form.nota}</p>
    </form>
  </div>
</section>`;

  function home() {
    const body = `
<div class="hero-wrap"><div class="lava" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
<section class="hero w-wide">
  <p class="avail"><span class="dot"></span>${t.avail}</p>
  <h1 class="display lines">${HOME.titulo.split('<br>').map((l, i) => `<span class="ln"><span style="--i:${i}">${l}</span></span>`).join('')}</h1>
  <p class="lede">${esc(HOME.bajada)}</p>
  <p class="cta-row"><a class="btn" href="#trabajo">${t.verCasos}</a><a class="btn btn-ghost" href="#proyectos">${t.verConstrui}</a></p>
  ${logos(assets(base))}
</section></div>


<section class="w-wide" aria-label="${t.impacto}">
  <div class="stats">${HOME.metricas
    .map((m) => `<div class="stat rev"><strong>${m.antes ? `<s>${esc(m.antes)}</s> ` : ''}<span class="count">${esc(m.valor)}</span></strong><span>${esc(m.texto)}</span><em>${esc(m.donde)}</em></div>`)
    .join('')}</div>
</section>

<section id="trabajo" class="w-wide sec">
  ${titulo(t.titulos.trabajo, 1)}
  <div class="sec-head"><h2 class="h2">${t.secTrabajo[1]}</h2><p class="muted">${t.secTrabajo[2]}</p></div>
  <div class="cases">${principales.map(cardEmpresa).join('\n')}</div>
  <p class="kicker sub-k">${t.comienzos}</p>
  <div class="starts">${comienzos.map(cardComienzo).join('\n')}</div>
</section>

${marquee()}

<section id="proyectos" class="w-wide sec">
  ${titulo(t.titulos.proyectos, 2)}
  <div class="sec-head"><h2 class="h2">${t.secProyectos[1]}</h2><p class="muted">${t.secProyectos[2](t.numeros[propios.length] || propios.length)}</p></div>
  <div class="projs">${propios.map(cardPropio).join('\n')}</div>
</section>

<section class="w-wide sec">
  ${titulo(t.titulos.proceso, 3)}
  <div class="sec-head"><h2 class="h2">${t.secProceso[1]}</h2></div>
  <ol class="princ">${HOME.principios.map(([x, d], i) => `<li class="rev"><span class="pn">0${i + 1}</span><strong>${esc(x)}</strong><span>${esc(d)}</span></li>`).join('')}</ol>
</section>

<section class="w-wide sec">
  ${titulo(t.titulos.quien, 4)}
  <div class="who">
    <div class="who-l rev"><h2 class="h2">${t.quien[0]}</h2><p class="muted">${t.quien[1]}</p><p class="cta-row"><a class="btn btn-ghost" href="sobre-mi.html">${t.quien[2]} →</a></p></div>
    <ol class="hitos">${t.hitos.map(([y, n, d]) => `<li class="rev"><span class="h-y">${y}</span><span class="h-n">${esc(n)}</span><span class="h-d">${esc(d)}</span></li>`).join('')}</ol>
  </div>
</section>
${contacto()}`;
    return layout({ title: t.homeTitle, description: t.homeDesc, body, rel: 'index.html', conContacto: true });
  }

  function sobre() {
    const body = `
<article class="w about">
  <p class="eyebrow">${t.sobreEyebrow}</p>
  <h1 class="display sm">${SOBRE.h1}</h1>
  <div class="prose">${SOBRE.parrafos.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
  <h2 class="h3">${t.trayectoria}</h2>
  <ul class="tl">${SOBRE.trayectoria
    .map(([w, r, e, s]) => `<li><span class="when">${esc(w)}</span><span><b>${esc(r)}</b> · ${s ? `<a href="trabajo/${s}.html">${esc(e)}</a>` : esc(e)}</span></li>`)
    .join('')}</ul>
  <h2 class="h3">${t.formacion}</h2>
  <dl class="meta meta-1">${SOBRE.formacion.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
  <p class="cta-row"><a class="btn" href="mailto:${SITE.email}">${t.escribime}</a><a class="btn btn-ghost" href="${SITE.linkedin}">LinkedIn ↗</a></p>
</article>`;
    return layout({ title: t.sobreTitle, description: SOBRE.parrafos[0], body: body + contacto(), rel: 'sobre-mi.html', active: 'sobre', conContacto: true });
  }

  // Los links a otros sitios abren en una pestaña nueva.
  const externos = (html) => html.replace(/<a ([^>]*?)href="(https?:\/\/[^"]+)"/g, '<a $1href="$2" target="_blank" rel="noopener"');

  // Antes de escribir: el script de cada página tiene que ser JavaScript válido.
  const revisar = (html, nombre) => {
    for (const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
      try { new Function(m[1]); } catch (e) { throw new Error(`Script inválido en ${lang}/${nombre}: ${e.message}`); }
    }
    return html;
  };
  const externosOk = (html, nombre) => revisar(externos(html), nombre);
  const dir = lang === 'es' ? ROOT : path.join(ROOT, 'en');
  fs.mkdirSync(path.join(dir, 'trabajo'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'proyectos'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), externosOk(home(), 'index'));
  fs.writeFileSync(path.join(dir, 'sobre-mi.html'), externosOk(sobre(), 'sobre-mi'));
  empresas.forEach((c, i, l) => fs.writeFileSync(path.join(dir, 'trabajo', `${c.slug}.html`), externosOk(paginaCaso(c, i, l), c.slug)));
  propios.forEach((c, i, l) => fs.writeFileSync(path.join(dir, 'proyectos', `${c.slug}.html`), externosOk(paginaCaso(c, i, l), c.slug)));
  console.log(`OK ${lang}: index, sobre-mi, ${empresas.length} casos, ${propios.length} proyectos`);
}

generar('es');
generar('en');
