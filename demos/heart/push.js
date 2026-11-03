// Lo que hace el service worker cuando llega un aviso con la app cerrada.
//
// Vive suelto y no adentro del service worker generado porque ese lo arma
// Workbox en cada build; `workbox.importScripts` en vite.config.js lo engancha.
//
// Todo lo que se muestra viene de la Edge Function: acá no se decide nada, solo
// se dibuja. Si el aviso llega sin datos igual se muestra algo, porque Chrome
// muestra un "este sitio se actualizó en segundo plano" si el push no termina
// en una notificación, y eso es peor que un cartel genérico.
self.addEventListener('push', (evento) => {
  let datos = {};
  try {
    datos = evento.data ? evento.data.json() : {};
  } catch {
    /* llegó algo que no era JSON */
  }

  evento.waitUntil(
    self.registration.showNotification(datos.titulo || 'Los remedios', {
      body: datos.cuerpo || 'Abrí la app para ver el stock.',
      icon: '/icono-192.png',
      badge: '/icono-192.png',
      tag: datos.tag || 'heart',
      // Reemplaza al anterior del mismo remedio sin volver a sonar: la noticia
      // es la misma, no hay por qué hacer vibrar el teléfono otra vez.
      renotify: false,
      data: { url: datos.url || '/' },
    }),
  );
});

// Tocar el aviso trae al frente la pestaña que ya esté abierta, en vez de
// abrir una segunda copia de la app arriba de la primera.
self.addEventListener('notificationclick', (evento) => {
  evento.notification.close();
  const destino = new URL(evento.notification.data?.url || '/', self.location.origin).href;

  evento.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((ventanas) => {
      for (const ventana of ventanas) {
        if (ventana.url.startsWith(self.location.origin) && 'focus' in ventana) return ventana.focus();
      }
      return self.clients.openWindow(destino);
    }),
  );
});
