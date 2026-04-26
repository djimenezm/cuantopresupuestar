import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/presupuesto-desarrollo-web-freelance';
const title = 'Presupuesto de desarrollo web freelance: como calcularlo con margen';
const description =
  'Guia para preparar un presupuesto de desarrollo web freelance con alcance, horas reales, revisiones, costes directos, hitos, margen e IVA aparte.';

const pageFaqItems = [
  {
    question: 'Como hacer un presupuesto de desarrollo web freelance?',
    answer:
      'Empieza definiendo alcance, entregables, horas estimadas, revisiones, costes directos, margen y condiciones de pago. Despues convierte esa estimacion en un precio cerrado que no dependa solo de intuicion.',
  },
  {
    question: 'Que debe incluir un presupuesto de desarrollo web?',
    answer:
      'Debe incluir objetivos, paginas o funcionalidades, tecnologia, entregables, plazos, revisiones, exclusiones, soporte posterior, forma de pago e IVA cuando aplique.',
  },
  {
    question: 'Como evitar cambios de alcance en desarrollo web?',
    answer:
      'Conviene definir que esta incluido, que se considera extra, cuantas rondas de revision hay y como se presupuestan nuevas funcionalidades o cambios fuera del acuerdo inicial.',
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
    'como presupuestar desarrollo web',
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
            <span className="eyebrow">Guia practica</span>
            <h1>Presupuesto de desarrollo web freelance: como calcularlo sin perder margen</h1>
            <p className="lead">
              Un proyecto de desarrollo web no se presupuesta igual que una tarea suelta. Hay
              discovery, arquitectura, reuniones, maquetacion, desarrollo, pruebas, revisiones,
              entrega y soporte. Si no lo separas, el precio cerrado acaba absorbiendo trabajo
              invisible.
            </p>
            <div className="hero-badges" aria-label="Que cubre esta guia">
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
            <h2>Que vas a ordenar</h2>
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
              Define paginas, formularios, CMS, integraciones, idiomas, roles, migraciones y
              cualquier funcionalidad que pueda cambiar las horas reales del proyecto.
            </p>
          </article>

          <article className="feature-card">
            <h2>2. Trabajo no visible</h2>
            <p>
              Incluye discovery, reuniones, coordinacion, pruebas, documentacion y entrega. Si no
              aparece en el presupuesto interno, acaba saliendo de tu margen.
            </p>
          </article>

          <article className="feature-card">
            <h2>3. Riesgo y soporte</h2>
            <p>
              Reserva margen para cambios, dependencias externas, errores de estimacion, urgencias
              y soporte post-lanzamiento si el cliente espera acompanamiento.
            </p>
          </article>
        </div>
      </section>

      <section className="section alt">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Formula para construir el precio desde dentro</h2>
            <p>
              Antes de enviar una propuesta, separa el proyecto en fases. No necesitas acertar cada
              hora al minuto, pero si necesitas saber si el precio final cubre el suelo economico de
              tu actividad.
            </p>
            <ol className="article-list article-list-ordered">
              <li>Lista entregables y funcionalidades concretas.</li>
              <li>Estima horas por fase: analisis, diseno, desarrollo, pruebas y entrega.</li>
              <li>Suma reuniones, gestion, revisiones y tiempo no productivo.</li>
              <li>Anade costes directos: licencias, plugins, colaboraciones o herramientas.</li>
              <li>Aplica buffer, margen profesional e IVA aparte cuando corresponda.</li>
            </ol>
            <div className="disclaimer-box">
              <strong>Regla sana:</strong> si el cliente pide precio cerrado, tu calculo interno
              debe ser todavia mas claro. El precio puede ser cerrado, pero el alcance no puede ser
              infinito.
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Exclusiones que conviene nombrar</h2>
            <ul className="article-list">
              <li>Textos, imagenes o contenidos no entregados por el cliente.</li>
              <li>Nuevas funcionalidades no descritas en la propuesta.</li>
              <li>SEO avanzado, automatizaciones o integraciones extra.</li>
              <li>Mantenimiento mensual, soporte continuo o evolutivos.</li>
              <li>Cambios aprobados despues de cerrar una fase.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Como presentarlo para que el cliente entienda el precio</h2>
          <p>
            No presentes solo una cifra. Presenta el objetivo del proyecto, que entregas, que
            incluye cada fase, que queda fuera, cuantos hitos de pago hay y que ocurre cuando el
            alcance cambia. Esto reduce friccion y hace que el precio parezca menos arbitrario.
          </p>
          <p>
            Si el cliente pide rebaja, no reduzcas precio sin reducir alcance. Puedes eliminar
            funcionalidades, limitar revisiones, separar soporte posterior o dejar integraciones
            avanzadas como fase dos.
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
            title="Llevate el kit para preparar tu presupuesto web"
            description="Recibe la plantilla, la estructura de propuesta y el checklist para revisar alcance, hitos, extras y margen antes de enviar un presupuesto de desarrollo web."
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
