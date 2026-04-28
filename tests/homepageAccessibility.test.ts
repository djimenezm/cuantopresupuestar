import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('homepage accessibility', () => {
  it('uses unique visible labels for guide card links', () => {
    const homePage = readFileSync(join(process.cwd(), 'app/page.tsx'), 'utf8');
    const guideLinks = Array.from(homePage.matchAll(/<Link\b([^>]*)>\s*([^<]+?)\s*<\/Link>/g))
      .map(([, attributes, label]) => ({
        attributes,
        label: label.replace(/\s+/g, ' ').trim(),
      }))
      .filter(({ attributes }) => attributes.includes('className="primary-button"'));
    const labels = guideLinks.map(({ label }) => label);

    expect(guideLinks.length).toBeGreaterThan(0);
    expect(labels).not.toContain('Leer la guía');
    expect(labels).not.toContain('Leer la guia');
    expect(new Set(labels).size).toBe(labels.length);
  });
});
