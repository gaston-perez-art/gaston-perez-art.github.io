// Genera el sitio estático a partir de contenido.js.
// Uso: node src/build.js   (desde la raíz del repo)

const fs = require('fs');
const path = require('path');
const { SITE, HOME, CASOS, SOBRE } = require('./contenido');
const FIG = require('./figuras');

const ROOT = path.join(__dirname, '..');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const empresas = CASOS.filter((c) => c.tipo === 'empresa');
const propios = CASOS.filter((c) => c.tipo === 'propio');

function layout({ title, description, body, depth = 0, active = '' }) {
  const r = depth ? '../' : '';
  const nav = [
    ['Trabajo', `${r}index.html#trabajo`, 'trabajo'],
    ['Proyectos', `${r}index.html#proyectos`, 'proyectos'],
    ['Sobre mí', `${r}sobre-mi.html`, 'sobre'],
  ];
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta name="theme-color" content="#f6f4ef" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#121210" media="(prefers-color-scheme: dark)">
<link rel="icon" href="${r}img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${r}estilos.css">
</head>
<body>
<a class="skip" href="#contenido">Ir al contenido</a>
<header class="nav">
  <div class="nav-in">
    <a class="logo" href="${r}index.html" aria-label="Inicio">Gastón Pérez</a>
    <nav aria-label="Principal">
      ${nav.map(([t, h, k]) => `<a href="${h}"${active === k ? ' aria-current="page"' : ''}>${t}</a>`).join('\n      ')}
      <a class="nav-cta" href="mailto:${SITE.email}">Contacto</a>
    </nav>
  </div>
</header>
<div id="contenido">
${body}
</div>
<footer class="foot">
  <div class="w">
    <p class="foot-big">¿Construimos algo?</p>
    <p><a class="foot-mail" href="mailto:${SITE.email}">${SITE.email}</a></p>
    <p class="foot-links"><a href="${SITE.linkedin}">LinkedIn</a><a href="${SITE.github}">GitHub</a><a href="${SITE.adplist}">ADPList</a></p>
    <p class="muted small">Este sitio también lo construí yo: HTML y CSS generados desde un archivo de contenido. <a href="${SITE.github}/gaston-perez-art.github.io">Código</a></p>
  </div>
</footer>
<script>
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.rev').forEach((el) => io.observe(el));
</script>
</body>
</html>
`;
}

// ---------------------------------------------------------------- piezas
function arte(c, r = '') {
  if (c.imagen) return `<div class="phone"><img src="${r}${c.imagen.src}" alt="${esc(c.imagen.alt)}" loading="lazy" width="390" height="844"></div>`;
  return `<div class="phone phone-art">${FIG[`arte-${c.arte}`]}</div>`;
}

function cardEmpresa(c) {
  return `<a class="case rev c-${c.color}" href="trabajo/${c.slug}.html">
  <div class="case-cover"><span class="case-num">${esc(c.portada.valor)}</span><span class="case-numt">${esc(c.portada.texto)}</span></div>
  <div class="case-body">
    <p class="eyebrow">${esc(c.nombre)} · ${esc(c.periodo)}</p>
    <h3>${esc(c.titulo)}</h3>
    <span class="more">Leer el caso</span>
  </div>
</a>`;
}

function cardPropio(c) {
  return `<a class="proj rev" href="proyectos/${c.slug}.html">
  <div class="proj-media">${arte(c)}</div>
  <div class="proj-body">
    <div class="proj-top"><h3>${esc(c.nombre)}</h3><span class="badge ${c.estado[0]}">${esc(c.estado[1])}</span></div>
    <p>${esc(c.corto)}</p>
    <span class="more">Ver el proyecto</span>
  </div>
</a>`;
}

function bloque(b, r) {
  const [t, ...a] = b;
  if (t === 'h') return `<h2>${esc(a[0])}</h2>`;
  if (t === 'p') return `<p>${esc(a[0])}</p>`;
  if (t === 'lista') return `<ul class="list">${a[0].map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
  if (t === 'tabla')
    return `<div class="tbl"><table><thead><tr>${a[0].map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${a[1]
      .map((f) => `<tr>${f.map((x) => `<td>${esc(x)}</td>`).join('')}</tr>`)
      .join('')}</tbody></table></div>`;
  if (t === 'decision')
    return `<section class="dec rev"><p class="dec-k">Decisión</p><h3>${esc(a[0])}</h3><p>${esc(a[1])}</p>${
      a[2] ? `<p class="dec-tr"><span>El trade-off</span>${esc(a[2])}</p>` : ''
    }</section>`;
  if (t === 'fig') return `<figure class="fig rev">${FIG[a[0]]}<figcaption>${esc(a[1])}</figcaption></figure>`;
  throw new Error('bloque desconocido: ' + t);
}

function paginaCaso(c, i, lista) {
  const r = '../';
  const sig = lista[(i + 1) % lista.length];
  const carpeta = c.tipo === 'empresa' ? 'trabajo' : 'proyectos';
  const head = `<article class="cs">
  <header class="cs-head w">
    <a class="back" href="${r}index.html#${c.tipo === 'empresa' ? 'trabajo' : 'proyectos'}">← ${c.tipo === 'empresa' ? 'Trabajo' : 'Proyectos'}</a>
    <p class="eyebrow">${esc(c.nombre)} · ${esc(c.periodo)}${c.estado ? ` · <span class="badge ${c.estado[0]}">${esc(c.estado[1])}</span>` : ''}</p>
    <h1>${esc(c.titulo)}</h1>
    <p class="lede">${esc(c.bajada)}</p>
    ${c.links && c.links.length ? `<p class="cta-row">${c.links.map(([t, h], k) => `<a class="btn${k ? ' btn-ghost' : ''}" href="${h}">${esc(t)} ↗</a>`).join('')}</p>` : ''}
    ${c.nota ? `<p class="note">${esc(c.nota)}</p>` : ''}
  </header>
  ${c.tipo === 'propio' ? `<div class="cs-hero w-wide">${arte(c, r)}</div>` : `<div class="cs-band c-${c.color}"><div class="w-wide"><span class="case-num big">${esc(c.portada.valor)}</span><span class="case-numt">${esc(c.portada.texto)}</span></div></div>`}
  <div class="w">
    <dl class="meta">${c.meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
    ${c.resultados ? `<div class="results">${c.resultados.map(([n, t]) => `<div class="rev"><strong>${esc(n)}</strong><span>${esc(t)}</span></div>`).join('')}</div>` : ''}
    <div class="prose">${c.cuerpo.map((b) => bloque(b, r)).join('\n')}</div>
    ${c.herramientas ? `<p class="tools"><span>Herramientas</span>${esc(c.herramientas)}</p>` : ''}
    ${c.tipo === 'empresa' ? `<p class="note">Contado sin pantallas ni datos internos. Las métricas son las que comparto públicamente en mi perfil.</p>` : ''}
  </div>
  <a class="next w" href="${sig.slug}.html"><span class="muted small">Siguiente</span><span class="next-t">${esc(sig.nombre)} →</span></a>
</article>`;
  return layout({
    title: `${c.nombre} · Gastón Pérez`,
    description: c.bajada,
    body: head,
    depth: 1,
    active: c.tipo === 'empresa' ? 'trabajo' : 'proyectos',
  });
}

function home() {
  const body = `
<section class="hero w-wide">
  <p class="avail"><span class="dot"></span>Buenos Aires · abierto a nuevas conversaciones</p>
  <h1 class="display">${HOME.titulo}</h1>
  <p class="lede">${esc(HOME.bajada)}</p>
  <p class="cta-row"><a class="btn" href="#trabajo">Ver casos</a><a class="btn btn-ghost" href="#proyectos">Ver lo que construí</a></p>
  <p class="logos" aria-label="Empresas">Mercado Libre <i></i> Rappi <i></i> Henry <i></i> Bigbox <i></i> Coderhouse</p>
</section>

<section class="w-wide" aria-label="Impacto">
  <div class="stats">${HOME.metricas
    .map(
      (m) => `<div class="stat rev"><strong>${m.antes ? `<s>${esc(m.antes)}</s> ` : ''}${esc(m.valor)}</strong><span>${esc(m.texto)}</span><em>${esc(m.donde)}</em></div>`
    )
    .join('')}</div>
</section>

<section id="trabajo" class="w-wide sec">
  <div class="sec-head"><p class="kicker">01 · Trabajo</p><h2 class="h2">Producto en empresas que operan a escala</h2><p class="muted">Cuatro casos contados por sus decisiones: qué problema había, qué elegí, qué resigné y qué pasó.</p></div>
  <div class="cases">${empresas.map(cardEmpresa).join('\n')}</div>
</section>

<section id="proyectos" class="w-wide sec">
  <div class="sec-head"><p class="kicker">02 · Proyectos</p><h2 class="h2">Lo que construyo con mis manos</h2><p class="muted">Cinco productos de punta a punta. Cada uno resuelve un problema real de alguien que conozco, y cada uno tiene una decisión que lo define.</p></div>
  <div class="projs">${propios.map(cardPropio).join('\n')}</div>
</section>

<section class="w-wide sec">
  <div class="sec-head"><p class="kicker">03 · Cómo trabajo</p><h2 class="h2">Cuatro reglas que no negocio</h2></div>
  <ol class="princ">${HOME.principios.map(([t, d], i) => `<li class="rev"><span class="pn">0${i + 1}</span><strong>${esc(t)}</strong><span>${esc(d)}</span></li>`).join('')}</ol>
</section>`;
  return layout({
    title: 'Gastón Pérez · Product Builder',
    description: 'Senior Product Manager y Product Builder. Casos de producto en Mercado Libre, Rappi, Henry y Bigbox, y los productos que construyo de punta a punta.',
    body,
  });
}

function sobre() {
  const body = `
<article class="w about">
  <p class="eyebrow">Sobre mí</p>
  <h1 class="display sm">Ingeniero de procesos que se volvió <em>constructor de producto</em>.</h1>
  <div class="prose">${SOBRE.parrafos.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
  <h2 class="h3">Trayectoria</h2>
  <ul class="tl">${SOBRE.trayectoria
    .map(
      ([w, r, e, s]) =>
        `<li><span class="when">${esc(w)}</span><span><b>${esc(r)}</b> · ${s ? `<a href="trabajo/${s}.html">${esc(e)}</a>` : esc(e)}</span></li>`
    )
    .join('')}</ul>
  <h2 class="h3">Formación y más</h2>
  <dl class="meta meta-1">${SOBRE.formacion.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
  <p class="cta-row"><a class="btn" href="mailto:${SITE.email}">Escribime</a><a class="btn btn-ghost" href="${SITE.linkedin}">LinkedIn ↗</a></p>
</article>`;
  return layout({ title: 'Sobre mí · Gastón Pérez', description: SOBRE.parrafos[0], body, active: 'sobre' });
}

// ---------------------------------------------------------------- escribir
fs.mkdirSync(path.join(ROOT, 'trabajo'), { recursive: true });
fs.mkdirSync(path.join(ROOT, 'proyectos'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'index.html'), home());
fs.writeFileSync(path.join(ROOT, 'sobre-mi.html'), sobre());
empresas.forEach((c, i, l) => fs.writeFileSync(path.join(ROOT, 'trabajo', `${c.slug}.html`), paginaCaso(c, i, l)));
propios.forEach((c, i, l) => fs.writeFileSync(path.join(ROOT, 'proyectos', `${c.slug}.html`), paginaCaso(c, i, l)));
console.log(`OK: index, sobre-mi, ${empresas.length} casos, ${propios.length} proyectos`);
