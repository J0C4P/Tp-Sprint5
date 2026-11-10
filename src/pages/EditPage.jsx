import { Link, useNavigate, useParams } from 'react-router-dom'
import { useVideojuego } from '../hooks/useVideojuego'
import { useVideojuegosContext } from '../context/VideojuegosContext'
import { useToast } from '../context/ToastContext'
import Spinner from '../components/ui/Spinner'
import ErrorMessage from '../components/ui/ErrorMessage'
import VideojuegoForm from '../components/VideojuegoForm'

function EditPage() {
  const { id } = useParams()
  const { videojuego, loading, error, noEncontrado, reintentar } =
    useVideojuego(id)
  const { editar } = useVideojuegosContext()
  const { mostrar } = useToast()
  const navigate = useNavigate()

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

  const onSubmit = async (data) => {
    try {
      await editar(id, data)
      mostrar('Videojuego actualizado correctamente')
      navigate(`/videojuegos/${id}`)
    } catch {
      // No navega: el usuario conserva lo que escribió.
      mostrar('No se pudo guardar los cambios. Intentá de nuevo.', 'error')
    }
  }

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6">
      <Link to={`/videojuegos/${id}`} className="back-link self-start">
        <span aria-hidden="true">←</span> Volver al detalle
      </Link>
      <h1 className="page-title">Editar {videojuego.titulo}</h1>
      <VideojuegoForm
        valoresIniciales={videojuego}
        onSubmit={onSubmit}
        textoBoton="Guardar cambios"
      />
    </section>
  )
}

export default EditPage
