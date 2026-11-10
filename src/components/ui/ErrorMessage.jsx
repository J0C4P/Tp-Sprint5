function ErrorMessage({ mensaje, onReintentar }) {
  return (
    <div
      role="alert"
      className="mx-auto flex max-w-md flex-col items-center gap-4 border-2 border-ink bg-danger-soft p-8 text-center shadow-neo"
    >
      <p className="font-headline text-base font-bold">{mensaje}</p>
      {onReintentar && (
        <button
          type="button"
          onClick={onReintentar}
          className="btn btn-danger"
        >
          Reintentar
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
