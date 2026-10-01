import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { formatCurrency, formatNumber } from '@/lib/format';
import {
  expandedProjectExampleInput,
  expandedProjectExampleQuote,
  projectExampleInput,
  webDevelopmentExamplePhases,
} from '@/lib/projectExample';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/presupuesto-desarrollo-web-freelance';
const title = 'Presupuesto de desarrollo web freelance: fases y ejemplo';
const description =
  'Ejemplo de presupuesto de desarrollo web con 48 horas repartidas por fase, revisiones, costes directos, precio calculado y cambios de alcance.';

const pageFaqItems = [
  {
    question: '¿Cómo hacer un presupuesto de desarrollo web freelance?',
    answer:
      'Empieza definiendo alcance, entregables, horas estimadas, revisiones, costes directos, margen y condiciones de pago. Después convierte esa estimación en un precio cerrado que no dependa solo de intuición.',
  },
  {
    question: '¿Qué debe incluir un presupuesto de desarrollo web?',
    answer:
      'Debe incluir objetivos, páginas o funcionalidades, tecnología, entregables, plazos, revisiones, exclusiones, soporte posterior, forma de pago e IVA cuando aplique.',
  },
  {
    question: '¿Cómo evitar cambios de alcance en desarrollo web?',
    answer:
      'Conviene definir qué está incluido, qué se considera extra, cuántas rondas de revisión hay y cómo se presupuestan nuevas funcionalidades o cambios fuera del acuerdo inicial.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'presupuesto desarrollo web freelance',
    'presupuesto desarrollo web',
    'cómo presupuestar desarrollo web',
    'precio desarrollo web freelance',
    'propuesta desarrollo web freelance',
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

export default function PresupuestoDesarrolloWebFreelancePage() {
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
    dateModified: '2026-10-02',
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
        id="presupuesto-desarrollo-web-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="presupuesto-desarrollo-web-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="presupuesto-desarrollo-web-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Guía práctica</span>
            <h1>Presupuesto de desarrollo web freelance, fase por fase</h1>
            <p className="lead">
              Un proyecto de desarrollo web no se presupuesta igual que una tarea suelta. Hay
              discovery, arquitectura, reuniones, maquetación, desarrollo, pruebas, revisiones,
              entrega y soporte. Si no lo separas, el precio cerrado acaba absorbiendo trabajo
              invisible.
            </p>
            <div className="hero-badges" aria-label="Qué cubre esta guía">
              <span className="hero-badge">Desarrollo web</span>
              <span className="hero-badge">Precio cerrado</span>
              <span className="hero-badge">Hitos y alcance</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular presupuesto
              </Link>
              <Link href="/kit-presupuesto-freelance" className="primary-button">
                Ver kit de presupuesto
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Qué vas a ordenar</h2>
            <ul className="article-list">
              <li>Alcance real antes de dar una cifra.</li>
              <li>Horas estimadas por fase del proyecto.</li>
              <li>Costes directos, margen y buffer de cambios.</li>
              <li>Condiciones para revisiones, extras y soporte posterior.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container feature-grid" aria-label="Bloques del presupuesto">
          <article className="feature-card">
            <h2>1. Alcance funcional</h2>
            <p>
              Define páginas, formularios, CMS, integraciones, idiomas, roles, migraciones y
              cualquier funcionalidad que pueda cambiar las horas reales del proyecto.
            </p>
          </article>

          <article className="feature-card">
            <h2>2. Trabajo no visible</h2>
            <p>
              Incluye discovery, reuniones, coordinación, pruebas, documentación y entrega. Si no
              aparece en el presupuesto interno, acaba saliendo de tu margen.
            </p>
          </article>

          <article className="feature-card">
            <h2>3. Riesgo y soporte</h2>
            <p>
              Reserva margen para cambios, dependencias externas, errores de estimación, urgencias
              y soporte post-lanzamiento si el cliente espera acompañamiento.
            </p>
          </article>
        </div>
      </section>

      <section className="section alt" aria-labelledby="desarrollo-fases-title">
        <div className="container article-layout">
          <div className="text-block">
            <h2 id="desarrollo-fases-title">Ejemplo: 48 horas de trabajo antes de revisiones</h2>
            <p>
              Caso hipotético: una web de empresa con varias páginas, un CMS y un formulario.
              El cliente aporta textos, imágenes y acceso al alojamiento. Repartimos las{' '}
              {expandedProjectExampleInput.projectHours} horas estimadas según el trabajo que debe
              quedar terminado en cada fase.
            </p>
            <dl className="worked-example">
              {webDevelopmentExamplePhases.map((phase) => (
                <div key={phase.name}>
                  <dt>{phase.name}</dt>
                  <dd>{phase.hours} h</dd>
                </div>
              ))}
            </dl>
            <p>
              Con el {projectExampleInput.revisionBufferPercent}% de reserva se presupuestan{' '}
              {formatNumber(expandedProjectExampleQuote.bufferedProjectHours)} horas. Para el mismo
              profesional ficticio del{' '}
              <Link href="/ejemplo-presupuesto-freelance">ejemplo completo</Link>, la base es{' '}
              {formatCurrency(expandedProjectExampleQuote.baseHourlyRate)}/h; al añadir{' '}
              {formatCurrency(expandedProjectExampleInput.directProjectCosts)} de costes directos,
              el mínimo es {formatCurrency(expandedProjectExampleQuote.projectFloorPrice)}. Con el
              recargo del {expandedProjectExampleInput.profitMarginPercent}% la referencia queda en{' '}
              <strong>{formatCurrency(expandedProjectExampleQuote.recommendedProjectBudget)} sin IVA</strong>.
            </p>
            <p>
              Si el cliente añade un idioma, una integración o más páginas, vuelve a estimar la
              fase afectada antes de aceptar el cambio. El presupuesto debe especificar qué
              entregable y qué aprobación cierran cada fase.
            </p>
          </div>

          <aside className="feature-card article-summary">
            <h2>Exclusiones que conviene nombrar</h2>
            <ul className="article-list">
              <li>Textos, imágenes o contenidos no entregados por el cliente.</li>
              <li>Nuevas funcionalidades no descritas en la propuesta.</li>
              <li>SEO avanzado, automatizaciones o integraciones extra.</li>
              <li>Mantenimiento mensual, soporte continuo o evolutivos.</li>
              <li>Cambios aprobados después de cerrar una fase.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Cómo presentarlo para que el cliente entienda el precio</h2>
          <p>
            No presentes solo una cifra. Presenta el objetivo del proyecto, qué entregas, qué
            incluye cada fase, qué queda fuera, cuántos hitos de pago hay y qué ocurre cuando el
            alcance cambia. Esto reduce fricción y hace que el precio parezca menos arbitrario.
          </p>
          <p>
            Si el cliente pide rebaja, no reduzcas precio sin reducir alcance. Puedes eliminar
            funcionalidades, limitar revisiones, separar soporte posterior o dejar integraciones
            avanzadas como fase dos.
          </p>
          <p>
            Si el encargo se parece más a una web de empresa que a un desarrollo a medida, revisa
            también la guía para{' '}
            <Link href="/cuanto-cobrar-web-corporativa-freelance">
              calcular cuánto cobrar por una web corporativa freelance
            </Link>.
            Si el cliente habla de una web profesional sin mucho detalle técnico, puede encajar
            mejor la guía de{' '}
            <Link href="/precio-pagina-web-profesional-freelance">
              precio de una página web profesional freelance
            </Link>.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Usar la calculadora
            </Link>
            <Link href="/como-hacer-una-propuesta-comercial" className="primary-button">
              Mejorar la propuesta comercial
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <LeadMagnetForm
            source="presupuesto-desarrollo-web-freelance"
            title="Llévate el kit para preparar tu presupuesto web"
            description="Recibe la plantilla, la estructura de propuesta y la lista de comprobación para revisar alcance, hitos, extras y margen antes de enviar un presupuesto de desarrollo web."
            buttonLabel="Quiero el kit"
          />
        </div>
      </section>

      <section className="section" id="faq-presupuesto-desarrollo-web">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre presupuestos de desarrollo web</h2>
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
