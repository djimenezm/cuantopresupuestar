import { describe, expect, it } from 'vitest';
import { calculateProjectQuote } from '@/lib/calculator';
import { DEFAULT_FORM_VALUES } from '@/lib/calculatorForm';
import { compareQuoteSituations, createQuoteSituation } from '@/lib/quoteComparison';

describe('quote situations', () => {
  it('copies every input independently without changing the calculation', () => {
    const values = { ...DEFAULT_FORM_VALUES };
    const snapshot = createQuoteSituation(values)!;
    values.projectHours = '36';
    values.hasIVA = false;

    expect(snapshot).toEqual({
      targetMonthlyNet: 2000, monthlyFixedCosts: 350, billableHoursPerMonth: 80,
      projectHours: 18, revisionBufferPercent: 15, directProjectCosts: 0,
      taxReservePercent: 20, profitMarginPercent: 10, hasIVA: true,
    });
    expect(Object.isFrozen(snapshot)).toBe(true);
    expect(calculateProjectQuote(snapshot).recommendedProjectBudget).toBe(811.18);
  });

  it('keeps full input precision until the unchanged engine rounds its outputs', () => {
    const snapshot = createQuoteSituation({ ...DEFAULT_FORM_VALUES, directProjectCosts: '150.12345' })!;
    expect(snapshot.directProjectCosts).toBe(150.12345);
    expect(calculateProjectQuote(snapshot).directProjectCosts).toBe(150.12);
  });

  it.each([
    { projectHours: '' }, { projectHours: '0' }, { projectHours: '-5' }, { projectHours: '0.25' },
    { monthlyFixedCosts: 'abc' }, { taxReservePercent: '100' },
    { billableHoursPerMonth: '80.5' }, { revisionBufferPercent: '101' },
    { targetMonthlyNet: 'Infinity' }, { targetMonthlyNet: 'NaN' },
  ])('rejects invalid inputs rather than using engine fallbacks: %o', (changes) => {
    expect(createQuoteSituation({ ...DEFAULT_FORM_VALUES, ...changes })).toBeNull();
  });

  it('rejects finite inputs whose calculation would overflow', () => {
    expect(createQuoteSituation({
      ...DEFAULT_FORM_VALUES, targetMonthlyNet: '9'.repeat(300), projectHours: '9'.repeat(300),
    })).toBeNull();
  });

  it('rejects a finite budget outside the supported cent precision', () => {
    expect(createQuoteSituation({ ...DEFAULT_FORM_VALUES, directProjectCosts: '1e14' })).toBeNull();
  });

  it('preserves canonical three-digit decimals in the inputs saved as A', () => {
    const snapshot = createQuoteSituation({ ...DEFAULT_FORM_VALUES, directProjectCosts: '1.234' })!;
    expect(snapshot.directProjectCosts).toBe(1.234);
    expect(calculateProjectQuote(snapshot).recommendedProjectBudget).toBe(812.54);
  });
});

describe('compareQuoteSituations', () => {
  const a = createQuoteSituation(DEFAULT_FORM_VALUES)!;

  it('recognizes identical scenarios and never produces negative zero', () => {
    const comparison = compareQuoteSituations(a, createQuoteSituation({ ...DEFAULT_FORM_VALUES }))!;
    expect(comparison.changes).toEqual([]);
    expect(comparison.summary).toBe('A y B tienen los mismos datos y resultados.');
    for (const row of comparison.metrics) {
      expect(row.difference).toBe(0);
      expect(Object.is(row.difference, -0)).toBe(false);
    }
  });

  it('reruns the whole model for a change in project hours', () => {
    const b = createQuoteSituation({ ...DEFAULT_FORM_VALUES, projectHours: '36' })!;
    const comparison = compareQuoteSituations(a, b)!;
    expect(comparison.changes.map(({ key }) => key)).toEqual(['projectHours']);
    expect(comparison.metrics).toEqual([
      { key: 'bufferedProjectHours', label: 'Horas con buffer', unit: 'hours', a: 20.7, b: 41.4, difference: 20.7 },
      { key: 'projectFloorPrice', label: 'Precio mínimo sin IVA', unit: 'currency', a: 737.44, b: 1474.88, difference: 737.44 },
      { key: 'recommendedProjectBudget', label: 'Presupuesto recomendado sin IVA', unit: 'currency', a: 811.18, b: 1622.36, difference: 811.18 },
      { key: 'vatAmount', label: 'IVA añadido', unit: 'currency', a: 170.35, b: 340.7, difference: 170.35 },
    ]);
    expect(comparison.summary).toContain('Se ha modificado una entrada: horas estimadas del proyecto.');
    expect(calculateProjectQuote(b).totalWithVAT).toBe(1963.06);
  });

  it('reports all changed inputs without attributing the joint effect to one', () => {
    const b = createQuoteSituation({
      ...DEFAULT_FORM_VALUES, projectHours: '24', monthlyFixedCosts: '400',
      directProjectCosts: '150', profitMarginPercent: '15', hasIVA: false,
    })!;
    const comparison = compareQuoteSituations(a, b)!;
    expect(comparison.changes.map(({ key }) => key)).toEqual([
      'monthlyFixedCosts', 'projectHours', 'directProjectCosts', 'profitMarginPercent', 'hasIVA',
    ]);
    expect(comparison.summary).toContain('Han cambiado 5 entradas.');
    expect(comparison.summary).toContain('efecto conjunto');
    expect(comparison.metrics.find(({ key }) => key === 'recommendedProjectBudget')?.b).toBe(1323.07);
    expect(comparison.metrics.find(({ key }) => key === 'vatAmount')?.b).toBe(0);
    expect(a.projectHours).toBe(18);
  });

  it('keeps IVA separate from net prices when only its setting changes', () => {
    const comparison = compareQuoteSituations(a, createQuoteSituation({ ...DEFAULT_FORM_VALUES, hasIVA: false }))!;
    expect(comparison.metrics.slice(0, 3).every((metric) => metric.difference === 0)).toBe(true);
    expect(comparison.metrics[3].difference).toBe(-170.35);
    expect(comparison.summary).toContain('sin IVA no cambia');
  });

  it('does not show a stale comparison for an invalid B', () => {
    expect(compareQuoteSituations(a, createQuoteSituation({ ...DEFAULT_FORM_VALUES, projectHours: '' }))).toBeNull();
  });

  it('distinguishes different inputs even when their displayed results round to the same values', () => {
    const comparison = compareQuoteSituations(a, createQuoteSituation({
      ...DEFAULT_FORM_VALUES, directProjectCosts: '0.000001',
    }))!;
    expect(comparison.changes).toHaveLength(1);
    expect(comparison.metrics.every((metric) => metric.difference === 0)).toBe(true);
    expect(comparison.summary).toContain('no cambia a la precisión mostrada');
    expect(comparison.summary).not.toContain('mismos datos');
  });

  it('does not add a tax row when neither situation adds IVA', () => {
    const noIVA = createQuoteSituation({ ...DEFAULT_FORM_VALUES, hasIVA: false })!;
    expect(compareQuoteSituations(noIVA, noIVA)?.metrics).toHaveLength(3);
  });

  it('supports minimum hours and maximum supported percentages', () => {
    const b = createQuoteSituation({
      ...DEFAULT_FORM_VALUES, billableHoursPerMonth: '1', projectHours: '0.5',
      revisionBufferPercent: '100', profitMarginPercent: '100', taxReservePercent: '99',
    })!;
    expect(b).not.toBeNull();
    expect(compareQuoteSituations(a, b)?.metrics.every((row) => Number.isFinite(row.difference))).toBe(true);
  });

  it('handles a zero rounded baseline without dividing by zero', () => {
    const zero = createQuoteSituation({ ...DEFAULT_FORM_VALUES, targetMonthlyNet: '0.0000001', monthlyFixedCosts: '0' })!;
    const comparison = compareQuoteSituations(zero, a)!;
    expect(comparison.metrics.find(({ key }) => key === 'recommendedProjectBudget')?.difference).toBe(811.18);
    expect(comparison.summary).not.toMatch(/Infinity|NaN/);
  });

  it('subtracts displayed rounded values instead of rounding an unshown raw delta', () => {
    const comparison = compareQuoteSituations(a, createQuoteSituation({ ...DEFAULT_FORM_VALUES, projectHours: '21' }))!;
    expect(comparison.metrics[1].a).toBe(737.44);
    expect(comparison.metrics[1].b).toBe(860.34);
    expect(comparison.metrics[1].difference).toBe(122.9);
    expect(comparison.metrics[1].difference).not.toBe(122.91);
  });

  it('reverses every monetary difference when A and B are exchanged', () => {
    const b = createQuoteSituation({ ...DEFAULT_FORM_VALUES, projectHours: '1.5' })!;
    const forward = compareQuoteSituations(a, b)!;
    const reverse = compareQuoteSituations(b, a)!;
    for (const row of forward.metrics.filter(({ unit }) => unit === 'currency')) {
      expect(reverse.metrics.find(({ key }) => key === row.key)?.difference).toBe(-row.difference);
    }
    expect(forward.metrics.find(({ key }) => key === 'recommendedProjectBudget')?.b).toBe(67.60);
    expect(forward.metrics.find(({ key }) => key === 'vatAmount')?.b).toBe(14.20);
  });
});
