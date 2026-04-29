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
          <a href="/como-presupuestar-un-proyecto-freelance">Guía</a>
          <a href="/como-calcular-horas-proyecto-freelance">Horas</a>
          <a href="/ejemplo-presupuesto-freelance">Ejemplo</a>
          <a href="/precio-cerrado-o-por-horas-freelance">Modelo</a>
          <a href="/margen-presupuesto-freelance">Margen</a>
          <a href="/condiciones-pago-presupuesto-freelance">Pagos</a>
          <a href="/presupuesto-por-fases-freelance">Fases</a>
          <a href="/presupuesto-desarrollo-web-freelance">Desarrollo web</a>
          <a href="/#como-funciona">Cómo funciona</a>
          <a href="/#faq">FAQ</a>
        </nav>
      </div>
    </header>
  );
}
