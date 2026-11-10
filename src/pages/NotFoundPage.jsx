import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="panel mx-auto flex max-w-md flex-col items-start gap-4 p-8">
      <h1 className="page-title">Página no encontrada</h1>
      <p>La dirección que buscás no existe.</p>
      <Link to="/videojuegos" className="btn btn-accent">
        Ir a la lista de videojuegos
      </Link>
    </section>
  )
}

export default NotFoundPage
