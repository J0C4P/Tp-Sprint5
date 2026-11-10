import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useVideojuego } from '../hooks/useVideojuego'
import { useBorrar } from '../hooks/useBorrar'
import Spinner from '../components/ui/Spinner'
import ErrorMessage from '../components/ui/ErrorMessage'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import { SIN_IMAGEN } from '../utils/imagenes'
import { ESTILO_PLATAFORMA } from '../config/opciones'

function DetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { videojuego, loading, error, noEncontrado, reintentar } =
    useVideojuego(id)
  const [imagenRota, setImagenRota] = useState(false)
  const { aBorrar, pedirBorrado, cancelar, confirmar, borrando } = useBorrar(
    () => navigate('/videojuegos')
  )

  if (loading) return <Spinner texto="Cargando videojuego..." />

  if (noEncontrado) {
    return (
      <section className="panel mx-auto flex max-w-md flex-col items-start gap-4 p-8">
        <h1 className="page-title">Videojuego no encontrado</h1>
        <p>No existe un videojuego con el id {id}.</p>
        <Link to="/videojuegos" className="btn btn-accent">
          Volver a la lista
        </Link>
      </section>
    )
  }

  if (error) return <ErrorMessage mensaje={error} onReintentar={reintentar} />

  const {
    titulo,
    genero,
    plataforma,
    desarrollador,
    anioSalida,
    puntuacion,
    imagen,
    descripcion,
    multiplayer,
    servidoresActivos,
  } = videojuego

  return (
    <article className="flex flex-col gap-6">
      <Link to="/videojuegos" className="back-link self-start">
        <span aria-hidden="true">←</span> Volver a la lista
      </Link>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="aspect-[3/4] w-full max-w-sm overflow-hidden border-2 border-ink bg-surface-high shadow-neo lg:col-span-4 lg:max-w-none">
          <img
            src={imagenRota || !imagen ? SIN_IMAGEN : imagen}
            alt={`Portada de ${titulo}`}
            onError={() => setImagenRota(true)}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-8">
          <header className="flex flex-col gap-3">
            <p className="flex flex-wrap items-center gap-2 font-headline text-xs font-bold tracking-wider uppercase">
              <span className="text-link">{desarrollador}</span>
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-ink" />
              <span className="font-mono">{anioSalida}</span>
            </p>
            <h1 className="font-headline text-3xl leading-none font-black tracking-tight uppercase lg:text-5xl">
              {titulo}
            </h1>
            <div className="flex flex-wrap gap-2">
              <span
                className={`badge shadow-neo-sm ${ESTILO_PLATAFORMA[plataforma] ?? 'bg-ink text-white'}`}
              >
                {plataforma}
              </span>
              <span className="badge bg-surface shadow-neo-sm">{genero}</span>
            </div>
          </header>

          <dl className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
            <div className="panel flex flex-col gap-2 p-4">
              <dt className="font-mono text-[11px] font-bold tracking-wider text-muted uppercase">
                Puntuación
              </dt>
              <dd className="flex items-baseline gap-1">
                <span className="font-headline text-4xl font-black text-danger">
                  {puntuacion}
                </span>
                <span className="font-mono text-xs font-bold text-muted">
                  / 10
                </span>
              </dd>
            </div>

            <div className="panel flex flex-col gap-2 p-4">
              <dt className="font-mono text-[11px] font-bold tracking-wider text-muted uppercase">
                Multijugador
              </dt>
              <dd className="font-headline text-base font-bold uppercase">
                {multiplayer ? 'Sí' : 'No'}
              </dd>
            </div>

            {multiplayer && (
              <div className="panel flex flex-col gap-2 p-4">
                <dt className="font-mono text-[11px] font-bold tracking-wider text-muted uppercase">
                  Servidores oficiales
                </dt>
                <dd className="flex items-center gap-2 font-headline text-base font-bold uppercase">
                  <span
                    aria-hidden="true"
                    className={`h-3 w-3 border border-ink ${
                      servidoresActivos ? 'bg-link' : 'bg-surface-high'
                    }`}
                  />
                  {servidoresActivos ? 'Activos' : 'Apagados'}
                </dd>
              </div>
            )}
          </dl>

          <section className="panel flex flex-col gap-3 p-6">
            <h2 className="border-b-2 border-ink pb-3 font-headline text-lg font-bold tracking-tight uppercase">
              Descripción
            </h2>
            <p className="text-sm leading-relaxed">{descripcion}</p>
          </section>

          <div className="flex flex-wrap gap-3">
            <Link to={`/videojuegos/${id}/editar`} className="btn btn-light h-11">
              Editar
            </Link>
            <button
              type="button"
              onClick={() => pedirBorrado(videojuego)}
              className="btn btn-danger h-11"
            >
              Borrar
            </button>
          </div>
        </div>
      </div>

      {aBorrar && (
        <ConfirmDialog
          titulo={`¿Borrar "${aBorrar.titulo}"?`}
          mensaje="Esta acción no se puede deshacer."
          onConfirmar={confirmar}
          onCancelar={cancelar}
          cargando={borrando}
        />
      )}
    </article>
  )
}

export default DetailPage
