// Todos los comparadores ordenan de menor a mayor.
const COMPARADORES = {
  alfabetico: (a, b) => a.titulo.localeCompare(b.titulo, 'es'),
  puntuacion: (a, b) => a.puntuacion - b.puntuacion,
  anio: (a, b) => a.anioSalida - b.anioSalida,
}

// Devuelve una copia ordenada: nunca muta el array original.
export function ordenarVideojuegos(lista, orden, direccion) {
  const comparador = COMPARADORES[orden]
  if (!comparador) return lista
  const signo = direccion === 'desc' ? -1 : 1
  return [...lista].sort((a, b) => signo * comparador(a, b))
}
