import Link from 'next/link';
import Script from 'next/script';
import CalculatorForm from '@/components/CalculatorForm';
import FAQ, { faqItems } from '@/components/FAQ';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { siteConfig } from '@/lib/site';

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
      'Calculadora para saber cuánto presupuestar un proyecto freelance',
      'Referencia base por hora a partir de tu objetivo mensual',
      'Buffer de revisiones e imprevistos',
      'IVA aparte y margen configurable',
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <main>
      <Script
        id="webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Cuánto Presupuestar</span>
            <h1>Calculadora para saber cuánto presupuestar un proyecto freelance</h1>
            <p className="lead">
              Convierte tu objetivo mensual en un presupuesto por proyecto más defendible. Calcula una
              referencia base por hora, añade buffer de revisiones, costes directos, margen extra e
              IVA aparte para no presupuestar a ciegas.
            </p>
            <div className="hero-badges" aria-label="Ventajas principales">
              <span className="hero-badge">Sin registro</span>
              <span className="hero-badge">Pensada para proyectos cerrados</span>
              <span className="hero-badge">IVA siempre aparte</span>
            </div>
            <ul className="hero-points">
              <li>Convierte una intuición difusa en una cifra más defendible para el cliente.</li>
              <li>Incluye horas facturables reales, buffer, costes directos y reserva fiscal orientativa.</li>
              <li>Útil para diseño, desarrollo, consultoría, marketing y servicios profesionales.</li>
            </ul>
            <p className="hero-cta-note">
              Si ya estás cerrando proyectos por precio fijo, úsala para comprobar si ese importe te
              deja el margen que buscas.
            </p>
          </div>

          <CalculatorForm />
        </div>
      </section>

      <section className="section">
        <div className="container feature-grid" aria-label="Puntos clave de la herramienta">
          <article className="feature-card">
            <h2>Qué resuelve</h2>
            <p>
              Parte de tu objetivo mensual, tus costes fijos y tus horas facturables para sacar una
              referencia por hora. Después la convierte en un presupuesto de proyecto con buffer,
              costes directos y margen.
            </p>
          </article>

          <article className="feature-card">
            <h2>Cuándo te aporta más valor</h2>
            <p>
              Cuando trabajas con precios cerrados y quieres validar si una propuesta está alineada
              con el esfuerzo real, el tiempo no vendible y el suelo económico de tu actividad.
            </p>
          </article>

          <article className="feature-card">
            <h2>Dónde poner el filtro final</h2>
            <p>
              En proyectos grandes, contratos complejos o encajes fiscales finos. La herramienta está
              pensada para orientar tu precio, no para sustituir una revisión profesional.
            </p>
          </article>
        </div>
      </section>

      <section className="section" id="como-funciona">
        <div className="container text-block">
          <h2>Cómo funciona la calculadora</h2>
          <p>
            Primero estima cuánto necesitas facturar al mes para sostener tu objetivo neto y tus
            costes fijos. Esa cifra se reparte entre tus horas facturables reales para obtener una
            referencia base por hora.
          </p>
          <p>
            Después esa referencia se lleva al proyecto: introduces las horas estimadas, un buffer de
            revisiones e imprevistos, los costes directos y el margen extra que quieres defender. Con
            eso obtienes un precio mínimo sin margen, un presupuesto recomendado y, si aplica, el
            total con IVA aparte.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> presupuestar por proyecto no significa dejar de pensar por
            hora. Significa usar tu referencia por hora para validar que el precio cerrado sigue
            teniendo sentido.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container conversion-grid">
          <div className="conversion-copy">
            <h2>No uses el presupuesto como techo: úsalo como suelo defendible</h2>
            <p>
              La herramienta te da una cifra para no presupuestar solo por intuición o por presión del
              contexto. Si tu propuesta actual queda muy por debajo, probablemente te falte margen,
              tiempo o protección frente a cambios.
            </p>
            <p>
              La idea no es fijar un precio exacto al céntimo, sino ayudarte a llegar a una cifra que
              puedas defender con más criterio delante de un cliente.
            </p>
          </div>

          <div className="conversion-steps" aria-label="Cómo aprovechar mejor el resultado">
            <article className="conversion-step">
              <h3>1. Contrasta</h3>
              <p>Compara el resultado con tu propuesta actual y detecta si te deja margen real.</p>
            </article>

            <article className="conversion-step">
              <h3>2. Ajusta</h3>
              <p>Prueba cambios en horas, buffer o margen para encontrar tu mínimo razonable.</p>
            </article>

            <article className="conversion-step">
              <h3>3. Presupuesta mejor</h3>
              <p>Usa el total recomendado como base para una propuesta cerrada o por hitos.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <span className="eyebrow">Guia SEO</span>
          <h2>Como presupuestar un proyecto freelance paso a paso</h2>
          <p>
            Si quieres entender primero la logica y despues tocar numeros, hemos preparado una guia
            practica sobre como presupuestar un proyecto freelance sin quedarte corto.
          </p>
          <div className="guide-cta">
            <Link href="/como-presupuestar-un-proyecto-freelance" className="primary-button">
              Leer la guia
            </Link>
          </div>
        </div>
      </section>

      <FAQ />
      <Footer />
    </main>
  );
}
