import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/precio-pagina-web-profesional-freelance';
const title = 'Precio de una pagina web profesional freelance';
const description =
  'Guia para calcular el precio de una pagina web profesional freelance con alcance, contenidos, revisiones, integraciones, margen e IVA aparte.';

const pageFaqItems = [
  {
    question: 'Cuanto cuesta una pagina web profesional freelance?',
    answer:
      'No hay una cifra universal. Depende del alcance, numero de paginas, contenidos, diseno, desarrollo, reuniones, revisiones, integraciones, soporte y margen. Lo importante es calcular un suelo interno antes de dar un precio cerrado.',
  },
  {
    question: 'Que diferencia hay entre una web barata y una web profesional?',
    answer:
      'Una web profesional suele incluir estructura, criterio de conversion, version movil, pruebas, formularios, legalidad basica, medicion y un proceso de entrega mas claro. No deberia cobrarse como una simple instalacion rapida.',
  },
  {
    question: 'Como evito que el cliente pida mas sin pagar mas?',
    answer:
      'Define alcance, numero de paginas, revisiones, entregables, extras y soporte posterior. Si el cliente quiere bajar precio, reduce alcance antes de reducir margen.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'precio pagina web profesional freelance',
    'cuanto cobrar pagina web profesional',
    'precio web profesional freelance',
    'presupuesto pagina web profesional',
    'cuanto cuesta una web profesional freelance',
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

export default function PrecioPaginaWebProfesionalFreelancePage() {
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
    datePublished: '2026-05-02',
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
        id="precio-web-profesional-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="precio-web-profesional-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="precio-web-profesional-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Precio web profesional</span>
            <h1>Precio de una pagina web profesional freelance sin regalar alcance</h1>
            <p className="lead">
              Una pagina web profesional no deberia cobrarse como una tarea rapida si incluye
              estructura, contenidos, formularios, versiones responsive, revisiones, pruebas y
              soporte de lanzamiento. Para poner precio con criterio, primero hay que separar el
              alcance real del proyecto.
            </p>
            <div className="hero-badges" aria-label="Que cubre esta guia">
              <span className="hero-badge">Web profesional</span>
              <span className="hero-badge">Precio cerrado</span>
              <span className="hero-badge">Alcance defendible</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular precio web
              </Link>
              <Link
                href="/cuanto-cobrar-por-una-pagina-web-freelance"
                className="primary-button"
              >
                Ver guia general
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Cuando usar esta guia</h2>
            <ul className="article-list">
              <li>El cliente pide una web profesional, no una landing simple.</li>
              <li>Hay varias paginas, contenidos, formularios o integraciones.</li>
              <li>Quieres separar alcance base, extras, revisiones y soporte.</li>
              <li>Necesitas explicar el precio sin que parezca una cifra inventada.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Una web profesional no es solo montar paginas</h2>
          <p>
            El precio cambia cuando hay que ordenar el mensaje, decidir estructura, preparar
            secciones, adaptar la version movil, configurar formularios, probar enlaces, revisar
            rendimiento, coordinar contenido y entregar una web lista para usar. Todo eso consume
            tiempo aunque no siempre se vea en el resultado final.
          </p>
          <p>
            Si solo cobras por numero de paginas, es facil que dejes fuera reuniones, revisiones,
            cambios de textos, pruebas, integraciones o soporte tras publicar. Por eso conviene
            construir el precio desde el alcance, no desde una cifra de mercado.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> el cliente ve una web; tu presupuesto debe ver fases,
            entregables, riesgo, margen y limites.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Partidas de una web profesional">
          <article className="feature-card">
            <h2>1. Estructura y contenido</h2>
            <p>
              Inicio, servicios, sobre nosotros, contacto, casos, legales o blog no pesan igual. Si
              tambien ordenas textos y mensajes, esa parte debe aparecer en el precio.
            </p>
          </article>

          <article className="feature-card">
            <h2>2. Diseno, desarrollo y pruebas</h2>
            <p>
              Maquetacion, responsive, formularios, despliegue, rendimiento y QA tienen coste. No
              los escondas dentro de una partida generica si condicionan el resultado.
            </p>
          </article>

          <article className="feature-card">
            <h2>3. Revisiones y soporte</h2>
            <p>
              Rondas de feedback, cambios menores, correcciones y soporte de lanzamiento deben
              tener limite. Si no, el proyecto cerrado se convierte en mantenimiento gratis.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Formula practica para poner precio</h2>
            <ol className="article-list article-list-ordered">
              <li>Define objetivo de la web, publico, paginas y entregables.</li>
              <li>Separa fases: discovery, estructura, diseno, desarrollo, pruebas y entrega.</li>
              <li>Estima reuniones, gestion, revisiones y comunicacion con el cliente.</li>
              <li>Suma costes directos: licencias, plugins, imagenes, dominio o herramientas.</li>
              <li>Anade buffer para cambios razonables y margen profesional.</li>
              <li>Deja IVA, mantenimiento, SEO avanzado y extras fuera del precio base si aplica.</li>
            </ol>
            <p>
              Si el proyecto es una web de empresa con varias secciones, tambien te conviene revisar{' '}
              <Link href="/cuanto-cobrar-web-corporativa-freelance">
                cuanto cobrar por una web corporativa freelance
              </Link>
              . Si hay desarrollo mas tecnico, mira la guia de{' '}
              <Link href="/presupuesto-desarrollo-web-freelance">
                presupuesto de desarrollo web freelance
              </Link>
              .
            </p>
          </div>

          <aside className="feature-card article-summary">
            <h2>No lo incluyas gratis</h2>
            <ul className="article-list">
              <li>Copywriting completo si el cliente no aporta textos.</li>
              <li>SEO avanzado o investigacion profunda de palabras clave.</li>
              <li>Integraciones con CRM, pagos, calendarios o automatizaciones.</li>
              <li>Migraciones de contenido o carga masiva de paginas.</li>
              <li>Mantenimiento mensual o cambios posteriores al lanzamiento.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Como defender el precio ante el cliente</h2>
          <p>
            No presentes solo el total. Presenta que se compra: estructura, paginas, entregables,
            revisiones, formulario, version movil, pruebas, despliegue y soporte inicial. Cuando el
            cliente entiende las piezas, el precio deja de parecer una cifra arbitraria.
          </p>
          <p>
            Si pide bajar precio, no recortes tu margen a pelo. Reduce paginas, rondas de revision,
            copy, integraciones, urgencia o soporte posterior. Asi la negociacion cambia alcance,
            no solo tu rentabilidad.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular mi precio
            </Link>
            <Link href="/como-hacer-una-propuesta-comercial" className="primary-button">
              Mejorar la propuesta
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Usa la calculadora para validar si el precio respira</h2>
          <p>
            Introduce tus horas estimadas, buffer, costes directos y margen. Si el resultado queda
            lejos de la cifra que pensabas dar, probablemente estabas olvidando trabajo invisible:
            reuniones, revisiones, contenido, QA, soporte o gestion.
          </p>
          <p>
            La calculadora no decide por ti, pero te da una referencia para no negociar desde el
            miedo ni aceptar un proyecto profesional como si fuera una tarea rapida.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Ir a la calculadora
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <LeadMagnetForm
            source="precio-pagina-web-profesional-freelance"
            title="Llevate el kit para preparar tu presupuesto web"
            description="Recibe una plantilla, una estructura de propuesta y un checklist para revisar alcance, revisiones, extras y margen antes de enviar una web profesional."
            buttonLabel="Quiero el kit web"
          />
        </div>
      </section>

      <section className="section" aria-labelledby="precio-web-profesional-faq-title">
        <div className="container text-block">
          <h2 id="precio-web-profesional-faq-title">
            Preguntas frecuentes sobre precio de pagina web profesional freelance
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
          <h2>Baja tu web profesional a una cifra concreta</h2>
          <p>
            Antes de enviar una propuesta, calcula tu minimo, tu recomendado y tus extras. Asi
            puedes defender el precio sin depender de una cifra redonda o de lo que el cliente diga
            que esperaba pagar.
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
