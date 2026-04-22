import { describe, expect, it } from 'vitest';
import { calculateProjectQuote } from '@/lib/calculator';

describe('calculateProjectQuote', () => {
  it('calculates a project budget from the monthly target and project inputs', () => {
    const result = calculateProjectQuote({
      targetMonthlyNet: 2000,
      monthlyFixedCosts: 400,
      billableHoursPerMonth: 80,
      projectHours: 20,
      revisionBufferPercent: 15,
      directProjectCosts: 150,
      taxReservePercent: 20,
      profitMarginPercent: 15,
      hasIVA: true,
    });

    expect(result.preTaxIncomeTarget).toBe(2500);
    expect(result.monthlyRevenueTarget).toBe(2900);
    expect(result.baseHourlyRate).toBe(36.25);
    expect(result.bufferedProjectHours).toBe(23);
    expect(result.projectFloorPrice).toBe(983.75);
    expect(result.recommendedProjectBudget).toBe(1131.31);
    expect(result.vatAmount).toBe(237.58);
    expect(result.totalWithVAT).toBe(1368.89);
    expect(result.effectiveHourlyRate).toBe(49.19);
  });

  it('does not add IVA when the project does not repercute it', () => {
    const result = calculateProjectQuote({
      targetMonthlyNet: 2000,
      monthlyFixedCosts: 400,
      billableHoursPerMonth: 80,
      projectHours: 10,
      revisionBufferPercent: 10,
      directProjectCosts: 0,
      taxReservePercent: 20,
      profitMarginPercent: 0,
      hasIVA: false,
    });

    expect(result.vatAmount).toBe(0);
    expect(result.totalWithVAT).toBe(result.recommendedProjectBudget);
  });

  it('sanitizes invalid values before calculating', () => {
    const result = calculateProjectQuote({
      targetMonthlyNet: Number.NaN,
      monthlyFixedCosts: -50,
      billableHoursPerMonth: 0,
      projectHours: Number.NaN,
      revisionBufferPercent: -20,
      directProjectCosts: -10,
      taxReservePercent: 120,
      profitMarginPercent: -5,
      hasIVA: false,
    });

    expect(result).toEqual(
      expect.objectContaining({
        targetMonthlyNet: 0,
        monthlyFixedCosts: 0,
        billableHoursPerMonth: 1,
        projectHours: 0.5,
        bufferedProjectHours: 0.5,
        revisionBufferPercent: 0,
        directProjectCosts: 0,
        taxReservePercent: 99,
        profitMarginPercent: 0,
        preTaxIncomeTarget: 0,
        monthlyRevenueTarget: 0,
        baseHourlyRate: 0,
        projectFloorPrice: 0,
        recommendedProjectBudget: 0,
        vatAmount: 0,
        totalWithVAT: 0,
        effectiveHourlyRate: 0,
      }),
    );
  });
});
