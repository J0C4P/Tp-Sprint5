import { ORDENES } from '../../config/opciones'

function OrdenSelect({ orden, setOrden, direccion, setDireccion }) {
  const alternarDireccion = () =>
    setDireccion((d) => (d === 'asc' ? 'desc' : 'asc'))

  const descripcion =
    direccion === 'asc' ? 'de menor a mayor' : 'de mayor a menor'

  return (
    <>
      <select
        aria-label="Ordenar videojuegos por"
        value={orden}
        onChange={(e) => setOrden(e.target.value)}
        className="field w-auto cursor-pointer font-headline text-xs font-bold uppercase"
      >
        {ORDENES.map((o) => (
          <option key={o.valor} value={o.valor}>
            {o.etiqueta}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={alternarDireccion}
        title={`Orden actual: ${descripcion}. Clic para invertir`}
        aria-label={`Invertir el orden (actual: ${descripcion})`}
        className="btn btn-light h-11 w-11 px-0 text-base"
      >
        ⇅
      </button>
    </>
  )
}

export default OrdenSelect
