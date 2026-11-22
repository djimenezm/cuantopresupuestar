import { parseEuroCents } from './paymentSchedule';
import { parseSpanishNumber } from './spanishNumber';

type QuoteLine = { hoursHundredths: number; costCents: number; amountCents: number };
type QuoteLineError = { error: 'hours' | 'cost' | 'workLimit' };

const hoursPattern = /^\d+(?:[,.]\d{1,2})?$/;
export const maxQuoteCents = Math.floor(Number.MAX_SAFE_INTEGER / 100);

export function parseQuoteRate(value: string): number | null {
  const rate = parseEuroCents(value.trim().replace(/\s*\/\s*h$/i, ''));
  return 'cents' in rate && rate.cents > 0 ? rate.cents : null;
}

export function calculateQuoteLine(hours: string, cost: string, rateCents: number): QuoteLine | QuoteLineError {
  const hoursHundredths = Math.round(parseSpanishNumber(hours) * 100);
  if (!hoursPattern.test(hours.trim()) || !Number.isSafeInteger(hoursHundredths)) {
    return { error: 'hours' };
  }

  const parsedCost = parseEuroCents(cost);
  if ('error' in parsedCost) return { error: 'cost' };

  const workHundredthsOfCent = hoursHundredths * rateCents;
  if (!Number.isSafeInteger(workHundredthsOfCent)) return { error: 'workLimit' };

  const costCents = parsedCost.cents;
  return { hoursHundredths, costCents, amountCents: Math.round(workHundredthsOfCent / 100) + costCents };
}
