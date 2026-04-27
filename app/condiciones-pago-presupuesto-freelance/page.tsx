import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/condiciones-pago-presupuesto-freelance';
const title = 'Condiciones de pago en presupuesto freelance: anticipo, hitos y plazos';
const description =
  'Guia para definir condiciones de pago en un presupuesto freelance: anticipo, pagos por hitos, plazos, entregables, revisiones, impagos y senales de riesgo.';

const pageFaqItems = [
  {
    question: 'Que condiciones de pago poner en un presupuesto freelance?',
    answer:
      'Conviene indicar anticipo, pagos por hitos o entregas, plazo de pago de cada factura, que ocurre si el cliente retrasa materiales o aprobaciones, y cuando se entrega el trabajo final.',
  },
  {
    question: 'Cuanto anticipo pedir como freelance?',
    answer:
      'Depende del proyecto y del riesgo. En proyectos cerrados suele ser razonable pedir un anticipo antes de empezar, por ejemplo un 30% o 50%, y completar el resto por hitos o antes de la entrega final.',
  },
  {
    question: 'Es mejor cobrar por hitos o al final?',
    answer:
      'Cobrar por hitos protege mejor tu caja y reduce riesgo. Cobrar todo al final solo suele tener sentido en encargos pequenos, clientes de mucha confianza o trabajos de muy bajo riesgo.',
  },
  {
    question: 'Como evitar impagos en proyectos freelance?',
    answer:
      'No elimina el riesgo, pero ayuda pedir anticipo, definir hitos, limitar entregas finales hasta el pago, dejar condiciones por escrito y parar el trabajo si hay facturas vencidas.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'condiciones de pago presupuesto freelance',
    'anticipo presupuesto freelance',
    'pagos por hitos freelance',
    'plazos de pago freelance',
    'como cobrar un proyecto freelance',
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

export default function CondicionesPagoPresupuestoFreelancePage() {
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
        id="condiciones-pago-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="condiciones-pago-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="condiciones-pago-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Pagos y anticipos</span>
            <h1>Condiciones de pago en presupuesto freelance: anticipo, hitos y plazos</h1>
            <p className="lead">
              Un presupuesto freelance no deberia limitarse a decir cuanto cuesta el proyecto.
              Tambien debe explicar como se paga, cuando se factura, que entrega queda asociada a
              cada hito y que pasa si el cliente retrasa materiales, aprobaciones o pagos.
            </p>
            <div className="hero-badges" aria-label="Que cubre esta guia">
              <span className="hero-badge">Anticipo</span>
              <span className="hero-badge">Pagos por hitos</span>
              <span className="hero-badge">Plazos claros</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular presupuesto
              </Link>
              <Link href="/presupuesto-por-fases-freelance" className="primary-button">
                Ver presupuesto por fases
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Resumen rapido</h2>
            <ul className="article-list">
              <li>Pide anticipo antes de reservar agenda o iniciar trabajo.</li>
              <li>Divide proyectos medianos o grandes en hitos facturables.</li>
              <li>Define plazo de pago y condicion de entrega final.</li>
              <li>Si se retrasa un pago, evita seguir acumulando trabajo gratis.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Por que las condiciones de pago protegen tu presupuesto</h2>
          <p>
            El precio puede estar bien calculado y aun asi el proyecto puede salir mal si el pago
            queda difuso. Cuando no hay anticipo, hitos ni plazos, todo el riesgo financiero cae del
            lado del freelance: reservas tiempo, empiezas a producir y esperas que el cliente pague
            al final sin fricciones.
          </p>
          <p>
            Las condiciones de pago convierten el presupuesto en un acuerdo operativo. No solo
            protegen caja: tambien ordenan el ritmo del proyecto, reducen cambios improvisados y
            evitan que una entrega grande dependa de una sola factura final.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> cobrar por hitos no es desconfiar del cliente. Es repartir
            riesgo, agenda y responsabilidad de forma mas sana.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Modelos de pago habituales">
          <article className="feature-card">
            <h2>Anticipo inicial</h2>
            <p>
              Sirve para reservar agenda, validar compromiso y cubrir el arranque. En proyectos
              cerrados, pedir una parte antes de empezar suele ser una practica razonable.
            </p>
          </article>

          <article className="feature-card">
            <h2>Pagos por hitos</h2>
            <p>
              Encajan cuando hay fases claras: descubrimiento, diseno, desarrollo, revision,
              entrega o publicacion. Cada hito debe tener entregable y factura asociada.
            </p>
          </article>

          <article className="feature-card">
            <h2>Pago final</h2>
            <p>
              Puede quedar ligado a la entrega final, pero no conviene que concentre todo el
              proyecto. Si el pago final pesa demasiado, el riesgo aumenta.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Estructura practica de condiciones de pago</h2>
            <p>
              Puedes adaptar el reparto segun tamano y confianza, pero una estructura simple suele
              funcionar mejor que una condicion vaga. Lo importante es que el cliente sepa que
              empieza, que se entrega y cuando se factura.
            </p>
            <ol className="article-list article-list-ordered">
              <li>Anticipo para reservar agenda e iniciar el proyecto.</li>
              <li>Pago intermedio al aprobar una fase o entregable concreto.</li>
              <li>Pago final antes de publicar, transferir archivos finales o cerrar soporte.</li>
              <li>Plazo de pago de cada factura y fecha de vencimiento.</li>
              <li>Regla para pausas si falta material, aprobacion o pago.</li>
              <li>Precio de cambios fuera de alcance o nuevas fases.</li>
            </ol>
          </div>

          <aside className="feature-card article-summary">
            <h2>Senales de riesgo</h2>
            <ul className="article-list">
              <li>Cliente que evita cualquier anticipo.</li>
              <li>Alcance difuso y urgencia alta.</li>
              <li>Muchos decisores sin responsable claro.</li>
              <li>Promesas de pago futuro a cambio de descuento.</li>
              <li>Historial de cambios constantes antes de aprobar el presupuesto.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Ejemplos de reparto de pago</h2>
          <p>
            No hay una unica formula universal, pero si patrones sanos. En un proyecto pequeno puede
            bastar un anticipo y un pago final. En uno mediano o grande, los hitos reducen riesgo y
            ayudan a que el proyecto avance con menos tension.
          </p>
          <div className="feature-grid" aria-label="Ejemplos de condiciones de pago">
            <article className="feature-card">
              <h3>Proyecto pequeno</h3>
              <p>
                50% al aceptar el presupuesto y 50% antes de la entrega final o publicacion.
              </p>
            </article>

            <article className="feature-card">
              <h3>Proyecto por fases</h3>
              <p>
                30% al inicio, 40% al aprobar una fase intermedia y 30% antes de la entrega final.
              </p>
            </article>

            <article className="feature-card">
              <h3>Proyecto largo</h3>
              <p>
                Anticipo inicial y facturacion por hitos mensuales, entregables o bloques de avance.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Que escribir en la propuesta</h2>
          <p>
            No hace falta llenar la propuesta de lenguaje duro. Basta con una redaccion clara:
            porcentaje o importe de anticipo, fecha o condicion de cada pago, plazo de vencimiento,
            que se entrega en cada fase y que ocurre si el proyecto se pausa por falta de materiales
            o aprobaciones.
          </p>
          <p>
            Si el cliente pide cambiar las condiciones, puedes negociar el reparto, pero no conviene
            eliminar toda proteccion. Si bajas el anticipo, reduce alcance inicial o divide antes el
            proyecto en hitos.
          </p>
          <div className="guide-cta">
            <Link href="/ejemplo-presupuesto-freelance" className="primary-button">
              Ver ejemplo de presupuesto
            </Link>
            <Link href="/plantilla-presupuesto-freelance" className="primary-button">
              Ver plantilla
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <LeadMagnetForm
            source="condiciones-pago"
            title="Te enviamos el kit para revisar tus condiciones de pago"
            description="Incluye plantilla de presupuesto, estructura de propuesta comercial y checklist para revisar alcance, pagos, revisiones e IVA antes de enviar una oferta."
            buttonLabel="Quiero el kit"
          />
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre pagos en presupuestos freelance</h2>
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
