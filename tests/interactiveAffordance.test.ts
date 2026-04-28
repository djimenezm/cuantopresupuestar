import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('interactive affordance styles', () => {
  it('makes links and buttons visibly interactive across states', () => {
    const styles = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8');

    expect(styles).toMatch(/a\[href\],\s*button,\s*input,\s*select,\s*textarea\s*{[^}]*transition:/s);
    expect(styles).toMatch(/\.nav a,\s*\.footer-links a,\s*\.text-block a,\s*\.legal-page a\s*{[^}]*text-decoration:\s*underline/s);
    expect(styles).toMatch(/\.nav a:hover,\s*\.footer-links a:hover,\s*\.text-block a:hover,\s*\.legal-page a:hover\s*{[^}]*text-decoration-thickness:\s*0\.12em/s);
    expect(styles).toMatch(/\.primary-button:hover\s*{[^}]*box-shadow:/s);
    expect(styles).toMatch(/\.primary-button:active\s*{[^}]*transform:\s*translateY\(1px\)/s);
    expect(styles).toMatch(/\.result-copy-button:hover\s*{[^}]*box-shadow:/s);
    expect(styles).toMatch(/\.result-copy-button:active\s*{[^}]*transform:\s*translateY\(1px\)/s);
    expect(styles).toMatch(/input:hover,\s*select:hover\s*{[^}]*border-color:\s*var\(--accent\)/s);
  });
});
