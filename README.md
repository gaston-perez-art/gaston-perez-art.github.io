# Gastón Pérez · Product Builder

Senior Product Manager con ocho años construyendo producto en Mercado Libre, Rappi, Henry y Bigbox. Ahora también construyo con mis manos.

**Sitio:** https://gaston-perez-art.github.io

## Proyectos

| Proyecto | Qué es | Estado | Links |
|---|---|---|---|
| **donAR** | Colectas solidarias P2P donde el dinero va directo de persona a persona | Demo web en vivo | [demo](https://gaston-perez-art.github.io/donAR/) · [código](https://github.com/gaston-perez-art/donAR) |
| **Billetera Hogar** | Gastos de una pareja en tres toques, repartidos según lo que gana cada uno | En uso | [demo](https://gaston-perez-art.github.io/demos/billetera/) · [código](https://github.com/gaston-perez-art/billetera-hogar) |
| **Heart** | Control diario de medicación para un familiar, con vista para la familia | En uso diario | código privado (datos de salud) |
| **Tecla** | Servicio técnico y soporte a docentes bonaerenses, serverless de costo cero | En vivo, validando | [sitio](https://www.somostecla.com) · [código](https://github.com/gaston-perez-art/tecla) |
| **Entrená con Jime** | Web y herramientas de trabajo para una entrenadora de fuerza | En vivo | [sitio](https://entrenaconjime.com) · [código](https://github.com/gaston-perez-art/jimenapp) |
| **Fulbito** | Tabla de un torneo familiar de fútbol 5 donde compite el jugador | En vivo | [sitio](https://gaston-perez-art.github.io/fulbito/) · [código](https://github.com/gaston-perez-art/fulbito) |

También hay casos de estudio de mi trabajo en Bigbox, Mercado Libre, Henry y Rappi, contados sin pantallas ni datos internos, y de mis comienzos en Coderhouse y Starter.pe.

## Cómo está hecho

HTML y CSS estáticos, generados con Node sin dependencias. Se publica con GitHub Pages desde `main`.

```
src/contenido.js     Todo el texto del sitio en español. Se edita acá.
src/contenido.en.js  La versión en inglés (se publica en /en/). Mismos slugs: editar los dos.
src/figuras.js     Diagramas e ilustraciones en SVG.
src/build.js         Genera index.html, sobre-mi.html, trabajo/ y proyectos/, en español y en en/.
estilos.css          Estilos. Oscuro por defecto; el botón del menú pasa a claro y lo recuerda.
demos/               Builds de demo con datos ficticios (Heart, Billetera Hogar).
img/               Capturas de los proyectos.
```

```bash
node src/build.js
```

Los `.html` generados no se editan a mano: la próxima corrida los pisa. Para sumar un proyecto, agregar un objeto a `CASOS` en `contenido.js` con su decisión central, y volver a generar.

## Contacto

[gaston.product.expert@gmail.com](mailto:gaston.product.expert@gmail.com) · [LinkedIn](https://linkedin.com/in/gastonmartinperez)
