import { useState } from 'react'
import { useVideojuegosContext } from '../context/VideojuegosContext'
import { useToast } from '../context/ToastContext'

// Flujo de borrado compartido por la lista y el detalle:
// pedir confirmación -> borrar -> avisar -> (opcional) hacer algo después.
export function useBorrar(despues) {
  const { borrar } = useVideojuegosContext()
  const { mostrar } = useToast()
  const [aBorrar, setABorrar] = useState(null)
  const [borrando, setBorrando] = useState(false)

  const cancelar = () => setABorrar(null)

  const confirmar = async () => {
    setBorrando(true)
    try {
      await borrar(aBorrar.id)
      mostrar(`"${aBorrar.titulo}" se borró correctamente`)
      setABorrar(null)
      despues?.()
    } catch {
      mostrar('No se pudo borrar el videojuego. Intentá de nuevo.', 'error')
    } finally {
      setBorrando(false)
    }
  }

  return { aBorrar, pedirBorrado: setABorrar, cancelar, confirmar, borrando }
}
