import { useEffect, useId } from 'react'

function Modal({ titulo, onCerrar, children }) {
  const tituloId = useId()

  useEffect(() => {
    const alTeclear = (e) => {
      if (e.key === 'Escape') onCerrar()
    }
    document.addEventListener('keydown', alTeclear)
    return () => document.removeEventListener('keydown', alTeclear)
  }, [onCerrar])

  return (
    <div
      onClick={onCerrar}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-lg flex-col gap-5 overflow-y-auto border-2 border-ink bg-background p-6 shadow-neo-lg"
      >
        <h2
          id={tituloId}
          className="font-headline text-2xl font-black tracking-tight uppercase"
        >
          {titulo}
        </h2>
        {children}
      </div>
    </div>
  )
}

export default Modal
