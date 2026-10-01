import { describe, expect, it } from 'vitest';
import { assessClientPrice, calculateProjectQuote } from '../lib/calculator';
import {
  expandedProjectExampleInput,
  expandedProjectExampleQuote,
  projectExampleInput,
  projectExamplePhases,
  projectExampleQuote,
  webDevelopmentExamplePhases,
} from '../lib/projectExample';

describe('editorial project example', () => {
  it('uses the same calculation as the interactive form', () => {
    expect(projectExampleQuote).toEqual(calculateProjectQuote(projectExampleInput));
    expect(projectExampleQuote.recommendedProjectBudget).toBeGreaterThan(projectExampleQuote.projectFloorPrice);
  });

  it('shows the cost of a larger scope without changing the other assumptions', () => {
    expect(expandedProjectExampleQuote).toEqual(calculateProjectQuote(expandedProjectExampleInput));
    expect(expandedProjectExampleQuote.recommendedProjectBudget).toBeGreaterThan(
      projectExampleQuote.recommendedProjectBudget,
    );
  });

  it('identifies when a client offer is below the example floor', () => {
    const assessment = assessClientPrice(projectExampleQuote, 1200);
    expect(assessment.gapToFloor).toBeLessThan(0);
    expect(assessment.hoursToTrim).toBeGreaterThan(0);
  });

  it('allocates the full price across the three phases without rounding drift', () => {
    expect(projectExamplePhases.reduce((sum, phase) => sum + phase.share, 0)).toBe(100);
    expect(Math.round(projectExamplePhases.reduce((sum, phase) => sum + phase.amount, 0) * 100) / 100)
      .toBe(projectExampleQuote.recommendedProjectBudget);
  });

  it('allocates every estimated web development hour to a named phase', () => {
    expect(webDevelopmentExamplePhases.reduce((sum, phase) => sum + phase.hours, 0))
      .toBe(expandedProjectExampleInput.projectHours);
  });
});
