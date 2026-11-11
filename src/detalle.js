// Detalle de los proyectos propios: el resumen para quien tiene 30 segundos,
// qué se puede hacer (funciones por tipo de usuario) y cómo está construido.
// Todo sale de los README y la documentación de cada repo.
// Regla de estilo: sin rayas (—).

const es = {
  donar: {
    resumen: [
      ['Problema', 'Las colectas entre desconocidos funcionan, pero la confianza es el punto frágil. Las plataformas locales trabajan con ONGs, no con personas.'],
      ['Para quién', 'Quien necesita ayuda para algo concreto y quien quiere ayudar sabiendo a dónde va la plata.'],
      ['Qué resuelve', 'Colectas persona a persona con curaduría humana antes de publicar, plata directa al beneficiado y el recorrido de cada aporte a la vista.'],
      ['Estado', 'POC funcionando en iOS, Android y web, con datos reales. Listo para validar las tres hipótesis del MVP.'],
    ],
    funciones: [
      ['Quien pide', ['Crear una causa con historia, meta, plazo y fotos', 'Verificar identidad con DNI, selfie y documentación', 'Panel de su causa: recaudado, aportes y compartir', 'Confirmar cada transferencia que le llegó', 'Cerrar con un mensaje y agradecer a cada donante']],
      ['Quien dona', ['Feed de causas verificadas', 'Donar por transferencia con comprobante', 'Ver el recorrido de la plata en cada causa', 'Perfil con historial, nivel y medallas', 'Ranking mensual con el mini-perfil de cada donante']],
      ['Curador', ['Cola de causas en revisión', 'Aprobar, rechazar o pedir más información después de revisar la evidencia']],
      ['Reglas automáticas', ['Auto-confirmación de transferencias a las 48 horas, con cuenta regresiva', 'Cierre de la causa al llegar a la meta o al vencer el plazo', 'Mini-reporte al cerrar: cuánto se juntó, cuántas personas y en cuánto tiempo', 'Monto mínimo para pedir: $5.000']],
    ],
    arquitectura: [
      ['App', 'React Native con Expo y TypeScript: un solo código para iOS, Android y web'],
      ['Datos', 'Supabase: Postgres con RLS, login con mail y Storage privado para la evidencia de identidad'],
      ['Pagos', 'Transferencia directa con comprobante. Mercado Pago integrado y apagado con un flag hasta tener split de pagos y OK legal'],
      ['Sin servidor propio', 'Cierres y auto-confirmaciones se evalúan en el cliente: cero infraestructura que mantener'],
      ['Demo', 'Build web con una base falsa en el navegador, publicada en GitHub Pages'],
    ],
  },
  'billetera-hogar': {
    resumen: [
      ['Problema', 'La planilla de gastos de la casa era lenta desde el celular, tenía errores de carga y los pagos fijos se cargaban dos veces.'],
      ['Para quién', 'Una pareja que comparte los gastos y gana distinto.'],
      ['Qué resuelve', 'Un gasto se carga en tres toques, los pagos fijos se registran solos y cada uno pone en proporción a lo que gana.'],
      ['Estado', 'En uso todos los días. Reemplazó a la planilla.'],
    ],
    funciones: [
      ['Inicio', ['Saldo del mes y lo que le queda a cada uno', 'La cuenta completa: entró, gastaron, pagos que faltan, para cada uno y para la casa', 'Actividad por día con el saldo al cierre', 'Próximos pagos: cuántos, cuánto y cuándo vence el primero']],
      ['Cargar y pagar', ['Gasto en tres pasos: monto, categoría y detalle', 'Pagos fijos ordenados por vencimiento; marcar pagado crea el gasto', 'Recordatorio si pasan 12 horas sin cargar nada']],
      ['Entender en qué se va', ['Categorías con techo mensual y el estado en palabras: "Usaron el 31%", "Te pasaste"', 'Reparto: cuánto le toca poner a cada uno, cuánto puso y la diferencia', 'Tarjeta de cada persona que gira y muestra en qué gasta', 'Vista "Los dos" o "Solo yo"']],
      ['Ajustes', ['Ingresos, techos y pagos fijos editables sin cambiar el pasado', 'Exportar a la planilla por período', 'Ocultar los montos con un toque', 'Modo claro y oscuro']],
    ],
    arquitectura: [
      ['App', 'Next.js, TypeScript y Tailwind, exportada como sitio estático e instalable como PWA'],
      ['Datos', 'Supabase: Postgres con RLS por hogar, un login por persona y Realtime'],
      ['Reglas de negocio', 'Funciones puras con tests: las cuentas tienen que cerrar entre todas las pantallas'],
      ['Deploy', 'GitHub Actions corre los tests, compila y publica en cada cambio'],
      ['Demo', 'El mismo código sin las variables de Supabase: datos ficticios en el navegador'],
    ],
  },
  heart: {
    resumen: [
      ['Problema', 'Diez remedios por día anotados en un cuadro impreso, y una familia que no sabía si se habían tomado todos.'],
      ['Para quién', 'Un familiar que no quería aprender una app nueva, y la familia que lo acompaña.'],
      ['Qué resuelve', 'Él marca cada toma de un toque; la familia ve el día en vivo y el stock se descuenta solo.'],
      ['Estado', 'En uso todos los días desde 2026.'],
    ],
    funciones: [
      ['Paciente', ['Hoy: los bloques del día con sus remedios; un toque marca la toma y guarda la hora real', 'Registro de presión con teclado propio, sin interpretar el número', 'Un mensaje por día de la familia y los amigos', 'El cierre del día al completar las diez tomas']],
      ['Familia', ['Panel en vivo: cuántas tomó, el estado de cada bloque y el remedio que se termina', 'Stock por remedio con los días que quedan; cargar una caja muestra la cuenta antes de guardar', 'La semana en grilla, como el cuadro impreso', 'Moderar el muro de mensajes y repartir el link público']],
      ['Accesibilidad', ['Tamaño de letra que agranda toda la pantalla junta', 'Cuatro temas, claros y oscuros', 'Funciona sin conexión y sincroniza cuando vuelve la señal', 'Las actualizaciones avisan, no se instalan solas']],
    ],
    arquitectura: [
      ['App', 'React y Vite como PWA instalable, con service worker y tipografías propias para funcionar offline'],
      ['Datos', 'Supabase con RLS: marcar una toma es solo del paciente, por base y por interfaz'],
      ['Integridad', 'El stock lo mueven triggers y funciones: nunca se escribe directo y cada movimiento queda registrado'],
      ['Offline primero', 'Cola local con reintentos y un identificador por operación para no sumar dos veces'],
      ['Demo', 'Build aparte con datos inventados, guardados en el navegador'],
    ],
  },
  tecla: {
    resumen: [
      ['Problema', 'Dos negocios de servicios sin presencia online y una pregunta abierta: ¿hay demanda suficiente para invertir?'],
      ['Para quién', 'Personas y pymes que necesitan servicio técnico, y docentes bonaerenses que necesitan ayuda con lo digital.'],
      ['Qué resuelve', 'Una landing con las dos unidades que presenta, mide y junta contactos, sin cobrar nada todavía.'],
      ['Estado', 'En producción con dominio propio. La unidad de Soporte atiende unos 10 clientes por mes.'],
    ],
    funciones: [
      ['Sitio', ['Switch entre Soporte técnico y Para docentes, con color propio por unidad', 'Botón de contacto fijo que abre el formulario', 'Equipo con foto y LinkedIn, y la cinta de empresas donde trabajamos', 'Diseño mobile-first']],
      ['Crecimiento', ['Cada contacto entra directo a una planilla de Google', 'Analítica con GA4', 'SEO: datos estructurados, sitemap y Open Graph']],
    ],
    arquitectura: [
      ['Sitio', 'Un solo HTML con CSS y JS, sin build'],
      ['Hosting', 'GitHub Pages con dominio propio y HTTPS'],
      ['Contactos', 'Google Forms guarda cada lead en Google Sheets'],
      ['Analítica', 'Google Analytics 4'],
      ['Costo mensual', 'Cero. No hay servidor que mantener'],
    ],
  },
  'entrena-con-jime': {
    resumen: [
      ['Problema', 'Una entrenadora con método propio, sin presencia online y armando cada plan a mano.'],
      ['Para quién', 'Mujeres adultas con poco tiempo que ya probaron métodos que no les funcionaron.'],
      ['Qué resuelve', 'Una web que termina en una entrevista por WhatsApp, y herramientas que ordenan el trabajo con cada alumna.'],
      ['Estado', 'En vivo con dominio propio y medición de visitas desde agosto de 2026.'],
    ],
    funciones: [
      ['Web', ['Método, planes y un "Cómo trabajo" con panel fijo que cambia al scrollear', 'Contacto directo por WhatsApp', 'Testimonios publicados solo con autorización de cada alumna', 'Medición de los clics a WhatsApp e Instagram']],
      ['Herramientas', ['Ficha de ingreso con objetivo, historial y antropometría inicial', 'Planificador de mesociclos de 6 semanas con autorregulación por esfuerzo percibido y carga sugerida', 'Calculadora de calorías y macronutrientes según el objetivo']],
    ],
    arquitectura: [
      ['Web', 'Un solo HTML autocontenido, sin dependencias ni build'],
      ['Hosting', 'GitHub Pages con dominio propio en Cloudflare'],
      ['Herramientas', 'Planillas Excel generadas por scripts versionados en el repo'],
      ['Analítica', 'Google Analytics 4'],
      ['Proceso', 'Repo compartido con Jimena; cada decisión documentada con su investigación'],
    ],
  },
  fulbito: {
    resumen: [
      ['Problema', 'En un torneo donde los equipos se rearman cada sábado, una tabla por equipos no dice quién va ganando.'],
      ['Para quién', 'Un grupo de familia que juega 12 fechas de fútbol 5.'],
      ['Qué resuelve', 'Una tabla donde compite el jugador: los puntos quedan pegados a la persona y los goles solo desempatan.'],
      ['Estado', 'En vivo, temporada Apertura 2026.'],
    ],
    funciones: [
      ['Para todos', ['Tabla de posiciones por jugador, actualizada al instante', 'Historial de fechas con los equipos y el resultado', 'El pozo: la cuota por fecha jugada, calculada sola', 'Instalable en el celular']],
      ['Para el que carga', ['Sorteo de quiénes vienen y de capitanes, con una rueda que no repite', 'Carga del resultado con clave: solo suma quien pasó por el sorteo', 'Corregir o borrar una fecha; las siguientes se renumeran solas']],
    ],
    arquitectura: [
      ['Sitio', 'JavaScript sin framework ni build: cuatro archivos'],
      ['Datos', 'Supabase leído por REST, sin sumar la librería'],
      ['Seguridad', 'RLS y funciones de carga protegidas con clave'],
      ['Hosting', 'GitHub Pages, instalable como PWA'],
    ],
  },
};

const en = {
  donar: {
    resumen: [
      ['Problem', 'Fundraising between strangers works, but trust is the weak point. Local platforms work with NGOs, not with people.'],
      ['Who it is for', 'People who need help with something specific, and people who want to help knowing where the money goes.'],
      ['What it solves', 'Person-to-person fundraising with human curation before publishing, money straight to the recipient and every donation traceable.'],
      ['Status', 'Working POC on iOS, Android and web, with real data. Ready to validate the MVP’s three hypotheses.'],
    ],
    funciones: [
      ['Fundraiser', ['Create a cause with story, goal, deadline and photos', 'Verify identity with ID, selfie and documents', 'Cause dashboard: raised, donations and sharing', 'Confirm each transfer received', 'Close with a message and thank every donor']],
      ['Donor', ['Feed of verified causes', 'Donate by bank transfer with a receipt', 'See where the money went in each cause', 'Profile with history, level and badges', 'Monthly ranking with a mini-profile of each donor']],
      ['Curator', ['Queue of causes under review', 'Approve, reject or request more information after reviewing the evidence']],
      ['Automatic rules', ['Transfers auto-confirm after 48 hours, with a visible countdown', 'Causes close when they reach the goal or the deadline passes', 'Closing report: how much, how many people and how fast', 'Minimum amount to ask: ARS 5,000']],
    ],
    arquitectura: [
      ['App', 'React Native with Expo and TypeScript: one codebase for iOS, Android and web'],
      ['Data', 'Supabase: Postgres with RLS, email login and private Storage for identity evidence'],
      ['Payments', 'Direct transfer with receipt. Mercado Pago integrated and switched off behind a flag until split payments and legal sign-off exist'],
      ['No own server', 'Closures and auto-confirmations run on the client: zero infrastructure to maintain'],
      ['Demo', 'Web build with a fake database in the browser, published on GitHub Pages'],
    ],
  },
  'billetera-hogar': {
    resumen: [
      ['Problem', 'The household expense spreadsheet was slow on a phone, error-prone, and fixed payments had to be entered twice.'],
      ['Who it is for', 'A couple who share expenses and earn different amounts.'],
      ['What it solves', 'An expense takes three taps, fixed payments record themselves and each person pays in proportion to their income.'],
      ['Status', 'Used every day. It replaced the spreadsheet.'],
    ],
    funciones: [
      ['Home', ['Month balance and what each person has left', 'The full math: money in, spent, pending payments, for each person and for the house', 'Daily activity with the closing balance', 'Upcoming payments: how many, how much and when the first is due']],
      ['Log and pay', ['Expense in three steps: amount, category and detail', 'Fixed payments sorted by due date; marking one paid creates the expense', 'Reminder after 12 hours without logging anything']],
      ['Understand spending', ['Categories with a monthly cap and status in words: "31% used", "Over budget"', 'Split: how much each person should chip in, what they paid and the difference', 'A card per person that flips to show where they spend', '"Both of us" or "Just me" view']],
      ['Settings', ['Income, caps and fixed payments editable without rewriting the past', 'Export to the spreadsheet by period', 'Hide amounts with one tap', 'Light and dark mode']],
    ],
    arquitectura: [
      ['App', 'Next.js, TypeScript and Tailwind, exported as a static site and installable as a PWA'],
      ['Data', 'Supabase: Postgres with per-household RLS, one login per person and Realtime'],
      ['Business rules', 'Pure functions with tests: the numbers must add up across every screen'],
      ['Deploy', 'GitHub Actions runs the tests, builds and publishes on every change'],
      ['Demo', 'The same code without Supabase variables: fictional data in the browser'],
    ],
  },
  heart: {
    resumen: [
      ['Problem', 'Ten pills a day tracked on a printed chart, and a family that never knew whether all of them had been taken.'],
      ['Who it is for', 'A relative who did not want to learn a new app, and the family that supports him.'],
      ['What it solves', 'He marks each dose with one tap; the family sees the day live and the stock counts itself down.'],
      ['Status', 'Used every day since 2026.'],
    ],
    funciones: [
      ['Patient', ['Today: the day’s blocks with their pills; one tap marks the dose and stores the real time', 'Blood pressure log with its own keypad, without interpreting the number', 'One message a day from family and friends', 'The day’s closing card when all ten doses are done']],
      ['Family', ['Live dashboard: how many he took, the status of each block and the pill that is running out', 'Stock per medication with days left; adding a box shows the math before saving', 'The week as a grid, like the printed chart', 'Moderate the message wall and share its public link']],
      ['Accessibility', ['Text size that scales the whole screen together', 'Four themes, light and dark', 'Works offline and syncs when the signal returns', 'Updates notify, they never install themselves']],
    ],
    arquitectura: [
      ['App', 'React and Vite as an installable PWA, with a service worker and self-hosted fonts to work offline'],
      ['Data', 'Supabase with RLS: only the patient can mark a dose, enforced by the database and the UI'],
      ['Integrity', 'Stock is moved by triggers and functions: never written directly, every movement logged'],
      ['Offline first', 'Local queue with retries and an operation ID so nothing is counted twice'],
      ['Demo', 'Separate build with made-up data stored in the browser'],
    ],
  },
  tecla: {
    resumen: [
      ['Problem', 'Two service businesses with no online presence and an open question: is there enough demand to invest?'],
      ['Who it is for', 'People and small businesses that need IT support, and public school teachers who need help with digital tools.'],
      ['What it solves', 'A landing page for both units that presents, measures and collects leads, without charging anything yet.'],
      ['Status', 'In production on its own domain. The support unit serves about 10 clients a month.'],
    ],
    funciones: [
      ['Site', ['Switch between IT Support and For Teachers, each with its own color', 'Sticky contact button that opens the form', 'Team with photos and LinkedIn, and a ribbon of companies where we worked', 'Mobile-first design']],
      ['Growth', ['Every lead goes straight into a Google Sheet', 'Analytics with GA4', 'SEO: structured data, sitemap and Open Graph']],
    ],
    arquitectura: [
      ['Site', 'A single HTML file with CSS and JS, no build step'],
      ['Hosting', 'GitHub Pages with its own domain and HTTPS'],
      ['Leads', 'Google Forms stores each lead in Google Sheets'],
      ['Analytics', 'Google Analytics 4'],
      ['Monthly cost', 'Zero. No server to maintain'],
    ],
  },
  'entrena-con-jime': {
    resumen: [
      ['Problem', 'A coach with her own method, no online presence, building every plan by hand.'],
      ['Who it is for', 'Adult women with little time who already tried methods that did not work for them.'],
      ['What it solves', 'A website that ends in a WhatsApp interview, and tools that organize the work with each client.'],
      ['Status', 'Live on its own domain, with visit tracking since August 2026.'],
    ],
    funciones: [
      ['Website', ['Method, plans and a "How I work" section with a sticky panel that changes on scroll', 'Direct contact over WhatsApp', 'Testimonials published only with each client’s consent', 'Tracking of clicks to WhatsApp and Instagram']],
      ['Tools', ['Intake form with goals, history and initial body measurements', 'Six-week mesocycle planner with RPE-based autoregulation and suggested loads', 'Calorie and macronutrient calculator by goal']],
    ],
    arquitectura: [
      ['Website', 'A single self-contained HTML file, no dependencies or build'],
      ['Hosting', 'GitHub Pages with its own domain on Cloudflare'],
      ['Tools', 'Excel sheets generated by scripts versioned in the repo'],
      ['Analytics', 'Google Analytics 4'],
      ['Process', 'Shared repo with Jimena; every decision documented with its research'],
    ],
  },
  fulbito: {
    resumen: [
      ['Problem', 'In a tournament where teams are reshuffled every Saturday, a team table does not tell you who is winning.'],
      ['Who it is for', 'A family group playing 12 match days of 5-a-side.'],
      ['What it solves', 'A table where the player competes: points stick to the person and goals only break ties.'],
      ['Status', 'Live, Apertura 2026 season.'],
    ],
    funciones: [
      ['For everyone', ['Standings by player, updated instantly', 'Match history with teams and scores', 'The pot: the fee per match played, calculated automatically', 'Installable on the phone']],
      ['For the organizer', ['Draw of who plays and of captains, with a rotation that does not repeat', 'Result entry with a password: only players from the draw score', 'Edit or delete a match day; the following ones renumber themselves']],
    ],
    arquitectura: [
      ['Site', 'Framework-free JavaScript, no build: four files'],
      ['Data', 'Supabase read over REST, without adding the library'],
      ['Security', 'RLS and password-protected write functions'],
      ['Hosting', 'GitHub Pages, installable as a PWA'],
    ],
  },
};

module.exports = { es, en };
