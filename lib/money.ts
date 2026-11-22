const centFormatter = new Intl.NumberFormat('en-US', {
  useGrouping: false,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  roundingMode: 'halfExpand',
});

// Below 2^46 euros, number spacing stays below a cent, including signed differences.
const MAX_CENTS = 2 ** 46 * 100 - 1;

function isValidCents(value: number) {
  return Number.isSafeInteger(value) && Math.abs(value) <= MAX_CENTS;
}

function safeCents(value: number) {
  return isValidCents(value) ? (value === 0 ? 0 : value) : NaN;
}

export function toCents(amount: number) {
  if (!Number.isFinite(amount)) return NaN;

  // Intl rounds the decimal value before conversion, avoiding amount * 100 ties.
  const parts = centFormatter.formatToParts(amount);
  const integer = parts.find(({ type }) => type === 'integer')?.value;
  const fraction = parts.find(({ type }) => type === 'fraction')?.value;
  if (!integer || !fraction) return NaN;
  const sign = parts.some(({ type }) => type === 'minusSign') ? -1 : 1;
  return safeCents(Number(integer + fraction) * sign);
}

export function fromCents(cents: number) {
  if (!isValidCents(cents)) return NaN;
  const amount = cents / 100;
  // The public result still uses numbers; reject a conversion that loses a cent.
  return toCents(amount) === cents ? (amount === 0 ? 0 : amount) : NaN;
}

export function roundMoney(amount: number) {
  return fromCents(toCents(amount));
}

export function addCents(a: number, b: number) {
  return isValidCents(a) && isValidCents(b) ? safeCents(a + b) : NaN;
}

export function percentageOfCents(cents: number, percent: number) {
  if (!isValidCents(cents) || cents < 0 ||
    !Number.isInteger(percent) || percent < 0 || percent > 100) return NaN;

  // Exact integer arithmetic preserves half-cent ties even near numeric limits.
  const numerator = BigInt(cents) * BigInt(percent);
  const rounded = (numerator + BigInt(50)) / BigInt(100);
  return safeCents(Number(rounded));
}

export function subtractMoney(a: number, b: number) {
  return fromCents(toCents(a) - toCents(b));
}
