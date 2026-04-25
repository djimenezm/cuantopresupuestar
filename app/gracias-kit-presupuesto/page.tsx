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
            Ya hemos recibido tu solicitud. Cuando publiquemos el kit con plantilla de presupuesto,
            propuesta comercial y checklist, te avisaremos en ese email.
          </p>
          <div className="disclaimer-box">
            <strong>Nota:</strong> si es la primera vez que usas este formulario, puede que el
            servicio de captura pida una confirmacion inicial en el buzon de destino.
          </div>
          <div className="guide-cta">
            <Link href="/" className="primary-button">
              Volver a la calculadora
            </Link>
            <Link href="/plantilla-presupuesto-freelance" className="primary-button">
              Ver la plantilla
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
