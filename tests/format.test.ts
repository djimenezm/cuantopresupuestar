import { describe, expect, it } from 'vitest';
import { formatNumber } from '@/lib/format';

describe('formatNumber', () => {
  it('formats fractional hours using the Spanish decimal separator', () => {
    expect(formatNumber(20.7, 2)).toBe('20,7');
    expect(formatNumber(25.18, 2)).toBe('25,18');
  });
});
