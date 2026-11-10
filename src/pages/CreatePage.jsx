import { Link, useNavigate } from 'react-router-dom'
import { useVideojuegosContext } from '../context/VideojuegosContext'
import { useToast } from '../context/ToastContext'
import VideojuegoForm from '../components/VideojuegoForm'

function CreatePage() {
  const { crear } = useVideojuegosContext()
  const { mostrar } = useToast()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      await crear(data)
      mostrar('Videojuego creado correctamente')
      navigate('/videojuegos')
    } catch {
      // No navega: el usuario conserva lo que escribió.
      mostrar('No se pudo crear el videojuego. Intentá de nuevo.', 'error')
    }
  }

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6">
      <Link to="/videojuegos" className="back-link self-start">
        <span aria-hidden="true">←</span> Volver a la lista
      </Link>
      <h1 className="page-title">Nuevo videojuego</h1>
      <VideojuegoForm onSubmit={onSubmit} textoBoton="Crear videojuego" />
    </section>
  )
}

export default CreatePage
