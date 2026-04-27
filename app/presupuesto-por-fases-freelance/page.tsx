import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/presupuesto-por-fases-freelance';
const title = 'Presupuesto por fases freelance: como dividir un proyecto sin perder margen';
const description =
  'Guia practica para presupuestar un proyecto freelance por fases, hitos, pagos, revisiones y entregables sin convertir el alcance en horas gratis.';

const pageFaqItems = [
  {
    question: 'Cuando conviene hacer un presupuesto por fases?',
    answer:
      'Conviene cuando el alcance no esta totalmente cerrado, hay decisiones pendientes, el proyecto es largo o necesitas separar discovery, produccion, revisiones y soporte para proteger margen.',
  },
  {
    question: 'Como se cobran las fases de un proyecto freelance?',
    answer:
      'Lo mas habitual es pedir una senal inicial y vincular pagos a hitos: inicio, entrega de una fase, aprobacion o publicacion. Cada fase deberia tener alcance, entregables y condiciones propias.',
  },
  {
    question: 'Que pasa si el cliente pide cambios entre fases?',
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
            <h1>Presupuesto por fases freelance: como dividir un proyecto sin perder margen</h1>
            <p className="lead">
              Cuando un proyecto no esta completamente cerrado, venderlo entero a precio fijo puede
              meterte en un laberinto elegante, pero laberinto al fin. Dividirlo por fases te ayuda
              a proteger margen, ordenar decisiones y cobrar avances sin regalar trabajo invisible.
            </p>
            <div className="hero-badges" aria-label="Que cubre esta guia">
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
            <h2>Resumen rapido</h2>
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
          <h2>Por que dividir un proyecto en fases</h2>
          <p>
            Un presupuesto por fases no es complicar la propuesta. Es separar decisiones para que
            cada bloque tenga un alcance manejable. Te permite empezar con una parte clara,
            aprender del proyecto y presupuestar mejor lo que viene despues.
          </p>
          <p>
            Tambien ayuda al cliente: ve avances, sabe que esta pagando en cada momento y no tiene
            que aprobar de golpe una cifra grande cuando todavia hay demasiadas preguntas abiertas.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> si una fase no tiene entregable, criterio de aprobacion y
            condicion de pago, todavia no es una fase; es una intencion.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Fases habituales">
          <article className="feature-card">
            <h2>1. Discovery o definicion</h2>
            <p>
              Sirve para ordenar objetivos, alcance, requisitos, riesgos y materiales. Puede
              cobrarse como fase cerrada pequena o por horas con un limite claro.
            </p>
          </article>

          <article className="feature-card">
            <h2>2. Produccion principal</h2>
            <p>
              Es el bloque donde ejecutas el trabajo central. Aqui conviene cerrar entregables,
              revisiones incluidas, plazo y lo que queda fuera.
            </p>
          </article>

          <article className="feature-card">
            <h2>3. Cierre, soporte o evolucion</h2>
            <p>
              Incluye ajustes finales, publicacion, documentacion, soporte inicial o mejoras
              posteriores. No deberia absorber nuevas funcionalidades sin presupuesto.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Como estructurar el presupuesto por fases</h2>
            <ol className="article-list article-list-ordered">
              <li>Explica el objetivo general del proyecto en pocas lineas.</li>
              <li>Divide el trabajo en fases con nombre, alcance y entregables.</li>
              <li>Indica que revisiones incluye cada fase y cuando se considera aprobada.</li>
              <li>Asocia cada fase a un precio, una fecha aproximada y una condicion de pago.</li>
              <li>Define que cambios quedan fuera y como se presupuestaran.</li>
              <li>Incluye una fase posterior para mejoras, soporte o ampliaciones.</li>
            </ol>
            <p>
              Esta estructura evita que el presupuesto sea una lista larga de tareas sin control.
              Cada fase funciona como una pequena promesa verificable: que se entrega, cuando se
              revisa, cuanto cuesta y que pasa despues.
            </p>
          </div>

          <aside className="feature-card article-summary">
            <h2>Mini ejemplo</h2>
            <ul className="article-list">
              <li>Fase 1: definicion y arquitectura, 450 EUR.</li>
              <li>Fase 2: produccion principal, 1.800 EUR.</li>
              <li>Fase 3: revision, entrega y soporte inicial, 350 EUR.</li>
              <li>Extras posteriores: nuevo presupuesto o tarifa pactada por hora.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Como cobrar sin financiar el proyecto del cliente</h2>
          <p>
            En proyectos por fases, evita cobrar todo al final. Una estructura simple puede ser
            senal inicial para reservar agenda, pago por fase entregada y cierre antes de publicar o
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
              <p>Deja la entrega final, publicacion o documentacion ligada al ultimo pago.</p>
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
              funcionalidad o revision adicional se valorara aparte antes de incorporarse al trabajo.
            </p>
          </div>
          <p>
            Puedes combinar este enfoque con la{' '}
            <Link href="/plantilla-presupuesto-freelance">plantilla de presupuesto freelance</Link>{' '}
            y con la guia para{' '}
            <Link href="/como-calcular-horas-proyecto-freelance">
              calcular horas de un proyecto freelance
            </Link>
            . Asi conviertes fases, horas y margen en una propuesta mas facil de defender.
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
            description="Accede al kit con plantilla de presupuesto, estructura de propuesta comercial y checklist para revisar fases, pagos, revisiones y extras antes de enviar la oferta."
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
