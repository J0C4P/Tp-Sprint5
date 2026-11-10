# Videojuegos — Un CRUD de verdad

🔗 **Deploy Netlify:** https://sprint5-tp.netlify.app/
**Repositorio:** https://github.com/J0C4P/Tp-Sprint5

## Qué es
Una pantalla de administración de videojuegos con las cuatro operaciones de un CRUD: se puede **listar**, **ver el detalle**, **crear**, **editar** y **borrar** (con confirmación). En la lista se puede buscar por título y ordenar por alfabeto, puntuación o año de salida, en los dos sentidos. Cada acción avisa con un toast y las pantallas manejan carga, error y "no encontrado".

## Recurso y API usada
El recurso es **`videojuegos`**, en un proyecto propio de **MockAPI** (soporta GET, POST, PUT y DELETE y genera el `id`).
- Sitio: https://mockapi.io/
- Base URL: `https://6af2513d42c6561ced392cf8.mockapi.io/api/ggs`
- Endpoint del recurso: `/videojuegos` (y `/videojuegos/:id`)

Esquema de campos:

| Campo | Tipo | En el formulario |
|---|---|---|
| `titulo` | String | texto, obligatorio, mínimo 2 caracteres |
| `genero` | String | select, obligatorio |
| `plataforma` | String | select, obligatorio |
| `desarrollador` | String | select, obligatorio |
| `anioSalida` | Number | número entre 1970 y el año actual |
| `puntuacion` | Number | número entre 0 y 10 |
| `imagen` | String (URL) | opcional, debe empezar con `http://` o `https://` |
| `descripcion` | String | texto largo, mínimo 10 caracteres |
| `multiplayer` | Boolean | checkbox |
| `servidoresActivos` | Boolean | checkbox, solo aparece si es multijugador |

Los `id` llegan como **string** (`"7"`), igual que lo que devuelve `useParams`, así que se comparan sin conversión.

## Cómo correrlo
```bash
pnpm install && pnpm run dev
```

## Variables de entorno
Copiá `.env.example` a `.env` y completá la URL base de tu proyecto en MockAPI, **sin** `/videojuegos` al final:
```
VITE_API_BASE_URL=https://TU_ID_DE_PROYECTO.mockapi.io/api/TU_PREFIJO
```
Se lee en un solo lugar, `src/config/env.js`. Por la excepción de la cursada el `.env` está en el repo; en un proyecto real iría en el `.gitignore`. Vite reemplaza la variable al compilar, así que en Netlify la URL queda fija en cada build: si cambia, hay que volver a desplegar.

## Rutas
| Ruta | Pantalla |
|---|---|
| `/` | redirige a `/videojuegos` |
| `/videojuegos` | lista con buscador y orden |
| `/videojuegos/crear` | alta |
| `/videojuegos/:id` | detalle |
| `/videojuegos/:id/editar` | edición |
| `*` | página no encontrada |

`/videojuegos/crear` está declarada antes que `/videojuegos/:id`. React Router v7 rankea las rutas por especificidad, así que el orden no cambia el resultado, pero lo dejé así para que se lea claro.
Para que F5 en una ruta interna no dé 404 en Netlify, `public/_redirects` tiene `/* /index.html 200`.

## Cómo viaja el dato (crear)
1. `VideojuegoForm` usa React Hook Form: `handleSubmit` valida y, si todo está bien, llama a `enviar`, que fuerza `servidoresActivos` a `false` si no es multijugador.
2. `CreatePage` recibe los datos en `onSubmit` y llama a `crear` del contexto.
3. `crear` (en `useVideojuegos`) llama a `create` de `api/videojuegosApi.js`.
4. Esa función hace el `POST` con la instancia de axios y devuelve `r.data`: el objeto ya con el `id` que generó MockAPI.
5. El hook hace `setVideojuegos(prev => [...prev, nuevo])`, sin mutar.
6. `CreatePage` muestra el toast y navega a `/videojuegos`, donde `ListPage` ya muestra la card nueva sin recargar. Si algo falla, muestra un toast de error, **no navega** y el formulario conserva lo que se escribió.

## Mi capa de API
- **`api/axiosInstance.js`** crea la instancia de axios **una sola vez** (`baseURL` y `timeout` de 10 s).
- **`api/videojuegosApi.js`** tiene `getAll`, `getById`, `create`, `update` y `remove`. No sabe nada de React.
- **`api/errores.js`** tiene `mensajeDeError(err)`: el único lugar donde se arma el texto de error (con respuesta del servidor o sin conexión).

Los componentes y el contexto no conocen la URL ni escriben ninguna petición.

## Mis hooks
- **`useVideojuegos()`** — la lista: `videojuegos`, `loading`, `error` y las acciones `crear`, `editar` y `borrar`. Carga con `AbortController` y `try/catch/finally`, y `reintentar` vuelve a pedir. Se llama **una sola vez**, dentro de `VideojuegosProvider`.
- **`useVideojuego(id)`** — un solo videojuego con `getById`, con `loading`, `error` y `noEncontrado` (un 404 se trata distinto a un error de red).
- **`useBorrar(despues)`** — el flujo de borrado, compartido por la lista y el detalle: guarda qué juego se quiere borrar (`aBorrar`), confirma, avisa y ejecuta `despues` (en el detalle, redirige a la lista).

## Mi contexto
- **`VideojuegosContext`** — solo reparte lo que devuelve `useVideojuegos`: la lista, `loading`, `error` y las acciones. Maneja **estado**, no URLs ni peticiones. Su hook consumidor tiene una guardia que avisa si se usa fuera del Provider.
- **`ToastContext`** — expone `mostrar(mensaje, tipo)` y dibuja los avisos, que desaparecen a los 4 segundos.

## Decisiones de estado
Lo que **no** metí en un contexto, y por qué:
- **`busqueda`, `orden` y `direccion`** — `useState` en `App.jsx`, compartido por la `Navbar` (los controles) y `ListPage` (el filtro). Es el mismo patrón del Tp3. No persisten ni le importan a nadie más.
- **La lista filtrada y ordenada** — es un valor **derivado**: se calcula en cada render a partir de `videojuegos`, `busqueda`, `orden` y `direccion`. No hay un segundo array en el estado que sincronizar.
- **Los valores del formulario** — los maneja React Hook Form, ningún campo tiene su propio `useState`. `servidoresActivos` se muestra con `useWatch` sobre `multiplayer`.
- **Si el diálogo de borrado está abierto** — es `aBorrar` dentro de `useBorrar`: `null` es cerrado, un objeto es abierto.
- **Qué pantalla se ve** — lo decide React Router, no el estado.

## Decisiones técnicas
- **El detalle y la edición usan `getById`** y no buscan en la lista del contexto. Así funcionan con F5 directo en `/videojuegos/7` y tienen su propio estado de carga, error y "no encontrado".
- **Se actualiza el estado con lo que devuelve la API**, no con lo que armó el formulario, porque trae el `id` generado.
- **Orden sin mutar:** `ordenarVideojuegos` copia el array antes de `sort`, porque `sort` modifica el original.
- **Toasts propios** en lugar de una librería: reutilizo el patrón de Context de los sprints anteriores y no sumo dependencias.
- **Opciones de los selects** (géneros, plataformas, desarrolladores y orden) en `config/opciones.js`: agregar una opción es tocar un archivo.
- **`useVideojuegos` y `useVideojuego` importan `axios` solo por `axios.isCancel`**, para distinguir una petición cancelada de un error real. No hacen ninguna petición: eso vive en `api/`.
- **Imagen que falla:** la card y el detalle usan `onError` y muestran un "Sin imagen".
- **Si agrego un campo al recurso**, hay que tocar `VideojuegoForm` (valores y input), `VideojuegoCard` y `DetailPage`.
- **Qué reusé de sprints anteriores:** el patrón de Context (Provider + hook consumidor con guardia), React Hook Form, el buscador con el estado en `App.jsx`, el `Footer` y el criterio de dejar el estilo para el final.

## Estilos
Los dejé para el final, como en los sprints anteriores. El diseño lo generé con **Stitch** (estilo Bauhaus neo-brutalista) y lo adapté a **Tailwind v4**: los colores, las fuentes y las sombras están como tokens en `src/index.css` (`@theme`), y los patrones que se repiten (`btn`, `field`, `panel`, `badge`) como clases compartidas. Descarté lo que Stitch dibujó pero la app no tiene (pestañas, filtros extra, paginación, exportar, vista previa en vivo, etc.).

## Qué generé con IA
Usé **Claude Code** durante todo el desarrollo. El código lo fue escribiendo la IA etapa por etapa siguiendo la guía de desarrollo del TP (API, ruteo y lista, detalle, alta, edición, borrado, feedback), y yo probaba cada etapa en el navegador y hacía un commit por etapa antes de seguir.

Lo que decidí yo:
- El recurso (videojuegos), sus 10 campos y las opciones de los selects.
- Que `desarrollador` fuera un select y que `servidoresActivos` solo apareciera si el juego es multijugador.
- El buscador por título y el orden (criterio en un select y el sentido con el botón `⇅`), siguiendo el patrón del Tp3.
- Usar los nombres de campo que generó MockAPI (`anioSalida`, `multiplayer`, `servidoresActivos`) en lugar de renombrarlos.
- Qué tomar del diseño de Stitch y qué descartar.
- Cargar datos reales a la API con `POST` y borrar los de prueba.

Lo que corregí tras probar: un error del `.env.example` (apuntaba a otra ruta de la API), un 404 en las rutas internas del deploy (faltaba publicar el `_redirects`), y la duplicación del texto de error de los hooks, que pasó a `api/errores.js`.
