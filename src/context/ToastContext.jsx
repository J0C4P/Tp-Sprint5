import { createContext, useContext, useState } from 'react'

const ToastContext = createContext(null)

const DURACION_MS = 4000

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const mostrar = (mensaje, tipo = 'exito') => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, mensaje, tipo }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, DURACION_MS)
  }

  return (
    <ToastContext.Provider value={{ mostrar }}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] mx-auto flex max-w-md flex-col gap-2"
      >
        {toasts.map((t) => (
          <p
            key={t.id}
            role={t.tipo === 'error' ? 'alert' : 'status'}
            className={`border-2 border-ink px-5 py-3 font-headline text-xs font-bold tracking-wider uppercase shadow-neo-lg ${
              t.tipo === 'error' ? 'bg-danger text-white' : 'bg-accent text-ink'
            }`}
          >
            {t.mensaje}
          </p>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast debe usarse dentro de ToastProvider')
  }
  return ctx
}
