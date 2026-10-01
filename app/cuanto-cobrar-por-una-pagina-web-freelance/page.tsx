import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { calculateProjectQuote } from '@/lib/calculator';
import { formatCurrency, formatNumber } from '@/lib/format';
import {
  expandedProjectExampleInput,
  expandedProjectExampleQuote,
  projectExampleInput,
  projectExampleQuote,
} from '@/lib/projectExample';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/cuanto-cobrar-por-una-pagina-web-freelance';
const title = 'Cuánto cobrar por una página web freelance: tres casos';
const description =
  'Compara tres encargos web con horas, costes y presupuestos calculados. Identifica qué entra en cada alcance antes de dar un precio freelance.';

const scenarios = [
  {
    name: 'Landing de una página',
    scope: 'Una página, formulario y contenido entregado por el cliente; sin integraciones a medida.',
    projectHours: 18,
    directProjectCosts: 30,
    href: 'https://www.cuantocobrarlandingpage.es/',
    linkText: 'Estimar una landing con más detalle',
  },
  {
    name: 'Web corporativa pequeña',
    scope: 'Tres páginas, formulario, diseño adaptable y dos rondas de revisión.',
    projectHours: projectExampleInput.projectHours,
    directProjectCosts: projectExampleInput.directProjectCosts,
    href: '/cuanto-cobrar-web-corporativa-freelance',
    linkText: 'Delimitar una web corporativa',
  },
  {
    name: 'Tienda con catálogo preparado',
    scope: 'Catálogo facilitado, pago y envío estándar; sin migración ni integraciones propias.',
    projectHours: 70,
    directProjectCosts: 180,
    href: '/cuanto-cobrar-tienda-online-freelance',
    linkText: 'Revisar el alcance de una tienda',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: route },
  openGraph: {
    title: `${title} | ${siteConfig.name}`,
    description,
    url: route,
    type: 'article',
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
    author: { '@type': 'Organization', name: siteConfig.name },
    publisher: { '@type': 'Organization', name: siteConfig.name },
    datePublished: '2026-04-23',
    dateModified: '2026-10-02',
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: new URL('/', siteUrl).toString() },
      { '@type': 'ListItem', position: 2, name: title, item: pageUrl },
    ],
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

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Precio por alcance</span>
            <h1>Cuánto cobrar por una página web freelance</h1>
            <p className="lead">
              No hay una tarifa única: una landing, una web de empresa y una tienda implican
              entregables distintos. Aquí puedes comparar tres encargos hipotéticos calculados
              con la misma base económica y ver qué cambia al ampliar el alcance.
            </p>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular mi proyecto
              </Link>
            </div>
          </div>
          <aside className="feature-card article-summary">
            <h2>La respuesta corta</h2>
            <p>
              Primero cuenta páginas, funcionalidades y horas. Añade reuniones, pruebas y
              revisiones; después incorpora costes directos y un recargo sobre tu mínimo. El IVA,
              si corresponde, va aparte. Sin ese alcance, una cifra aislada engaña.
            </p>
          </aside>
        </div>
      </section>

      <section className="section" aria-labelledby="web-casos-title">
        <div className="container">
          <div className="text-block">
            <h2 id="web-casos-title">Tres encargos que no deberían tener el mismo precio</h2>
            <p>
              Usamos un profesional ficticio que busca {formatCurrency(projectExampleInput.targetMonthlyNet)}
              {' '}netos mensuales, soporta {formatCurrency(projectExampleInput.monthlyFixedCosts)} de
              costes fijos y puede facturar {projectExampleInput.billableHoursPerMonth} horas al
              mes. Reserva un {projectExampleInput.taxReservePercent}% orientativo para impuestos,
              un {projectExampleInput.revisionBufferPercent}% de tiempo para revisiones y aplica
              un recargo del {projectExampleInput.profitMarginPercent}% sobre el precio mínimo.
            </p>
          </div>
          <div className="feature-grid">
            {scenarios.map((scenario) => {
              const quote = calculateProjectQuote({
                ...projectExampleInput,
                projectHours: scenario.projectHours,
                directProjectCosts: scenario.directProjectCosts,
              });

              return (
                <article className="feature-card" key={scenario.name}>
                  <h3>{scenario.name}</h3>
                  <p>{scenario.scope}</p>
                  <p>
                    {scenario.projectHours} h estimadas + {projectExampleInput.revisionBufferPercent}%
                    {' '}de reserva = {formatNumber(quote.bufferedProjectHours)} h;{' '}
                    {formatCurrency(scenario.directProjectCosts)} de costes directos.
                  </p>
                  <p>
                    <strong>{formatCurrency(quote.recommendedProjectBudget)} sin IVA</strong>
                  </p>
                  <Link href={scenario.href}>{scenario.linkText}</Link>
                </article>
              );
            })}
          </div>
          <p className="text-block">
            Son simulaciones, no precios de mercado ni ofertas aplicables a cualquier web. Una
            migración, redacción de textos, fotografías, accesibilidad específica o integraciones
            a medida cambian las horas y el presupuesto.
          </p>
        </div>
      </section>

      <section className="section alt" aria-labelledby="web-ampliacion-title">
        <div className="container text-block">
          <h2 id="web-ampliacion-title">Qué pasa si la web pequeña crece</h2>
          <p>
            En el caso corporativo, {projectExampleInput.projectHours} horas producen una
            referencia de {formatCurrency(projectExampleQuote.recommendedProjectBudget)} antes de
            IVA. Si el cliente añade páginas o funciones y la estimación pasa a{' '}
            {expandedProjectExampleInput.projectHours} horas, con los demás supuestos iguales,
            la referencia sube a{' '}
            {formatCurrency(expandedProjectExampleQuote.recommendedProjectBudget)}: una diferencia
            de{' '}
            {formatCurrency(
              expandedProjectExampleQuote.recommendedProjectBudget -
                projectExampleQuote.recommendedProjectBudget,
            )}.
          </p>
          <p>
            La decisión no es bajar el precio automáticamente, sino acordar qué se elimina, qué
            pasa a otra fase o cómo se aprueba el trabajo adicional. Consulta{' '}
            <Link href="/presupuesto-desarrollo-web-freelance">
              cómo repartir un desarrollo web por fases
            </Link>{' '}
            si el encargo requiere más que páginas estándar.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="web-antes-title">
        <div className="container text-block">
          <h2 id="web-antes-title">Antes de enviar una cifra</h2>
          <ol className="article-list article-list-ordered">
            <li>Define qué páginas o funciones se entregan y quién aporta el contenido.</li>
            <li>Estima diseño, desarrollo, pruebas, reuniones y puesta en producción.</li>
            <li>Limita revisiones y deja fuera los cambios no descritos.</li>
            <li>Separa alojamiento, licencias, soporte posterior e IVA cuando correspondan.</li>
          </ol>
          <p>
            Puedes trasladar esas decisiones a la{' '}
            <Link href="/kit-presupuesto-freelance">plantilla editable de presupuesto</Link>.
            La calculadora permite sustituir todos los supuestos anteriores por tus propios datos.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Poner precio a mi caso
            </Link>
            <Link href="/ejemplo-presupuesto-freelance" className="primary-button">
              Ver el cálculo completo
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
