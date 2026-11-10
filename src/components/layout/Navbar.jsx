import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header>
      <nav aria-label="Principal">
        <span>Videojuegos</span>
        <NavLink to="/videojuegos" end>
          Lista
        </NavLink>
        <NavLink to="/videojuegos/crear">Nuevo</NavLink>
      </nav>
    </header>
  )
}

export default Navbar
