import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          Cuánto Presupuestar
        </Link>

        <nav className="nav" aria-label="Navegación principal">
          <Link href="/#calculadora">Calculadora</Link>
          <Link href="/como-presupuestar-un-proyecto-freelance">Guia</Link>
          <Link href="/como-calcular-horas-proyecto-freelance">Horas</Link>
          <Link href="/ejemplo-presupuesto-freelance">Ejemplo</Link>
          <Link href="/precio-cerrado-o-por-horas-freelance">Modelo</Link>
          <Link href="/margen-presupuesto-freelance">Margen</Link>
          <Link href="/presupuesto-por-fases-freelance">Fases</Link>
          <Link href="/presupuesto-desarrollo-web-freelance">Desarrollo web</Link>
          <Link href="/#como-funciona">Cómo funciona</Link>
          <Link href="/#faq">FAQ</Link>
        </nav>
      </div>
    </header>
  );
}
