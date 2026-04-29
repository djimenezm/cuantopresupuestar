import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('new content focus accessibility', () => {
  it('moves focus to calculator results when they are added to the page', () => {
    const calculatorForm = readFileSync(
      join(process.cwd(), 'components/CalculatorForm.tsx'),
      'utf8',
    );
    const resultCard = readFileSync(join(process.cwd(), 'components/ResultCard.tsx'), 'utf8');
    const styles = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8');

    expect(calculatorForm).toContain('resultRegionRef.current?.focus');
    expect(calculatorForm).toContain('validSubmissionCount');
    expect(calculatorForm).toContain('ref={resultRegionRef}');
    expect(resultCard).toContain('tabIndex={-1}');
    expect(resultCard).toContain('aria-labelledby="result-card-title"');
    expect(styles).toMatch(/\.result-card:focus\s*{[^}]*outline:\s*3px solid var\(--focus-ring\)/s);
  });
});
