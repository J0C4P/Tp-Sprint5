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

function Campo({ id, etiqueta, requerido, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="label">
        {etiqueta}
        {requerido && (
          <span aria-hidden="true" className="text-danger-dark">
            {' '}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p role="alert" className="field-error">
          {error.message}
        </p>
      )}
    </div>
  )
}

function CasillaTarjeta({ id, etiqueta, registro }) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center justify-between gap-3 border-2 border-ink bg-background p-3 font-headline text-xs font-bold shadow-neo-sm transition-colors select-none hover:bg-accent"
    >
      {etiqueta}
      <input
        id={id}
        type="checkbox"
        className="h-5 w-5 shrink-0 cursor-pointer accent-ink"
        {...registro}
      />
    </label>
  )
}

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
    <form
      onSubmit={handleSubmit(enviar)}
      noValidate
      className="border-2 border-ink bg-surface-mid shadow-neo-lg"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink bg-accent p-4">
        <h2 className="label">Datos del videojuego</h2>
        <span className="badge bg-surface">* Campos obligatorios</span>
      </div>

      <div className="flex flex-col gap-5 p-5 sm:p-8">
        <Campo id="titulo" etiqueta="Título" requerido error={errors.titulo}>
          <input
            id="titulo"
            type="text"
            aria-invalid={!!errors.titulo}
            className="field"
            {...register('titulo', {
              required: 'El título es obligatorio',
              minLength: { value: 2, message: 'Mínimo 2 caracteres' },
            })}
          />
        </Campo>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Campo id="genero" etiqueta="Género" requerido error={errors.genero}>
            <select
              id="genero"
              aria-invalid={!!errors.genero}
              className="field cursor-pointer"
              {...register('genero', { required: 'Elegí un género' })}
            >
              <option value="">Seleccioná...</option>
              {GENEROS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </Campo>

          <Campo
            id="plataforma"
            etiqueta="Plataforma"
            requerido
            error={errors.plataforma}
          >
            <select
              id="plataforma"
              aria-invalid={!!errors.plataforma}
              className="field cursor-pointer"
              {...register('plataforma', { required: 'Elegí una plataforma' })}
            >
              <option value="">Seleccioná...</option>
              {PLATAFORMAS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </Campo>

          <Campo
            id="desarrollador"
            etiqueta="Desarrollador"
            requerido
            error={errors.desarrollador}
          >
            <select
              id="desarrollador"
              aria-invalid={!!errors.desarrollador}
              className="field cursor-pointer"
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
          </Campo>

          <Campo
            id="anioSalida"
            etiqueta="Año de salida"
            requerido
            error={errors.anioSalida}
          >
            <input
              id="anioSalida"
              type="number"
              aria-invalid={!!errors.anioSalida}
              className="field font-mono font-bold"
              {...register('anioSalida', {
                required: 'El año es obligatorio',
                valueAsNumber: true,
                min: { value: 1970, message: 'Mínimo 1970' },
                max: { value: ANIO_ACTUAL, message: `Máximo ${ANIO_ACTUAL}` },
              })}
            />
          </Campo>

          <Campo
            id="puntuacion"
            etiqueta="Puntuación (0 a 10)"
            requerido
            error={errors.puntuacion}
          >
            <input
              id="puntuacion"
              type="number"
              step="0.1"
              aria-invalid={!!errors.puntuacion}
              className="field font-mono font-bold"
              {...register('puntuacion', {
                required: 'La puntuación es obligatoria',
                valueAsNumber: true,
                min: { value: 0, message: 'Mínimo 0' },
                max: { value: 10, message: 'Máximo 10' },
              })}
            />
          </Campo>

          <Campo
            id="imagen"
            etiqueta="URL de la imagen (opcional)"
            error={errors.imagen}
          >
            <input
              id="imagen"
              type="text"
              aria-invalid={!!errors.imagen}
              className="field font-mono text-xs"
              {...register('imagen', {
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: 'Debe ser una URL que empiece con http:// o https://',
                },
              })}
            />
          </Campo>
        </div>

        <Campo
          id="descripcion"
          etiqueta="Descripción"
          requerido
          error={errors.descripcion}
        >
          <textarea
            id="descripcion"
            rows="4"
            aria-invalid={!!errors.descripcion}
            className="field h-auto resize-y p-3.5 leading-relaxed"
            {...register('descripcion', {
              required: 'La descripción es obligatoria',
              minLength: { value: 10, message: 'Mínimo 10 caracteres' },
            })}
          />
        </Campo>

        <fieldset className="flex flex-col gap-3 border-2 border-ink bg-surface p-4 shadow-neo-sm">
          <legend className="label px-1">Modo online</legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <CasillaTarjeta
              id="multiplayer"
              etiqueta="Tiene modo multijugador"
              registro={register('multiplayer')}
            />
            {esMultijugador && (
              <CasillaTarjeta
                id="servidoresActivos"
                etiqueta="Servidores oficiales activos"
                registro={register('servidoresActivos')}
              />
            )}
          </div>
        </fieldset>

        <div className="flex justify-end border-t-2 border-ink pt-5">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-link h-11 w-full px-6 sm:w-auto"
          >
            {isSubmitting ? 'Guardando...' : textoBoton}
          </button>
        </div>
      </div>
    </form>
  )
}

export default VideojuegoForm
