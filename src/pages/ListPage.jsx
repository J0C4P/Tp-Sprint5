import { useVideojuegosContext } from '../context/VideojuegosContext'
import { useBorrar } from '../hooks/useBorrar'
import Spinner from '../components/ui/Spinner'
import ErrorMessage from '../components/ui/ErrorMessage'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import VideojuegoCard from '../components/VideojuegoCard'

function ListPage() {
  const { videojuegos, loading, error, reintentar } = useVideojuegosContext()
  const { aBorrar, pedirBorrado, cancelar, confirmar, borrando } = useBorrar()

  if (loading) return <Spinner texto="Cargando videojuegos..." />
  if (error) return <ErrorMessage mensaje={error} onReintentar={reintentar} />

  if (videojuegos.length === 0) {
    return <p>Todavía no hay videojuegos cargados.</p>
  }

  return (
    <section>
      <h1>Videojuegos</h1>
      {videojuegos.map((v) => (
        <VideojuegoCard key={v.id} videojuego={v} onBorrar={pedirBorrado} />
      ))}
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
