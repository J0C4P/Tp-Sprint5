import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SIN_IMAGEN } from '../utils/imagenes'
import { ESTILO_PLATAFORMA } from '../config/opciones'

function VideojuegoCard({ videojuego, onBorrar }) {
  const {
    id,
    titulo,
    genero,
    plataforma,
    desarrollador,
    anioSalida,
    puntuacion,
    imagen,
  } = videojuego
  const [imagenRota, setImagenRota] = useState(false)

  return (
    <article className="group flex flex-col border-2 border-ink bg-surface shadow-neo transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-lg">
      <div className="relative aspect-[3/4] w-full overflow-hidden border-b-2 border-ink bg-surface-high">
        <img
          src={imagenRota || !imagen ? SIN_IMAGEN : imagen}
          alt={`Portada de ${titulo}`}
          onError={() => setImagenRota(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
          <span
            className={`badge ${ESTILO_PLATAFORMA[plataforma] ?? 'bg-ink text-white'}`}
          >
            {plataforma}
          </span>
          <span className="badge bg-surface">{genero}</span>
        </div>
        <span className="badge absolute top-2.5 right-2.5 gap-1 bg-accent shadow-neo-sm">
          <span aria-hidden="true">★</span>
          <span className="sr-only">Puntuación:</span>
          {puntuacion}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <div className="flex items-center justify-between gap-2 font-headline text-[11px] font-bold tracking-wider text-muted uppercase">
            <span className="truncate">{desarrollador}</span>
            <span className="border border-ink bg-surface-low px-1 font-mono text-ink">
              {anioSalida}
            </span>
          </div>
          <h2 className="mt-1 line-clamp-2 font-headline text-lg leading-tight font-bold">
            {titulo}
          </h2>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 border-t-2 border-ink pt-3">
          <Link
            to={`/videojuegos/${id}`}
            className="font-headline text-xs font-bold tracking-wider text-link uppercase hover:text-ink"
          >
            Ver detalle <span aria-hidden="true">→</span>
          </Link>
          <button
            type="button"
            onClick={() => onBorrar(videojuego)}
            className="btn btn-danger h-8 px-3"
          >
            Borrar
          </button>
        </div>
      </div>
    </article>
  )
}

export default VideojuegoCard
