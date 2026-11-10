import { useEffect, useState } from 'react'
import axios from 'axios'
import { getAll, create, update } from '../api/videojuegosApi'

export function useVideojuegos() {
  const [videojuegos, setVideojuegos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function cargar() {
      try {
        const data = await getAll(controller.signal)
        setVideojuegos(data)
      } catch (err) {
        if (axios.isCancel(err)) return
        setError(
          err.response
            ? `El servidor respondió con un error (${err.response.status}).`
            : 'No se pudo conectar con el servidor. Revisá tu conexión.'
        )
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    cargar()
    return () => controller.abort()
  }, [intento])

  const reintentar = () => {
    setError(null)
    setLoading(true)
    setIntento((n) => n + 1)
  }

  // Propaga el error: la página decide qué mostrar y si navega.
  const crear = async (data) => {
    const nuevo = await create(data)
    setVideojuegos((prev) => [...prev, nuevo])
    return nuevo
  }

  const editar = async (id, data) => {
    const actualizado = await update(id, data)
    setVideojuegos((prev) =>
      prev.map((v) => (v.id === actualizado.id ? actualizado : v))
    )
    return actualizado
  }

  return { videojuegos, loading, error, reintentar, crear, editar }
}
