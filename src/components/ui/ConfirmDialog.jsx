import Modal from './Modal'

function ConfirmDialog({ titulo, mensaje, onConfirmar, onCancelar, cargando }) {
  return (
    <Modal titulo={titulo} onCerrar={cargando ? () => {} : onCancelar}>
      <p className="text-sm leading-relaxed">{mensaje}</p>
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancelar}
          disabled={cargando}
          className="btn btn-light h-11"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onConfirmar}
          disabled={cargando}
          className="btn btn-danger h-11 shadow-neo"
        >
          {cargando ? 'Borrando...' : 'Borrar'}
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmDialog
