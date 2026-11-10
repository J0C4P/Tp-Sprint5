import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { GENEROS, PLATAFORMAS, DESARROLLADORES } from '../config/opciones'

const VALORES_VACIOS = {
  titulo: '',
  genero: '',
  plataforma: '',
  desarrollador: '',
  anioSalida: '',
  puntuacion: '',
  imagen: '',
  descripcion: '',
  multiplayer: false,
  servidoresActivos: false,
}

const ANIO_ACTUAL = new Date().getFullYear()

function VideojuegoForm({
  valoresIniciales = VALORES_VACIOS,
  onSubmit,
  textoBoton = 'Guardar',
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: valoresIniciales })

  // defaultValues solo se lee en el primer render: si los valores
  // iniciales cambian después (edición), hay que volcarlos con reset().
  useEffect(() => {
    reset(valoresIniciales)
  }, [valoresIniciales, reset])

  const esMultijugador = useWatch({ control, name: 'multiplayer' })

  const enviar = (data) =>
    onSubmit({
      ...data,
      servidoresActivos: data.multiplayer ? data.servidoresActivos : false,
    })

  return (
    <form onSubmit={handleSubmit(enviar)} noValidate>
      <div>
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          type="text"
          aria-invalid={!!errors.titulo}
          {...register('titulo', {
            required: 'El título es obligatorio',
            minLength: { value: 2, message: 'Mínimo 2 caracteres' },
          })}
        />
        {errors.titulo && <p role="alert">{errors.titulo.message}</p>}
      </div>

      <div>
        <label htmlFor="genero">Género</label>
        <select
          id="genero"
          aria-invalid={!!errors.genero}
          {...register('genero', { required: 'Elegí un género' })}
        >
          <option value="">Seleccioná...</option>
          {GENEROS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        {errors.genero && <p role="alert">{errors.genero.message}</p>}
      </div>

      <div>
        <label htmlFor="plataforma">Plataforma</label>
        <select
          id="plataforma"
          aria-invalid={!!errors.plataforma}
          {...register('plataforma', { required: 'Elegí una plataforma' })}
        >
          <option value="">Seleccioná...</option>
          {PLATAFORMAS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {errors.plataforma && <p role="alert">{errors.plataforma.message}</p>}
      </div>

      <div>
        <label htmlFor="desarrollador">Desarrollador</label>
        <select
          id="desarrollador"
          aria-invalid={!!errors.desarrollador}
          {...register('desarrollador', {
            required: 'Elegí un desarrollador',
          })}
        >
          <option value="">Seleccioná...</option>
          {DESARROLLADORES.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        {errors.desarrollador && (
          <p role="alert">{errors.desarrollador.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="anioSalida">Año de salida</label>
        <input
          id="anioSalida"
          type="number"
          aria-invalid={!!errors.anioSalida}
          {...register('anioSalida', {
            required: 'El año es obligatorio',
            valueAsNumber: true,
            min: { value: 1970, message: 'Mínimo 1970' },
            max: { value: ANIO_ACTUAL, message: `Máximo ${ANIO_ACTUAL}` },
          })}
        />
        {errors.anioSalida && <p role="alert">{errors.anioSalida.message}</p>}
      </div>

      <div>
        <label htmlFor="puntuacion">Puntuación (0 a 10)</label>
        <input
          id="puntuacion"
          type="number"
          step="0.1"
          aria-invalid={!!errors.puntuacion}
          {...register('puntuacion', {
            required: 'La puntuación es obligatoria',
            valueAsNumber: true,
            min: { value: 0, message: 'Mínimo 0' },
            max: { value: 10, message: 'Máximo 10' },
          })}
        />
        {errors.puntuacion && <p role="alert">{errors.puntuacion.message}</p>}
      </div>

      <div>
        <label htmlFor="imagen">URL de la imagen (opcional)</label>
        <input
          id="imagen"
          type="text"
          aria-invalid={!!errors.imagen}
          {...register('imagen', {
            pattern: {
              value: /^https?:\/\/.+/i,
              message: 'Debe ser una URL que empiece con http:// o https://',
            },
          })}
        />
        {errors.imagen && <p role="alert">{errors.imagen.message}</p>}
      </div>

      <div>
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          rows="4"
          aria-invalid={!!errors.descripcion}
          {...register('descripcion', {
            required: 'La descripción es obligatoria',
            minLength: { value: 10, message: 'Mínimo 10 caracteres' },
          })}
        />
        {errors.descripcion && <p role="alert">{errors.descripcion.message}</p>}
      </div>

      <div>
        <label htmlFor="multiplayer">
          <input id="multiplayer" type="checkbox" {...register('multiplayer')} />
          Tiene modo multijugador
        </label>
      </div>

      {esMultijugador && (
        <div>
          <label htmlFor="servidoresActivos">
            <input
              id="servidoresActivos"
              type="checkbox"
              {...register('servidoresActivos')}
            />
            Sus servidores oficiales siguen activos
          </label>
        </div>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Guardando...' : textoBoton}
      </button>
    </form>
  )
}

export default VideojuegoForm
