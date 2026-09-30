import { readStyles } from './readStyles';

describe('keyboard focus accessibility', () => {
  it('provides a visible focus indicator for native interactive controls', () => {
    const styles = readStyles();

    expect(styles).toContain('--focus-ring:');
    expect(styles).toMatch(/:where\([^)]*a[^)]*button[^)]*input[^)]*select[^)]*textarea/s);
    expect(styles).toMatch(/:focus-visible\s*{[^}]*outline:\s*3px solid var\(--focus-ring\)/s);
    expect(styles).toMatch(/:focus-visible\s*{[^}]*box-shadow:\s*0 0 0 5px var\(--focus-shadow\)/s);
  });
});
