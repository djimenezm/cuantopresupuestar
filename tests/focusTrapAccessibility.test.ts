import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ignoredDirectories = new Set(['.git', '.next', 'node_modules']);
const checkedExtensions = new Set(['.tsx', '.ts']);
const sourceDirectories = ['app', 'components', 'lib'];

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

describe('focus trap accessibility', () => {
  it('does not introduce modal or keyboard focus traps', () => {
    const content = sourceDirectories
      .flatMap((directory) => collectSourceFiles(join(process.cwd(), directory)))
      .map((file) => readFileSync(file, 'utf8'))
      .join('\n');

    expect(content).not.toMatch(/role=["']dialog["']/);
    expect(content).not.toMatch(/aria-modal=["']true["']/);
    expect(content).not.toMatch(/\binert\b/);
    expect(content).not.toMatch(/addEventListener\(["']keydown["']/);
    expect(content).not.toMatch(/onKeyDown=\{/);
    expect(content).not.toMatch(/\.focus\(/);
    expect(content).not.toMatch(/autoFocus/);
  });
});
