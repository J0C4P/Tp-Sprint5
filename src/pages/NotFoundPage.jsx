import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section>
      <h1>Página no encontrada</h1>
      <p>La dirección que buscás no existe.</p>
      <Link to="/videojuegos">Ir a la lista de videojuegos</Link>
    </section>
  )
}

export default NotFoundPage
