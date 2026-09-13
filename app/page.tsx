import Image from 'next/image';
import CalculatorForm from '@/components/CalculatorForm';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import { siteConfig } from '@/lib/site';

const outcomeItems = [
  'Precio mínimo defendible',
  'Presupuesto recomendado',
  'Margen e IVA separados',
] as const;

export default function HomePage() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteConfig.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    inLanguage: 'es',
    isAccessibleForFree: true,
    description: siteConfig.description,
    url: siteConfig.url,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    featureList: [
      'Precio mínimo defendible para un proyecto freelance',
      'Presupuesto recomendado según horas, costes y margen',
      'IVA separado del precio del proyecto',
    ],
  };

  return (
    <main id="contenido-principal" className="quote-landing">
      <JsonLd id="webapp-schema" data={webAppSchema} />

      <Header />

      <section className="quote-hero" aria-labelledby="quote-hero-title">
        <Image
          src="/images/project-budget-hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="quote-hero-image"
        />
        <div className="quote-hero-scrim" />
        <div className="container quote-hero-content">
          <span className="quote-hero-kicker">Calculadora para freelance y estudios</span>
          <h1 id="quote-hero-title">Cuánto presupuestar por un proyecto, sin improvisar.</h1>
          <p>
            Convierte horas, costes y margen en una cifra clara que puedas defender ante el cliente.
          </p>

          <div className="quote-hero-actions">
            <a href="#calculadora" className="primary-button">
              Calcular este proyecto
            </a>
            <a href="#como-funciona" className="quote-ghost-button">
              Ver qué obtengo
            </a>
          </div>
        </div>
      </section>

      <section className="quote-calculator-band" aria-labelledby="quote-calculator-heading">
        <div className="container quote-calculator-shell">
          <div className="quote-calculator-copy">
            <span className="eyebrow">Calcula antes de enviar</span>
            <h2 id="quote-calculator-heading">Tu proyecto tiene un precio. Encuéntralo.</h2>
            <p>Ajusta esfuerzo, costes y margen. La calculadora hace el resto.</p>
          </div>

          <CalculatorForm />
        </div>
      </section>

      <section
        className="quote-mini-strip"
        id="como-funciona"
        aria-label="Resultado de la calculadora"
      >
        <div className="container quote-mini-strip-inner">
          <strong>Obtienes solo lo necesario:</strong>
          <div>
            {outcomeItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="quote-next-band">
        <div className="container quote-next-panel">
          <div>
            <span className="eyebrow">Después del cálculo</span>
            <h2>Convierte la cifra en una propuesta clara.</h2>
            <p>Presenta alcance, revisiones y pagos sin dejar huecos ni regalar trabajo.</p>
          </div>
          <a href="/ejemplo-presupuesto-freelance" className="primary-button">
            Ver ejemplo de presupuesto
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
