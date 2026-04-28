import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ignoredDirectories = new Set(['.git', '.next', 'node_modules']);
const checkedExtensions = new Set(['.css', '.tsx']);

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

describe('visual order accessibility', () => {
  it('does not visually reorder content away from DOM order', () => {
    const content = collectSourceFiles(process.cwd())
      .map((file) => readFileSync(file, 'utf8'))
      .join('\n');

    expect(content).not.toMatch(/(^|[{\s;])order\s*:/);
    expect(content).not.toMatch(/flex-direction:\s*(row-reverse|column-reverse)/);
    expect(content).not.toMatch(/grid-template-areas\s*:/);
    expect(content).not.toMatch(/grid-area\s*:/);
    expect(content).not.toMatch(/direction:\s*rtl/);
  });
});
