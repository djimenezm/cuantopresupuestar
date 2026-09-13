import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('performance configuration', () => {
  it('keeps CSS on the reliable external stylesheet path', () => {
    const nextConfig = readFileSync(join(process.cwd(), 'next.config.ts'), 'utf8');

    expect(nextConfig).not.toMatch(/inlineCss:\s*true/);
  });

  it('does not ship Next browser polyfills for legacy browsers', () => {
    const nextConfig = readFileSync(join(process.cwd(), 'next.config.ts'), 'utf8');
    const noPolyfillsModule = readFileSync(
      join(process.cwd(), 'lib/no-browser-polyfills.ts'),
      'utf8',
    );

    expect(nextConfig).toContain('next/dist/build/polyfills/polyfill-module');
    expect(nextConfig).toContain('./lib/no-browser-polyfills.ts');
    expect(noPolyfillsModule.trim()).toBe('export {};');
  });

  it('keeps the homepage message compact for LCP', () => {
    const homePage = readFileSync(join(process.cwd(), 'app/page.tsx'), 'utf8');
    const calculatorForm = readFileSync(
      join(process.cwd(), 'components/CalculatorForm.tsx'),
      'utf8',
    );
    const calculatorIntroMatch = calculatorForm.match(
      /<p className="card-intro" id="calculator-intro">([\s\S]*?)<\/p>/,
    );
    const calculatorIntroText =
      calculatorIntroMatch?.[1].replace(/\s+/g, ' ').trim() ?? '';

    expect(calculatorIntroText.length).toBeLessThanOrEqual(95);
    expect(homePage).toContain('Convierte horas, costes y margen en una cifra clara');
    expect(homePage).not.toContain('<FAQ />');
    expect(calculatorForm).not.toContain(
      'Convierte tu objetivo mensual en un presupuesto por proyecto',
    );
  });

  it('keeps static homepage chrome out of the client bundle', () => {
    const homePage = readFileSync(join(process.cwd(), 'app/page.tsx'), 'utf8');
    const header = readFileSync(join(process.cwd(), 'components/Header.tsx'), 'utf8');
    const footer = readFileSync(join(process.cwd(), 'components/Footer.tsx'), 'utf8');
    const jsonLd = readFileSync(join(process.cwd(), 'components/JsonLd.tsx'), 'utf8');
    const notFound = readFileSync(join(process.cwd(), 'app/not-found.tsx'), 'utf8');

    expect(homePage).not.toContain("from 'next/script'");
    expect(homePage).not.toContain("from 'next/link'");
    expect(header).not.toContain("from 'next/link'");
    expect(footer).not.toContain("from 'next/link'");
    expect(notFound).not.toContain("from 'next/link'");
    expect(jsonLd).toContain("headers()).get('x-nonce')");
  });

  it('keeps the essential result UI in the initial calculator bundle', () => {
    const calculatorForm = readFileSync(
      join(process.cwd(), 'components/CalculatorForm.tsx'),
      'utf8',
    );

    expect(calculatorForm).toContain("import ResultCard from '@/components/ResultCard'");
    expect(calculatorForm).not.toContain("lazy(() => import('@/components/ResultCard'))");
  });
});
