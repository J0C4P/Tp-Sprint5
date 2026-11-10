import { useVideojuegosContext } from '../context/VideojuegosContext'
import Spinner from '../components/ui/Spinner'
import ErrorMessage from '../components/ui/ErrorMessage'
import VideojuegoCard from '../components/VideojuegoCard'

function ListPage() {
  const { videojuegos, loading, error, reintentar } = useVideojuegosContext()

  if (loading) return <Spinner texto="Cargando videojuegos..." />
  if (error) return <ErrorMessage mensaje={error} onReintentar={reintentar} />

  if (videojuegos.length === 0) {
    return <p>Todavía no hay videojuegos cargados.</p>
  }

  return (
    <section>
      <h1>Videojuegos</h1>
      {videojuegos.map((v) => (
        <VideojuegoCard key={v.id} videojuego={v} />
      ))}
    </section>
  )
}

export default ListPage
