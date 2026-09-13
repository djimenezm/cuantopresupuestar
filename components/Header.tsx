/* eslint-disable @next/next/no-html-link-for-pages */

export default function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <a href="/" className="brand" aria-label="Ir al inicio de Cuánto Presupuestar">
          Cuánto Presupuestar
        </a>

        <nav className="nav" aria-label="Navegación principal">
          <a href="/#calculadora">Calculadora</a>
          <a href="/#como-funciona">Qué obtienes</a>
          <a href="/ejemplo-presupuesto-freelance">Ejemplo</a>
          <a href="/como-presupuestar-un-proyecto-freelance">Guía</a>
        </nav>
      </div>
    </header>
  );
}
