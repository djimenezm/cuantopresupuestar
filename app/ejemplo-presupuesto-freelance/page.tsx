import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { formatCurrency, formatNumber } from '@/lib/format';
import {
  expandedProjectExampleInput,
  expandedProjectExampleQuote,
  projectExampleInput,
  projectExampleQuote,
} from '@/lib/projectExample';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/ejemplo-presupuesto-freelance';
const title = 'Ejemplo de presupuesto freelance para presentar mejor tus precios';
const description =
  'Ejemplo práctico de presupuesto freelance con alcance, entregables, revisiones, precio, pagos, exclusiones e IVA para defender mejor una propuesta.';

const pageFaqItems = [
  {
    question: '¿Qué debe tener un ejemplo de presupuesto freelance?',
    answer:
      'Debe incluir contexto, alcance, entregables, precio, forma de pago, revisiones, plazos, exclusiones, validez de la propuesta e IVA cuando corresponda.',
  },
  {
    question: '¿Puedo copiar un ejemplo de presupuesto tal cual?',
    answer:
      'Puedes usarlo como estructura, pero no conviene copiarlo sin adaptar alcance, horas, riesgos, condiciones y precio a tu proyecto concreto.',
  },
  {
    question: '¿El ejemplo sirve para cualquier servicio freelance?',
    answer:
      'Sirve como base para diseño, desarrollo, marketing, consultoría o servicios profesionales, siempre que ajustes entregables, tiempos, revisiones y límites.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'ejemplo presupuesto freelance',
    'presupuesto freelance ejemplo',
    'modelo presupuesto freelance',
    'ejemplo propuesta freelance',
    'cómo presentar un presupuesto freelance',
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

export default function EjemploPresupuestoFreelancePage() {
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
    dateModified: '2026-10-01',
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
        id="ejemplo-presupuesto-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="ejemplo-presupuesto-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="ejemplo-presupuesto-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Ejemplo práctico</span>
            <h1>Ejemplo de presupuesto freelance para presentar mejor tus precios</h1>
            <p className="lead">
              Un buen presupuesto freelance no es solo una cifra. Es una forma de explicar qué
              problema resuelves, qué entregas, dónde están los límites y por qué el precio tiene
              sentido.
            </p>
            <div className="hero-badges" aria-label="Qué cubre esta guía">
              <span className="hero-badge">Modelo adaptable</span>
              <span className="hero-badge">Alcance claro</span>
              <span className="hero-badge">Precio defendible</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular mi presupuesto
              </Link>
              <Link href="/kit-presupuesto-freelance" className="primary-button">
                Ver kit de presupuesto
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Qué vas a encontrar</h2>
            <ul className="article-list">
              <li>Una estructura de presupuesto lista para adaptar.</li>
              <li>Un ejemplo de alcance, entregables, revisiones y exclusiones.</li>
              <li>Cómo separar precio, pagos, IVA y condiciones.</li>
              <li>Enlaces para calcular la cifra antes de enviarla.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Antes del ejemplo: el presupuesto debe salir de una cifra sana</h2>
          <p>
            El ejemplo te ayuda a presentar mejor, pero no arregla un precio mal calculado. Antes
            de redactar la propuesta conviene estimar horas, costes, revisiones, margen y reserva
            fiscal para no acabar defendiendo una cifra que no te sostiene.
          </p>
          <p>
            Si todavía no tienes esa base, empieza por la{' '}
            <Link href="/#calculadora">calculadora de presupuesto freelance</Link> y vuelve a esta
            estructura cuando tengas un rango mínimo y una cifra recomendada.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> primero calcula una cifra defendible. Después conviértela
            en un presupuesto claro que el cliente pueda entender.
          </div>
          <h3>Una web corporativa de 32 horas, paso a paso</h3>
          <p>
            Supongamos un objetivo neto de {formatCurrency(projectExampleInput.targetMonthlyNet)}
            {' '}al mes, {formatCurrency(projectExampleInput.monthlyFixedCosts)} de costes fijos y
            {' '}{projectExampleInput.billableHoursPerMonth} horas facturables. Para esta web estimamos
            {' '}{projectExampleInput.projectHours} horas de trabajo, una reserva del
            {' '}{projectExampleInput.revisionBufferPercent}% para revisiones y
            {' '}{formatCurrency(projectExampleInput.directProjectCosts)} de costes directos.
          </p>
          <dl className="worked-example">
            <div><dt>Tarifa interna por hora</dt><dd>{formatCurrency(projectExampleQuote.baseHourlyRate)}</dd></div>
            <div><dt>Horas con reserva para revisiones</dt><dd>{formatNumber(projectExampleQuote.bufferedProjectHours)} h</dd></div>
            <div><dt>Coste mínimo del proyecto</dt><dd>{formatCurrency(projectExampleQuote.projectFloorPrice)}</dd></div>
            <div><dt>Presupuesto con recargo del {projectExampleInput.profitMarginPercent}% sobre el mínimo</dt><dd>{formatCurrency(projectExampleQuote.recommendedProjectBudget)}</dd></div>
            <div><dt>IVA orientativo aparte</dt><dd>{formatCurrency(projectExampleQuote.vatAmount)}</dd></div>
          </dl>
          <p>
            La reserva fiscal del {projectExampleInput.taxReservePercent}% solo sirve aquí para
            estimar la tarifa interna; no sustituye un cálculo tributario personalizado. El precio
            del presupuesto se presenta sin IVA y los importes están redondeados a céntimos. El
            recargo del {projectExampleInput.profitMarginPercent}% se aplica al precio mínimo: no
            equivale a un margen del {projectExampleInput.profitMarginPercent}% sobre el precio de
            venta.
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Ejemplo de estructura para un presupuesto freelance</h2>
            <p>
              Este modelo está pensado para proyectos cerrados: desarrollo web, diseño, marketing,
              consultoría, automatizaciones o cualquier servicio donde necesites explicar alcance y
              condiciones antes de cobrar.
            </p>
            <ol className="article-list article-list-ordered">
              <li>Nombre del cliente, proyecto y fecha de la propuesta.</li>
              <li>Resumen del objetivo del proyecto en tres o cuatro líneas.</li>
              <li>Alcance incluido y entregables concretos.</li>
              <li>Fases de trabajo y plazos estimados.</li>
              <li>Revisiones incluidas y cómo se valoran revisiones extra.</li>
              <li>Precio del proyecto, forma de pago e IVA aparte si aplica.</li>
              <li>Exclusiones para evitar trabajo adicional no pactado.</li>
              <li>Validez de la propuesta y siguiente paso para aprobarla.</li>
            </ol>
          </div>

          <aside className="feature-card article-summary">
            <h2>Bloque de ejemplo</h2>
            <p>
              Presupuesto para diseño y desarrollo de página web corporativa. Incluye estructura,
              diseño responsive, maquetación, formulario de contacto, configuración básica SEO y dos
              rondas de revisión. En este ejemplo se estiman {projectExampleInput.projectHours} horas
              de trabajo antes de la reserva para revisiones.
            </p>
            <p>
              No incluye redacción completa de textos, sesiones de foto, campañas, mantenimiento
              mensual ni nuevas secciones fuera del alcance inicial.
            </p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Presupuesto de muestra: una web corporativa acotada</h2>
          <p>
            Este es un caso ficticio, no una oferta comercial ni un precio medio del sector. El
            cliente aporta textos, imágenes y acceso al alojamiento. La propuesta cubre hasta
            tres páginas construidas con una misma línea visual, diseño adaptable a móvil,
            formulario de contacto, metadatos básicos y publicación.
          </p>
          <h3>De dónde salen las {projectExampleInput.projectHours} horas</h3>
          <dl className="worked-example">
            <div><dt>Reunión, objetivos y estructura</dt><dd>5 h</dd></div>
            <div><dt>Diseño de la línea visual y plantillas</dt><dd>9 h</dd></div>
            <div><dt>Desarrollo de las páginas y formulario</dt><dd>12 h</dd></div>
            <div><dt>Pruebas, ajustes y publicación</dt><dd>6 h</dd></div>
            <div><dt>Reserva adicional para revisiones</dt><dd>{formatNumber(projectExampleQuote.bufferedProjectHours - projectExampleInput.projectHours)} h</dd></div>
          </dl>
          <p>
            Se incluyen dos rondas de ajustes sobre las páginas pactadas. Los{' '}
            {formatCurrency(projectExampleInput.directProjectCosts)} de costes directos representan
            una licencia o recurso específico necesario para este ejemplo. No se incluyen redacción,
            fotografía, contenido legal, nuevas integraciones, alojamiento ni mantenimiento.
          </p>
          <h3>Precio y condiciones que recibiría el cliente</h3>
          <p>
            Precio cerrado de {formatCurrency(projectExampleQuote.recommendedProjectBudget)} sin
            IVA para ese alcance, con un anticipo del 40%, un 40% al aprobar la versión de prueba y
            el 20% restante antes de la publicación. El calendario de entrega se pactaría al
            recibir todos los materiales; no empieza a contar mientras falten textos o accesos.
          </p>
          <dl className="worked-example">
            <div><dt>Inicio (40%)</dt><dd>{formatCurrency(projectExampleQuote.recommendedProjectBudget * 0.4)}</dd></div>
            <div><dt>Versión de prueba (40%)</dt><dd>{formatCurrency(projectExampleQuote.recommendedProjectBudget * 0.4)}</dd></div>
            <div><dt>Antes de publicar (20%)</dt><dd>{formatCurrency(projectExampleQuote.recommendedProjectBudget * 0.2)}</dd></div>
            <div><dt>Total sin IVA</dt><dd>{formatCurrency(projectExampleQuote.recommendedProjectBudget)}</dd></div>
          </dl>
          <p>
            Si el cliente pide dos páginas más y el trabajo pasa de {projectExampleInput.projectHours}
            {' '}a {expandedProjectExampleInput.projectHours} horas, con el resto de hipótesis
            intactas, la calculadora devuelve{' '}
            <strong>{formatCurrency(expandedProjectExampleQuote.recommendedProjectBudget)}</strong>{' '}
            sin IVA. La diferencia de{' '}
            {formatCurrency(expandedProjectExampleQuote.recommendedProjectBudget - projectExampleQuote.recommendedProjectBudget)}
            {' '}no se absorbe en las revisiones: requiere una ampliación aprobada antes de hacerla.
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Texto de ejemplo para presentar el precio</h2>
          <div className="disclaimer-box">
            <p>
              El importe del proyecto es de {formatCurrency(projectExampleQuote.recommendedProjectBudget)}
              {' '}más IVA, si corresponde. Este precio incluye las fases,
              entregables y revisiones descritas en la propuesta. Cualquier cambio de alcance,
              nueva sección o revisión adicional se presupuestará aparte antes de realizarse.
            </p>
          </div>
          <p>
            Ese bloque funciona porque separa tres ideas: precio, alcance y condiciones. No deja el
            precio flotando solo, y tampoco promete trabajo ilimitado por una cifra cerrada.
          </p>
          <p>
            Si quieres una estructura más completa para convertir este ejemplo en documento, puedes
            apoyarte en la{' '}
            <Link href="/kit-presupuesto-freelance">plantilla de presupuesto freelance</Link>.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Errores habituales al copiar ejemplos de presupuesto</h2>
          <ol className="article-list article-list-ordered">
            <li>Copiar una cifra sin recalcular horas, margen y costes propios.</li>
            <li>No adaptar entregables al proyecto real del cliente.</li>
            <li>Olvidar exclusiones y dejar abierto el alcance.</li>
            <li>No separar IVA, forma de pago y validez de la propuesta.</li>
            <li>Enviar el presupuesto sin siguiente paso claro.</li>
          </ol>
          <p>
            Si el proyecto es web, también te puede interesar la guía sobre{' '}
            <Link href="/presupuesto-desarrollo-web-freelance">
              presupuesto de desarrollo web freelance
            </Link>{' '}
            o la guía de{' '}
            <Link href="/cuanto-cobrar-por-una-pagina-web-freelance">
              cuánto cobrar por una página web freelance
            </Link>.
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <LeadMagnetForm
            source="ejemplo-presupuesto-freelance"
            title="Te enviamos el kit con ejemplo, plantilla y lista de comprobación"
            description="Accede al kit con plantilla de presupuesto, estructura de propuesta comercial y lista de comprobación para revisar mejor una oferta antes de enviarla."
            buttonLabel="Quiero el kit"
          />
        </div>
      </section>

      <section className="section" id="faq-ejemplo-presupuesto">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre ejemplos de presupuesto freelance</h2>
          {pageFaqItems.map((item) => (
            <article className="disclaimer-box" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
