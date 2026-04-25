import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/como-hacer-una-propuesta-comercial';
const title = 'Como hacer una propuesta comercial freelance que defienda mejor tu precio';
const description =
  'Guia practica para hacer una propuesta comercial freelance con estructura clara, alcance, precio, objeciones y siguiente paso sin convertirla en un PDF vacio.';

const pageFaqItems = [
  {
    question: 'Que debe incluir una propuesta comercial freelance?',
    answer:
      'Como minimo deberia incluir contexto, problema, enfoque, alcance, entregables, precio, forma de pago, limites y siguiente paso. La idea es que el cliente entienda que compra y por que cuesta eso.',
  },
  {
    question: 'Es lo mismo una propuesta comercial que un presupuesto?',
    answer:
      'No exactamente. Un presupuesto suele centrarse mas en precio y condiciones, mientras que una propuesta comercial suele explicar tambien el enfoque, el valor y el encaje del servicio.',
  },
  {
    question: 'Una buena propuesta comercial sirve si el precio esta mal calculado?',
    answer:
      'No. Una propuesta bien presentada ayuda a defender mejor el precio, pero antes necesitas una cifra sana. Si el numero esta mal, el documento no lo arregla.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'como hacer una propuesta comercial freelance',
    'propuesta comercial freelance',
    'modelo propuesta comercial freelance',
    'como presentar una propuesta a un cliente',
    'propuesta de servicios freelance',
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

export default function ComoHacerPropuestaComercialPage() {
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
        id="propuesta-comercial-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="propuesta-comercial-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="propuesta-comercial-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Guia practica</span>
            <h1>Como hacer una propuesta comercial freelance que defienda mejor tu precio</h1>
            <p className="lead">
              Una propuesta comercial no deberia ser un PDF bonito con una cifra al final. Deberia
              ayudarte a explicar el problema, el enfoque, el alcance y el precio de una manera que
              el cliente pueda entender y comparar con menos friccion.
            </p>
            <div className="hero-badges" aria-label="Que cubre esta guia">
              <span className="hero-badge">Propuesta comercial</span>
              <span className="hero-badge">Precio defendible</span>
              <span className="hero-badge">Siguiente paso claro</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Ir a la calculadora
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Que vas a aterrizar aqui</h2>
            <ul className="article-list">
              <li>Que estructura hace mas facil que el cliente entienda tu propuesta.</li>
              <li>Como presentar alcance, precio y pagos sin sonar ambiguo.</li>
              <li>Que diferencia hay entre propuesta comercial y presupuesto.</li>
              <li>Como usar la calculadora antes de redactar el documento.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Una propuesta comercial no es solo una forma elegante de enviar un precio</h2>
          <p>
            Su trabajo real es reducir friccion. Si el cliente entiende mejor el problema, el
            enfoque, los entregables y el siguiente paso, negociar deja de girar solo alrededor del
            numero final.
          </p>
          <p>
            La propuesta no sustituye al presupuesto ni al calculo economico. Lo que hace es darles
            contexto y ayudarte a defender mejor la cifra que ya has trabajado.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> una propuesta comercial fuerte no maquilla un mal precio.
            Pero si el precio esta bien calculado, si puede ayudarte a presentarlo mucho mejor.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Partes de una buena propuesta comercial">
          <article className="feature-card">
            <h2>1. Contexto y problema</h2>
            <p>
              Abre con lo que necesita el cliente y el resultado que busca. Esto da sentido a todo
              lo que viene despues y reduce la sensacion de que vendes una lista generica de tareas.
            </p>
          </article>

          <article className="feature-card">
            <h2>2. Enfoque y alcance</h2>
            <p>
              Explica como lo vas a resolver, que entregas y donde estan los limites. Eso protege
              el alcance y reduce cambios mal entendidos.
            </p>
          </article>

          <article className="feature-card">
            <h2>3. Precio y siguiente paso</h2>
            <p>
              Presenta el importe, pagos, condiciones y una accion clara para avanzar. Si dejas el
              cierre ambiguo, es facil que la propuesta se quede congelada.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Estructura base de una propuesta comercial freelance</h2>
          <ol className="article-list article-list-ordered">
            <li>Portada o encabezado con nombre del proyecto y fecha.</li>
            <li>Resumen breve del contexto y del problema a resolver.</li>
            <li>Objetivo del trabajo o resultado esperado.</li>
            <li>Enfoque propuesto y entregables incluidos.</li>
            <li>Alcance, revisiones y exclusiones.</li>
            <li>Precio, forma de pago e IVA si aplica.</li>
            <li>Plazos o hitos principales.</li>
            <li>Siguiente paso para aprobar o responder.</li>
          </ol>
          <p>
            Esta estructura no tiene por que ser rigida, pero si deberia ayudarte a evitar el error
            mas comun: enviar una propuesta que suena bien, pero deja demasiadas preguntas abiertas.
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Errores tipicos al redactar una propuesta comercial</h2>
          <ol className="article-list article-list-ordered">
            <li>Hablar mucho del proceso y poco del problema del cliente.</li>
            <li>Describir entregables sin aclarar limites ni exclusiones.</li>
            <li>Meter el precio al final sin anclar antes el valor del trabajo.</li>
            <li>No dejar claro cual es el siguiente paso para avanzar.</li>
            <li>Enviar una propuesta muy cuidada con una cifra mal calculada.</li>
          </ol>
          <p>
            Ese ultimo punto importa mucho: si primero no has trabajado bien el numero, el documento
            no te va a salvar. Para eso te conviene pasar antes por la{' '}
            <Link href="/plantilla-presupuesto-freelance">plantilla de presupuesto freelance</Link>{' '}
            y por la calculadora.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container feature-grid" aria-label="Como conectar propuesta y calculadora">
          <article className="feature-card">
            <h2>Calcula primero</h2>
            <p>
              Usa la calculadora para llegar a una cifra minima y a una zona recomendada antes de
              escribir la propuesta.
            </p>
          </article>

          <article className="feature-card">
            <h2>Redacta despues</h2>
            <p>
              Convierte ese numero en una propuesta con estructura, limites, plazos y pagos claros
              para que el cliente pueda entender mejor lo que compra.
            </p>
          </article>

          <article className="feature-card">
            <h2>Negocia tocando alcance</h2>
            <p>
              Si aparece presion sobre el precio, usa la propuesta para mover entregables, fases o
              revisiones antes de ceder por reflejo.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <LeadMagnetForm
            source="como-hacer-una-propuesta-comercial"
            title="Te enviamos el kit de propuesta y presupuesto"
            description="Accede al recurso con plantilla de presupuesto, estructura de propuesta comercial y checklist para revisar mejor una oferta freelance."
            buttonLabel="Quiero el kit"
          />
        </div>
      </section>

      <section className="section alt" aria-labelledby="propuesta-comercial-faq-title">
        <div className="container text-block">
          <h2 id="propuesta-comercial-faq-title">
            Preguntas frecuentes sobre como hacer una propuesta comercial freelance
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
          <h2>Primero saca la cifra y luego conviertela en propuesta</h2>
          <p>
            Si quieres que la propuesta te ayude de verdad, antes necesitas una base economica sana.
            Usa la calculadora y luego ordena el mensaje comercial.
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
