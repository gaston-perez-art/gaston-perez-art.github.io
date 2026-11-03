// Todo el contenido del sitio vive acá. Se edita este archivo y se corre
// `node src/build.js`; los .html de la raíz se regeneran y no se tocan a mano.
//
// Regla de estilo: sin rayas (—). Coma, punto o reestructurar.

const SITE = {
  nombre: 'Gastón Pérez',
  rol: 'Senior Product Manager · Product Builder',
  email: 'gaston.product.expert@gmail.com',
  linkedin: 'https://linkedin.com/in/gastonmartinperez',
  github: 'https://github.com/gaston-perez-art',
  adplist: 'https://adplist.org/mentors/gaston-perez',
  url: 'https://gaston-perez-art.github.io',
};

const HOME = {
  titulo: 'Construyo producto.<br><em>Con equipos y con mis manos.</em>',
  bajada:
    'Ocho años haciendo producto en Mercado Libre, Rappi, Henry y Bigbox, en e-commerce, marketplaces, delivery y EdTech. Hoy además construyo de punta a punta, de la idea al producto en uso, con IA como herramienta de trabajo diaria.',
  metricas: [
    { valor: '4,5%', antes: '2,58%', texto: 'Conversión end-to-end con personalización, en un mes', donde: 'Bigbox' },
    { valor: '3,4%', antes: '1,4%', texto: 'Recompra con un loop de agradecimiento. El objetivo era 2%', donde: 'Bigbox' },
    { valor: '75–80%', texto: 'Consultas de sellers resueltas por un agente con IA', donde: 'Mercado Libre' },
    { valor: '−35%', texto: 'Costo operativo de corrección con la API de OpenAI', donde: 'Henry' },
  ],
  principios: [
    ['Primero la persona.', 'Cada proyecto empieza por alguien concreto y su problema: un docente, una entrenadora, un familiar, un grupo de amigos.'],
    ['Las decisiones, por escrito.', 'Cada producto tiene sus trade-offs documentados: qué elegí, por qué y qué dejé afuera.'],
    ['Lo mínimo que valida.', 'Costo cero hasta que haya demanda. Backend cuando hace falta, no antes.'],
    ['IA en el día a día.', 'Construyo con Claude Code, v0 y Cursor. Qué construir y qué dejar afuera lo decido yo.'],
  ],
};

// ------------------------------------------------------------------ CASOS
// tipo: 'empresa' | 'propio'
// bloques del cuerpo: ['h', texto] ['p', texto] ['decision', titulo, texto, resigne?]
//                     ['fig', svgId | {img, alt}, pie] ['lista', [items]] ['tabla', [cabecera], [[fila]]]

const CASOS = [
  {
    slug: 'bigbox',
    tipo: 'empresa',
    nombre: 'Bigbox',
    periodo: '2026 – hoy',
    color: 'violeta',
    portada: { valor: '1,4% → 3,4%', texto: 'recompra' },
    titulo: 'De un catálogo de regalos a un marketplace que aprende de cada usuario',
    bajada:
      'Soy dueño end-to-end del e-commerce B2C de Bigbox en cinco países de LatAm. El desafío era doble: el que compra no es el que disfruta, y la compañía no tenía ciclo de vida de producto.',
    meta: [
      ['Rol', 'Senior Product Owner. Ownership end-to-end del e-commerce B2C'],
      ['Equipo', 'Product Owner Jr., Data Analyst y Senior Product Designer'],
      ['Alcance', 'Argentina, México, Chile, Perú y Uruguay. Compra, canje y back office'],
      ['Con', 'Growth B2C, CX, COO, CTO y CEO'],
    ],
    resultados: [
      ['3,4%', 'recompra, desde 1,4%. El objetivo era 2%'],
      ['4,5%', 'conversión end-to-end, desde 2,58%, en un mes'],
      ['86,6%', 'conversión de la búsqueda por fecha. El objetivo era 50%'],
      ['80%', 'de consultas resueltas por el chat, con NPS 4,7'],
    ],
    cuerpo: [
      ['h', 'Dos usuarios, un solo producto'],
      ['p', 'Bigbox vende experiencias para regalar. El regalador compra; el agasajado, que recibe el regalo, elige y canjea la experiencia. Son dos personas distintas, con dos momentos distintos, y el negocio solo veía al primero.'],
      ['p', 'Definí la visión de producto: pasar de un catálogo cerrado de boxes a un marketplace de experiencias con oferta personalizada según el comportamiento de cada usuario. Trabajo sobre tres superficies: la compra, desde el descubrimiento hasta el checkout; el canje del agasajado, con perfil propio; y el back office.'],
      ['decision', 'Recompra: cerrar el loop entre quien recibe y quien regala', 'Entré con un objetivo: subir la recompra de 1,4% a 2%. El agasajado vivía la experiencia y el regalador nunca se enteraba de cómo había salido. Construí un loop de agradecimiento: el agasajado le escribe al regalador, el mensaje se abre el 78% de las veces y lo devuelve al sitio con un motivo concreto para volver a comprar. La recompra llegó a 3,4%.'],
      ['fig', 'loop-bigbox', 'El loop de agradecimiento entre agasajado y regalador.'],
      ['decision', 'Conversión: del catálogo fijo a la oferta personalizada', 'Ejecuté el pasaje al marketplace dinámico. Los algoritmos de personalización llevaron la conversión end-to-end de 2,58% a 4,5% en el primer mes.'],
      ['decision', 'Búsqueda por fecha: unir oferta y demanda en el momento de decidir', 'Lancé la búsqueda de actividades por fecha. El objetivo era 50% de conversión; el resultado fue 86,6%.'],
      ['decision', 'El agasajado como comprador', 'Abrí una línea de ingresos nueva con un flujo de upselling en el momento del canje. El agasajado era un usuario que nunca se monetizaba; ahora puede comprar. Revenue incremental de alto margen, sin degradar la experiencia de redención.', 'Cualquier fricción en el canje pega en la satisfacción del regalo. El upselling se diseñó para no interponerse.'],
      ['decision', 'Atención: resolver sin agente, sin bajar la satisfacción', 'Implementé un chat conversacional en el sitio: absorbe 8 de cada 10 consultas sin llegar a un agente, con NPS 4,7.'],
      ['h', 'Ordenar cómo se construye'],
      ['p', 'La compañía no tenía ciclo de vida de producto. Instalé PRDs, discovery continuo, un proceso de diseño e iteración post-release, y migré un Scrum que ya no servía a Kanban. Defino el roadmap por quarter y por half.'],
    ],
    herramientas: 'SQL · BigQuery · GA4 · Google Tag Manager · Power BI · Claude · v0 · Figma',
  },
  {
    slug: 'mercadolibre',
    tipo: 'empresa',
    nombre: 'Mercado Libre',
    periodo: '2025 – 2026',
    color: 'amarillo',
    portada: { valor: '75–80%', texto: 'consultas resueltas por IA' },
    titulo: 'El portal donde los restaurantes de Mercado Libre gestionan su operación',
    bajada:
      'Senior IC en el portal de sellers de food delivery. Todo lo que impacta la performance operativa de un restaurante pasaba por mis superficies: pedidos, finanzas, reputación, ayuda y comunicación.',
    meta: [
      ['Rol', 'Product Shipping Specialist, Senior IC'],
      ['Ownership', 'Order Management, Performance Operacional, Finanzas, Configuraciones, Reputación, Help Center y Comunicación al Seller'],
      ['Con', 'Operaciones, CX, Data, IA, Legales y Marketplace. Desarrollo en Brasil'],
      ['Período', 'Febrero 2025 – Enero 2026'],
    ],
    resultados: [
      ['75–80%', 'de las consultas mensuales resueltas por el agente con IA'],
      ['−1 pp', 'de Issue Rate con el Sistema de Reputación'],
      ['3', 'beneficios habilitados por buena reputación'],
      ['3', 'canales oficiales de contacto nuevos con el seller'],
    ],
    cuerpo: [
      ['h', 'Agente de soporte con IA'],
      ['p', 'Lancé un agente de soporte con IA dentro del Help Center del seller. Resolvía de forma autónoma entre el 75% y el 80% de las consultas mensuales, con reducción directa del costo operativo de atención.'],
      ['h', 'Sistema de Reputación'],
      ['decision', 'Reputación adaptada a food delivery', 'Diseñé el Sistema de Reputación de Restaurantes partiendo del modelo del Marketplace, con métricas, umbrales y beneficios propios de food delivery. Redujo el Issue Rate en 1 punto porcentual y habilitó los primeros 3 beneficios.'],
      ['fig', 'reputacion-ml', 'Cómo funciona un sistema de reputación: la métrica se compara contra umbrales y define beneficios o penalizaciones.'],
      ['decision', 'Penalizar con respaldo legal', 'Definí desde producto el alcance de las penalizaciones por baja reputación y lo validé con Legales en sucesivas revisiones. El sistema salió a producción sin exposición para la compañía.'],
      ['h', 'Hablar con el seller'],
      ['p', 'No había canales oficiales de contacto entre los sellers y Mercado Libre. Establecí los primeros tres touchpoints, con CX, Tecnología y Negocio.'],
      ['h', 'Suite de reportes'],
      ['p', 'Definí la visión de producto de la suite de reportes financieros y operativos. La prototipé con Gemini, la llevé a un prototipo funcional end-to-end con v0 y armé el roadmap multi-versión para 2026.'],
    ],
    herramientas: 'SQL · BigQuery · Tableau · Looker · n8n · Gemini · ChatGPT · NotebookLM · v0',
  },
  {
    slug: 'henry',
    tipo: 'empresa',
    nombre: 'Henry',
    periodo: '2022 – 2025',
    color: 'verde',
    portada: { valor: '0 → 1', texto: 'dos productos a producción' },
    titulo: 'Dos productos de la hoja en blanco a producción',
    bajada:
      'Lideré la construcción de la nueva plataforma educativa de Henry y, después, la plataforma de cobranzas. Una sola plataforma para todo el recorrido del estudiante, de la admisión al pago.',
    meta: [
      ['Rol', 'Product Manager'],
      ['Equipo', 'Product Operations, Product Specialist no-code y Product Designer'],
      ['Alcance', 'Admisión, onboarding, checkout, plataforma de estudiantes, pagos y back office'],
      ['Período', 'Octubre 2022 – Febrero 2025, operación LatAm'],
    ],
    resultados: [
      ['2', 'productos construidos de cero a uno'],
      ['−35%', 'de costo operativo de corrección de proyectos'],
      ['+50%', 'de eficiencia en el procesamiento de facturas'],
      ['↑', 'CSAT y NPS sostenidos'],
    ],
    cuerpo: [
      ['h', 'Una plataforma all-in-one'],
      ['p', 'Construí de cero a uno la nueva versión completa de la plataforma educativa: admisión, onboarding, checkout, plataforma de estudiantes, gestión de pagos y back office interno. Después, la plataforma de cobranzas. Dos productos llevados de la hoja en blanco a producción, con incrementos sostenidos de CSAT y NPS.'],
      ['h', 'IA aplicada a la operación'],
      ['decision', 'Corrección de proyectos con OpenAI', 'Integré la API de OpenAI para automatizar la corrección de proyectos de estudiantes: 35% menos de costo operativo y calificaciones más rápidas.'],
      ['decision', 'Facturas con IA', 'Implementé procesamiento de facturas con IA en el área de pagos: 50% de mejora en la eficiencia del flujo y menos error manual.'],
    ],
    herramientas: 'SQL · BigQuery · Mixpanel · API de OpenAI · Make · Figma · Jira · Notion',
  },
  {
    slug: 'rappi',
    tipo: 'empresa',
    nombre: 'Rappi',
    periodo: '2022',
    color: 'coral',
    portada: { valor: 'Top 5', texto: 'proyectos de rentabilidad' },
    titulo: 'El portal que usan cientos de miles de restaurantes todos los días',
    bajada:
      'Product Lead del Restaurant Partners Portal B2B, dentro del equipo Global de Rappi. Web y apps nativas, tres células y el plan del quarter presentado al VP de Producto.',
    meta: [
      ['Rol', 'Product Lead'],
      ['Equipo', '3 Product Owners, cada uno con su célula de Developers, UX/UI, QA y Copywriting'],
      ['Alcance', 'Aplicación web y apps nativas iOS y Android'],
      ['Período', 'Mayo – Octubre 2022'],
    ],
    resultados: [
      ['Top 5', 'de proyectos que mejoraron la rentabilidad de la compañía'],
      ['↑', '%Markdown RappiPrime sobre GMV'],
      ['↑', 'unit economics por orden'],
    ],
    cuerpo: [
      ['h', 'Rentabilidad desde el long-tail'],
      ['decision', 'Planes de pago para restaurantes long-tail', 'Propuse e implementé planes de pago para los restaurantes del long-tail. La iniciativa integró el top 5 de proyectos que mejoraron la rentabilidad de la compañía.'],
      ['p', 'Además incrementé el %Markdown RappiPrime sobre GMV y la unit economics por orden, y construí e iteré la aplicación web y las apps nativas del portal.'],
    ],
    herramientas: 'Amplitude · Tableau · Power BI · Figma · Jira',
  },

  // ---------------------------------------------------------- PROPIOS
  {
    slug: 'donar',
    tipo: 'propio',
    nombre: 'donAR',
    periodo: '2026',
    estado: ['poc', 'Demo web en vivo'],
    imagen: { src: 'img/donar.png', alt: 'Pantalla de ingreso de donAR' },
    corto: 'Colectas solidarias persona a persona, donde la confianza es el producto.',
    titulo: 'Colectas solidarias donde la confianza es el producto',
    bajada:
      'Publicás tu necesidad, un curador la verifica antes de que salga, donás directo a la persona y ves a dónde fue cada peso. Lo construí de la idea a un POC con datos reales: producto, diseño, código, legales y go-to-market.',
    links: [['Probar la demo', 'https://gaston-perez-art.github.io/donAR/'], ['Código', 'https://github.com/gaston-perez-art/donAR']],
    nota: 'La demo pide crear una cuenta. Es a propósito: en donAR la identidad es obligatoria, porque todo se ata a una persona real.',
    meta: [
      ['Rol', 'Fundador y Product Builder. Todo'],
      ['Estado', 'POC funcionando, iOS, Android y web'],
      ['Stack', 'React Native · Expo · TypeScript · Supabase'],
      ['Documentos', 'Paper fundacional, go-to-market, modelo de amenaza, privacidad y términos'],
    ],
    cuerpo: [
      ['h', 'El problema'],
      ['p', 'La solidaridad entre desconocidos ya funciona a gran escala, pero sin infraestructura que la sostenga. Las colectas virales prueban dos cosas a la vez: que la gente pone plata cuando la causa se percibe justa, y que la confianza es el punto frágil. En 2023 la Inspección General de Justicia declaró irregular el fideicomiso de una de las colectas más conocidas del país. La plata llegó; el modelo de administración quedó bajo sospecha.'],
      ['p', 'Las plataformas que existen en Argentina trabajan con ONGs, no con personas. GoFundMe permite colectas individuales, pero no verifica ni hace de la trazabilidad un producto. No encontré ninguna que junte las tres cosas: colecta persona a persona, una capa de confianza y una razón para volver.'],
      ['decision', 'Conectar sin custodiar', 'La plata va directo del donante al beneficiado y nunca pasa por la app. La regulación del BCRA se dispara por tener saldos de terceros, no por conectar personas. Sin custodia: menos fricción, cero fondos ajenos y un encuadre regulatorio limpio. Lo respaldé con análisis de riesgo de lavado y una pregunta afinada para el abogado.', 'La plataforma nunca puede probar técnicamente que una transferencia llegó, porque no la ve pasar. Aceptarlo fue la premisa de diseño.'],
      ['fig', 'confianza-donar', 'Si la app no ve la plata, la confianza se construye en tres capas.'],
      ['decision', 'Solo la plata confirmada cuenta', 'Un aporte con comprobante subido pero sin confirmar queda pendiente: no suma a la meta, no da puntos, no dispara el reconocimiento. Recién cuando el beneficiado confirma que le llegó, cuenta. El beneficiado es el único que ve la plata entrar y no gana nada confirmando lo que no recibió. Si no responde en 48 horas, el aporte se confirma solo, para que nadie quede trabado.'],
      ['decision', 'Gamificación por reconocimiento, sin premios', 'Niveles, medallas y ranking mensual de quienes más ayudan, sin costo monetario. Si el premio es material, atraés donantes que buscan el premio y no la causa. Y así se puede medir lo que importa: si la gente vuelve por la causa.'],
      ['h', 'Qué valida el MVP'],
      ['tabla', ['Hipótesis', 'Métrica'], [
        ['Hay personas dispuestas a exponer su necesidad y pasar por verificación', 'Causas creadas y porcentaje que completa la verificación'],
        ['La gente dona a causas verificadas de desconocidos', 'Conversión de visitante a donante y causas que llegan a la meta'],
        ['El reconocimiento retiene por la causa', 'Donantes que vuelven a aportar a una segunda causa'],
      ]],
      ['p', 'Si las tres dan señal a baja escala, hay producto. Si no, se aprendió barato.'],
      ['h', 'Qué construí'],
      ['lista', [
        'Feed de causas verificadas y panel de curaduría, donde un humano revisa la evidencia antes de publicar.',
        'Donación por transferencia con comprobante, confirmación del beneficiado y auto-confirmación a las 48 horas.',
        'Ranking mensual, medallas y tours de onboarding.',
        'Mercado Pago integrado y apagado: se prende cuando exista el split de pagos y el OK legal.',
        'Versión web desde el mismo código, para que cualquiera la pruebe sin instalar nada.',
      ]],
    ],
  },
  {
    slug: 'heart',
    tipo: 'propio',
    nombre: 'Heart',
    periodo: '2026',
    estado: ['live', 'En uso todos los días'],
    arte: 'heart',
    corto: 'Control diario de medicación para alguien que no quería aprender una app nueva.',
    titulo: 'Diez remedios por día, para alguien que no quería aprender una app nueva',
    bajada:
      'Una PWA para que un familiar mayor marque cada toma de un toque, y para que la familia vea desde su teléfono cómo va el día, qué remedio se está terminando y le deje un mensaje.',
    links: [],
    nota: 'El código es privado porque maneja datos de salud.',
    meta: [
      ['Rol', 'Todo: discovery con el usuario real, diseño y desarrollo'],
      ['Estado', 'En uso diario desde 2026'],
      ['Stack', 'React · Vite · PWA · Supabase con RLS'],
      ['Usuarios', 'Un paciente y su familia. La misma app; el rol decide qué pantalla abre'],
    ],
    cuerpo: [
      ['h', 'Qué hace'],
      ['p', 'Él entra y ve Hoy: los cuatro bloques del día con sus remedios. Un toque marca la toma y guarda la hora real. La familia ve el panel: cuántas tomó, el estado de cada bloque y el remedio que se está terminando. Se actualiza solo cuando él marca algo.'],
      ['p', 'Al completar las diez, la tarjeta se convierte en el cierre del día: un corazón latiendo con el trazo de un monitor y la frase que él dice cada mañana.'],
      ['h', 'Decisiones de diseño'],
      ['decision', 'El día arranca a las 4 AM, no a medianoche', 'Si toma la pastilla para dormir a las 00:30, cuenta para el día anterior.'],
      ['fig', 'dia-heart', 'El día de la app va de 4 AM a 4 AM.'],
      ['decision', 'La app registra, no interpreta', 'El registro de presión no tiene colores por rango ni tendencias. Interpretar un número es trabajo del médico. El historial se comparte por WhatsApp en un toque.'],
      ['decision', 'Nada cambia debajo de sus dedos', 'Desmarcar pide dos toques. Las actualizaciones avisan, no se instalan solas. Todo está en rem: un selector agranda texto, botones y espacios juntos, y la pantalla nunca se sale de cuadro. Sin tipografías web: Roboto ya está en el teléfono y la app funciona sin conexión.'],
      ['decision', 'Marcar una toma es solo del paciente', 'Por permisos en la base y por interfaz. Si cualquiera puede tildar, el registro deja de decir lo que pasó.'],
      ['h', 'El stock que se descuenta solo'],
      ['p', 'Cada toma descuenta según la dosis y las tarjetas se ordenan por urgencia. Cargar una caja muestra la cuenta antes de guardar: "38 comprimidos, alcanzan 38 días". Un stock vacío y un stock que nadie cargó son dos cosas distintas, y la app las trata distinto.'],
    ],
  },
  {
    slug: 'tecla',
    tipo: 'propio',
    nombre: 'Tecla',
    periodo: '2026',
    estado: ['live', 'En vivo · validando'],
    imagen: { src: 'img/tecla.png', alt: 'Sitio de Tecla, sección para docentes' },
    corto: 'Servicio técnico y soporte a docentes bonaerenses, con arquitectura de costo cero.',
    titulo: 'Validar demanda antes de invertir un peso',
    bajada:
      'Tecla tiene dos unidades: servicio técnico informático y soporte a docentes del sistema educativo bonaerense. La unidad de Soporte atiende unos 10 clientes por mes. El plan de negocios es mi tesis del MBA.',
    links: [['Ver sitio', 'https://www.somostecla.com'], ['Código', 'https://github.com/gaston-perez-art/tecla']],
    meta: [
      ['Rol', 'Cofundador'],
      ['Estado', 'En producción con dominio propio, en validación de mercado'],
      ['Stack', 'HTML · CSS · JS · Cloudflare · GitHub Pages · Google Forms · GA4'],
      ['Costo mensual', 'Cero'],
    ],
    cuerpo: [
      ['h', 'Dos negocios, una landing'],
      ['p', 'Un switch arriba separa las dos unidades. El sitio no vende ni cobra: presenta, mide y junta contactos.'],
      ['decision', 'Serverless de costo cero', 'Hosting en GitHub Pages, DNS en Cloudflare, leads a Google Sheets por un formulario y analítica en GA4. No hay servidor que mantener. Cuando el producto docente necesite guardar el trabajo del usuario, recién ahí se justifica un backend.', 'Sin cuentas ni datos propios por ahora. Es lo correcto mientras la pregunta sea si hay demanda.'],
      ['h', 'De la tesis al mercado'],
      ['p', 'El plan de negocios de Tecla es el trabajo final de mi MBA en la Universidad de Palermo. El sitio es la validación de mercado de ese plan.'],
    ],
  },
  {
    slug: 'entrena-con-jime',
    tipo: 'propio',
    nombre: 'Entrená con Jime',
    periodo: '2026',
    estado: ['live', 'En vivo'],
    imagen: { src: 'img/jime.jpg', alt: 'Sitio de Jimena Ibañez, entrenadora' },
    corto: 'Web y herramientas de trabajo para una entrenadora de fuerza de mujeres +35.',
    titulo: 'Una web que consigue alumnas y planillas que ordenan el trabajo',
    bajada:
      'Jimena es profesora de Educación Física y entrenadora de fuerza especializada en recomposición corporal femenina. Construí su presencia online y las herramientas que usa con cada alumna.',
    links: [['Ver sitio', 'https://entrenaconjime.com'], ['Código', 'https://github.com/gaston-perez-art/jimenapp']],
    meta: [
      ['Rol', 'Producto, diseño y desarrollo, junto a Jimena'],
      ['Estado', 'En vivo con dominio propio'],
      ['Stack', 'HTML · CSS · JS · Excel'],
      ['Usuarias', 'Mujeres adultas con poco tiempo que ya probaron métodos que no les funcionaron'],
    ],
    cuerpo: [
      ['decision', 'Contacto directo por WhatsApp', 'Todo el sitio lleva a una entrevista gratuita por WhatsApp, y Jimena responde cada consulta personalmente.'],
      ['decision', 'Un solo archivo autocontenido', 'La web es un único HTML, sin dependencias ni build.'],
      ['h', 'Las herramientas'],
      ['lista', [
        'Ficha de ingreso para cada alumna nueva: todo programa parte de una evaluación real, no de una plantilla.',
        'Planificador de mesociclos, con periodización por bloques y esfuerzo percibido.',
        'Calculadora de calorías y macronutrientes, sin déficits agresivos.',
      ]],
    ],
  },
  {
    slug: 'fulbito',
    tipo: 'propio',
    nombre: 'Fulbito',
    periodo: '2026',
    estado: ['live', 'En vivo'],
    arte: 'fulbito',
    corto: 'Tabla de un torneo familiar de fútbol 5 donde compite el jugador, no el equipo.',
    titulo: 'Una tabla de fútbol 5 que no miente',
    bajada:
      'Torneo de la familia, sábados a las 18, 12 fechas. Los equipos se rearman cada fecha, así que la unidad que compite es el jugador: los puntos quedan pegados a la persona.',
    links: [['Ver sitio', 'https://gaston-perez-art.github.io/fulbito/'], ['Código', 'https://github.com/gaston-perez-art/fulbito']],
    meta: [
      ['Rol', 'Todo'],
      ['Estado', 'En vivo, temporada Apertura 2026'],
      ['Stack', 'JavaScript sin frameworks · Supabase · GitHub Pages · PWA'],
      ['Usuarios', 'Un grupo de familia que lo mira cada sábado'],
    ],
    cuerpo: [
      ['decision', 'Los goles no se cuentan por jugador', 'El marcador es del equipo y es de cada uno de los que estuvo adentro. En un fútbol 5 nadie puede llevar la cuenta de quién hizo cada gol, y una planilla que nadie puede completar de verdad es una planilla que miente. Los goles solo desempatan.'],
      ['decision', 'Solo suma el que jugó', 'Antes de jugar se hace el sorteo con los que vienen. Después, solo se puede cargar a quien pasó por el sorteo. Un marcador vacío no vale como cero: el botón de guardar queda bloqueado hasta que estén los dos.'],
      ['decision', 'El invitado compite como todos', 'El que vino un sábado suelto puso la cuota como todos, así que entra en la tabla con su única fecha y queda abajo, sin ensuciar la punta.'],
    ],
  },
];

const SOBRE = {
  titulo: 'Sobre mí',
  parrafos: [
    'Hago producto digital desde hace ocho años. Empecé lejos del software, en logística y manufactura en Penalty: coordiné una operación de más de once personas, implementé lean y Kanban en la línea de montaje y diseñé procesos que siguen en uso.',
    'En 2018 fundé Mobius, una app Android que replicaba la forma de hablar de seres queridos que ya no están, con aprendizaje automático. No escaló, pero ahí armé mi primer equipo desde cero y construí con aprendizaje automático en 2018.',
    'Desde entonces hice producto en Coderhouse, Rappi, Henry, Mercado Libre y Bigbox. Defino y lanzo de punta a punta, del discovery al go-live, con UX, Tecnología, Data, Operaciones, CX y Legales. Decido con datos y con experimentación continua.',
    'Hoy además construyo con mis manos. Me mueven la tecnología, crear producto con impacto y mejorar la vida de las personas.',
  ],
  trayectoria: [
    ['2026 – hoy', 'Senior Product Owner', 'Bigbox', 'bigbox'],
    ['2025 – 2026', 'Product Shipping Specialist', 'Mercado Libre', 'mercadolibre'],
    ['2022 – 2025', 'Product Manager', 'Henry', 'henry'],
    ['2022', 'Product Lead', 'Rappi', 'rappi'],
    ['2021 – 2022', 'Growth Product Owner', 'Coderhouse'],
    ['2021', 'Product Owner', 'Starter.pe'],
    ['2018 – 2021', 'Cofundador y Product', 'Mobius'],
    ['2015 – 2021', 'Logística y Manufactura', 'Penalty'],
  ],
  formacion: [
    ['MBA Candidate', 'Universidad de Palermo, 2023 – 2026. Cursada finalizada con promedio 9,13; defensa de tesis en noviembre de 2026'],
    ['Certificaciones', 'Reforge Product Management · Product School Product Strategy · Pendo AI for Product Management · Coderhouse Product Manager (top 10%), Data Science, SQL y Vibe Coding'],
    ['Idiomas', 'Español nativo · Inglés B2, en camino a C1'],
    ['Mentoría', 'Product Mentor en ADPList desde 2023'],
  ],
};

module.exports = { SITE, HOME, CASOS, SOBRE };
