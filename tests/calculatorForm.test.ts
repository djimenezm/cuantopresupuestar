import { describe, expect, it } from 'vitest';
import {
  DEFAULT_FORM_VALUES,
  getNormalizedPastedValue,
  normalizeFieldValue,
  validateForm,
} from '@/lib/calculatorForm';

const numericValues = {
  targetMonthlyNet: DEFAULT_FORM_VALUES.targetMonthlyNet,
  monthlyFixedCosts: DEFAULT_FORM_VALUES.monthlyFixedCosts,
  billableHoursPerMonth: DEFAULT_FORM_VALUES.billableHoursPerMonth,
  projectHours: DEFAULT_FORM_VALUES.projectHours,
  revisionBufferPercent: DEFAULT_FORM_VALUES.revisionBufferPercent,
  directProjectCosts: DEFAULT_FORM_VALUES.directProjectCosts,
  taxReservePercent: DEFAULT_FORM_VALUES.taxReservePercent,
  profitMarginPercent: DEFAULT_FORM_VALUES.profitMarginPercent,
};

describe('calculator form values', () => {
  it('accepts the defaults and requires positive hours and project scope', () => {
    expect(validateForm(numericValues)).toEqual({});
    expect(validateForm({ ...numericValues, billableHoursPerMonth: '0' }))
      .toHaveProperty('billableHoursPerMonth');
    expect(validateForm({ ...numericValues, projectHours: '0' })).toHaveProperty('projectHours');
  });

  it('preserves invalid text and normalizes pasted currency', () => {
    expect(normalizeFieldValue('monthlyFixedCosts', 'invalid')).toBe('invalid');
    expect(getNormalizedPastedValue('monthlyFixedCosts', '2.500,50 €')).toBe('2500.5');
    expect(getNormalizedPastedValue('monthlyFixedCosts', 'invalid')).toBeNull();
  });

  it('rejects percentages outside their individual limits', () => {
    expect(validateForm({ ...numericValues, taxReservePercent: '100' }))
      .toHaveProperty('taxReservePercent');
    expect(validateForm({ ...numericValues, profitMarginPercent: '101' }))
      .toHaveProperty('profitMarginPercent');
  });
});
