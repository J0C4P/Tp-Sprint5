function SearchBar({ busqueda, setBusqueda }) {
  return (
    <input
      type="search"
      placeholder="Buscar videojuegos..."
      aria-label="Buscar videojuegos por título"
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
    />
  )
}

export default SearchBar
