import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ignoredDirectories = new Set(['.git', '.next', 'node_modules']);
const checkedExtensions = new Set(['.tsx', '.ts']);
const sourceDirectories = ['app', 'components', 'lib'];
const allowedClickTargets = new Set(['a', 'button', 'Link']);

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

describe('custom control accessibility', () => {
  it('avoids unlabeled custom interactive controls', () => {
    const content = sourceDirectories
      .flatMap((directory) => collectSourceFiles(join(process.cwd(), directory)))
      .map((file) => readFileSync(file, 'utf8'))
      .join('\n');
    const interactiveRolePattern =
      /role=["'](button|checkbox|combobox|link|menuitem|option|radio|searchbox|slider|switch|tab|textbox)["']/;
    const clickTargets = Array.from(content.matchAll(/<([A-Za-z][\w.]*)\b[^>]*\bonClick=\{/g)).map(
      ([, tagName]) => tagName,
    );

    expect(content).not.toMatch(interactiveRolePattern);
    clickTargets.forEach((tagName) => {
      expect(allowedClickTargets.has(tagName)).toBe(true);
    });
  });
});
