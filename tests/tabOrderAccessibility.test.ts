import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const sourceFiles = [
  'app/page.tsx',
  'components/CalculatorForm.tsx',
  'components/Footer.tsx',
  'components/LeadMagnetForm.tsx',
  'components/ResultCard.tsx',
];

describe('tab order accessibility', () => {
  it('keeps interactive controls in the natural document order', () => {
    const content = sourceFiles
      .map((file) => readFileSync(join(process.cwd(), file), 'utf8'))
      .join('\n');

    expect(content).not.toMatch(/tabIndex=\{?[1-9]/);
    expect(content).not.toMatch(/tabindex=["']?[1-9]/i);
    expect(content).not.toMatch(/order:\s*-?\d/);
  });

  it('uses Brevo fields without adding a focusable spam trap', () => {
    const leadForm = readFileSync(join(process.cwd(), 'components/LeadMagnetForm.tsx'), 'utf8');

    expect(leadForm).toContain('name="EMAIL"');
    expect(leadForm).toContain('name="email_address_check"');
    expect(leadForm).not.toContain('name="_honey"');
  });
});
