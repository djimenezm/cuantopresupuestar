import { describe, expect, it } from 'vitest';
import { addCents, fromCents, percentageOfCents, roundMoney, subtractMoney, toCents } from '@/lib/money';

describe('money in integer cents', () => {
  it.each([
    [0, 0], [0.005, 1], [0.105, 11], [1.005, 101],
    [10.075, 1008], [1.0049, 100], [1.0051, 101],
    [1e-7, 0], [-1.005, -101], [-0, 0],
  ])('converts %s to %s cents using decimal half-expand rounding', (amount, cents) => {
    expect(toCents(amount)).toBe(cents);
    expect(roundMoney(amount)).toBe(cents / 100);
    expect(Object.is(toCents(amount), -0)).toBe(false);
  });

  it('rounds a series of exact decimal half-cent ties upwards', () => {
    for (let cents = 0; cents < 200; cents++) {
      const amount = Number(((cents + 0.5) / 100).toFixed(3));
      expect(toCents(amount)).toBe(cents + 1);
    }
  });

  it('computes 21 percent of 50 cents exactly, including the half-cent tie', () => {
    expect(percentageOfCents(50, 21)).toBe(11);
    expect(fromCents(addCents(50, 11))).toBe(0.61);
    expect(percentageOfCents(6760, 21)).toBe(1420);
  });

  it('sums and subtracts closed monetary values without hidden fractional cents', () => {
    expect(addCents(6760, 1420)).toBe(8180);
    expect(subtractMoney(860.34, 737.44)).toBe(122.9);
    expect(subtractMoney(737.44, 860.34)).toBe(-122.9);
    expect(Object.is(subtractMoney(1.01, 1.01), -0)).toBe(false);
  });

  it('rejects unsafe or non-finite cent arithmetic instead of losing precision', () => {
    for (const value of [NaN, Infinity, -Infinity, 1e20]) expect(toCents(value)).toBeNaN();
    expect(addCents(Number.MAX_SAFE_INTEGER, 1)).toBeNaN();
    expect(addCents(0.5, 0.5)).toBeNaN();
    expect(fromCents(1.5)).toBeNaN();
    expect(fromCents(Number.MAX_SAFE_INTEGER)).toBeNaN();
    expect(percentageOfCents(Number.MAX_SAFE_INTEGER + 1, 21)).toBeNaN();
    expect(percentageOfCents(-50, 21)).toBeNaN();
    expect(percentageOfCents(50, 21.5)).toBeNaN();
    expect(percentageOfCents(50, 101)).toBeNaN();
  });

  it('keeps cents reversible at the upper supported monetary boundary', () => {
    const maximum = 2 ** 46 * 100 - 1;
    for (let offset = 0; offset < 100; offset++) {
      const cents = maximum - offset;
      expect(toCents(fromCents(cents))).toBe(cents);
      expect(toCents(fromCents(-cents))).toBe(-cents);
    }
    expect(fromCents(maximum + 1)).toBeNaN();
    expect(addCents(maximum, 1)).toBeNaN();
    expect(addCents(maximum + 1, -1)).toBeNaN();
    expect(percentageOfCents(maximum + 1, 0)).toBeNaN();
  });
});
