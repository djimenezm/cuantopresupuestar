import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-copy">
          <p>
            Copyright {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p>
            Titular: {siteConfig.ownerName} · Contacto:{' '}
            <a className="footer-contact-link" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
          </p>
          <p className="footer-note">
            Herramienta orientativa para presupuestar proyectos freelance. No constituye
            asesoramiento fiscal ni legal.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/ejemplo-presupuesto-freelance">Ejemplo</Link>
          <Link href="/como-calcular-horas-proyecto-freelance">Horas</Link>
          <Link href="/precio-cerrado-o-por-horas-freelance">Modelo</Link>
          <Link href="/margen-presupuesto-freelance">Margen</Link>
          <Link href="/condiciones-pago-presupuesto-freelance">Pagos</Link>
          <Link href="/presupuesto-por-fases-freelance">Fases</Link>
          <Link href="/presupuesto-desarrollo-web-freelance">Desarrollo web</Link>
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
          <Link href="/aviso-legal">Aviso legal</Link>
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
