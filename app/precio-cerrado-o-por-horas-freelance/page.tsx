import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/precio-cerrado-o-por-horas-freelance';
const title = 'Precio cerrado o por horas freelance: cuándo usar cada modelo';
const description =
  'Guía para decidir si cobrar un proyecto freelance a precio cerrado, por horas o por fases según alcance, riesgo, revisiones, urgencia y margen.';

const pageFaqItems = [
  {
    question: '¿Es mejor cobrar por horas o a precio cerrado?',
    answer:
      'Depende del nivel de alcance y riesgo. El precio cerrado suele venderse mejor cuando el proyecto está bien definido. Cobrar por horas encaja mejor cuando hay incertidumbre, exploración o cambios frecuentes.',
  },
  {
    question: '¿Cómo evito perder dinero con un precio cerrado?',
    answer:
      'Calcula primero tus horas reales, añade buffer, define revisiones, separa extras y deja claro qué cambios quedan fuera. Un precio cerrado sin límites suele convertirse en horas gratis.',
  },
  {
    question: '¿Puedo mezclar precio cerrado y horas?',
    answer:
      'Sí. Puedes cerrar una fase principal a precio fijo y dejar soporte, cambios adicionales o nuevas funcionalidades por horas o como bolsa aparte.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'precio cerrado o por horas freelance',
    'cobrar por horas o por proyecto',
    'precio cerrado freelance',
    'tarifa por hora freelance proyecto cerrado',
    'presupuesto freelance por horas',
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

export default function PrecioCerradoOPorHorasFreelancePage() {
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
    datePublished: '2026-04-26',
    dateModified: '2026-04-26',
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
        id="precio-cerrado-horas-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="precio-cerrado-horas-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="precio-cerrado-horas-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Modelo de cobro</span>
            <h1>Precio cerrado o por horas freelance: cuándo usar cada modelo</h1>
            <p className="lead">
              Cobrar por horas puede protegerte cuando el alcance es incierto, pero un precio
              cerrado suele ser más fácil de vender cuando el proyecto está bien definido. La clave
              no es elegir un modelo por costumbre, sino según riesgo, control y margen.
            </p>
            <div className="hero-badges" aria-label="Qué compara esta guía">
              <span className="hero-badge">Precio cerrado</span>
              <span className="hero-badge">Tarifa por hora</span>
              <span className="hero-badge">Fases y extras</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular presupuesto
              </Link>
              <Link href="/ejemplo-presupuesto-freelance" className="primary-button">
                Ver ejemplo
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Resumen rápido</h2>
            <ul className="article-list">
              <li>Precio cerrado: mejor con alcance claro y entregables definidos.</li>
              <li>Por horas: mejor con incertidumbre, exploración o cambios frecuentes.</li>
              <li>Por fases: útil cuando hay partes claras y partes todavía abiertas.</li>
              <li>Siempre necesitas una tarifa interna para no regalar margen.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container feature-grid" aria-label="Comparativa de modelos">
          <article className="feature-card">
            <h2>Cuándo usar precio cerrado</h2>
            <p>
              Cuando el alcance está definido, los entregables son claros, las revisiones están
              limitadas y puedes estimar el esfuerzo con cierta confianza. Es más comercial, pero
              exige controlar muy bien los cambios.
            </p>
          </article>

          <article className="feature-card">
            <h2>Cuándo cobrar por horas</h2>
            <p>
              Cuando el proyecto está abierto, hay investigación, tareas de soporte, cambios
              continuos o el cliente no puede definir todavía qué quiere. Protege mejor tu tiempo,
              pero requiere seguimiento.
            </p>
          </article>

          <article className="feature-card">
            <h2>Cuándo mezclar ambos</h2>
            <p>
              Cuando puedes cerrar una parte estable y dejar cambios, soporte, ampliaciones o fases
              futuras por horas. Suele ser el modelo más sano para proyectos con zonas grises.
            </p>
          </article>
        </div>
      </section>

      <section className="section alt">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Cómo decidir el modelo antes de enviar la propuesta</h2>
            <ol className="article-list article-list-ordered">
              <li>Evalúa si el alcance está escrito con suficiente detalle.</li>
              <li>Estima horas reales y añade buffer de revisiones e imprevistos.</li>
              <li>Define qué entregables entran y qué cambios quedan fuera.</li>
              <li>Decide si hay partes del proyecto que conviene separar por fases.</li>
              <li>Calcula tu precio mínimo antes de presentar una cifra cerrada.</li>
              <li>Incluye condiciones para extras, urgencias y ampliaciones.</li>
            </ol>
            <div className="disclaimer-box">
              <strong>Regla práctica:</strong> si no puedes explicar el alcance en pocas líneas, es
              pronto para prometer un precio cerrado sin protección.
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Señales de riesgo</h2>
            <ul className="article-list">
              <li>El cliente cambia de idea antes de aprobar la propuesta.</li>
              <li>No hay entregables ni criterios de finalización claros.</li>
              <li>Las revisiones quedan abiertas o sin límite.</li>
              <li>Hay dependencias externas que no controlas.</li>
              <li>El plazo es urgente pero el alcance sigue difuso.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Cómo llevar cada modelo a presupuesto</h2>
          <p>
            Para un precio cerrado, parte de tu tarifa interna, estima horas, añade buffer, costes,
            margen y reserva fiscal. Para cobrar por horas, define tarifa, estimación orientativa,
            mínimo de contratación, forma de seguimiento y cómo se aprueban horas adicionales.
          </p>
          <div className="feature-grid" aria-label="Modelos de propuesta">
            <article className="feature-card">
              <h3>Precio cerrado</h3>
              <p>
                Úsalo para vender un resultado concreto. El presupuesto debe incluir alcance,
                revisiones, plazos, precio, IVA y exclusiones.
              </p>
            </article>

            <article className="feature-card">
              <h3>Por horas</h3>
              <p>
                Úsalo para trabajo incierto. El acuerdo debe incluir tarifa, seguimiento, límite
                inicial y autorización antes de superar horas previstas.
              </p>
            </article>

            <article className="feature-card">
              <h3>Por fases</h3>
              <p>
                Úsalo cuando primero necesitas definir mejor. Discovery por horas o fase fija, y
                ejecución posterior con precio cerrado.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Texto de ejemplo para no mezclar modelos</h2>
          <div className="disclaimer-box">
            <p>
              Este presupuesto se plantea a precio cerrado para el alcance descrito. Cualquier
              cambio de alcance, revisión adicional o nueva funcionalidad se valorará aparte según
              una tarifa de referencia de 65 EUR/h o mediante un nuevo presupuesto cerrado.
            </p>
          </div>
          <p>
            Este tipo de frase ayuda a vender un precio cerrado sin convertirlo en trabajo abierto.
            Si quieres ver cómo encaja dentro de una propuesta, puedes revisar el{' '}
            <Link href="/ejemplo-presupuesto-freelance">ejemplo de presupuesto freelance</Link>.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular mi precio
            </Link>
            <Link href="/plantilla-presupuesto-freelance" className="primary-button">
              Ver plantilla
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <LeadMagnetForm
            source="precio-cerrado-o-por-horas"
            title="Te enviamos el kit para elegir mejor tu modelo de cobro"
            description="Accede al kit con plantilla de presupuesto, estructura de propuesta comercial y checklist para revisar alcance, horas, extras y margen antes de enviar la oferta."
            buttonLabel="Quiero el kit"
          />
        </div>
      </section>

      <section className="section alt" id="faq-precio-cerrado-horas">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre cobrar por horas o por proyecto</h2>
          {pageFaqItems.map((item) => (
            <article className="disclaimer-box" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
