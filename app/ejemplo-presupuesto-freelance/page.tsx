import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/ejemplo-presupuesto-freelance';
const title = 'Ejemplo de presupuesto freelance para presentar mejor tus precios';
const description =
  'Ejemplo práctico de presupuesto freelance con alcance, entregables, revisiones, precio, pagos, exclusiones e IVA para defender mejor una propuesta.';

const pageFaqItems = [
  {
    question: '¿Qué debe tener un ejemplo de presupuesto freelance?',
    answer:
      'Debe incluir contexto, alcance, entregables, precio, forma de pago, revisiones, plazos, exclusiones, validez de la propuesta e IVA cuando corresponda.',
  },
  {
    question: '¿Puedo copiar un ejemplo de presupuesto tal cual?',
    answer:
      'Puedes usarlo como estructura, pero no conviene copiarlo sin adaptar alcance, horas, riesgos, condiciones y precio a tu proyecto concreto.',
  },
  {
    question: '¿El ejemplo sirve para cualquier servicio freelance?',
    answer:
      'Sirve como base para diseño, desarrollo, marketing, consultoría o servicios profesionales, siempre que ajustes entregables, tiempos, revisiones y límites.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'ejemplo presupuesto freelance',
    'presupuesto freelance ejemplo',
    'modelo presupuesto freelance',
    'ejemplo propuesta freelance',
    'como presentar un presupuesto freelance',
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

export default function EjemploPresupuestoFreelancePage() {
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
        id="ejemplo-presupuesto-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="ejemplo-presupuesto-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="ejemplo-presupuesto-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Ejemplo práctico</span>
            <h1>Ejemplo de presupuesto freelance para presentar mejor tus precios</h1>
            <p className="lead">
              Un buen presupuesto freelance no es solo una cifra. Es una forma de explicar qué
              problema resuelves, qué entregas, dónde están los límites y por qué el precio tiene
              sentido.
            </p>
            <div className="hero-badges" aria-label="Qué cubre esta guía">
              <span className="hero-badge">Modelo adaptable</span>
              <span className="hero-badge">Alcance claro</span>
              <span className="hero-badge">Precio defendible</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular mi presupuesto
              </Link>
              <Link href="/kit-presupuesto-freelance" className="primary-button">
                Ver kit de presupuesto
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Qué vas a encontrar</h2>
            <ul className="article-list">
              <li>Una estructura de presupuesto lista para adaptar.</li>
              <li>Un ejemplo de alcance, entregables, revisiones y exclusiones.</li>
              <li>Cómo separar precio, pagos, IVA y condiciones.</li>
              <li>Enlaces para calcular la cifra antes de enviarla.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Antes del ejemplo: el presupuesto debe salir de una cifra sana</h2>
          <p>
            El ejemplo te ayuda a presentar mejor, pero no arregla un precio mal calculado. Antes
            de redactar la propuesta conviene estimar horas, costes, revisiones, margen y reserva
            fiscal para no acabar defendiendo una cifra que no te sostiene.
          </p>
          <p>
            Si todavía no tienes esa base, empieza por la{' '}
            <Link href="/#calculadora">calculadora de presupuesto freelance</Link> y vuelve a esta
            estructura cuando tengas un rango mínimo y una cifra recomendada.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> primero calcula una cifra defendible. Después conviértela
            en un presupuesto claro que el cliente pueda entender.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Ejemplo de estructura para un presupuesto freelance</h2>
            <p>
              Este modelo está pensado para proyectos cerrados: desarrollo web, diseño, marketing,
              consultoría, automatizaciones o cualquier servicio donde necesites explicar alcance y
              condiciones antes de cobrar.
            </p>
            <ol className="article-list article-list-ordered">
              <li>Nombre del cliente, proyecto y fecha de la propuesta.</li>
              <li>Resumen del objetivo del proyecto en tres o cuatro líneas.</li>
              <li>Alcance incluido y entregables concretos.</li>
              <li>Fases de trabajo y plazos estimados.</li>
              <li>Revisiones incluidas y cómo se valoran revisiones extra.</li>
              <li>Precio del proyecto, forma de pago e IVA aparte si aplica.</li>
              <li>Exclusiones para evitar trabajo adicional no pactado.</li>
              <li>Validez de la propuesta y siguiente paso para aprobarla.</li>
            </ol>
          </div>

          <aside className="feature-card article-summary">
            <h2>Bloque de ejemplo</h2>
            <p>
              Presupuesto para diseño y desarrollo de página web corporativa. Incluye estructura,
              diseño responsive, maquetación, formulario de contacto, configuración básica SEO y dos
              rondas de revisión.
            </p>
            <p>
              No incluye redacción completa de textos, sesiones de foto, campañas, mantenimiento
              mensual ni nuevas secciones fuera del alcance inicial.
            </p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container feature-grid" aria-label="Partes del ejemplo de presupuesto">
          <article className="feature-card">
            <h2>1. Alcance incluido</h2>
            <p>
              Define qué entregas exactamente: páginas, pantallas, piezas, sesiones, informes,
              automatizaciones o cualquier resultado final que el cliente pueda validar.
            </p>
          </article>

          <article className="feature-card">
            <h2>2. Precio y pagos</h2>
            <p>
              Presenta precio sin IVA, IVA si corresponde, total, forma de pago y calendario. Si
              hay anticipo o hitos, indícalo antes de empezar.
            </p>
          </article>

          <article className="feature-card">
            <h2>3. Límites y extras</h2>
            <p>
              Explica qué no entra y cómo se presupuestan cambios. Esta parte evita que una
              propuesta clara se convierta en soporte o trabajo ilimitado.
            </p>
          </article>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Texto de ejemplo para presentar el precio</h2>
          <div className="disclaimer-box">
            <p>
              El importe del proyecto es de 1.200 EUR + IVA. Este precio incluye las fases,
              entregables y revisiones descritas en la propuesta. Cualquier cambio de alcance,
              nueva sección o revisión adicional se presupuestará aparte antes de realizarse.
            </p>
          </div>
          <p>
            Ese bloque funciona porque separa tres ideas: precio, alcance y condiciones. No deja el
            precio flotando solo, y tampoco promete trabajo ilimitado por una cifra cerrada.
          </p>
          <p>
            Si quieres una estructura más completa para convertir este ejemplo en documento, puedes
            apoyarte en la{' '}
            <Link href="/plantilla-presupuesto-freelance">plantilla de presupuesto freelance</Link>.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Errores habituales al copiar ejemplos de presupuesto</h2>
          <ol className="article-list article-list-ordered">
            <li>Copiar una cifra sin recalcular horas, margen y costes propios.</li>
            <li>No adaptar entregables al proyecto real del cliente.</li>
            <li>Olvidar exclusiones y dejar abierto el alcance.</li>
            <li>No separar IVA, forma de pago y validez de la propuesta.</li>
            <li>Enviar el presupuesto sin siguiente paso claro.</li>
          </ol>
          <p>
            Si el proyecto es web, también te puede interesar la guía sobre{' '}
            <Link href="/presupuesto-desarrollo-web-freelance">
              presupuesto de desarrollo web freelance
            </Link>{' '}
            o la guía de{' '}
            <Link href="/cuanto-cobrar-por-una-pagina-web-freelance">
              cuánto cobrar por una página web freelance
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <LeadMagnetForm
            source="ejemplo-presupuesto-freelance"
            title="Te enviamos el kit con ejemplo, plantilla y checklist"
            description="Accede al kit con plantilla de presupuesto, estructura de propuesta comercial y checklist para revisar mejor una oferta antes de enviarla."
            buttonLabel="Quiero el kit"
          />
        </div>
      </section>

      <section className="section" id="faq-ejemplo-presupuesto">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre ejemplos de presupuesto freelance</h2>
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
