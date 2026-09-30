import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/como-calcular-horas-proyecto-freelance';
const title = 'Cómo calcular horas de un proyecto freelance antes de presupuestar';
const description =
  'Guía práctica para estimar horas de un proyecto freelance por fases, revisiones, gestión, imprevistos y buffer antes de convertirlas en precio.';

const pageFaqItems = [
  {
    question: '¿Cómo cálculo las horas de un proyecto freelance?',
    answer:
      'Divide el proyecto por fases, estima cada bloque por separado, suma reuniones, gestión, revisiones, QA y entregables, y después aplica un buffer según la incertidumbre del alcance.',
  },
  {
    question: '¿Cuánto buffer conviene añadir a una estimación?',
    answer:
      'En proyectos claros suele bastar un 10% o 15%. Si hay incertidumbre, dependencias externas o muchas revisiones, puede tener sentido trabajar con un 20% o 30% y separar extras.',
  },
  {
    question: '¿Debo enseñar las horas al cliente si cobro precio cerrado?',
    answer:
      'No siempre. Puedes usar las horas como cálculo interno para proteger margen y presentar al cliente un precio cerrado con alcance, entregables, revisiones y exclusiones claras.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'cómo calcular horas proyecto freelance',
    'estimar horas proyecto freelance',
    'calcular horas presupuesto freelance',
    'horas proyecto freelance',
    'estimación horas freelance',
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

export default function ComoCalcularHorasProyectoFreelancePage() {
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
        id="calcular-horas-proyecto-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="calcular-horas-proyecto-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="calcular-horas-proyecto-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Estimación de esfuerzo</span>
            <h1>Cómo calcular horas de un proyecto freelance antes de presupuestar</h1>
            <p className="lead">
              Antes de poner precio necesitas saber qué esfuerzo estás vendiendo. Una estimación de
              horas no sirve para encorsetarte, sino para detectar tareas invisibles, revisiones,
              gestión y riesgos antes de comprometer un precio cerrado.
            </p>
            <div className="hero-badges" aria-label="Qué cubre esta guía">
              <span className="hero-badge">Fases del proyecto</span>
              <span className="hero-badge">Buffer realista</span>
              <span className="hero-badge">Horas invisibles</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular presupuesto
              </Link>
              <Link href="/precio-cerrado-o-por-horas-freelance" className="primary-button">
                Elegir modelo de cobro
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Resumen rápido</h2>
            <ul className="article-list">
              <li>Estima por bloques, no con una cifra global improvisada.</li>
              <li>Incluye reuniones, gestión, QA, revisiones y preparación de entregables.</li>
              <li>Añade buffer según el riesgo real del alcance.</li>
              <li>Convierte las horas en precio solo después de validar margen.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Por qué fallan muchas estimaciones freelance</h2>
          <p>
            La mayoría de errores no vienen de calcular mal una tarea técnica aislada, sino de
            olvidar todo lo que rodea al trabajo: llamadas, cambios de criterio, preparación,
            pruebas, correcciones, comunicación, subida a producción o pequeños bloqueos con
            terceros.
          </p>
          <p>
            Por eso conviene estimar el proyecto como un conjunto de fases. La cifra final no tiene
            que ser perfecta, pero sí debe ser suficientemente honesta como para no convertir un
            presupuesto aceptado en semanas de margen perdido.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> si una tarea no aparece en la estimación, probablemente la
            acabarás haciendo gratis.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Bloques de estimación">
          <article className="feature-card">
            <h2>1. Descubrimiento y alcance</h2>
            <p>
              Reuniones iniciales, análisis, lectura de materiales, definición de objetivos,
              preguntas al cliente y preparación de una propuesta clara.
            </p>
          </article>

          <article className="feature-card">
            <h2>2. Producción principal</h2>
            <p>
              Diseño, desarrollo, configuración, contenidos, automatizaciones o cualquier bloque
              central que entregue el resultado prometido.
            </p>
          </article>

          <article className="feature-card">
            <h2>3. Revisión y cierre</h2>
            <p>
              Cambios, QA, pruebas en móvil, ajustes finales, documentación, entrega, publicación y
              acompañar al cliente en el cierre.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Método simple para estimar horas</h2>
            <ol className="article-list article-list-ordered">
              <li>Divide el proyecto en fases y entregables concretos.</li>
              <li>Asigna horas optimistas, normales y pesimistas a cada bloque importante.</li>
              <li>Incluye reuniones, gestión, pruebas, documentación y entrega.</li>
              <li>Marca dependencias externas que puedan bloquear el trabajo.</li>
              <li>Añade un buffer según claridad del alcance y riesgo de cambios.</li>
              <li>Comprueba si el total encaja con tu calendario real.</li>
            </ol>
            <p>
              Si el total te parece demasiado alto, no lo escondas reduciendo horas sin criterio.
              Revisa alcance, fases, entregables o nivel de acabado. Esa conversación protege más
              margen que prometer una cifra bonita.
            </p>
          </div>

          <aside className="feature-card article-summary">
            <h2>Fórmula orientativa</h2>
            <p>
              Horas del proyecto = horas de producción + reuniones + gestión + revisiones + pruebas
              + entrega + buffer.
            </p>
            <p>
              Después puedes llevar ese total a la{' '}
              <Link href="/#calculadora">calculadora de presupuesto freelance</Link> para convertir
              esfuerzo en precio recomendado.
            </p>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Qué buffer usar sin inflar el presupuesto a ciegas</h2>
          <p>
            El buffer no es una excusa para inventar precio. Es una protección ante incertidumbre.
            Si el alcance es claro y el cliente decide rápido, puedes trabajar con un margen menor.
            Si hay muchas personas opinando, dependencias externas u objetivos poco definidos, el
            buffer debe subir o el proyecto debería separarse por fases.
          </p>
          <div className="feature-grid" aria-label="Niveles de buffer">
            <article className="feature-card">
              <h3>10% a 15%</h3>
              <p>Para proyectos conocidos, alcance claro y pocas revisiones.</p>
            </article>

            <article className="feature-card">
              <h3>20% a 25%</h3>
              <p>Para proyectos con decisión compartida, contenidos pendientes o varios ajustes.</p>
            </article>

            <article className="feature-card">
              <h3>30% o por fases</h3>
              <p>Para alcance difuso, integraciones, urgencias o alta dependencia del cliente.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>De horas estimadas a precio defendible</h2>
          <p>
            Cuando ya tienes el total de horas, el siguiente paso es convertirlo en una cifra
            rentable. No basta con multiplicar por una tarifa aleatoria: revisa tu objetivo mensual,
            horas facturables reales, costes, reserva fiscal, margen y si el IVA va aparte.
          </p>
          <p>
            Si el resultado queda lejos de lo que el cliente esperaba, puedes reducir alcance, partir
            el trabajo en fases o proponer un primer bloque de discovery. Lo peligroso es bajar el
            precio manteniendo las mismas horas y el mismo nivel de exigencia.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Pasar horas a presupuesto
            </Link>
            <Link href="/ejemplo-presupuesto-freelance" className="primary-button">
              Ver ejemplo de propuesta
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <LeadMagnetForm
            source="como-calcular-horas-proyecto-freelance"
            title="Te enviamos el kit para estimar y presupuestar mejor"
            description="Accede al kit con plantilla de presupuesto, estructura de propuesta comercial y lista de comprobación para revisar horas, alcance, revisiones y margen antes de enviar la oferta."
            buttonLabel="Quiero el kit"
          />
        </div>
      </section>

      <section className="section" id="faq-calcular-horas-proyecto">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre estimar horas freelance</h2>
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
