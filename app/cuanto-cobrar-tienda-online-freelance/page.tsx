import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/cuanto-cobrar-tienda-online-freelance';
const title = 'Cuánto cobrar por una tienda online freelance';
const description =
  'Guía para calcular cuánto cobrar por una tienda online freelance según catálogo, pagos, envíos, integraciones, revisiones, margen, soporte e IVA aparte.';

const pageFaqItems = [
  {
    question: '¿Cuánto cobrar por una tienda online freelance?',
    answer:
      'Depende del catálogo, la plataforma, pasarelas de pago, métodos de envío, integraciones, diseño, contenidos, pruebas, formación, revisiones y soporte posterior. Conviene calcular primero un mínimo interno y después separar extras.',
  },
  {
    question: '¿Una tienda online se cobra igual que una web corporativa?',
    answer:
      'No. Una tienda online suele tener más riesgo técnico y comercial porque incluye pagos, pedidos, catálogo, emails transaccionales, impuestos, envíos y posibles integraciones. Ese esfuerzo debe aparecer en horas, buffer y margen.',
  },
  {
    question: '¿Qué extras conviene dejar fuera del presupuesto inicial?',
    answer:
      'Carga masiva de productos, integraciones avanzadas, migraciones, SEO ecommerce, automatizaciones, mantenimiento mensual, fotografía, copywriting extenso y optimización de conversión suelen presupuestarse aparte si no están definidos desde el inicio.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'cuánto cobrar tienda online freelance',
    'precio tienda online freelance',
    'presupuesto tienda online freelance',
    'cuánto cobrar ecommerce freelance',
    'presupuesto ecommerce freelance',
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

export default function CuantoCobrarTiendaOnlineFreelancePage() {
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
    datePublished: '2026-05-10',
    dateModified: '2026-05-10',
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
        id="tienda-online-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="tienda-online-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="tienda-online-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Ecommerce freelance</span>
            <h1>Cuánto cobrar por una tienda online freelance</h1>
            <p className="lead">
              Una tienda online no es una web con carrito pegado al final. Tiene catálogo, pagos,
              envíos, emails, impuestos, pruebas y una responsabilidad comercial mayor. Si la
              presupuestas como una web normal, es fácil quedarte corto.
            </p>
            <div className="hero-badges" aria-label="Qué cubre esta guía">
              <span className="hero-badge">Tienda online</span>
              <span className="hero-badge">Pagos y envíos</span>
              <span className="hero-badge">Extras aparte</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular tienda online
              </Link>
              <Link href="/presupuesto-desarrollo-web-freelance" className="primary-button">
                Ver desarrollo web
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Cuándo usar esta guía</h2>
            <ul className="article-list">
              <li>El cliente quiere vender productos o servicios desde la web.</li>
              <li>Hay pasarela de pago, envíos, catálogo o cuentas de cliente.</li>
              <li>Necesitas separar construcción, contenidos, integraciones y soporte.</li>
              <li>Quieres evitar que el presupuesto incluya mantenimiento sin nombrarlo.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>La tienda online tiene más capas que una web corporativa</h2>
          <p>
            El precio no depende solo del número de páginas. En ecommerce pesan el catálogo, los
            productos variables, impuestos, cupones, métodos de envío, pasarelas, emails, pruebas de
            compra, analítica y pequeños ajustes que aparecen durante la puesta en marcha.
          </p>
          <p>
            Por eso conviene separar el presupuesto inicial del soporte posterior. Construir la
            tienda es un proyecto cerrado; mantenerla, revisar incidencias y hacer mejoras
            recurrentes debería ser una cuota aparte.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> si la tienda impacta en ventas, el presupuesto debe incluir
            más pruebas, más buffer y límites más claros que una web informativa.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Factores de precio de una tienda online">
          <article className="feature-card">
            <h2>Catálogo y contenidos</h2>
            <p>
              No es lo mismo configurar diez productos simples que preparar categorías, atributos,
              variaciones, fichas, imágenes, textos, filtros y carga inicial de catálogo.
            </p>
          </article>

          <article className="feature-card">
            <h2>Pagos, envíos e impuestos</h2>
            <p>
              Pasarela de pago, reglas de envío, zonas, impuestos, facturas, emails y pruebas de
              checkout necesitan tiempo propio. Si no lo incluyes, suele salir como urgencia.
            </p>
          </article>

          <article className="feature-card">
            <h2>Integraciones y lanzamiento</h2>
            <p>
              CRM, analytics, píxeles, email marketing, ERP, marketplaces o herramientas externas
              cambian el riesgo. Cada integración debe tener alcance, pruebas y responsabilidad
              definidos.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Fórmula práctica para presupuestar un ecommerce</h2>
            <ol className="article-list article-list-ordered">
              <li>Define plataforma, plantilla o desarrollo a medida.</li>
              <li>Cuenta páginas, categorías, productos iniciales y tipos de producto.</li>
              <li>Separa configuración de pagos, envíos, impuestos, emails y cuentas.</li>
              <li>Estima reuniones, pruebas de compra, correcciones y formación al cliente.</li>
              <li>Incluye licencias, plugins, apps, imágenes, herramientas y otros costes directos.</li>
              <li>Añade buffer por revisiones, margen profesional e IVA aparte cuando corresponda.</li>
            </ol>
            <p>
              Después usa la calculadora para convertir horas, costes y margen en un suelo interno.
              Ese suelo no tiene por qué ser el precio final, pero te ayuda a no negociar desde una
              cifra demasiado baja.
            </p>
          </div>

          <aside className="feature-card article-summary">
            <h2>Extras habituales</h2>
            <ul className="article-list">
              <li>Migración desde otra tienda o importación masiva de productos.</li>
              <li>Fotografía, copywriting o descripciones SEO del catálogo.</li>
              <li>Integraciones con ERP, CRM, marketplaces o sistemas de stock.</li>
              <li>Optimización de conversión, analítica avanzada o campañas.</li>
              <li>Mantenimiento mensual, soporte o bolsa de horas tras publicar.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Cómo presentar el precio sin meter soporte gratis</h2>
          <p>
            En la propuesta conviene separar tres bloques: construcción de la tienda, puesta en
            marcha y soporte posterior. Si mezclas todo en un único precio, el cliente puede asumir
            que cualquier incidencia, cambio de producto o ajuste comercial está incluido durante
            meses.
          </p>
          <p>
            Puedes incluir un período corto de garantía para errores del trabajo entregado, pero
            conviene separar mantenimiento, nuevas mejoras, carga de productos y cambios de alcance.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Usar calculadora
            </Link>
            <Link href="/condiciones-pago-presupuesto-freelance" className="primary-button">
              Ver condiciones de pago
            </Link>
            <Link href="/presupuesto-por-fases-freelance" className="primary-button">
              Dividir por fases
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Conecta el proyecto con mantenimiento y landings</h2>
          <p>
            Si después de publicar la tienda el cliente quiere soporte recurrente, separa esa cuota
            del presupuesto inicial y revisa{' '}
            <a href="https://www.mantenimientowebmensual.es/mantenimiento-web-para-ecommerce?utm_source=cuantopresupuestar&utm_medium=ecommerce-guide&utm_campaign=contextual_link">
              mantenimiento web para ecommerce
            </a>. Así no conviertes el proyecto cerrado en disponibilidad indefinida.
          </p>
          <p>
            Si la tienda necesita una página de captación para anuncios o lanzamiento, puedes
            contrastar esa pieza con{' '}
            <a href="https://www.cuantocobrarlandingpage.es/landing-page-para-google-ads?utm_source=cuantopresupuestar&utm_medium=ecommerce-guide&utm_campaign=contextual_link">
              landing page para Google Ads
            </a>.
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <LeadMagnetForm
            source="cuanto-cobrar-tienda-online-freelance"
            title="Llévate el kit para preparar tu presupuesto ecommerce"
            description="Recibe una plantilla, una estructura de propuesta y una lista de comprobación para revisar alcance, revisiones, extras y margen antes de enviar una tienda online."
            buttonLabel="Quiero el kit ecommerce"
          />
        </div>
      </section>

      <section className="section" aria-labelledby="tienda-online-faq-title">
        <div className="container text-block">
          <h2 id="tienda-online-faq-title">
            Preguntas frecuentes sobre cuánto cobrar por una tienda online
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

      <Footer />
    </main>
  );
}
