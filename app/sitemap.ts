import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

const routes = [
  '/',
  '/kit-presupuesto-freelance',
  '/como-presupuestar-un-proyecto-freelance',
  '/como-calcular-horas-proyecto-freelance',
  '/como-hacer-una-propuesta-comercial',
  '/ejemplo-presupuesto-freelance',
  '/plantilla-presupuesto-freelance',
  '/precio-cerrado-o-por-horas-freelance',
  '/margen-presupuesto-freelance',
  '/condiciones-pago-presupuesto-freelance',
  '/presupuesto-por-fases-freelance',
  '/cuanto-cobrar-por-una-pagina-web-freelance',
  '/presupuesto-desarrollo-web-freelance',
  '/aviso-legal',
  '/privacidad',
  '/cookies',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified,
  }));
}
