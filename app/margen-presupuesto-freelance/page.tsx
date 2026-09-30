import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/margen-presupuesto-freelance';
const title = 'Margen en presupuesto freelance: cuánto añadir sin perder competitividad';
const description =
  'Guía práctica para calcular margen en un presupuesto freelance: costes, horas, buffer, riesgo, beneficio real y precio recomendado sin presupuestar a ciegas.';

const pageFaqItems = [
  {
    question: '¿Cuánto margen debería añadir a un presupuesto freelance?',
    answer:
      'Depende del riesgo, urgencia, incertidumbre y valor del proyecto. Como orientación, un 15% a 25% puede encajar en proyectos claros; si hay más incertidumbre, dependencias o urgencia, el margen debería subir o el alcance separarse por fases.',
  },
  {
    question: '¿El margen es lo mismo que beneficio?',
    answer:
      'No exactamente. El margen ayuda a proteger beneficio, pero antes debes cubrir horas reales, costes directos, gestión, revisiones, impuestos y tiempo no vendible. Si esos elementos no están cubiertos, el margen puede ser solo apariencia.',
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
              <Link href="/#calculadora" className="primary-button">
                Calcular presupuesto
              </Link>
              <Link href="/como-calcular-horas-proyecto-freelance" className="primary-button">
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
            El margen es la distancia entre lo que te cuesta entregar el proyecto y el precio que
            presentas al cliente. Pero ese coste no es solo el tiempo de producción: también entran
            reuniones, gestión, pruebas, revisiones, herramientas, coordinación y oportunidad perdida.
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
              <li>Multiplica esas horas por tu tarifa interna mínima.</li>
              <li>Suma costes directos que dependan del proyecto.</li>
              <li>Añade buffer por revisiones, cambios esperables e incertidumbre.</li>
              <li>Aplica margen según riesgo, urgencia y valor del resultado.</li>
              <li>Comprueba si el precio final sigue siendo defendible con el alcance.</li>
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
              Precio recomendado = horas reales + costes directos + buffer + margen.
            </p>
            <p>
              La calculadora te ayuda a ordenar esa lógica para que no sea una suma hecha con el
              pulso acelerado cinco minutos antes de enviar la propuesta.
            </p>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Rangos orientativos de margen</h2>
          <p>
            No hay un porcentaje universal. El margen depende del tipo de servicio, de tu
            posicionamiento y del riesgo real. Aun así, estos rangos ayudan a no partir de cero.
          </p>
          <div className="feature-grid" aria-label="Rangos de margen">
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
            <Link href="/#calculadora" className="primary-button">
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
