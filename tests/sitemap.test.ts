import sitemap from '@/app/sitemap';

describe('sitemap', () => {
  it('includes the main indexable routes and excludes conversion-only pages', () => {
    const paths = sitemap().map((entry) => new URL(entry.url).pathname);

    expect(paths).toContain('/');
    expect(paths).toContain('/kit-presupuesto-freelance');
    expect(paths).toContain('/como-presupuestar-un-proyecto-freelance');
    expect(paths).toContain('/como-hacer-una-propuesta-comercial');
    expect(paths).toContain('/plantilla-presupuesto-freelance');
    expect(paths).toContain('/cuanto-cobrar-por-una-pagina-web-freelance');
    expect(paths).toContain('/presupuesto-desarrollo-web-freelance');
    expect(paths).not.toContain('/gracias-kit-presupuesto');
  });
});
