import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

function collectPageFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    const stats = statSync(path);

    if (stats.isDirectory()) {
      return collectPageFiles(path);
    }

    return entry === 'page.tsx' ? [path] : [];
  });
}

describe('HTML landmarks', () => {
  it('uses named landmarks for global navigation and footer content', () => {
    const header = readFileSync(join(process.cwd(), 'components/Header.tsx'), 'utf8');
    const footer = readFileSync(join(process.cwd(), 'components/Footer.tsx'), 'utf8');

    expect(header).toContain('<header className="site-header" role="banner">');
    expect(header).toContain('className="nav" aria-label="Navegación principal"');
    expect(footer).toContain('<footer className="site-footer" role="contentinfo">');
    expect(footer).toContain('className="footer-links" aria-label="Navegación secundaria"');
  });

  it('keeps every app route wrapped in a main landmark', () => {
    const pages = collectPageFiles(join(process.cwd(), 'app'));

    expect(pages.length).toBeGreaterThan(0);
    pages.forEach((page) => {
      const content = readFileSync(page, 'utf8');

      expect(content).toMatch(/<main[\s>]/);
    });
  });
});
