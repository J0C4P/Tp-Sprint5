import { useVideojuegosContext } from '../context/VideojuegosContext'
import { useBorrar } from '../hooks/useBorrar'
import Spinner from '../components/ui/Spinner'
import ErrorMessage from '../components/ui/ErrorMessage'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import VideojuegoCard from '../components/VideojuegoCard'
import { ordenarVideojuegos } from '../utils/ordenar'

function ListPage({ busqueda, orden, direccion }) {
  const { videojuegos, loading, error, reintentar } = useVideojuegosContext()
  const { aBorrar, pedirBorrado, cancelar, confirmar, borrando } = useBorrar()

  if (loading) return <Spinner texto="Cargando videojuegos..." />
  if (error) return <ErrorMessage mensaje={error} onReintentar={reintentar} />

  if (videojuegos.length === 0) {
    return (
      <p className="panel p-8 text-center font-headline font-bold">
        Todavía no hay videojuegos cargados.
      </p>
    )
  }

  const filtrados = ordenarVideojuegos(
    videojuegos.filter((v) =>
      v.titulo.toLowerCase().includes(busqueda.trim().toLowerCase())
    ),
    orden,
    direccion
  )

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3 border-b-2 border-ink pb-4">
        <h1 className="page-title">Videojuegos</h1>
        <span className="badge bg-accent shadow-neo-sm">
          {filtrados.length} {filtrados.length === 1 ? 'título' : 'títulos'}
        </span>
      </div>

      {filtrados.length === 0 && (
        <p className="panel p-8 text-center font-headline font-bold">
          No hay resultados para "{busqueda}".
        </p>
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
        {filtrados.map((v) => (
          <VideojuegoCard key={v.id} videojuego={v} onBorrar={pedirBorrado} />
        ))}
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
    </section>
  )
}

export default ListPage
