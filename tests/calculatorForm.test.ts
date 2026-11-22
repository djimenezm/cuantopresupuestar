import { describe, expect, it } from 'vitest';
import {
  DEFAULT_FORM_VALUES,
  getNormalizedPastedValue,
  normalizeFieldValue,
  parseInputNumber,
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

  it.each([
    ['0,125', '0.13'],
    ['1,005', '1.01'],
    ['12,345', '12.35'],
  ])('rounds pasted %s to cents without rescaling it', (pasted, expected) => {
    expect(getNormalizedPastedValue('directProjectCosts', pasted)).toBe(expected);
    expect(normalizeFieldValue('directProjectCosts', expected)).toBe(expected);
  });

  it('reads the decimal point in native number inputs as a decimal separator', () => {
    expect(normalizeFieldValue('directProjectCosts', '1.234')).toBe('1.23');
    expect(validateForm({ ...numericValues, billableHoursPerMonth: '1.234' }))
      .toHaveProperty('billableHoursPerMonth', 'Las horas facturables deben ser un número entero.');
  });

  it.each(['', ' ', '1,234', '2.500,50 €', 'NaN', 'Infinity', '0x10', '1e999'])
    ('rejects non-canonical or non-finite numeric state %j', (value) => {
      expect(parseInputNumber(value)).toBeNaN();
    });

  it('supports finite decimal and exponent values from native number inputs', () => {
    expect(parseInputNumber('1.234')).toBe(1.234);
    expect(parseInputNumber('1e-3')).toBe(0.001);
    expect(parseInputNumber('1e+3')).toBe(1000);
  });

  it('rejects project hours below the engine minimum without changing the entry', () => {
    expect(validateForm({ ...numericValues, projectHours: '0.25' }))
      .toHaveProperty('projectHours', 'Las horas del proyecto deben ser como mínimo 0,5.');
    expect(normalizeFieldValue('projectHours', '0.25')).toBe('0.25');
    expect(getNormalizedPastedValue('projectHours', '0,25')).toBe('0.25');
    expect(validateForm({ ...numericValues, projectHours: '0.5' })).toEqual({});
  });

  it('rejects percentages outside their individual limits', () => {
    expect(validateForm({ ...numericValues, taxReservePercent: '100' }))
      .toHaveProperty('taxReservePercent');
    expect(validateForm({ ...numericValues, profitMarginPercent: '101' }))
      .toHaveProperty('profitMarginPercent');
  });
});
