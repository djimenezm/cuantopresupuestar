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
        <div className="container">
          <div className="text-block">
            <span className="eyebrow">Guias utiles</span>
            <h2>Aprende a poner precio antes de tocar los numeros</h2>
            <p>
              Si prefieres entender primero la logica y despues usar la calculadora, aqui tienes dos
              guias pensadas para dudas muy habituales al presupuestar servicios freelance.
            </p>
          </div>

          <div className="feature-grid" aria-label="Guias destacadas">
            <article className="feature-card">
              <h3>Como presupuestar un proyecto freelance</h3>
              <p>
                Baja un precio cerrado a horas reales, buffer, costes directos y margen antes de
                presentarlo a un cliente.
              </p>
              <div className="guide-cta">
                <Link href="/como-presupuestar-un-proyecto-freelance" className="primary-button">
                  Leer la guia
                </Link>
              </div>
            </article>

            <article className="feature-card">
              <h3>Plantilla de presupuesto freelance</h3>
              <p>
                Usa una estructura base para presentar mejor el precio, aclarar alcance, revisiones,
                pagos e IVA antes de enviar la propuesta.
              </p>
              <div className="guide-cta">
                <Link href="/plantilla-presupuesto-freelance" className="primary-button">
                  Ver plantilla
                </Link>
              </div>
            </article>

            <article className="feature-card">
              <h3>Cuanto cobrar por una pagina web freelance</h3>
              <p>
                Revisa que cambia el precio de una web y como evitar presupuestarla a ojo o por
                comparacion rapida con el mercado.
              </p>
              <div className="guide-cta">
                <Link
                  href="/cuanto-cobrar-por-una-pagina-web-freelance"
                  className="primary-button"
                >
                  Leer la guia
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="container text-block">
          <span className="eyebrow">Otra herramienta</span>
          <h2>Si primero necesitas saber cuanto facturar al mes, usa Cuanto Facturar</h2>
          <p>
            Cuanto Presupuestar te ayuda a llevar tus numeros a un precio por proyecto. Si antes
            quieres aterrizar tu referencia mensual como autonomo o freelance, puedes apoyarte
            tambien en <a href="https://www.cuantofacturar.es">Cuanto Facturar</a>.
          </p>
          <p>
            Si prefieres moverte entre varias herramientas segun el tipo de encargo, en{' '}
            <a href="https://www.paneldeherramientas.es">Panel de Herramientas</a> puedes verlas
            juntas y elegir la que mas encaja con cada presupuesto.
          </p>
        </div>
      </section>

      <FAQ />
      <Footer />
    </main>
  );
}


