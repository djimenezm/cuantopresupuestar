import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ignoredDirectories = new Set(['.git', '.next', 'node_modules']);
const checkedExtensions = new Set(['.css', '.tsx', '.ts']);

function collectSourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    if (ignoredDirectories.has(entry)) {
      return [];
    }

    const path = join(directory, entry);
    const stats = statSync(path);

    if (stats.isDirectory()) {
      return collectSourceFiles(path);
    }

    const hasCheckedExtension = Array.from(checkedExtensions).some((extension) =>
      entry.endsWith(extension),
    );

    return hasCheckedExtension ? [path] : [];
  });
}

describe('offscreen accessibility', () => {
  it('hides offscreen or spam-trap content from assistive technology', () => {
    const resultCard = readFileSync(join(process.cwd(), 'components/ResultCard.tsx'), 'utf8');
    const leadForm = readFileSync(join(process.cwd(), 'components/LeadMagnetForm.tsx'), 'utf8');
    const styles = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8');

    expect(resultCard).toContain("textArea.setAttribute('aria-hidden', 'true')");
    expect(resultCard).toContain('textArea.tabIndex = -1');
    expect(leadForm).toContain('aria-hidden="true"');
    expect(styles).toMatch(/\.honey-field\s*{[^}]*display:\s*none/s);
  });

  it('does not add hidden offscreen positioning without an explicit accessibility guard', () => {
    const content = collectSourceFiles(process.cwd())
      .map((file) => readFileSync(file, 'utf8'))
      .join('\n');
    const offscreenMatches = content.match(/(left|right|top|bottom)\s*[:=]\s*['"]?-\d/g) ?? [];

    expect(offscreenMatches.length).toBeLessThanOrEqual(1);
    expect(content).toContain("textArea.setAttribute('aria-hidden', 'true')");
  });
});
