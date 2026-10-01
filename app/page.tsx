import Image from 'next/image';
import AdSlot from '@/components/AdSlot';
import CalculatorForm from '@/components/CalculatorForm';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import { formatCurrency, formatNumber } from '@/lib/format';
import {
  expandedProjectExampleInput,
  expandedProjectExampleQuote,
  projectExampleInput,
  projectExampleQuote,
} from '@/lib/projectExample';
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

      <AdSlot placement="primary" />

      <section className="quote-example-band" id="ejemplo-calculado" aria-labelledby="quote-example-heading">
        <div className="container quote-example-grid">
          <div>
            <span className="eyebrow">Caso calculado</span>
            <h2 id="quote-example-heading">Una web de 32 horas no cuesta solo 32 horas.</h2>
            <p>
              Ejemplo hipotético de una web corporativa: objetivo neto de{' '}
              {formatCurrency(projectExampleInput.targetMonthlyNet)} al mes,{' '}
              {formatCurrency(projectExampleInput.monthlyFixedCosts)} de costes fijos y{' '}
              {projectExampleInput.billableHoursPerMonth} horas facturables. No es una tarifa de
              mercado: son las necesidades de este profesional ficticio.
            </p>
            <p>
              Si el alcance crece hasta {expandedProjectExampleInput.projectHours} horas, el
              presupuesto recomendado sube a{' '}
              <strong>{formatCurrency(expandedProjectExampleQuote.recommendedProjectBudget)}</strong>.
              La diferencia de{' '}
              {formatCurrency(
                expandedProjectExampleQuote.recommendedProjectBudget -
                  projectExampleQuote.recommendedProjectBudget,
              )}{' '}
              explica por qué conviene cerrar entregables y revisiones antes de enviar la oferta.
            </p>
            <a href="/ejemplo-presupuesto-freelance">Ver el presupuesto completo</a>
          </div>
          <dl className="quote-example-steps">
            <div>
              <dt>Base interna</dt>
              <dd>{formatCurrency(projectExampleQuote.baseHourlyRate)} / h</dd>
              <small>Objetivo y costes repartidos entre horas facturables.</small>
            </div>
            <div>
              <dt>Horas con revisiones</dt>
              <dd>{formatNumber(projectExampleQuote.bufferedProjectHours)} h</dd>
              <small>{projectExampleInput.projectHours} h estimadas + {projectExampleInput.revisionBufferPercent}% de reserva.</small>
            </div>
            <div>
              <dt>Precio antes de IVA</dt>
              <dd>{formatCurrency(projectExampleQuote.recommendedProjectBudget)}</dd>
              <small>Incluye {formatCurrency(projectExampleInput.directProjectCosts)} de costes directos y un recargo del {projectExampleInput.profitMarginPercent}% sobre el mínimo.</small>
            </div>
          </dl>
        </div>
      </section>

      <section className="quote-method-band" aria-labelledby="quote-method-heading">
        <div className="container quote-method-grid">
          <div>
            <span className="eyebrow">Cómo se calcula</span>
            <h2 id="quote-method-heading">Un precio de proyecto basado en tus números.</h2>
          </div>
          <div className="quote-method-detail">
            <p>
              Tu objetivo mensual, costes y horas facturables dan una tarifa base. La aplicamos a
              las horas del proyecto, incluida la reserva para revisiones, y añadimos costes
              directos y margen.
            </p>
            <p>
              El IVA se muestra aparte. El resultado es una referencia para decidir el precio,
              no sustituye la definición del alcance ni una estimación realista de horas. La
              reserva fiscal es una hipótesis, no el IRPF real; el porcentaje de margen de la
              herramienta es un recargo sobre el mínimo, no un margen contable sobre la venta.
            </p>
            <nav aria-label="Profundiza en el presupuesto freelance">
              <a href="/como-calcular-horas-proyecto-freelance">Cómo estimar las horas</a>
              <a href="/margen-presupuesto-freelance">Cómo calcular el margen</a>
            </nav>
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

      <AdSlot placement="secondary" />

      <Footer />
    </main>
  );
}
