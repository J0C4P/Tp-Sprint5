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
    return <p>Todavía no hay videojuegos cargados.</p>
  }

  const filtrados = ordenarVideojuegos(
    videojuegos.filter((v) =>
      v.titulo.toLowerCase().includes(busqueda.trim().toLowerCase())
    ),
    orden,
    direccion
  )

  return (
    <section>
      <h1>Videojuegos</h1>
      {filtrados.length === 0 && <p>No hay resultados para "{busqueda}".</p>}
      {filtrados.map((v) => (
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
