import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/kit-presupuesto-freelance';
const title = 'Kit de presupuesto freelance';
const description =
  'Recurso práctico con plantilla de presupuesto, estructura de propuesta comercial y lista de comprobación para revisar mejor un presupuesto freelance antes de enviarlo.';

const faqItems = [
  {
    question: '¿Qué incluye este kit de presupuesto freelance?',
    answer:
      'Incluye una estructura base de presupuesto, una guía para ordenar la propuesta comercial y una lista de comprobación breve para revisar alcance, pagos, revisiones e IVA antes de enviar la oferta.',
  },
  {
    question: '¿Este kit sustituye la calculadora?',
    answer:
      'No. El kit te ayuda a presentar y revisar mejor la oferta. La calculadora sigue siendo la mejor pieza para aterrizar una cifra mínima y una zona recomendada antes de redactar el documento.',
  },
  {
    question: '¿Puedo descargarlo y adaptarlo?',
    answer:
      'Sí. Hay una versión descargable en texto para que la adaptes a tus servicios, entregables y forma de trabajar.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'kit presupuesto freelance',
    'plantilla presupuesto freelance',
    'checklist presupuesto freelance',
    'propuesta comercial freelance',
    'recurso para presupuestar proyectos',
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

export default function KitPresupuestoFreelancePage() {
  const siteUrl = getSiteUrl();
  const pageUrl = new URL(route, siteUrl).toString();
  const downloadUrl = new URL('/recursos/kit-presupuesto-freelance.txt', siteUrl).toString();

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
    datePublished: '2026-04-25',
    dateModified: '2026-04-25',
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
        id="kit-presupuesto-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="kit-presupuesto-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="kit-presupuesto-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Recurso gratuito</span>
            <h1>Kit de presupuesto freelance</h1>
            <p className="lead">
              Un recurso simple para pasar de una cifra suelta a una propuesta más clara. Incluye
              estructura de presupuesto, orden básico para la propuesta comercial y una lista de comprobación
              corta para revisar la oferta antes de enviarla.
            </p>
            <div className="hero-badges" aria-label="Qué incluye el kit">
              <span className="hero-badge">Plantilla base</span>
              <span className="hero-badge">Propuesta comercial</span>
              <span className="hero-badge">Lista de comprobación final</span>
            </div>
            <div className="guide-cta">
              <a href={downloadUrl} className="primary-button" download>
                Descargar plantilla en texto
              </a>
              <Link href="/#calculadora" className="primary-button">
                Ir a la calculadora
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Qué te llevas</h2>
            <ul className="article-list">
              <li>Un guion base para estructurar un presupuesto.</li>
              <li>Un orden más comercial para presentar el servicio.</li>
              <li>Una lista corta de comprobación antes de enviar la oferta.</li>
              <li>Una versión descargable para adaptarla a tu trabajo.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>1. Estructura base de presupuesto</h2>
          <ol className="article-list article-list-ordered">
            <li>Encabezado con nombre del proyecto y fecha.</li>
            <li>Resumen del objetivo del encargo.</li>
            <li>Alcance del trabajo y entregables incluidos.</li>
            <li>Número de revisiones incluidas.</li>
            <li>Plazos estimados y dependencias del cliente.</li>
            <li>Precio del proyecto y si el IVA va aparte.</li>
            <li>Forma de pago y calendario de hitos si aplica.</li>
            <li>Exclusiones: qué no entra en el presupuesto.</li>
            <li>Validez de la propuesta.</li>
            <li>Siguiente paso para aprobarla.</li>
          </ol>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>2. Orden básico para la propuesta comercial</h2>
          <ol className="article-list article-list-ordered">
            <li>Contexto y problema a resolver.</li>
            <li>Objetivo del trabajo o resultado esperado.</li>
            <li>Enfoque propuesto y entregables.</li>
            <li>Alcance, revisiones y límites.</li>
            <li>Precio, forma de pago e IVA.</li>
            <li>Plazos e hitos principales.</li>
            <li>Siguiente paso claro para avanzar.</li>
          </ol>
          <p>
            La idea no es escribir un documento largo. La idea es que el cliente entienda que
            compra, que no compra y que tiene que pasar para decir que sí.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>3. Lista de comprobación rápida antes de enviar</h2>
          <ol className="article-list article-list-ordered">
            <li>La cifra parte de una base económica sana y no de una intuición rápida.</li>
            <li>El alcance deja claro que está incluido y que no.</li>
            <li>Las revisiones tienen un límite comprensible.</li>
            <li>El IVA está bien explicado.</li>
            <li>La forma de pago no deja zonas grises.</li>
            <li>El cliente sabe cuál es el siguiente paso.</li>
          </ol>
          <div className="disclaimer-box">
            <strong>Recuerda:</strong> este kit mejora la presentación y la revisión final, pero la
            calculadora sigue siendo la pieza que te ayuda a aterrizar el número.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Recursos relacionados">
          <article className="feature-card">
            <h2>Plantilla de presupuesto</h2>
            <p>
              Si quieres más contexto para cada bloque, revisa la guía de{' '}
              <Link href="/plantilla-presupuesto-freelance">plantilla de presupuesto freelance</Link>.
            </p>
          </article>

          <article className="feature-card">
            <h2>Propuesta comercial</h2>
            <p>
              Si quieres reforzar la parte de venta, usa también la guía sobre{' '}
              <Link href="/como-hacer-una-propuesta-comercial">
                cómo hacer una propuesta comercial
              </Link>.
            </p>
          </article>

          <article className="feature-card">
            <h2>Número base</h2>
            <p>
              Si aún no tienes clara la cifra, vuelve a la calculadora antes de redactar nada.
            </p>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="kit-presupuesto-faq-title">
        <div className="container text-block">
          <h2 id="kit-presupuesto-faq-title">Preguntas frecuentes sobre el kit</h2>

          <div className="faq-list">
            {faqItems.map((item) => (
              <article className="faq-item" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <span className="eyebrow">Siguiente paso</span>
          <h2>Descarga el kit o vuelve a calcular tu presupuesto</h2>
          <p>
            Si ya tienes una propuesta en marcha, puedes descargar la versión en texto y adaptarla.
            Si sigues afinando la cifra, vuelve antes a la calculadora.
          </p>
          <div className="guide-cta">
            <a href={downloadUrl} className="primary-button" download>
              Descargar el kit
            </a>
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
