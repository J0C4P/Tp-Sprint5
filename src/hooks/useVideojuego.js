import { useEffect, useState } from 'react'
import axios from 'axios'
import { getById } from '../api/videojuegosApi'
import { mensajeDeError } from '../api/errores'

export function useVideojuego(id) {
  const [videojuego, setVideojuego] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [noEncontrado, setNoEncontrado] = useState(false)
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function cargar() {
      try {
        const data = await getById(id, controller.signal)
        setVideojuego(data)
      } catch (err) {
        if (axios.isCancel(err)) return
        if (err.response?.status === 404) {
          setNoEncontrado(true)
        } else {
          setError(mensajeDeError(err))
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    cargar()
    return () => controller.abort()
  }, [id, intento])

  const reintentar = () => {
    setError(null)
    setNoEncontrado(false)
    setLoading(true)
    setIntento((n) => n + 1)
  }

  return { videojuego, loading, error, noEncontrado, reintentar }
}
