import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/cuanto-cobrar-por-una-pagina-web-freelance';
const title = 'Cuanto cobrar por una pagina web freelance sin presupuestar a ciegas';
const description =
  'Guia practica para calcular cuanto cobrar por una pagina web freelance segun alcance, horas reales, revisiones, costes directos, margen e IVA aparte.';

const pageFaqItems = [
  {
    question: 'Cuanto cobrar por una pagina web freelance?',
    answer:
      'No existe una cifra unica. El precio depende del alcance, las horas reales, las revisiones, los costes directos y el margen que necesitas proteger. Una landing sencilla y una web corporativa a medida no deberian salir del mismo calculo.',
  },
  {
    question: 'Que deberia incluir el presupuesto de una web freelance?',
    answer:
      'Como minimo deberia cubrir discovery, diseno o maquetacion, desarrollo, reuniones, revisiones, costes externos, entregables, condiciones de alcance y el IVA cuando aplique.',
  },
  {
    question: 'Es mejor cobrar una web por fases o con un precio cerrado?',
    answer:
      'Las dos opciones pueden funcionar. Un precio cerrado ayuda a vender mejor, pero suele ser mas sano si tienes claro tu suelo y separas bien alcance, hitos y revisiones para no absorber cambios gratis.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'cuanto cobrar por una pagina web freelance',
    'precio pagina web freelance',
    'cuanto cobrar web freelance',
    'presupuesto web freelance',
    'cuanto presupuestar pagina web',
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

export default function CuantoCobrarPaginaWebFreelancePage() {
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
    datePublished: '2026-04-23',
    dateModified: '2026-04-23',
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
        id="cuanto-cobrar-web-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="cuanto-cobrar-web-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="cuanto-cobrar-web-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Guia practica</span>
            <h1>Cuanto cobrar por una pagina web freelance sin presupuestar a ciegas</h1>
            <p className="lead">
              Poner precio a una web no deberia depender solo de lo que cobra otra persona o de lo
              que el cliente espera oir. Si quieres presupuestar con mas criterio, necesitas bajar
              el proyecto a horas reales, buffer, alcance, costes directos y margen.
            </p>
            <div className="hero-badges" aria-label="Que cubre esta guia">
              <span className="hero-badge">Precio por proyecto</span>
              <span className="hero-badge">Webs cerradas</span>
              <span className="hero-badge">Margen defendible</span>
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
              <li>Que variables cambian de verdad el precio de una web freelance.</li>
              <li>Como separar una landing simple de una web corporativa mas compleja.</li>
              <li>Que errores hacen que acabes regalando horas o revisiones.</li>
              <li>Como usar la calculadora para sacar una cifra mas defendible.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>No hay una tarifa unica para todas las webs</h2>
          <p>
            Una pagina web puede significar cosas muy distintas: una landing con un formulario, una
            web corporativa con varias secciones, una web con blog, integraciones, contenidos,
            soporte o una fase inicial de discovery antes de tocar una sola linea de codigo.
          </p>
          <p>
            Por eso copiar un precio de mercado sin entender el alcance suele salir mal. Lo mas
            sano es partir de tu referencia economica y adaptarla al proyecto concreto.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> el precio de una web no deberia salir de una intuicion
            rapida. Deberia salir de una estimacion razonable del trabajo real y del margen que
            necesitas conservar.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Factores que cambian el precio">
          <article className="feature-card">
            <h2>1. Alcance y complejidad</h2>
            <p>
              No cuesta lo mismo una landing con un objetivo concreto que una web corporativa con
              multiples paginas, formularios, blog, CMS y entregables extra.
            </p>
          </article>

          <article className="feature-card">
            <h2>2. Revisiones y friccion</h2>
            <p>
              Parte del precio deberia cubrir reuniones, cambios, rondas de feedback y pequenos
              imprevistos. Si no lo contemplas, acabas absorbiendo tiempo no pagado.
            </p>
          </article>

          <article className="feature-card">
            <h2>3. Margen y soporte</h2>
            <p>
              Ademas del trabajo base, necesitas espacio para margen, compras, colaboraciones o
              post-lanzamiento si el proyecto lo requiere.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Errores tipicos al cobrar una pagina web freelance</h2>
          <ol className="article-list article-list-ordered">
            <li>Dar un precio demasiado rapido para no perder la oportunidad.</li>
            <li>Usar horas ideales y no horas facturables reales.</li>
            <li>No dejar margen para reuniones, cambios y revisiones.</li>
            <li>No separar el IVA del ingreso real del proyecto.</li>
            <li>Aceptar una rebaja sin tocar alcance, plazos o entregables.</li>
          </ol>
          <p>
            Si te suena alguno, esta guia te conviene junto con la de{' '}
            <Link href="/como-presupuestar-un-proyecto-freelance">
              como presupuestar un proyecto freelance
            </Link>
            , porque la logica de fondo es la misma: definir bien tu suelo antes de negociar.
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Como usar la calculadora para una web">
          <article className="feature-card">
            <h2>Referencia base por hora</h2>
            <p>
              Te da una base economica para no improvisar. Sirve como filtro para saber si la web
              cubre realmente el tiempo y el negocio que hay detras.
            </p>
          </article>

          <article className="feature-card">
            <h2>Precio minimo defendible</h2>
            <p>
              Es la cifra a partir de la cual dejar de bajar si no cambia el alcance. Debajo de ese
              punto, es facil que el proyecto deje de compensarte.
            </p>
          </article>

          <article className="feature-card">
            <h2>Presupuesto recomendado</h2>
            <p>
              Te da una zona mas sana para presentar la propuesta y absorber mejor la negociacion
              inicial sin quedarte sin margen a la primera objecion.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Lleva la teoria a tu caso real</h2>
          <p>
            Si estas presupuestando una landing, una web corporativa o una propuesta mas a medida,
            la forma mas util de bajar la duda a una cifra es probar el proyecto en la calculadora
            con tus horas, buffer, costes y margen.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular cuanto cobrar
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt" aria-labelledby="cuanto-cobrar-web-faq-title">
        <div className="container text-block">
          <h2 id="cuanto-cobrar-web-faq-title">
            Preguntas frecuentes sobre cuanto cobrar por una pagina web freelance
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
          <h2>Convierte la duda en un presupuesto defendible</h2>
          <p>
            Si ya sabes que una web no se deberia presupuestar a ojo, el siguiente paso util es
            bajar tu caso a numeros concretos y ver donde queda tu precio minimo y tu zona
            recomendada.
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
