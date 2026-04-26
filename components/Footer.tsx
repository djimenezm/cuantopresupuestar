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
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
          </p>
          <p className="footer-note">
            Herramienta orientativa para presupuestar proyectos freelance. No constituye
            asesoramiento fiscal ni legal.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/presupuesto-desarrollo-web-freelance">Desarrollo web</Link>
          <a href="https://www.cuantofacturar.es">Facturar</a>
          <a href="https://www.mantenimientowebmensual.es">Mantenimiento web</a>
          <a href="https://www.cuantocobrarlandingpage.es">Landing pages</a>
          <a href="https://www.paneldeherramientas.es">Panel</a>
          <Link href="/aviso-legal">Aviso legal</Link>
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
