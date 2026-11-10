import { Link, NavLink, useMatch } from 'react-router-dom'
import SearchBar from './SearchBar'
import OrdenSelect from './OrdenSelect'

const claseLista = ({ isActive }) =>
  `px-4 py-2 font-headline text-xs font-bold tracking-wider uppercase transition-colors ${
    isActive ? 'bg-ink text-white' : 'text-ink hover:bg-accent'
  }`

const claseNuevo = ({ isActive }) =>
  `btn ${isActive ? 'bg-ink text-white' : 'btn-accent'}`

function Navbar({
  busqueda,
  setBusqueda,
  orden,
  setOrden,
  direccion,
  setDireccion,
}) {
  const enLista = useMatch('/videojuegos')

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-surface">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 lg:px-8"
      >
        <Link to="/videojuegos" className="group flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center border-2 border-ink bg-accent font-headline text-sm font-black shadow-neo-sm transition-colors group-hover:bg-ink group-hover:text-accent"
          >
            VJ
          </span>
          <span className="font-headline text-lg font-bold tracking-tight">
            Videojuegos
          </span>
        </Link>

        <div className="border-2 border-ink bg-surface shadow-neo-sm">
          <NavLink to="/videojuegos" end className={claseLista}>
            Lista
          </NavLink>
        </div>

        <NavLink to="/videojuegos/crear" className={claseNuevo}>
          <span aria-hidden="true">+</span> Nuevo
        </NavLink>

        {enLista && (
          <div className="flex w-full flex-wrap items-center gap-2 border-t-2 border-ink pt-3">
            <SearchBar busqueda={busqueda} setBusqueda={setBusqueda} />
            <OrdenSelect
              orden={orden}
              setOrden={setOrden}
              direccion={direccion}
              setDireccion={setDireccion}
            />
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
