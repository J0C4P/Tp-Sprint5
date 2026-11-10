function ErrorMessage({ mensaje, onReintentar }) {
  return (
    <div role="alert">
      <p>{mensaje}</p>
      {onReintentar && (
        <button type="button" onClick={onReintentar}>
          Reintentar
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
