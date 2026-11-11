// Genera el sitio estático a partir de contenido.js (español, en la raíz)
// y contenido.en.js (inglés, en /en/).
// Uso: node src/build.js   (desde la raíz del repo)

const fs = require('fs');
const path = require('path');
const figuras = require('./figuras');

const ROOT = path.join(__dirname, '..');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Textos de interfaz por idioma.
const UI = {
  es: {
    html: 'es', otro: 'en', otroNombre: 'EN', otroLabel: 'Read in English',
    skip: 'Ir al contenido', inicio: 'Inicio', nav: ['Trabajo', 'Proyectos', 'Sobre mí'], contacto: 'Contacto', principal: 'Principal',
    tema: 'Cambiar entre modo claro y oscuro',
    footBig: '¿Construimos algo?', footNota: 'Este sitio también lo construí yo: HTML y CSS generados desde un archivo de contenido.', codigo: 'Código',
    leerCaso: 'Leer el caso', verProyecto: 'Ver el proyecto', decision: 'Decisión', tradeoff: 'El trade-off',
    herramientas: 'Herramientas', siguiente: 'Siguiente', trabajo: 'Trabajo', proyectos: 'Proyectos',
    notaEmpresa: 'Contado sin pantallas ni datos internos. Las métricas son las que comparto públicamente en mi perfil.',
    avail: 'Buenos Aires · abierto a nuevas conversaciones', verCasos: 'Ver casos', verConstrui: 'Ver lo que construí', empresas: 'Empresas', impacto: 'Impacto',
    secTrabajo: ['01 · Trabajo', 'Producto en empresas que operan a escala', 'Cuatro casos contados por sus decisiones: qué problema había, qué elegí, qué resigné y qué pasó.'],
    secProyectos: ['02 · Proyectos', 'Lo que construyo con mis manos', (n) => `${n} productos de punta a punta. Cada uno resuelve un problema real de alguien que conozco, y cada uno tiene una decisión que lo define.`],
    numeros: { 5: 'Cinco', 6: 'Seis', 7: 'Siete' },
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
    leerCaso: 'Read the case', verProyecto: 'See the project', decision: 'Decision', tradeoff: 'The trade-off',
    herramientas: 'Tools', siguiente: 'Next', trabajo: 'Work', proyectos: 'Projects',
    notaEmpresa: 'Told without internal screens or data. The metrics are the ones I share publicly on my profile.',
    avail: 'Buenos Aires · open to new conversations', verCasos: 'See cases', verConstrui: 'See what I built', empresas: 'Companies', impacto: 'Impact',
    secTrabajo: ['01 · Work', 'Product at companies operating at scale', 'Four cases told through their decisions: what the problem was, what I chose, what I gave up and what happened.'],
    secProyectos: ['02 · Projects', 'What I build with my own hands', (n) => `${n} end-to-end products. Each one solves a real problem for someone I know, and each one has a decision that defines it.`],
    numeros: { 5: 'Five', 6: 'Six', 7: 'Seven' },
    secProceso: ['03 · Process', 'How I work'],
    homeTitle: 'Gastón Pérez · Product Builder',
    homeDesc: 'Senior Product Manager and Product Builder. Product cases at Mercado Libre, Rappi, Henry and Bigbox, and the products I build end to end.',
    sobreEyebrow: 'About · MBA Candidate', sobreH1: 'I have been doing product for <em>eight years</em>.',
    trayectoria: 'Experience', formacion: 'Education and more', escribime: 'Write to me', sobreTitle: 'About · Gastón Pérez',
  },
};

// Tema: oscuro por defecto; la elección se recuerda en el navegador.
const HEAD_TEMA = `<script>try{var t=localStorage.getItem('tema');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}</script>`;
const ICONO_TEMA = `<svg class="i-sol" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg><svg class="i-luna" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>`;

function generar(lang) {
  const t = UI[lang];
  const { SITE, HOME, CASOS, SOBRE } = require(lang === 'es' ? './contenido' : './contenido.en');
  const FIG = figuras(lang === 'en');
  const base = lang === 'es' ? 0 : 1; // profundidad de la raíz del idioma
  const empresas = CASOS.filter((c) => c.tipo === 'empresa');
  const propios = CASOS.filter((c) => c.tipo === 'propio');

  // rel: ruta de la página dentro del idioma (ej. "trabajo/bigbox.html").
  function layout({ title, description, body, rel, active = '' }) {
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
<link rel="stylesheet" href="${a}estilos.css">
</head>
<body>
<a class="skip" href="#contenido">${t.skip}</a>
<header class="nav">
  <div class="nav-in">
    <a class="logo" href="${r}index.html" aria-label="${t.inicio}">Gastón Pérez</a>
    <nav aria-label="${t.principal}">
      ${nav.map(([txt, h, k]) => `<a class="nav-l" href="${h}"${active === k ? ' aria-current="page"' : ''}>${txt}</a>`).join('\n      ')}
      <a class="nav-cta" href="mailto:${SITE.email}">${t.contacto}</a>
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
<footer class="foot">
  <div class="lava lava-soft" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="w">
    <p class="foot-big">${t.footBig}</p>
    <p><a class="foot-mail" href="mailto:${SITE.email}">${SITE.email}</a></p>
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
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.rev').forEach((el) => io.observe(el));
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
    return `<a class="case rev c-${c.color}" href="trabajo/${c.slug}.html">
  <div class="case-cover"><span class="case-num">${esc(c.portada.valor)}</span><span class="case-numt">${esc(c.portada.texto)}</span></div>
  <div class="case-body">
    <p class="eyebrow">${esc(c.nombre)} · ${esc(c.periodo)}</p>
    <h3>${esc(c.titulo)}</h3>
    <span class="more">${t.leerCaso}</span>
  </div>
</a>`;
  }

  function cardPropio(c, i, lista) {
    // La primera va ancha; si sobra una sola en la última fila, va a lo ancho.
    const cls = i === 0 ? ' proj-wide' : i === lista.length - 1 && (lista.length + 1) % 3 === 1 ? ' proj-wide proj-full' : '';
    return `<a class="proj rev${cls}" href="proyectos/${c.slug}.html">
  <div class="proj-media">${arte(c, assets(base))}</div>
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
      return `<section class="dec rev"><p class="dec-k">${t.decision}</p><h3>${esc(a[0])}</h3><p>${esc(a[1])}</p>${
        a[2] ? `<p class="dec-tr"><span>${t.tradeoff}</span>${esc(a[2])}</p>` : ''
      }</section>`;
    if (k === 'fig') return `<figure class="fig rev">${FIG[a[0]]}<figcaption>${esc(a[1])}</figcaption></figure>`;
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
  ${c.tipo === 'propio' ? `<div class="cs-hero w-wide">${arte(c, assets(base + 1))}</div>` : `<div class="cs-band c-${c.color}"><div class="w-wide"><span class="case-num big">${esc(c.portada.valor)}</span><span class="case-numt">${esc(c.portada.texto)}</span></div></div>`}
  <div class="w">
    <dl class="meta">${c.meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
    ${c.resultados ? `<div class="results">${c.resultados.map(([n, x]) => `<div class="rev"><strong>${esc(n)}</strong><span>${esc(x)}</span></div>`).join('')}</div>` : ''}
    <div class="prose">${c.cuerpo.map(bloque).join('\n')}</div>
    ${c.herramientas ? `<p class="tools-used"><span>${t.herramientas}</span>${esc(c.herramientas)}</p>` : ''}
    ${c.tipo === 'empresa' ? `<p class="note">${t.notaEmpresa}</p>` : ''}
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

  function home() {
    const body = `
<div class="hero-wrap"><div class="lava" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
<section class="hero w-wide">
  <p class="avail"><span class="dot"></span>${t.avail}</p>
  <h1 class="display">${HOME.titulo}</h1>
  <p class="lede">${esc(HOME.bajada)}</p>
  <p class="cta-row"><a class="btn" href="#trabajo">${t.verCasos}</a><a class="btn btn-ghost" href="#proyectos">${t.verConstrui}</a></p>
  <p class="logos" aria-label="${t.empresas}">Mercado Libre <i></i> Rappi <i></i> Henry <i></i> Bigbox <i></i> Coderhouse</p>
</section></div>

<section class="w-wide" aria-label="${t.impacto}">
  <div class="stats">${HOME.metricas
    .map((m) => `<div class="stat rev"><strong>${m.antes ? `<s>${esc(m.antes)}</s> ` : ''}${esc(m.valor)}</strong><span>${esc(m.texto)}</span><em>${esc(m.donde)}</em></div>`)
    .join('')}</div>
</section>

<section id="trabajo" class="w-wide sec">
  <div class="sec-head"><p class="kicker">${t.secTrabajo[0]}</p><h2 class="h2">${t.secTrabajo[1]}</h2><p class="muted">${t.secTrabajo[2]}</p></div>
  <div class="cases">${empresas.map(cardEmpresa).join('\n')}</div>
</section>

<section id="proyectos" class="w-wide sec">
  <div class="sec-head"><p class="kicker">${t.secProyectos[0]}</p><h2 class="h2">${t.secProyectos[1]}</h2><p class="muted">${t.secProyectos[2](t.numeros[propios.length] || propios.length)}</p></div>
  <div class="projs">${propios.map(cardPropio).join('\n')}</div>
</section>

<section class="w-wide sec">
  <div class="sec-head"><p class="kicker">${t.secProceso[0]}</p><h2 class="h2">${t.secProceso[1]}</h2></div>
  <ol class="princ">${HOME.principios.map(([x, d], i) => `<li class="rev"><span class="pn">0${i + 1}</span><strong>${esc(x)}</strong><span>${esc(d)}</span></li>`).join('')}</ol>
</section>`;
    return layout({ title: t.homeTitle, description: t.homeDesc, body, rel: 'index.html' });
  }

  function sobre() {
    const body = `
<article class="w about">
  <p class="eyebrow">${t.sobreEyebrow}</p>
  <h1 class="display sm">${t.sobreH1}</h1>
  <div class="prose">${SOBRE.parrafos.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
  <h2 class="h3">${t.trayectoria}</h2>
  <ul class="tl">${SOBRE.trayectoria
    .map(([w, r, e, s]) => `<li><span class="when">${esc(w)}</span><span><b>${esc(r)}</b> · ${s ? `<a href="trabajo/${s}.html">${esc(e)}</a>` : esc(e)}</span></li>`)
    .join('')}</ul>
  <h2 class="h3">${t.formacion}</h2>
  <dl class="meta meta-1">${SOBRE.formacion.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
  <p class="cta-row"><a class="btn" href="mailto:${SITE.email}">${t.escribime}</a><a class="btn btn-ghost" href="${SITE.linkedin}">LinkedIn ↗</a></p>
</article>`;
    return layout({ title: t.sobreTitle, description: SOBRE.parrafos[0], body, rel: 'sobre-mi.html', active: 'sobre' });
  }

  // Los links a otros sitios abren en una pestaña nueva.
  const externos = (html) => html.replace(/<a ([^>]*?)href="(https?:\/\/[^"]+)"/g, '<a $1href="$2" target="_blank" rel="noopener"');

  const dir = lang === 'es' ? ROOT : path.join(ROOT, 'en');
  fs.mkdirSync(path.join(dir, 'trabajo'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'proyectos'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), externos(home()));
  fs.writeFileSync(path.join(dir, 'sobre-mi.html'), externos(sobre()));
  empresas.forEach((c, i, l) => fs.writeFileSync(path.join(dir, 'trabajo', `${c.slug}.html`), externos(paginaCaso(c, i, l))));
  propios.forEach((c, i, l) => fs.writeFileSync(path.join(dir, 'proyectos', `${c.slug}.html`), externos(paginaCaso(c, i, l))));
  console.log(`OK ${lang}: index, sobre-mi, ${empresas.length} casos, ${propios.length} proyectos`);
}

generar('es');
generar('en');
