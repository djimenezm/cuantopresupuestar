import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Gracias por apuntarte al kit',
  description: `Confirmacion de interes en el kit de presupuesto freelance de ${siteConfig.name}.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function GraciasKitPresupuestoPage() {
  return (
    <main>
      <Header />

      <section className="hero">
        <div className="container text-block">
          <span className="eyebrow">Todo correcto</span>
          <h1>Gracias por apuntarte al kit de presupuesto freelance</h1>
          <p className="lead">
            Ya hemos recibido tu solicitud. Acabas de desbloquear el kit con plantilla de
            presupuesto, estructura de propuesta comercial y checklist de revision.
          </p>
          <div className="disclaimer-box">
            <strong>Nota:</strong> tambien deberias recibir un email con el acceso directo al kit.
            Si no lo ves, revisa spam o promociones.
          </div>
          <div className="guide-cta">
            <Link href="/kit-presupuesto-freelance" className="primary-button">
              Abrir el kit
            </Link>
            <Link href="/" className="primary-button">
              Volver a la calculadora
            </Link>
            <Link href="/recursos/kit-presupuesto-freelance.txt" className="primary-button">
              Descargar version en texto
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
