import { NavLink, useMatch } from 'react-router-dom'
import SearchBar from './SearchBar'
import OrdenSelect from './OrdenSelect'

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
    <header>
      <nav aria-label="Principal">
        <span>Videojuegos</span>
        <NavLink to="/videojuegos" end>
          Lista
        </NavLink>
        <NavLink to="/videojuegos/crear">Nuevo</NavLink>
        {enLista && (
          <>
            <SearchBar busqueda={busqueda} setBusqueda={setBusqueda} />
            <OrdenSelect
              orden={orden}
              setOrden={setOrden}
              direccion={direccion}
              setDireccion={setDireccion}
            />
          </>
        )}
      </nav>
    </header>
  )
}

export default Navbar
