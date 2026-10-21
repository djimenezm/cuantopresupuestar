import { renderToStaticMarkup } from 'react-dom/server';
import Guide, { metadata } from '@/app/cuanto-cobrar-por-una-pagina-web-freelance/page';
import HoursGuide from '@/app/como-calcular-horas-proyecto-freelance/page';
import DevelopmentGuide from '@/app/presupuesto-desarrollo-web-freelance/page';
import { getSiteUrl } from '@/lib/site';

vi.mock('@/components/LeadMagnetForm', () => ({ default: () => null }));

function htmlOf(page: React.ReactNode) {
  return new DOMParser().parseFromString(renderToStaticMarkup(page), 'text/html');
}

describe('web pricing guide crawlability', () => {
  it('includes valid structured data in HTML without running client scripts', () => {
    const document = htmlOf(<Guide />);
    const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((script) => JSON.parse(script.textContent!));
    const url = new URL('/cuanto-cobrar-por-una-pagina-web-freelance', getSiteUrl()).toString();

    expect(schemas.map((schema) => schema['@type'])).toEqual(['Article', 'BreadcrumbList']);
    expect(schemas[0].mainEntityOfPage).toBe(url);
    expect(schemas[1].itemListElement.at(-1).item).toBe(url);
    expect(document.querySelectorAll('h1')).toHaveLength(1);
    expect(metadata.alternates?.canonical).toBe('/cuanto-cobrar-por-una-pagina-web-freelance');
  });

  it.each([HoursGuide, DevelopmentGuide])('links to the guide in related article content', (Page) => {
    const document = htmlOf(<Page />);
    const links = [...document.querySelectorAll('a[href="/cuanto-cobrar-por-una-pagina-web-freelance"]')]
      .filter((link) => !link.closest('footer, header'));

    expect(links.length).toBeGreaterThan(0);
    expect(links[0].textContent?.trim().length).toBeGreaterThan(15);
    const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((script) => JSON.parse(script.textContent!));
    expect(schemas.map((schema) => schema['@type'])).toEqual(['Article', 'BreadcrumbList', 'FAQPage']);
    expect(schemas[0].mainEntityOfPage).not.toContain('/cuanto-cobrar-por-una-pagina-web-freelance');
  });
});
