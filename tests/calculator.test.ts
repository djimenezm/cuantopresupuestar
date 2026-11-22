import { describe, expect, it } from 'vitest';
import { assessClientPrice, calculateProjectQuote } from '@/lib/calculator';

const initialInput = {
  targetMonthlyNet: 2000, monthlyFixedCosts: 350, billableHoursPerMonth: 80,
  projectHours: 18, revisionBufferPercent: 15, directProjectCosts: 0,
  taxReservePercent: 20, profitMarginPercent: 10, hasIVA: true,
};

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

  it('closes the 1.5-hour budget using the visible base and IVA without rounding the hourly rate first', () => {
    const result = calculateProjectQuote({ ...initialInput, projectHours: 1.5 });
    expect(result.recommendedProjectBudget).toBe(67.60);
    expect(result.vatAmount).toBe(14.20);
    expect(result.totalWithVAT).toBe(81.80);
  });

  it('keeps the closed base and total equal when IVA is disabled', () => {
    const result = calculateProjectQuote({ ...initialInput, projectHours: 1.5, hasIVA: false });
    expect(result.recommendedProjectBudget).toBe(67.60);
    expect(result.vatAmount).toBe(0);
    expect(result.totalWithVAT).toBe(67.60);
  });

  it.each([
    [0.5, 0.5, 0.11, 0.61],
    [1.005, 1.01, 0.21, 1.22],
    [10.075, 10.08, 2.12, 12.20],
  ])('closes a raw budget of %s with decimal half-up rounding', (costs, base, vat, total) => {
    const result = calculateProjectQuote({
      ...initialInput, targetMonthlyNet: 0, monthlyFixedCosts: 0,
      directProjectCosts: costs, revisionBufferPercent: 0,
      profitMarginPercent: 0, taxReservePercent: 0,
    });
    expect(result.projectFloorPrice).toBe(base);
    expect(result.recommendedProjectBudget).toBe(base);
    expect(result.vatAmount).toBe(vat);
    expect(result.totalWithVAT).toBe(total);
  });

  it('always makes the total equal the displayed base plus IVA in integer cents', () => {
    for (const hasIVA of [true, false]) {
      for (let i = 1; i <= 200; i++) {
        const result = calculateProjectQuote({
          ...initialInput, projectHours: 0.5 + i / 10,
          directProjectCosts: i / 100, hasIVA,
        });
        const baseCents = Math.round(result.recommendedProjectBudget * 100);
        const vatCents = Math.round(result.vatAmount * 100);
        const totalCents = Math.round(result.totalWithVAT * 100);
        expect(totalCents).toBe(baseCents + vatCents);
      }
    }
  });
});

describe('assessClientPrice', () => {
  const quote = calculateProjectQuote({
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

  it('turns a low client offer into the hours that would need to leave scope', () => {
    const assessment = assessClientPrice(quote, 800);

    expect(assessment.gapToFloor).toBe(-183.75);
    expect(assessment.hoursToTrim).toBe(5.07);
    expect(assessment.directCostsUncovered).toBe(false);
  });

  it('flags an offer that does not cover even the direct costs', () => {
    const assessment = assessClientPrice(quote, 100);

    expect(assessment.directCostsUncovered).toBe(true);
    expect(assessment.hoursToTrim).toBe(23);
  });

  it('shows the distance to the recommended price for a viable offer', () => {
    const assessment = assessClientPrice(quote, 1000);

    expect(assessment.gapToFloor).toBe(16.25);
    expect(assessment.gapToRecommended).toBe(-131.31);
    expect(assessment.hoursToTrim).toBe(0);
  });
});
