import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/plantilla-presupuesto-freelance';
const title = 'Plantilla de presupuesto freelance para cobrar mejor tus proyectos';
const description =
  'Plantilla practica de presupuesto freelance con las secciones clave para presentar mejor una propuesta, proteger alcance, revisiones, pagos e IVA.';

const pageFaqItems = [
  {
    question: 'Que debe incluir una plantilla de presupuesto freelance?',
    answer:
      'Como minimo deberia incluir contexto del proyecto, alcance, entregables, precio, forma de pago, revisiones, plazos, exclusiones e IVA cuando aplique.',
  },
  {
    question: 'Es mejor enviar solo un precio o un presupuesto mas completo?',
    answer:
      'Un presupuesto mas completo suele ayudarte a defender mejor el precio porque explica alcance, limites y condiciones. Eso reduce malentendidos y negocia mejor que una cifra suelta.',
  },
  {
    question: 'Una plantilla sustituye la calculadora de presupuesto?',
    answer:
      'No. La plantilla te ayuda a presentar mejor la propuesta, pero la calculadora te ayuda a obtener una cifra mas defendible antes de escribirla.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'plantilla presupuesto freelance',
    'modelo presupuesto freelance',
    'presupuesto freelance ejemplo',
    'como hacer un presupuesto freelance',
    'plantilla propuesta freelance',
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

export default function PlantillaPresupuestoFreelancePage() {
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
        id="plantilla-presupuesto-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="plantilla-presupuesto-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="plantilla-presupuesto-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Plantilla practica</span>
            <h1>Plantilla de presupuesto freelance para cobrar mejor tus proyectos</h1>
            <p className="lead">
              Un presupuesto no deberia ser solo una cifra y una despedida amable. Si quieres
              defender mejor tu precio, te conviene enviar una propuesta con estructura, limites y
              condiciones claras.
            </p>
            <div className="hero-badges" aria-label="Que cubre esta guia">
              <span className="hero-badge">Modelo reutilizable</span>
              <span className="hero-badge">Mejor negociacion</span>
              <span className="hero-badge">Mas control de alcance</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular mi presupuesto
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Que te llevas de aqui</h2>
            <ul className="article-list">
              <li>La estructura base de una plantilla de presupuesto reutilizable.</li>
              <li>Que secciones ayudan a defender mejor tu precio.</li>
              <li>Como evitar cambios de alcance y rebajas mal planteadas.</li>
              <li>Cuando usar esta plantilla junto a la calculadora.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Una buena plantilla no sirve para cobrar mas por si sola</h2>
          <p>
            Sirve para presentar mejor una cifra que ya tiene sentido economico. Primero necesitas
            saber cuanto deberias cobrar. Despues necesitas contarlo bien para que el cliente
            entienda que incluye la propuesta y donde estan los limites.
          </p>
          <p>
            Si solo mandas un precio suelto, te quedas sin contexto para defenderlo. Si mandas un
            presupuesto mejor construido, negocias con mas orden y reduces malentendidos desde el
            principio.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> la calculadora te ayuda a sacar una cifra defendible. La
            plantilla te ayuda a presentarla sin dejar huecos peligrosos.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Secciones de la plantilla">
          <article className="feature-card">
            <h2>1. Contexto y objetivo</h2>
            <p>
              Resume que necesita el cliente, que problema se quiere resolver y que resultado busca.
              Esto da sentido al precio y evita que la propuesta parezca una cifra sin marco.
            </p>
          </article>

          <article className="feature-card">
            <h2>2. Alcance y entregables</h2>
            <p>
              Explica que esta incluido y que no. Cuanto mas claro dejes alcance, revisiones y
              entregables, menos espacio hay para cambios gratis.
            </p>
          </article>

          <article className="feature-card">
            <h2>3. Precio y condiciones</h2>
            <p>
              Presenta el importe, forma de pago, plazos, vigencia del presupuesto e IVA. Esta
              parte convierte una propuesta informal en una base mucho mas defendible.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Plantilla base de presupuesto freelance</h2>
          <div className="disclaimer-box">
            <strong>Modelo orientativo:</strong> puedes copiar esta estructura y adaptarla a tus
            servicios, entregables y forma de trabajar.
          </div>
          <ol className="article-list article-list-ordered">
            <li>Portada o encabezado con nombre del proyecto y fecha.</li>
            <li>Breve resumen del objetivo del encargo.</li>
            <li>Alcance del trabajo y entregables incluidos.</li>
            <li>Numero de revisiones incluidas y como se gestionan extras.</li>
            <li>Plazos estimados y dependencias del cliente.</li>
            <li>Precio del proyecto y si el IVA va aparte.</li>
            <li>Forma de pago y calendario de hitos si aplica.</li>
            <li>Exclusiones: que no entra en el presupuesto.</li>
            <li>Validez de la propuesta.</li>
            <li>Siguiente paso para aprobarla.</li>
          </ol>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Errores tipicos al usar una plantilla de presupuesto</h2>
          <ol className="article-list article-list-ordered">
            <li>Reutilizar siempre el mismo texto sin ajustar alcance ni entregables.</li>
            <li>No aclarar cuantas revisiones entran.</li>
            <li>No diferenciar precio antes y despues de IVA.</li>
            <li>Olvidar exclusiones y abrir la puerta a trabajo adicional gratis.</li>
            <li>Enviar un documento bonito pero con una cifra mal calculada.</li>
          </ol>
          <p>
            La plantilla mejora la presentacion, pero si quieres defender bien el precio, antes te
            conviene pasar por la guia sobre{' '}
            <Link href="/como-presupuestar-un-proyecto-freelance">
              como presupuestar un proyecto freelance
            </Link>
            . Y si quieres pulir la parte de venta y no solo la estructura, te conviene sumar
            tambien la guia sobre{' '}
            <Link href="/como-hacer-una-propuesta-comercial">
              como hacer una propuesta comercial freelance
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container feature-grid" aria-label="Como usar esta pagina con la calculadora">
          <article className="feature-card">
            <h2>Saca primero tu cifra</h2>
            <p>
              Usa la calculadora para llegar a un precio minimo y a una zona recomendada antes de
              escribir una sola linea del presupuesto.
            </p>
          </article>

          <article className="feature-card">
            <h2>Despues redacta la propuesta</h2>
            <p>
              Pasa esa cifra a la plantilla y acompanana de alcance, revisiones, plazos y pagos
              para que el cliente entienda mejor lo que esta comprando.
            </p>
          </article>

          <article className="feature-card">
            <h2>Negocia tocando estructura, no solo precio</h2>
            <p>
              Si el cliente aprieta, revisa alcance, entregables o fases antes de bajar sin red de
              seguridad.
            </p>
          </article>
        </div>
      </section>

      <section className="section alt" aria-labelledby="plantilla-presupuesto-faq-title">
        <div className="container text-block">
          <h2 id="plantilla-presupuesto-faq-title">
            Preguntas frecuentes sobre una plantilla de presupuesto freelance
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
          <h2>Calcula primero y redacta despues</h2>
          <p>
            Si quieres que tu plantilla sirva de verdad, primero necesitas una cifra defendible.
            Usa la calculadora y luego pasa el resultado a tu propuesta.
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
