# AGENTS.md

## Proyecto

Sitio web de Valeria Vega Danza construido con Vite, React, TypeScript, Tailwind CSS y shadcn-ui. La app usa rutas con `react-router-dom` y componentes funcionales.

## Comandos

- Instalar dependencias: `npm install`
- Desarrollo local: `npm run dev`
- Build de producción: `npm run build`
- Lint: `npm run lint`
- Preview del build: `npm run preview`

## Estructura Principal

- `src/App.tsx`: rutas principales y proveedores globales.
- `src/components/Navigation.tsx`: navegación superior, menú móvil y redes.
- `src/pages/`: páginas visibles del sitio (`Home`, `About`, `Classes`, `Shows`, `Events`, `Press`, `Gallery`, `Contact`).
- `src/components/ui/`: componentes shadcn-ui reutilizables.
- `src/assets/`: imágenes, videos y recursos importados desde React.
- `public/pdfs/`: carpetas PDF públicas para espectáculos.
- `src/components/usePressItems.ts`: fuente de datos base para prensa y videos.

## Eventos

La sección de eventos vive en `src/pages/Events.tsx`. Los eventos se declaran en el arreglo `allEvents` con la estructura `EventItem`.

Campos relevantes:

- `dates`: lista de fechas con día, horario y etiqueta.
- `month` y `year`: usados para filtrar eventos pasados.
- `dateText`: texto manual para rangos de fecha complejos.
- `flyer`: imagen importada desde `src/assets/events`.
- `notes`: información flexible como sedes, boletos, entrada libre o taquilla.
- `description`: descripción visible en el modal de detalle.

Para agregar un evento nuevo, importa el flyer en la parte superior del archivo y añade un objeto a `allEvents`. Mantén los cambios acotados a datos cuando la UI existente ya cubra el caso.

## Espectáculos

La sección de espectáculos está en `src/pages/Shows.tsx`. Cada show usa título, año, gradiente, imagen y opcionalmente una ruta PDF pública. Las carpetas PDF deben colocarse en `public/pdfs/`.

## Estilo

- Usa Tailwind CSS siguiendo las clases y patrones existentes.
- Conserva el tono visual oscuro, teatral y fotográfico del sitio.
- Evita refactors amplios si el cambio pedido puede resolverse actualizando datos.
- Para recursos visuales nuevos, prefiere `src/assets/...` cuando se importan en componentes.

## Verificación

Antes de entregar cambios, ejecuta como mínimo `npm run build`. Si se modifican reglas o componentes compartidos, también corre `npm run lint`.
