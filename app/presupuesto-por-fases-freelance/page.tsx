import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { formatCurrency } from '@/lib/format';
import { projectExamplePhases, projectExampleQuote } from '@/lib/projectExample';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/presupuesto-por-fases-freelance';
const title = 'Presupuesto por fases freelance: cómo dividir un proyecto sin perder margen';
const description =
  'Guía práctica para presupuestar un proyecto freelance por fases, hitos, pagos, revisiones y entregables sin convertir el alcance en horas gratis.';

const pageFaqItems = [
  {
    question: '¿Cuándo conviene hacer un presupuesto por fases?',
    answer:
      'Conviene cuando el alcance no está totalmente cerrado, hay decisiones pendientes, el proyecto es largo o necesitas separar discovery, producción, revisiones y soporte para proteger margen.',
  },
  {
    question: '¿Cómo se cobran las fases de un proyecto freelance?',
    answer:
      'Lo más habitual es pedir una señal inicial y vincular pagos a hitos: inicio, entrega de una fase, aprobación o publicación. Cada fase debería tener alcance, entregables y condiciones propias.',
  },
  {
    question: '¿Qué pasa si el cliente pide cambios entre fases?',
    answer:
      'Los cambios que no formen parte del alcance aprobado deben presupuestarse aparte, pasar a una fase posterior o cobrarse por horas. Lo importante es no mezclarlos con la fase ya cerrada.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'presupuesto por fases freelance',
    'cobrar proyecto por fases',
    'hitos presupuesto freelance',
    'pagos por hitos freelance',
    'dividir proyecto freelance por fases',
  ],
  openGraph: {
    title: `${title} | ${siteConfig.name}`,
    description,
    url: route,
    type: 'article',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${siteConfig.name}`,
    description,
    images: ['/opengraph-image'],
  },
};

export default function PresupuestoPorFasesFreelancePage() {
  const siteUrl = getSiteUrl();
  const pageUrl = new URL(route, siteUrl).toString();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    inLanguage: 'es',
    mainEntityOfPage: pageUrl,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    datePublished: '2026-04-27',
    dateModified: '2026-04-27',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: new URL('/', siteUrl).toString(),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pageFaqItems.map((item) => ({
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
        id="presupuesto-por-fases-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="presupuesto-por-fases-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="presupuesto-por-fases-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Presupuesto por hitos</span>
            <h1>Presupuesto por fases freelance: cómo dividir un proyecto sin perder margen</h1>
            <p className="lead">
              Cuando un proyecto no está completamente cerrado, venderlo entero a precio fijo puede
              meterte en un laberinto elegante, pero laberinto al fin. Dividirlo por fases te ayuda
              a proteger margen, ordenar decisiones y cobrar avances sin regalar trabajo invisible.
            </p>
            <div className="hero-badges" aria-label="Qué cubre esta guía">
              <span className="hero-badge">Fases e hitos</span>
              <span className="hero-badge">Pagos parciales</span>
              <span className="hero-badge">Cambios controlados</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular presupuesto
              </Link>
              <Link href="/precio-cerrado-o-por-horas-freelance" className="primary-button">
                Comparar modelos
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Resumen rápido</h2>
            <ul className="article-list">
              <li>Usa fases cuando el alcance tenga zonas grises o decisiones pendientes.</li>
              <li>Define entregables, revisiones y pagos para cada bloque.</li>
              <li>No mezcles cambios nuevos con una fase ya aprobada.</li>
              <li>La fase inicial puede servir para convertir incertidumbre en precio cerrado.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Por qué dividir un proyecto en fases</h2>
          <p>
            Un presupuesto por fases no es complicar la propuesta. Es separar decisiones para que
            cada bloque tenga un alcance manejable. Te permite empezar con una parte clara,
            aprender del proyecto y presupuestar mejor lo que viene después.
          </p>
          <p>
            También ayuda al cliente: ve avances, sabe qué está pagando en cada momento y no tiene
            que aprobar de golpe una cifra grande cuando todavía hay demasiadas preguntas abiertas.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> si una fase no tiene entregable, criterio de aprobación y
            condición de pago, todavía no es una fase; es una intención.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Fases habituales">
          <article className="feature-card">
            <h2>1. Discovery o definición</h2>
            <p>
              Sirve para ordenar objetivos, alcance, requisitos, riesgos y materiales. Puede
              cobrarse como fase cerrada pequeña o por horas con un límite claro.
            </p>
          </article>

          <article className="feature-card">
            <h2>2. Producción principal</h2>
            <p>
              Es el bloque donde ejecutas el trabajo central. Aquí conviene cerrar entregables,
              revisiones incluidas, plazo y lo que queda fuera.
            </p>
          </article>

          <article className="feature-card">
            <h2>3. Cierre, soporte o evolución</h2>
            <p>
              Incluye ajustes finales, publicación, documentación, soporte inicial o mejoras
              posteriores. No debería absorber nuevas funcionalidades sin presupuesto.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Cómo estructurar el presupuesto por fases</h2>
            <ol className="article-list article-list-ordered">
              <li>Explica el objetivo general del proyecto en pocas líneas.</li>
              <li>Divide el trabajo en fases con nombre, alcance y entregables.</li>
              <li>Indica qué revisiones incluye cada fase y cuándo se considera aprobada.</li>
              <li>Asocia cada fase a un precio, una fecha aproximada y una condición de pago.</li>
              <li>Define qué cambios quedan fuera y cómo se presupuestarán.</li>
              <li>Incluye una fase posterior para mejoras, soporte o ampliaciones.</li>
            </ol>
            <p>
              Esta estructura evita que el presupuesto sea una lista larga de tareas sin control.
              Cada fase funciona como una pequeña promesa verificable: qué se entrega, cuándo se
              revisa, cuánto cuesta y qué pasa después.
            </p>
          </div>

          <aside className="feature-card article-summary">
            <h2>Reparto de un presupuesto realista</h2>
            <p>
              Partimos del ejemplo de web corporativa de {formatCurrency(projectExampleQuote.recommendedProjectBudget)}
              {' '}sin IVA. El reparto por fases es una decisión de propuesta, no tres tarifas nuevas.
            </p>
            <ul className="article-list">
              {projectExamplePhases.map((phase) => (
                <li key={phase.name}>
                  {phase.name}: {phase.share}% ({formatCurrency(phase.amount)}).
                </li>
              ))}
              <li>Extras posteriores: nuevo presupuesto o tarifa pactada por hora.</li>
            </ul>
            <p>
              Las fases describen entregables. El calendario de pagos puede ser distinto del reparto
              del trabajo y debe pactarse antes de empezar.
            </p>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Cómo cobrar sin financiar el proyecto del cliente</h2>
          <p>
            En proyectos por fases, evita cobrar todo al final. Una estructura simple puede ser
            señal inicial para reservar agenda, pago por fase entregada y cierre antes de publicar o
            entregar materiales finales. No es desconfianza: es salud financiera.
          </p>
          <div className="feature-grid" aria-label="Opciones de pago por fases">
            <article className="feature-card">
              <h3>40% al inicio</h3>
              <p>Activa el proyecto, reserva agenda y reduce riesgo antes de producir.</p>
            </article>

            <article className="feature-card">
              <h3>40% tras la fase principal</h3>
              <p>Vincula el segundo pago a un hito visible y revisable.</p>
            </article>

            <article className="feature-card">
              <h3>20% antes del cierre</h3>
              <p>Deja la entrega final, publicación o documentación ligada al último pago.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Texto de ejemplo para incluir en la propuesta</h2>
          <div className="disclaimer-box">
            <p>
              El proyecto se divide en fases independientes. Cada fase incluye los entregables y
              revisiones descritos en este presupuesto. Cualquier cambio de alcance, nueva
              funcionalidad o revisión adicional se valorará aparte antes de incorporarse al trabajo.
            </p>
          </div>
          <p>
            Puedes combinar este enfoque con la{' '}
            <Link href="/kit-presupuesto-freelance">plantilla de presupuesto freelance</Link>{' '}
            y con la guía para{' '}
            <Link href="/como-calcular-horas-proyecto-freelance">
              calcular horas de un proyecto freelance
            </Link>. Así conviertes fases, horas y margen en una propuesta más fácil de defender.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular precio por fase
            </Link>
            <Link href="/ejemplo-presupuesto-freelance" className="primary-button">
              Ver ejemplo completo
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <LeadMagnetForm
            source="presupuesto-por-fases-freelance"
            title="Te enviamos el kit para presupuestar por fases"
            description="Accede al kit con plantilla de presupuesto, estructura de propuesta comercial y lista de comprobación para revisar fases, pagos, revisiones y extras antes de enviar la oferta."
            buttonLabel="Quiero el kit"
          />
        </div>
      </section>

      <section className="section" id="faq-presupuesto-por-fases">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre presupuestos por fases</h2>
          <div className="faq-list">
            {pageFaqItems.map((item) => (
              <article className="faq-item" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
