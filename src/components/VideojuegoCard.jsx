import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SIN_IMAGEN } from '../utils/imagenes'

function VideojuegoCard({ videojuego }) {
  const { id, titulo, genero, plataforma, anioSalida, puntuacion, imagen } =
    videojuego
  const [imagenRota, setImagenRota] = useState(false)

  return (
    <article>
      <img
        src={imagenRota || !imagen ? SIN_IMAGEN : imagen}
        alt={`Portada de ${titulo}`}
        onError={() => setImagenRota(true)}
        width="200"
      />
      <h2>{titulo}</h2>
      <p>
        {genero} · {plataforma} · {anioSalida}
      </p>
      <p>Puntuación: {puntuacion}</p>
      <Link to={`/videojuegos/${id}`}>Ver detalle</Link>
    </article>
  )
}

export default VideojuegoCard
