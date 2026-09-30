/* eslint-disable @next/next/no-html-link-for-pages */

export default function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <a href="/" className="brand" aria-label="Ir al inicio de Cuánto Presupuestar">
          <span className="brand-mark" aria-hidden="true">P</span>
          <span className="brand-wordmark">
            <strong>Cuánto Presupuestar</strong>
            <small>Presupuestos freelance</small>
          </span>
        </a>

        <nav className="nav" aria-label="Navegación principal">
          <a href="/#como-funciona">Qué obtienes</a>
          <a href="/ejemplo-presupuesto-freelance">Ejemplo</a>
          <a className="nav-secondary" href="/como-presupuestar-un-proyecto-freelance">Guía</a>
          <a className="nav-cta" href="/#calculadora">Calcular ahora <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>
  );
}
