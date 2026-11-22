import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';
import BudgetMargin from './BudgetMargin';

const route = '/margen-presupuesto-freelance';
const title = 'Margen en presupuesto freelance: cuánto añadir sin perder competitividad';
const description =
  'Guía práctica para calcular margen en un presupuesto freelance: costes, horas, buffer, riesgo, beneficio real y precio recomendado sin presupuestar a ciegas.';

const pageFaqItems = [
  {
    question: '¿Qué recargo debería aplicar a un presupuesto freelance?',
    answer:
      'Depende del riesgo, la urgencia y el valor del proyecto. Como orientación, un recargo del 15 % al 25 % sobre el coste puede encajar en proyectos claros. Si hay más incertidumbre, dependencias o urgencia, puedes subir el recargo o separar el alcance por fases.',
  },
  {
    question: '¿El margen es lo mismo que beneficio?',
    answer:
      'El beneficio del proyecto es la diferencia entre el precio y el coste. El margen real expresa esa diferencia como porcentaje del precio sin IVA. Para que refleje tu proyecto, incluye en el coste tanto tu tiempo como los gastos asociados.',
  },
  {
    question: '¿Cómo explico el margen al cliente?',
    answer:
      'No tienes que enseñar el margen como una línea separada. Puedes presentarlo como parte del precio cerrado, explicando alcance, entregables, revisiones, soporte incluido, condiciones y resultado esperado.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'margen presupuesto freelance',
    'margen proyecto freelance',
    'calcular margen presupuesto',
    'beneficio presupuesto freelance',
    'cuánto margen añadir presupuesto',
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

export default function MargenPresupuestoFreelancePage() {
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
        id="margen-presupuesto-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="margen-presupuesto-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="margen-presupuesto-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Margen y rentabilidad</span>
            <h1>Margen en presupuesto freelance: cuánto añadir sin perder competitividad</h1>
            <p className="lead">
              El margen no es un capricho que se añade al final para redondear. Es la parte que
              protege tu negocio cuando aparecen revisiones, gestión, tiempos invisibles o pequeñas
              desviaciones. Sin margen, un presupuesto bonito puede convertirse en una trampa muy
              educada.
            </p>
            <div className="hero-badges" aria-label="Qué cubre esta guía">
              <span className="hero-badge">Margen mínimo</span>
              <span className="hero-badge">Buffer de riesgo</span>
              <span className="hero-badge">Beneficio real</span>
            </div>
            <div className="guide-cta">
              <Link href="#calcular-margen" className="primary-button">
                Calcular mi margen y recargo
              </Link>
              <Link href="/como-calcular-horas-proyecto-freelance#estimar-horas" className="primary-button">
                Estimar horas antes
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Resumen rápido</h2>
            <ul className="article-list">
              <li>El margen se calcula después de cubrir horas, costes y gestión.</li>
              <li>No confundas margen con buffer: cumplen funciones parecidas, pero no iguales.</li>
              <li>El riesgo, la urgencia y la incertidumbre deben subir el precio.</li>
              <li>Si el cliente no acepta el precio, revisa alcance antes de borrar margen.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Qué significa margen en un presupuesto freelance</h2>
          <p>
            El margen real es el porcentaje del precio que queda después de cubrir el coste del
            proyecto. El recargo mide esa misma diferencia sobre el coste. En ese coste entran las
            horas de producción, reuniones, gestión, pruebas y revisiones, además de los gastos
            directos del proyecto.
          </p>
          <p>
            Cuando presupuestas sin margen, cualquier desviación sale de tu bolsillo o de tu agenda.
            Y si eso se repite, la sensación es muy reconocible: trabajas mucho, facturas, pero el
            beneficio real no aparece.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> margen no es inflar el precio. Es evitar que el proyecto se
            coma todo el beneficio al primer cambio razonable.
          </div>
          <BudgetMargin />
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Elementos que protegen margen">
          <article className="feature-card">
            <h2>Costes directos</h2>
            <p>
              Herramientas, licencias, colaboradores, plantillas, bancos de imágenes, plugins,
              desplazamientos o cualquier coste que exista por ese proyecto.
            </p>
          </article>

          <article className="feature-card">
            <h2>Tiempo invisible</h2>
            <p>
              Preparación, reuniones, seguimiento, QA, documentación, entrega y comunicación. No
              siempre se ve, pero siempre ocurre.
            </p>
          </article>

          <article className="feature-card">
            <h2>Riesgo comercial</h2>
            <p>
              Urgencia, alcance difuso, muchos decisores, dependencias externas, cliente nuevo o
              sectores donde las revisiones suelen alargarse.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Método simple para calcular margen</h2>
            <ol className="article-list article-list-ordered">
              <li>Calcula tus horas reales de producción y gestión.</li>
              <li>Añade a esas horas una reserva por revisiones y ajustes previsibles.</li>
              <li>Multiplica las horas con reserva por tu tarifa interna mínima.</li>
              <li>Suma costes directos que dependan del proyecto.</li>
              <li>Aplica un recargo sobre el coste según riesgo, urgencia y valor del resultado.</li>
              <li>Comprueba el margen sobre el precio final y si ese precio encaja con el alcance.</li>
            </ol>
            <p>
              Si el resultado parece alto, no bajes margen automáticamente. Revisa primero si el
              alcance está sobredimensionado, si hay fases que separar o si conviene dejar extras
              fuera del precio cerrado.
            </p>
          </div>

          <aside className="feature-card article-summary">
            <h2>Fórmula orientativa</h2>
            <p>
              Coste total = horas con reserva × tarifa interna + costes directos.
            </p>
            <p>
              El <Link href="/como-presupuestar-un-proyecto-freelance#calcular-precio-proyecto">cálculo del precio recomendado</Link> obtiene el precio
              multiplicando ese coste por (1 + recargo / 100).
            </p>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Rangos orientativos de recargo</h2>
          <p>
            El recargo sobre el coste depende del tipo de servicio, de tu posicionamiento y del
            riesgo. Una vez fijado el precio, comprueba qué margen te queda sobre esa cifra.
          </p>
          <div className="feature-grid" aria-label="Rangos de recargo">
            <article className="feature-card">
              <h3>10% a 15%</h3>
              <p>Para proyectos muy claros, repetibles, con bajo riesgo y pocas revisiones.</p>
            </article>

            <article className="feature-card">
              <h3>15% a 25%</h3>
              <p>Para proyectos habituales con gestión, revisiones y margen comercial razonable.</p>
            </article>

            <article className="feature-card">
              <h3>25% o más</h3>
              <p>Para urgencias, alcance incierto, alto valor, integraciones o mucha dependencia.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Cómo defender margen sin explicarlo como margen</h2>
          <p>
            Normalmente no necesitas presentar una línea llamada margen. Lo que sí necesitas es
            explicar bien el valor: qué problema resuelves, qué entregas, qué revisiones incluye,
            qué garantías operativas hay y qué queda fuera.
          </p>
          <p>
            Si el cliente pide bajar precio, la respuesta sana no es borrar margen. Es ajustar
            alcance, fases, plazo, nivel de soporte, número de revisiones o entregables. El precio
            baja cuando baja lo que estás vendiendo, no cuando desaparece tu beneficio.
          </p>
          <div className="guide-cta">
            <Link href="#calcular-margen" className="primary-button">
              Calcular margen en mi presupuesto
            </Link>
            <Link href="/presupuesto-por-fases-freelance" className="primary-button">
              Separar por fases
            </Link>
            <Link href="/ejemplo-presupuesto-freelance" className="primary-button">
              Ver ejemplo
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <LeadMagnetForm
            source="margen-presupuesto-freelance"
            title="Te enviamos el kit para proteger margen antes de enviar una oferta"
            description="Accede al kit con plantilla de presupuesto, estructura de propuesta comercial y lista de comprobación para revisar horas, costes, revisiones, extras y margen antes de cerrar precio."
            buttonLabel="Quiero el kit"
          />
        </div>
      </section>

      <section className="section" id="faq-margen-presupuesto">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre margen en presupuestos freelance</h2>
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
