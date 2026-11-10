function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-surface">
      <p className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-1 px-4 py-6 font-headline text-xs font-bold tracking-wider uppercase lg:px-8">
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="flex h-6 w-6 items-center justify-center border-2 border-ink bg-accent text-[10px] font-black shadow-neo-sm"
          >
            VJ
          </span>
          Videojuegos
        </span>
        <span aria-hidden="true">·</span>
        <span>Proyecto Sprint 5</span>
        <span aria-hidden="true">·</span>
        <span>Hecho con React por José Capdevila</span>
      </p>
    </footer>
  )
}

export default Footer
