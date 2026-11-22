import { parseSpanishNumber } from './spanishNumber';

const euroAmountPattern = /^(?:\d+(?:[,.]\d{1,2})?|[1-9]\d{0,2}(?:\.\d{3})+(?:,\d{1,2})?)\s*€?$/;
// Keep the multiplication by a whole percentage within the safe integer range.
const maxEuroCents = Math.floor(Number.MAX_SAFE_INTEGER / 100);

export function parseEuroCents(value: string): { cents: number } | { error: 'invalid' | 'limit' } {
  const cents = Math.round(parseSpanishNumber(value) * 100);
  if (!euroAmountPattern.test(value.trim()) || !Number.isFinite(cents) || cents < 0) {
    return { error: 'invalid' };
  }
  if (cents > maxEuroCents) {
    return { error: 'limit' };
  }

  return { cents };
}

export function parsePaymentBudget(value: string): { cents: number } | { error: string } {
  const amount = parseEuroCents(value);
  if ('cents' in amount && amount.cents > 0) return amount;

  return {
    error: 'error' in amount && amount.error === 'limit'
      ? 'Introduce un presupuesto de menor importe.'
      : 'Introduce un presupuesto mayor que 0 €, con un máximo de dos decimales.',
  };
}

export function parsePaymentPercentage(value: string): number | null {
  const text = value.trim();
  if (!/^\d{1,2}(?:\s*%)?$/.test(text)) return null;

  const percent = Number.parseInt(text, 10);
  return percent > 0 ? percent : null;
}

export function roundPaymentCents(budgetCents: number, percent: number): number {
  return Math.round(budgetCents * percent / 100);
}
