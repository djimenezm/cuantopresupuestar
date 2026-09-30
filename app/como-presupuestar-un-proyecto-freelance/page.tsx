import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/como-presupuestar-un-proyecto-freelance';
const title = 'Cómo presupuestar un proyecto freelance sin quedarte corto';
const description =
  'Guía práctica para saber cómo presupuestar un proyecto freelance con una referencia por hora, buffer de revisiones, costes directos, margen e IVA aparte.';

const pageFaqItems = [
  {
    question: '¿Cómo calcular el precio de un proyecto freelance?',
    answer:
      'Empieza por tu objetivo mensual, suma gastos y reserva fiscal, reparte esa cifra entre tus horas facturables reales y después lleva esa referencia al proyecto con horas estimadas, buffer y costes directos.',
  },
  {
    question: '¿Es mejor cobrar por horas o por proyecto?',
    answer:
      'Puedes cerrar por proyecto, pero te conviene conocer tu referencia por hora para validar si el precio cerrado te deja margen o si estás vendiendo demasiado barato.',
  },
  {
    question: '¿Qué incluye un presupuesto freelance bien planteado?',
    answer:
      'Como mínimo debería contemplar tiempo estimado, revisiones, costes directos, margen, condiciones de alcance, forma de pago e IVA cuando aplique.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'cómo presupuestar un proyecto freelance',
    'presupuesto proyecto freelance',
    'cómo calcular un presupuesto freelance',
    'precio por proyecto freelance',
    'cuánto cobrar por proyecto freelance',
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

export default function ComoPresupuestarProyectoFreelancePage() {
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
    datePublished: '2026-04-23',
    dateModified: '2026-04-23',
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
        id="como-presupuestar-proyecto-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="como-presupuestar-proyecto-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="como-presupuestar-proyecto-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Guía práctica</span>
            <h1>Cómo presupuestar un proyecto freelance sin quedarte corto</h1>
            <p className="lead">
              Si cierras proyectos por precio fijo, no te basta con poner una cifra que suene
              razonable. Necesitas una referencia para saber si ese proyecto cubre tu tiempo real,
              tus costes, los cambios de alcance y el margen que esperas conservar.
            </p>
            <div className="hero-badges" aria-label="Qué cubre esta guía">
              <span className="hero-badge">Precio por proyecto</span>
              <span className="hero-badge">Buffer de revisiones</span>
              <span className="hero-badge">Margen defendible</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Ir a la calculadora
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Qué vas a aterrizar aquí</h2>
            <ul className="article-list">
              <li>Como pasar de un objetivo mensual a un precio por proyecto.</li>
              <li>Cómo usar horas estimadas y buffer sin regalar revisiones.</li>
              <li>Qué diferencia hay entre precio mínimo y precio recomendado.</li>
              <li>Cómo defender un presupuesto si el cliente aprieta.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Presupuestar por proyecto no significa olvidarte de las horas</h2>
          <p>
            Aunque cierres un proyecto con precio fijo, sigues necesitando una referencia por hora.
            No para vender por horas, sino para comprobar si el encargo te deja margen real o si te
            estás metiendo en un trabajo poco rentable.
          </p>
          <p>
            La base sana suele ser esta: primero calculas cuánto necesitas facturar al mes para
            sostener tu actividad; después divides esa cifra entre tus horas facturables reales; y
            por último aplicas esa referencia al proyecto con horas estimadas, buffer, costes
            directos y margen.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> un presupuesto cerrado bien hecho sigue naciendo de una
            lógica económica clara. Si no sabes cuál es tu suelo, es fácil acabar negociando contra
            ti.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Pasos para presupuestar mejor">
          <article className="feature-card">
            <h2>1. Define tu referencia mensual</h2>
            <p>
              Parte de lo que necesitas sostener cada mes entre neto, gastos y reserva fiscal. Esa
              cifra te da la base económica del negocio, no solo del proyecto.
            </p>
          </article>

          <article className="feature-card">
            <h2>2. Llevala al proyecto</h2>
            <p>
              Introduce las horas estimadas, añade un buffer de revisiones y suma los costes directos
              que no deberías absorber tú.
            </p>
          </article>

          <article className="feature-card">
            <h2>3. Separa mínimo y recomendado</h2>
            <p>
              El mínimo te dice hasta donde puedes bajar sin comerte el margen. El recomendado te da
              espacio para negociar sin desprotegerte en cuanto aparezcan cambios o fricción.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Errores habituales al presupuestar un proyecto freelance</h2>
          <ol className="article-list article-list-ordered">
            <li>Calcular el precio solo con las horas ideales y no con las facturables reales.</li>
            <li>No dejar buffer para cambios de alcance, reuniones o revisiones.</li>
            <li>Olvidar costes directos como herramientas, compras o colaboraciones.</li>
            <li>Negociar a la baja sin saber cuál es el precio mínimo defendible.</li>
            <li>Confundir el IVA con ingreso real del proyecto.</li>
          </ol>
          <p>
            El resultado suele ser el mismo: proyectos que sobre el papel parecen razonables pero que
            al terminar dejan menos margen del esperado o te obligan a regalar horas.
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Cómo usar la calculadora">
          <article className="feature-card">
            <h2>Referencia base por hora</h2>
            <p>
              Te da una cifra para no partir de cero. Es la manera más rápida de saber si tu precio
              por proyecto tiene sentido económico.
            </p>
          </article>

          <article className="feature-card">
            <h2>Precio mínimo defendible</h2>
            <p>
              Marca el suelo del proyecto antes de regalar margen. Si el cliente quiere bajar más,
              probablemente haya que tocar alcance, fases o entregables.
            </p>
          </article>

          <article className="feature-card">
            <h2>Presupuesto recomendado</h2>
            <p>
              Es la zona donde puedes presentar una propuesta más sana, con espacio para negociar y
              sin asumir tu el coste de cada pequeño imprevisto.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Usa la calculadora para aterrizar tu caso</h2>
          <p>
            Esta guía te da el marco. La calculadora te ayuda a probar números concretos con objetivo
            mensual, costes fijos, horas facturables, horas del proyecto, buffer, margen e IVA para
            obtener una referencia mucho más útil que un precio improvisado.
          </p>
          <p>
            Y si ya tienes clara la cifra pero quieres presentarla mejor, puedes apoyarte también en
            la{' '}
            <Link href="/plantilla-presupuesto-freelance">plantilla de presupuesto freelance</Link>{' '}
            para ordenar alcance, revisiones, pagos y exclusiones.
          </p>
          <p>
            Si tu duda concreta gira en torno a webs corporativas, landings o proyectos similares,
            puedes apoyarte también en la guía sobre{' '}
            <Link href="/cuanto-cobrar-por-una-pagina-web-freelance">
              cuánto cobrar por una página web freelance
            </Link>.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular mi presupuesto
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt" aria-labelledby="presupuestar-proyecto-faq-title">
        <div className="container text-block">
          <h2 id="presupuestar-proyecto-faq-title">
            Preguntas frecuentes sobre cómo presupuestar un proyecto freelance
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

      <section className="section">
        <div className="container text-block">
          <span className="eyebrow">Siguiente paso</span>
          <h2>Lleva la teoría a números concretos</h2>
          <p>
            Si ya tienes claro el enfoque, el siguiente paso útil es probar un caso real en la
            calculadora y ver dónde queda tu precio mínimo defendible y tu zona recomendada.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Probar la calculadora
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
