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
    <section>
      <Link to="/videojuegos">← Volver a la lista</Link>
      <h1>Nuevo videojuego</h1>
      <VideojuegoForm onSubmit={onSubmit} textoBoton="Crear videojuego" />
    </section>
  )
}

export default CreatePage
