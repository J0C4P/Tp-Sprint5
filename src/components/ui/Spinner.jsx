function Spinner({ texto = 'Cargando...' }) {
  return (
    <div
      role="status"
      className="panel mx-auto flex max-w-md flex-col items-center gap-4 p-8"
    >
      <div
        aria-hidden="true"
        className="h-10 w-10 animate-spin border-4 border-ink border-t-accent"
      />
      <p className="font-headline text-sm font-bold tracking-wider uppercase">
        {texto}
      </p>
    </div>
  )
}

export default Spinner
