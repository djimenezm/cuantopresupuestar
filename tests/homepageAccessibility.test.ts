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

function extractPrimaryButtonLinks(content: string) {
  return Array.from(
    content.matchAll(/<(?:Link|a)\b([^>]*)>\s*([\s\S]*?)\s*<\/(?:Link|a)>/g),
  )
    .map(([, attributes, label]) => ({
      attributes,
      href:
        attributes.match(/href="([^"]+)"/)?.[1] ??
        attributes.match(/href=\{([^}]+)\}/)?.[1] ??
        '',
      label: label.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
    }))
    .filter(({ attributes }) => attributes.includes('className="primary-button"'));
}

describe('homepage accessibility', () => {
  it('uses unique visible labels for guide card links', () => {
    const homePage = readFileSync(join(process.cwd(), 'app/page.tsx'), 'utf8');
    const guideLinks = extractPrimaryButtonLinks(homePage);
    const labels = guideLinks.map(({ label }) => label);

    expect(guideLinks.length).toBeGreaterThan(0);
    expect(labels).not.toContain('Leer la guía');
    expect(labels).not.toContain('Leer la guia');
    expect(new Set(labels).size).toBe(labels.length);
  });

  it('does not reuse a primary button label for different destinations', () => {
    const labelsByDestination = new Map<string, Set<string>>();

    collectPageFiles(join(process.cwd(), 'app')).forEach((page) => {
      const content = readFileSync(page, 'utf8');

      extractPrimaryButtonLinks(content).forEach(({ href, label }) => {
        if (!labelsByDestination.has(label)) {
          labelsByDestination.set(label, new Set());
        }

        labelsByDestination.get(label)?.add(href);
      });
    });

    const repeatedLabels = Array.from(labelsByDestination.entries())
      .filter(([, hrefs]) => hrefs.size > 1)
      .map(([label]) => label);

    expect(repeatedLabels).toEqual([]);
  });
});
