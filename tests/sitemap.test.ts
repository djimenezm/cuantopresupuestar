import sitemap from '@/app/sitemap';

describe('sitemap', () => {
  it('includes the main indexable routes and excludes conversion-only pages', () => {
    const urls = sitemap().map((entry) => new URL(entry.url));
    const paths = urls.map((url) => url.pathname);

    urls.forEach((url) => expect(url.origin).toBe('https://www.cuantopresupuestar.es'));
    expect(paths).toContain('/');
    expect(paths).toContain('/kit-presupuesto-freelance');
    expect(paths).toContain('/como-presupuestar-un-proyecto-freelance');
    expect(paths).toContain('/como-calcular-horas-proyecto-freelance');
    expect(paths).toContain('/como-hacer-una-propuesta-comercial');
    expect(paths).toContain('/ejemplo-presupuesto-freelance');
    expect(paths).toContain('/plantilla-presupuesto-freelance');
    expect(paths).toContain('/precio-cerrado-o-por-horas-freelance');
    expect(paths).toContain('/margen-presupuesto-freelance');
    expect(paths).toContain('/condiciones-pago-presupuesto-freelance');
    expect(paths).toContain('/presupuesto-por-fases-freelance');
    expect(paths).toContain('/cuanto-cobrar-por-una-pagina-web-freelance');
    expect(paths).toContain('/presupuesto-desarrollo-web-freelance');
    expect(paths).not.toContain('/gracias-kit-presupuesto');
  });
});
