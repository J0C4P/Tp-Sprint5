import { createContext, useContext } from 'react'
import { useVideojuegos } from '../hooks/useVideojuegos'

const VideojuegosContext = createContext(null)

export function VideojuegosProvider({ children }) {
  const valor = useVideojuegos()
  return (
    <VideojuegosContext.Provider value={valor}>
      {children}
    </VideojuegosContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useVideojuegosContext() {
  const ctx = useContext(VideojuegosContext)
  if (!ctx) {
    throw new Error(
      'useVideojuegosContext debe usarse dentro de VideojuegosProvider'
    )
  }
  return ctx
}
