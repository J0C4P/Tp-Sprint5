import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useVideojuego } from '../hooks/useVideojuego'
import { useBorrar } from '../hooks/useBorrar'
import Spinner from '../components/ui/Spinner'
import ErrorMessage from '../components/ui/ErrorMessage'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import { SIN_IMAGEN } from '../utils/imagenes'

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
      <section>
        <h1>Videojuego no encontrado</h1>
        <p>No existe un videojuego con el id {id}.</p>
        <Link to="/videojuegos">Volver a la lista</Link>
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
    <article>
      <Link to="/videojuegos">← Volver a la lista</Link>
      <h1>{titulo}</h1>
      <img
        src={imagenRota || !imagen ? SIN_IMAGEN : imagen}
        alt={`Portada de ${titulo}`}
        onError={() => setImagenRota(true)}
        width="300"
      />
      <ul>
        <li>Género: {genero}</li>
        <li>Plataforma: {plataforma}</li>
        <li>Desarrollador: {desarrollador}</li>
        <li>Año de salida: {anioSalida}</li>
        <li>Puntuación: {puntuacion}</li>
        <li>Multijugador: {multiplayer ? 'Sí' : 'No'}</li>
        {multiplayer && (
          <li>
            Servidores oficiales: {servidoresActivos ? 'Activos' : 'Apagados'}
          </li>
        )}
      </ul>
      <p>{descripcion}</p>
      <Link to={`/videojuegos/${id}/editar`}>Editar</Link>
      <button type="button" onClick={() => pedirBorrado(videojuego)}>
        Borrar
      </button>
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
