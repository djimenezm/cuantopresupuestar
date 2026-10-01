/* eslint-disable @next/next/no-html-link-for-pages */

import { siteConfig } from '@/lib/site';

const footerGroups = [
  {
    title: 'Calcular',
    links: [
      { href: '/#calculadora', label: 'Calculadora' },
      { href: '/como-calcular-horas-proyecto-freelance', label: 'Calcular horas' },
      { href: '/margen-presupuesto-freelance', label: 'Definir el margen' },
    ],
  },
  {
    title: 'Preparar',
    links: [
      { href: '/ejemplo-presupuesto-freelance', label: 'Ejemplo de presupuesto' },
      { href: '/kit-presupuesto-freelance', label: 'Plantilla editable' },
      { href: '/condiciones-pago-presupuesto-freelance', label: 'Condiciones de pago' },
      { href: '/presupuesto-por-fases-freelance', label: 'Presupuesto por fases' },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-invite-band">
        <div className="container footer-invite">
          <div>
            <span className="footer-invite-kicker">Antes de enviar tu propuesta</span>
            <p>Presupuesta con más claridad.</p>
          </div>
          <a href="/#calculadora" className="footer-invite-link">Hacer el cálculo <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="container footer-shell">
        <div className="footer-main">
          <div className="footer-brand-block">
            <a href="/" className="footer-brand">
              Cuánto Presupuestar
            </a>
            <p>Proyectos con más margen y menos dudas antes de enviar la propuesta.</p>
            <div className="footer-contact">
              <span className="footer-contact-label">Contacto</span>
              <a
                className="footer-contact-link"
                href={`mailto:${siteConfig.contactEmail}`}
                aria-label={`Enviar un correo a ${siteConfig.contactEmail}`}
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          </div>

          <nav className="footer-links" aria-label="Navegación secundaria">
            {footerGroups.map((group) => (
              <div className="footer-group" key={group.title}>
                <p className="footer-group-title">{group.title}</p>
                {group.links.map((link) => (
                  <a href={link.href} key={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            ))}

            <div className="footer-group">
              <p className="footer-group-title">Herramientas</p>
              <a href="https://www.cuantofacturar.es?utm_source=cuantopresupuestar&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
                Cuánto facturar
              </a>
              <a href="https://www.cuantocobrarlandingpage.es?utm_source=cuantopresupuestar&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
                Cobrar una landing
              </a>
              <a href="https://www.mantenimientowebmensual.es?utm_source=cuantopresupuestar&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
                Mantenimiento web
              </a>
              <a href="https://www.paneldeherramientas.es?utm_source=cuantopresupuestar&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
                Panel de herramientas
              </a>
            </div>
          </nav>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal-copy">
            <p>
              Copyright {new Date().getFullYear()} {siteConfig.name} · Titular:{' '}
              {siteConfig.ownerName}
            </p>
            <p>Herramienta orientativa. No constituye asesoramiento fiscal ni legal.</p>
          </div>
          <nav aria-label="Enlaces legales">
            <a href="/aviso-legal">Aviso legal</a>
            <a href="/privacidad">Privacidad</a>
            <a href="/cookies">Cookies</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
