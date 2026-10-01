import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import TemplateDownloadLink from '@/components/TemplateDownloadLink';
import { formatCurrency, formatNumber } from '@/lib/format';
import { projectExampleInput, projectExampleQuote } from '@/lib/projectExample';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/kit-presupuesto-freelance';
const title = 'Plantilla de presupuesto freelance para adaptar a tu proyecto';
const description =
  'Plantilla gratuita y editable de presupuesto freelance con alcance, revisiones, dependencias, pagos y control de cambios. Incluye un ejemplo rellenado con cifras de la calculadora.';

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

export default function KitPresupuestoFreelancePage() {
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
    datePublished: '2026-04-25',
    dateModified: '2026-10-01',
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
        id="kit-presupuesto-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="kit-presupuesto-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Recurso abierto</span>
            <h1>Una plantilla de presupuesto que deja el alcance por escrito</h1>
            <p className="lead">
              Descarga un documento editable sin dejar tu correo. La plantilla te obliga a definir
              entregables, revisiones, materiales pendientes, precio y pagos antes de enviar una
              cifra al cliente.
            </p>
            <div className="guide-cta">
              <TemplateDownloadLink>
                Descargar plantilla editable
              </TemplateDownloadLink>
              <Link href="/#calculadora" className="primary-button">
                Calcular el precio
              </Link>
            </div>
          </div>
          <aside className="feature-card article-summary">
            <h2>Antes de rellenarla</h2>
            <p>
              La plantilla no calcula el precio por ti. Primero estima horas y costes; después
              concreta qué recibe el cliente por esa cifra. El ejemplo de esta página es ficticio
              y no establece una tarifa de mercado.
            </p>
          </aside>
        </div>
      </section>

      <section className="section" aria-labelledby="modelo-presupuesto-title">
        <div className="container text-block">
          <h2 id="modelo-presupuesto-title">Los seis campos que conviene cerrar</h2>
          <p>
            Copia estos apartados a tu propuesta o usa el archivo descargable. Sustituye cada
            texto entre corchetes por una decisión concreta, no por una frase genérica.
          </p>
          <dl className="worked-example">
            <div>
              <dt>Objetivo</dt>
              <dd>[qué resultado busca el cliente y cómo lo comprobará]</dd>
            </div>
            <div>
              <dt>Entregables</dt>
              <dd>[número, formato y criterio de aceptación de cada pieza]</dd>
            </div>
            <div>
              <dt>Revisiones</dt>
              <dd>[rondas incluidas, responsable de aprobar y coste de cambios extra]</dd>
            </div>
            <div>
              <dt>Dependencias</dt>
              <dd>[materiales, accesos y fecha en que el cliente debe aportarlos]</dd>
            </div>
            <div>
              <dt>Precio y pagos</dt>
              <dd>[importe sin IVA, impuesto si corresponde, anticipo e hitos]</dd>
            </div>
            <div>
              <dt>Fuera de alcance</dt>
              <dd>[qué no se entrega y cómo se autorizarán ampliaciones]</dd>
            </div>
          </dl>
          <p>
            La pregunta útil es si otra persona podría contar los entregables, identificar quién
            aprueba cada hito y saber qué sucede si el cliente pide una página adicional. Si no
            puede, el presupuesto aún deja decisiones abiertas.
          </p>
        </div>
      </section>

      <section className="section alt" aria-labelledby="ejemplo-relleno-title">
        <div className="container text-block">
          <h2 id="ejemplo-relleno-title">Así quedaría rellenado en una web pequeña</h2>
          <p>
            Caso hipotético: una web corporativa de tres páginas. El cliente entrega textos,
            imágenes y acceso al alojamiento. El trabajo se estima en{' '}
            {projectExampleInput.projectHours} horas, más una reserva del{' '}
            {projectExampleInput.revisionBufferPercent}% para revisiones. La calculadora obtiene{' '}
            {formatNumber(projectExampleQuote.bufferedProjectHours)} horas presupuestables.
          </p>
          <div className="disclaimer-box">
            <h3>Extracto de propuesta</h3>
            <p>
              Diseñar y publicar hasta tres páginas adaptables a móvil con una línea visual común,
              formulario de contacto y metadatos básicos. Incluye dos rondas de ajustes sobre esas
              páginas. La entrega comienza cuando recibamos los materiales y accesos acordados.
            </p>
            <p>
              Precio: <strong>{formatCurrency(projectExampleQuote.recommendedProjectBudget)}</strong>
              {' '}sin IVA. Se abona el 40% al aceptar, el 40% al aprobar la versión de prueba y el
              20% antes de publicar. La redacción, las fotografías, el contenido legal, las nuevas
              integraciones y el mantenimiento no están incluidos. Una cuarta página se valora y
              aprueba aparte antes de realizarla.
            </p>
          </div>
          <p>
            Este precio procede de un objetivo neto mensual de{' '}
            {formatCurrency(projectExampleInput.targetMonthlyNet)}, costes fijos de{' '}
            {formatCurrency(projectExampleInput.monthlyFixedCosts)}, una reserva fiscal orientativa
            del {projectExampleInput.taxReservePercent}% y{' '}
            {formatCurrency(projectExampleInput.directProjectCosts)} de costes directos. No debe
            copiarse como tarifa válida para otro profesional. Puedes ver{' '}
            <Link href="/ejemplo-presupuesto-freelance">el desglose completo del cálculo</Link>.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="revision-presupuesto-title">
        <div className="container text-block">
          <h2 id="revision-presupuesto-title">Comprueba esto antes de enviarlo</h2>
          <ol className="article-list article-list-ordered">
            <li>¿Se pueden contar los entregables y las rondas de revisión?</li>
            <li>¿Queda claro quién aporta textos, imágenes, accesos y licencias?</li>
            <li>¿El plazo depende de recibir esos materiales y de las aprobaciones del cliente?</li>
            <li>¿El precio se muestra sin IVA y el impuesto aparece aparte si corresponde?</li>
            <li>¿Cada pago está vinculado a un hito comprobable?</li>
            <li>¿Hay un procedimiento para presupuestar y aprobar cambios de alcance?</li>
          </ol>
          <p>
            Una plantilla ordena la conversación, pero no sustituye revisar requisitos con el
            cliente ni recibir asesoramiento profesional cuando haya dudas fiscales o legales.
          </p>
          <div className="guide-cta">
            <TemplateDownloadLink>
              Descargar y adaptar
            </TemplateDownloadLink>
            <Link href="/ejemplo-presupuesto-freelance" className="primary-button">
              Ver cómo se calculó
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
