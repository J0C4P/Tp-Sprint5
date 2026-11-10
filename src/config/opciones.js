export const ORDENES = [
  { valor: 'alfabetico', etiqueta: 'Alfabético' },
  { valor: 'puntuacion', etiqueta: 'Puntuación' },
  { valor: 'anio', etiqueta: 'Año de salida' },
]

export const ORDEN_INICIAL = 'alfabetico'

// asc = de menor a mayor (A-Z, 0-10, más antiguo primero)
// desc = de mayor a menor
export const DIRECCION_INICIAL = 'asc'

export const GENEROS = [
  'Acción',
  'Aventura',
  'RPG',
  'Estrategia',
  'Deportes',
  'Terror',
  'Simulación',
  'Otro',
]

export const PLATAFORMAS = ['PC', 'PlayStation', 'Xbox', 'Switch', 'Móvil']

// Color de la etiqueta de plataforma (clases completas para que Tailwind las detecte)
export const ESTILO_PLATAFORMA = {
  PC: 'bg-link text-white',
  PlayStation: 'bg-link text-white',
  Xbox: 'bg-ink text-white',
  Switch: 'bg-danger text-white',
  Móvil: 'bg-accent text-ink',
}

export const DESARROLLADORES = [
  'Nintendo',
  'Rockstar',
  'CD Projekt',
  'FromSoftware',
  'Valve',
  'Ubisoft',
  'Capcom',
  'Otro',
]
