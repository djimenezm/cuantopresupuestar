import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/precio-pagina-web-profesional-freelance';
const title = 'Precio de una página web profesional freelance';
const description =
  'Guía para calcular el precio de una página web profesional freelance con alcance, contenidos, revisiones, integraciones, margen e IVA aparte.';

const pageFaqItems = [
  {
    question: '¿Cuánto cuesta una página web profesional freelance?',
    answer:
      'No hay una cifra universal. Depende del alcance, número de páginas, contenidos, diseño, desarrollo, reuniones, revisiones, integraciones, soporte y margen. Lo importante es calcular un suelo interno antes de dar un precio cerrado.',
  },
  {
    question: '¿Qué diferencia hay entre una web barata y una web profesional?',
    answer:
      'Una web profesional suele incluir estructura, criterio de conversión, versión móvil, pruebas, formularios, legalidad básica, medición y un proceso de entrega más claro. No debería cobrarse como una simple instalación rápida.',
  },
  {
    question: '¿Cómo evito que el cliente pida más sin pagar más?',
    answer:
      'Define alcance, número de páginas, revisiones, entregables, extras y soporte posterior. Si el cliente quiere bajar precio, reduce alcance antes de reducir margen.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'precio página web profesional freelance',
    'cuánto cobrar página web profesional',
    'precio web profesional freelance',
    'presupuesto página web profesional',
    'cuánto cuesta una web profesional freelance',
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
            <h1>Precio de una página web profesional freelance sin regalar alcance</h1>
            <p className="lead">
              Una página web profesional no debería cobrarse como una tarea rápida si incluye
              estructura, contenidos, formularios, versiones responsive, revisiones, pruebas y
              soporte de lanzamiento. Para poner precio con criterio, primero hay que separar el
              alcance real del proyecto.
            </p>
            <div className="hero-badges" aria-label="Qué cubre esta guía">
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
                Ver guía general
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Cuándo usar esta guía</h2>
            <ul className="article-list">
              <li>El cliente pide una web profesional, no una landing simple.</li>
              <li>Hay varias páginas, contenidos, formularios o integraciones.</li>
              <li>Quieres separar alcance base, extras, revisiones y soporte.</li>
              <li>Necesitas explicar el precio sin que parezca una cifra inventada.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Una web profesional no es solo montar páginas</h2>
          <p>
            El precio cambia cuando hay que ordenar el mensaje, decidir estructura, preparar
            secciones, adaptar la versión móvil, configurar formularios, probar enlaces, revisar
            rendimiento, coordinar contenido y entregar una web lista para usar. Todo eso consume
            tiempo aunque no siempre se vea en el resultado final.
          </p>
          <p>
            Si solo cobras por número de páginas, es fácil que dejes fuera reuniones, revisiones,
            cambios de textos, pruebas, integraciones o soporte tras publicar. Por eso conviene
            construir el precio desde el alcance, no desde una cifra de mercado.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> el cliente ve una web; tu presupuesto debe ver fases,
            entregables, riesgo, margen y límites.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Partidas de una web profesional">
          <article className="feature-card">
            <h2>1. Estructura y contenido</h2>
            <p>
              Inicio, servicios, sobre nosotros, contacto, casos, legales o blog no pesan igual. Si
              también ordenas textos y mensajes, esa parte debe aparecer en el precio.
            </p>
          </article>

          <article className="feature-card">
            <h2>2. Diseño, desarrollo y pruebas</h2>
            <p>
              Maquetación, responsive, formularios, despliegue, rendimiento y QA tienen coste. No
              los escondas dentro de una partida genérica si condicionan el resultado.
            </p>
          </article>

          <article className="feature-card">
            <h2>3. Revisiones y soporte</h2>
            <p>
              Rondas de feedback, cambios menores, correcciones y soporte de lanzamiento deben
              tener límite. Si no, el proyecto cerrado se convierte en mantenimiento gratis.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Fórmula práctica para poner precio</h2>
            <ol className="article-list article-list-ordered">
              <li>Define objetivo de la web, público, páginas y entregables.</li>
              <li>Separa fases: discovery, estructura, diseño, desarrollo, pruebas y entrega.</li>
              <li>Estima reuniones, gestión, revisiones y comunicación con el cliente.</li>
              <li>Suma costes directos: licencias, plugins, imágenes, dominio o herramientas.</li>
              <li>Añade buffer para cambios razonables y margen profesional.</li>
              <li>Deja IVA, mantenimiento, SEO avanzado y extras fuera del precio base si aplica.</li>
            </ol>
            <p>
              Si el proyecto es una web de empresa con varias secciones, también te conviene revisar{' '}
              <Link href="/cuanto-cobrar-web-corporativa-freelance">
                cuánto cobrar por una web corporativa freelance
              </Link>. Si hay desarrollo más técnico, mira la guía de{' '}
              <Link href="/presupuesto-desarrollo-web-freelance">
                presupuesto de desarrollo web freelance
              </Link>.
            </p>
          </div>

          <aside className="feature-card article-summary">
            <h2>No lo incluyas gratis</h2>
            <ul className="article-list">
              <li>Copywriting completo si el cliente no aporta textos.</li>
              <li>SEO avanzado o investigación profunda de palabras clave.</li>
              <li>Integraciones con CRM, pagos, calendarios o automatizaciones.</li>
              <li>Migraciones de contenido o carga masiva de páginas.</li>
              <li>Mantenimiento mensual o cambios posteriores al lanzamiento.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Cómo defender el precio ante el cliente</h2>
          <p>
            No presentes solo el total. Presenta que se compra: estructura, páginas, entregables,
            revisiones, formulario, versión móvil, pruebas, despliegue y soporte inicial. Cuando el
            cliente entiende las piezas, el precio deja de parecer una cifra arbitraria.
          </p>
          <p>
            Si pide bajar precio, no recortes tu margen a pelo. Reduce páginas, rondas de revisión,
            copy, integraciones, urgencia o soporte posterior. Así la negociación cambia alcance,
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
            reuniones, revisiones, contenido, QA, soporte o gestión.
          </p>
          <p>
            La calculadora no decide por ti, pero te da una referencia para no negociar desde el
            miedo ni aceptar un proyecto profesional como si fuera una tarea rápida.
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
            title="Llévate el kit para preparar tu presupuesto web"
            description="Recibe una plantilla, una estructura de propuesta y una lista de comprobación para revisar alcance, revisiones, extras y margen antes de enviar una web profesional."
            buttonLabel="Quiero el kit web"
          />
        </div>
      </section>

      <section className="section" aria-labelledby="precio-web-profesional-faq-title">
        <div className="container text-block">
          <h2 id="precio-web-profesional-faq-title">
            Preguntas frecuentes sobre precio de página web profesional freelance
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
            Antes de enviar una propuesta, calcula tu mínimo, tu recomendado y tus extras. Así
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
