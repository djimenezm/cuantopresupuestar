import { siteConfig } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-copy">
          <p>
            Copyright {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p>Titular: {siteConfig.ownerName}</p>
          <p className="footer-contact-row">
            <a className="footer-contact-link" href={`mailto:${siteConfig.contactEmail}`}>
              Contacto: {siteConfig.contactEmail}
            </a>
          </p>
          <p className="footer-note">
            Herramienta orientativa para presupuestar proyectos freelance. No constituye
            asesoramiento fiscal ni legal.
          </p>
        </div>
        <nav className="footer-links" aria-label="Navegación secundaria">
          <a href="/ejemplo-presupuesto-freelance">Ejemplo</a>
          <a href="/como-calcular-horas-proyecto-freelance">Horas</a>
          <a href="/precio-cerrado-o-por-horas-freelance">Modelo</a>
          <a href="/margen-presupuesto-freelance">Margen</a>
          <a href="/condiciones-pago-presupuesto-freelance">Pagos</a>
          <a href="/presupuesto-por-fases-freelance">Fases</a>
          <a href="/presupuesto-desarrollo-web-freelance">Desarrollo web</a>
          <a href="/cuanto-cobrar-web-corporativa-freelance">Web corporativa</a>
          <a href="/cuanto-cobrar-tienda-online-freelance">Tienda online</a>
          <a href="/precio-pagina-web-profesional-freelance">Web profesional</a>
          <a href="https://www.cuantofacturar.es?utm_source=cuantopresupuestar&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
            Facturar
          </a>
          <a href="https://www.mantenimientowebmensual.es?utm_source=cuantopresupuestar&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
            Mantenimiento web
          </a>
          <a href="https://www.cuantocobrarlandingpage.es?utm_source=cuantopresupuestar&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
            Landing pages
          </a>
          <a href="https://www.paneldeherramientas.es/precios-freelance?utm_source=cuantopresupuestar&utm_medium=ecosystem-footer&utm_campaign=pricing_hub">
            Precios freelance
          </a>
          <a href="https://www.paneldeherramientas.es?utm_source=cuantopresupuestar&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
            Panel
          </a>
          <a href="/aviso-legal">Aviso legal</a>
          <a href="/privacidad">Privacidad</a>
          <a href="/cookies">Cookies</a>
        </nav>
      </div>
    </footer>
  );
}
