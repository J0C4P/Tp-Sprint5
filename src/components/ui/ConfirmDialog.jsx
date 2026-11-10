import Modal from './Modal'

function ConfirmDialog({ titulo, mensaje, onConfirmar, onCancelar, cargando }) {
  return (
    <Modal titulo={titulo} onCerrar={cargando ? () => {} : onCancelar}>
      <p>{mensaje}</p>
      <button type="button" onClick={onCancelar} disabled={cargando}>
        Cancelar
      </button>
      <button type="button" onClick={onConfirmar} disabled={cargando}>
        {cargando ? 'Borrando...' : 'Borrar'}
      </button>
    </Modal>
  )
}

export default ConfirmDialog
