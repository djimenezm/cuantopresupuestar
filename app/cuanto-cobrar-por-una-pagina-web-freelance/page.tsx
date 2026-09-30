import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/cuanto-cobrar-por-una-pagina-web-freelance';
const title = 'Cuánto cobrar por una página web freelance sin presupuestar a ciegas';
const description =
  'Guía práctica para calcular cuánto cobrar por una página web freelance según alcance, horas reales, revisiones, costes directos, margen e IVA aparte.';

const pageFaqItems = [
  {
    question: '¿Cuánto cobrar por una página web freelance?',
    answer:
      'No existe una cifra única. El precio depende del alcance, las horas reales, las revisiones, los costes directos y el margen qué necesitas proteger. Una landing sencilla y una web corporativa a medida no deberían salir del mismo cálculo.',
  },
  {
    question: '¿Qué debería incluir el presupuesto de una web freelance?',
    answer:
      'Como mínimo debería cubrir discovery, diseño o maquetación, desarrollo, reuniones, revisiones, costes externos, entregables, condiciones de alcance y el IVA cuando aplique.',
  },
  {
    question: '¿Es mejor cobrar una web por fases o con un precio cerrado?',
    answer:
      'Las dos opciones pueden funcionar. Un precio cerrado ayuda a vender mejor, pero suele ser más sano si tienes claro tu suelo y separas bien alcance, hitos y revisiones para no absorber cambios gratis.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'cuánto cobrar por una página web freelance',
    'precio página web freelance',
    'cuánto cobrar web freelance',
    'presupuesto web freelance',
    'cuánto presupuestar página web',
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
    dateModified: '2026-05-02',
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
            <span className="eyebrow">Guía práctica</span>
            <h1>Cuánto cobrar por una página web freelance sin presupuestar a ciegas</h1>
            <p className="lead">
              Poner precio a una web no debería depender solo de lo que cobra otra persona o de lo
              que el cliente espera oír. Si quieres presupuestar con más criterio, necesitas bajar
              el proyecto a horas reales, buffer, alcance, costes directos y margen.
            </p>
            <div className="hero-badges" aria-label="Qué cubre esta guía">
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
            <h2>Qué vas a aterrizar aquí</h2>
            <ul className="article-list">
              <li>Qué variables cambian de verdad el precio de una web freelance.</li>
              <li>Como separar una landing simple de una web corporativa más compleja.</li>
              <li>Qué errores hacen que acabes regalando horas o revisiones.</li>
              <li>Cómo usar la calculadora para sacar una cifra más defendible.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>No hay una tarifa única para todas las webs</h2>
          <p>
            Una página web puede significar cosas muy distintas: una landing con un formulario, una
            web corporativa con varias secciones, una web con blog, integraciones, contenidos,
            soporte o una fase inicial de discovery antes de tocar una sola línea de código.
          </p>
          <p>
            Por eso copiar un precio de mercado sin entender el alcance suele salir mal. Lo más
            sano es partir de tu referencia económica y adaptarla al proyecto concreto.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> el precio de una web no debería salir de una intuición
            rápida. Debería salir de una estimación razonable del trabajo real y del margen que
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
              múltiples páginas, formularios, blog, CMS y entregables extra.
            </p>
          </article>

          <article className="feature-card">
            <h2>2. Revisiones y fricción</h2>
            <p>
              Parte del precio debería cubrir reuniones, cambios, rondas de feedback y pequeños
              imprevistos. Si no lo contemplas, acabas absorbiendo tiempo no pagado.
            </p>
          </article>

          <article className="feature-card">
            <h2>3. Margen y soporte</h2>
            <p>
              Además del trabajo base, necesitas espacio para margen, compras, colaboraciones o
              post-lanzamiento si el proyecto lo requiere.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Errores típicos al cobrar una página web freelance</h2>
          <ol className="article-list article-list-ordered">
            <li>Dar un precio demasiado rápido para no perder la oportunidad.</li>
            <li>Usar horas ideales y no horas facturables reales.</li>
            <li>No dejar margen para reuniones, cambios y revisiones.</li>
            <li>No separar el IVA del ingreso real del proyecto.</li>
            <li>Aceptar una rebaja sin tocar alcance, plazos o entregables.</li>
          </ol>
          <p>
            Si te suena alguno, esta guía te conviene junto con la de{' '}
            <Link href="/como-presupuestar-un-proyecto-freelance">
              cómo presupuestar un proyecto freelance
            </Link>, porque la lógica de fondo es la misma: definir bien tu suelo antes de negociar.
            Si el encargo es una web de empresa con varias páginas, también puedes revisar{' '}
            <Link href="/cuanto-cobrar-web-corporativa-freelance">
              cuánto cobrar por una web corporativa freelance
            </Link>.
            Y si el cliente te pide una web profesional con más criterio de entrega, revisa{' '}
            <Link href="/precio-pagina-web-profesional-freelance">
              precio de una página web profesional freelance
            </Link>.
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Cómo usar la calculadora para una web">
          <article className="feature-card">
            <h2>Referencia base por hora</h2>
            <p>
              Te da una base económica para no improvisar. Sirve como filtro para saber si la web
              cubre realmente el tiempo y el negocio que hay detrás.
            </p>
          </article>

          <article className="feature-card">
            <h2>Precio mínimo defendible</h2>
            <p>
              Es la cifra a partir de la cual dejar de bajar si no cambia el alcance. Debajo de ese
              punto, es fácil que el proyecto deje de compensarte.
            </p>
          </article>

          <article className="feature-card">
            <h2>Presupuesto recomendado</h2>
            <p>
              Te da una zona más sana para presentar la propuesta y absorber mejor la negociación
              inicial sin quedarte sin margen a la primera objeción.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Lleva la teoría a tu caso real</h2>
          <p>
            Si estás presupuestando una landing, una web corporativa o una propuesta más a medida,
            la forma más útil de bajar la duda a una cifra es probar el proyecto en la calculadora
            con tus horas, buffer, costes y margen.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular cuánto cobrar
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt" aria-labelledby="cuanto-cobrar-web-faq-title">
        <div className="container text-block">
          <h2 id="cuanto-cobrar-web-faq-title">
            Preguntas frecuentes sobre cuánto cobrar por una página web freelance
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
            Si ya sabes que una web no se debería presupuestar a ojo, el siguiente paso útil es
            bajar tu caso a números concretos y ver dónde queda tu precio mínimo y tu zona
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
