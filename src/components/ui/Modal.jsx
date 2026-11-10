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
    <div onClick={onCerrar}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id={tituloId}>{titulo}</h2>
        {children}
      </div>
    </div>
  )
}

export default Modal
