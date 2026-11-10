function SearchBar({ busqueda, setBusqueda }) {
  return (
    <input
      type="search"
      placeholder="Buscar por título..."
      aria-label="Buscar videojuegos por título"
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
      className="field min-w-0 flex-1 basis-56"
    />
  )
}

export default SearchBar
