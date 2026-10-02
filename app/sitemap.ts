import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

const routes = [
  '/',
  '/kit-presupuesto-freelance',
  '/como-presupuestar-un-proyecto-freelance',
  '/como-calcular-horas-proyecto-freelance',
  '/como-hacer-una-propuesta-comercial',
  '/ejemplo-presupuesto-freelance',
  '/precio-cerrado-o-por-horas-freelance',
  '/margen-presupuesto-freelance',
  '/condiciones-pago-presupuesto-freelance',
  '/presupuesto-por-fases-freelance',
  '/cuanto-cobrar-por-una-pagina-web-freelance',
  '/cuanto-cobrar-web-corporativa-freelance',
  '/cuanto-cobrar-tienda-online-freelance',
  '/precio-pagina-web-profesional-freelance',
  '/presupuesto-desarrollo-web-freelance',
  '/aviso-legal',
  '/privacidad',
  '/cookies',
];

// Only substantive content updates belong here; deployments do not change these dates.
const lastContentUpdates: Record<string, string> = {
  '/': '2026-10-02',
  '/cuanto-cobrar-por-una-pagina-web-freelance': '2026-10-02',
  '/precio-cerrado-o-por-horas-freelance': '2026-10-02',
  '/presupuesto-desarrollo-web-freelance': '2026-10-02',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    ...(lastContentUpdates[route] ? { lastModified: lastContentUpdates[route] } : {}),
  }));
}
