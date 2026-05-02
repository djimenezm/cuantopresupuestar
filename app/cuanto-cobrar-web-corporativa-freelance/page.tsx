import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/cuanto-cobrar-web-corporativa-freelance';
const title = 'Cuanto cobrar por una web corporativa freelance';
const description =
  'Guia para calcular cuanto cobrar por una web corporativa freelance segun numero de paginas, contenido, revisiones, integraciones, margen e IVA aparte.';

const pageFaqItems = [
  {
    question: 'Cuanto cobrar por una web corporativa freelance?',
    answer:
      'Depende del alcance real: numero de paginas, contenidos, diseno, desarrollo, formularios, integraciones, revisiones, reuniones, margen y soporte posterior. Conviene calcular un minimo interno antes de dar una cifra cerrada.',
  },
  {
    question: 'Que diferencia hay entre una landing y una web corporativa?',
    answer:
      'Una landing suele concentrarse en una accion concreta. Una web corporativa normalmente incluye varias paginas, navegacion, contenidos de empresa, servicios, formularios y mas coordinacion con el cliente.',
  },
  {
    question: 'Como evito quedarme corto al presupuestar una web corporativa?',
    answer:
      'Separa fases, paginas, entregables, revisiones, textos, imagenes, integraciones y soporte. Si el cliente pide rebaja, reduce alcance antes de reducir margen.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'cuanto cobrar web corporativa freelance',
    'precio web corporativa freelance',
    'presupuesto web corporativa freelance',
    'cuanto cobrar pagina web corporativa',
    'presupuestar web corporativa',
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

export default function CuantoCobrarWebCorporativaFreelancePage() {
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
    datePublished: '2026-05-02',
    dateModified: '2026-05-02',
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
        id="web-corporativa-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="web-corporativa-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="web-corporativa-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Guia de precio web</span>
            <h1>Cuanto cobrar por una web corporativa freelance</h1>
            <p className="lead">
              Una web corporativa no es solo montar varias secciones. Suele incluir estrategia,
              estructura, contenidos, maquetacion, formularios, revisiones y coordinacion. Si lo
              reduces a una cifra rapida, es facil que el proyecto se coma tu margen.
            </p>
            <div className="hero-badges" aria-label="Que cubre esta guia">
              <span className="hero-badge">Web corporativa</span>
              <span className="hero-badge">Precio por proyecto</span>
              <span className="hero-badge">Alcance y revisiones</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular web corporativa
              </Link>
              <Link href="/precio-pagina-web-profesional-freelance" className="primary-button">
                Ver web profesional
              </Link>
              <Link
                href="/cuanto-cobrar-por-una-pagina-web-freelance"
                className="primary-button"
              >
                Ver guia general de webs
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Cuando usar esta guia</h2>
            <ul className="article-list">
              <li>El cliente necesita una web de empresa con varias paginas.</li>
              <li>Hay contenido, formularios, SEO basico o integraciones sencillas.</li>
              <li>Quieres separar precio base, revisiones, extras y soporte posterior.</li>
              <li>Necesitas defender el presupuesto sin parecer arbitrario.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>La pregunta correcta no es solo cuanto cobrar</h2>
          <p>
            La pregunta mas util es que tiene que estar incluido para que el precio tenga sentido.
            Una web corporativa puede ser una presencia basica de cinco paginas o un proyecto con
            arquitectura, copy, formularios, analitica, blog, multiidioma y soporte de lanzamiento.
          </p>
          <p>
            Por eso conviene separar el presupuesto en capas. Primero calculas tu suelo interno y
            despues decides que parte del alcance presentas como fase inicial, extra o servicio
            posterior.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> una web corporativa se debe presupuestar por alcance, no por
            numero de paginas de forma aislada.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Factores de precio web corporativa">
          <article className="feature-card">
            <h2>1. Paginas y estructura</h2>
            <p>
              Inicio, servicios, sobre nosotros, contacto, legales, casos, blog o paginas de venta
              no requieren el mismo esfuerzo. La arquitectura tambien cuenta.
            </p>
          </article>

          <article className="feature-card">
            <h2>2. Contenido y revisiones</h2>
            <p>
              Textos, imagenes, cambios de copy, rondas de aprobacion y feedback del cliente pueden
              pesar tanto como el desarrollo visible.
            </p>
          </article>

          <article className="feature-card">
            <h2>3. Integraciones y entrega</h2>
            <p>
              Formularios, analytics, pixel, CRM, dominios, email, despliegue y soporte inicial
              deben aparecer en el calculo si forman parte del proyecto.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Formula practica para presupuestar una web corporativa</h2>
            <ol className="article-list article-list-ordered">
              <li>Define numero de paginas, plantillas y bloques reutilizables.</li>
              <li>Separa discovery, estructura, diseno, desarrollo, pruebas y entrega.</li>
              <li>Estima reuniones, revision de contenidos y comunicacion con el cliente.</li>
              <li>Incluye costes directos: licencias, plugins, tipografias, imagenes o herramientas.</li>
              <li>Anade buffer por revisiones, margen profesional e IVA aparte cuando aplique.</li>
              <li>Deja fuera como extras todo lo que no este descrito en el alcance inicial.</li>
            </ol>
            <p>
              Si necesitas bajar ese esquema a una cifra concreta, usa la calculadora como suelo y
              luego ajusta con criterio comercial. El precio recomendado no sustituye tu criterio,
              pero evita que empieces negociando desde una intuicion demasiado baja.
            </p>
          </div>

          <aside className="feature-card article-summary">
            <h2>Extras que conviene separar</h2>
            <ul className="article-list">
              <li>Copywriting completo o reescritura profunda de textos.</li>
              <li>Fotografia, video, iconografia o banco de imagenes premium.</li>
              <li>SEO avanzado, estrategia de contenidos o blog continuo.</li>
              <li>Automatizaciones, CRM, pasarelas o integraciones no previstas.</li>
              <li>Mantenimiento mensual despues de publicar la web.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Rangos orientativos sin convertirlos en promesa</h2>
          <p>
            No hay una cifra universal, pero si hay una forma sensata de pensar. Una web
            corporativa sencilla puede vivir en un rango muy distinto a una web con varias areas de
            servicio, contenidos a medida, integraciones y soporte de lanzamiento.
          </p>
          <p>
            Si el proyecto parece pequeno pero exige muchas reuniones, contenido sin preparar o
            decisiones abiertas, no es realmente pequeno. Ese es el tipo de detalle que debes meter
            en horas, buffer y condiciones.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Usar calculadora de proyectos web
            </Link>
            <Link href="/como-hacer-una-propuesta-comercial" className="primary-button">
              Ver checklist de propuesta web
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Como conectarlo con otras decisiones de precio</h2>
          <p>
            Si el proyecto es una sola pagina enfocada a conversion, puede encajar mejor en una
            calculadora especifica de landing. Si despues de publicar habra soporte recurrente,
            separa el mantenimiento mensual del presupuesto inicial.
          </p>
          <p>
            Si la duda del cliente es el precio de una web profesional completa, tambien puedes
            apoyarte en la guia de{' '}
            <Link href="/precio-pagina-web-profesional-freelance">
              precio de una pagina web profesional freelance
            </Link>
            .
          </p>
          <p>
            Para ese segundo caso puedes revisar{' '}
            <a href="https://www.mantenimientowebmensual.es?utm_source=cuantopresupuestar&utm_medium=web-corporativa&utm_campaign=contextual_link">
              la calculadora de mantenimiento web mensual
            </a>
            . Y si el proyecto es una landing pura, usa{' '}
            <a href="https://www.cuantocobrarlandingpage.es?utm_source=cuantopresupuestar&utm_medium=web-corporativa&utm_campaign=contextual_link">
              la calculadora de landing pages
            </a>
            .
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <LeadMagnetForm
            source="cuanto-cobrar-web-corporativa-freelance"
            title="Llevate el kit para preparar tu presupuesto web"
            description="Recibe una plantilla, una estructura de propuesta y un checklist para revisar alcance, revisiones, extras y margen antes de enviar una web corporativa."
            buttonLabel="Quiero el kit web"
          />
        </div>
      </section>

      <section className="section" aria-labelledby="web-corporativa-faq-title">
        <div className="container text-block">
          <h2 id="web-corporativa-faq-title">
            Preguntas frecuentes sobre cuanto cobrar por una web corporativa
          </h2>

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
