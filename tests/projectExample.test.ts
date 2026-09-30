import { describe, expect, it } from 'vitest';
import { calculateProjectQuote } from '../lib/calculator';
import { projectExampleInput, projectExamplePhases, projectExampleQuote } from '../lib/projectExample';

describe('editorial project example', () => {
  it('uses the same calculation as the interactive form', () => {
    expect(projectExampleQuote).toEqual(calculateProjectQuote(projectExampleInput));
    expect(projectExampleQuote.recommendedProjectBudget).toBeGreaterThan(projectExampleQuote.projectFloorPrice);
  });

  it('allocates the full price across the three phases without rounding drift', () => {
    expect(projectExamplePhases.reduce((sum, phase) => sum + phase.share, 0)).toBe(100);
    expect(Math.round(projectExamplePhases.reduce((sum, phase) => sum + phase.amount, 0) * 100) / 100)
      .toBe(projectExampleQuote.recommendedProjectBudget);
  });
});
