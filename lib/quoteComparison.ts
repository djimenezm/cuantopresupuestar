import { calculateProjectQuote, type CalculatorInput } from '@/lib/calculator';
import { parseInputNumber, validateForm, type FieldName } from '@/lib/calculatorForm';
import { formatCurrency, formatNumber } from '@/lib/format';
import { subtractMoney } from '@/lib/money';

export type QuoteSituation = Readonly<CalculatorInput>;
export type QuoteFormValues = Record<FieldName, string> & { hasIVA: boolean };
type InputChange = { key: keyof CalculatorInput; label: string; a: string; b: string };
type MetricDefinition = {
  key: 'bufferedProjectHours' | 'projectFloorPrice' | 'recommendedProjectBudget' | 'vatAmount';
  label: string;
  unit: 'hours' | 'currency';
};

const fields = [
  { key: 'targetMonthlyNet', label: 'Objetivo mensual neto', unit: 'EUR' },
  { key: 'monthlyFixedCosts', label: 'Costes fijos mensuales', unit: 'EUR' },
  { key: 'billableHoursPerMonth', label: 'Horas facturables al mes', unit: 'h' },
  { key: 'projectHours', label: 'Horas estimadas del proyecto', unit: 'h' },
  { key: 'revisionBufferPercent', label: 'Buffer de revisiones e imprevistos', unit: '%' },
  { key: 'directProjectCosts', label: 'Costes directos del proyecto', unit: 'EUR' },
  { key: 'taxReservePercent', label: 'Reserva fiscal orientativa', unit: '%' },
  { key: 'profitMarginPercent', label: 'Recargo sobre el precio mínimo', unit: '%' },
] as const satisfies ReadonlyArray<{ key: FieldName; label: string; unit: string }>;

export function createQuoteSituation(values: QuoteFormValues): QuoteSituation | null {
  const { hasIVA, ...numericValues } = values;
  if (Object.keys(validateForm(numericValues)).length > 0) return null;

  const input: CalculatorInput = {
    ...Object.fromEntries(
      fields.map(({ key }) => [key, parseInputNumber(values[key])]),
    ) as Record<FieldName, number>,
    hasIVA,
  };
  const result = calculateProjectQuote(input);
  if (!Object.values(result).every(Number.isFinite)) return null;

  // Store only independent inputs; both situations always use the current calculation engine.
  return Object.freeze(input);
}

function difference(a: number, b: number) {
  const delta = Math.round((b - a) * 100) / 100;
  return delta === 0 ? 0 : delta;
}

export function compareQuoteSituations(a: QuoteSituation, b: QuoteSituation | null) {
  if (!b) return null;

  const resultA = calculateProjectQuote(a);
  const resultB = calculateProjectQuote(b);
  if (![resultA, resultB].every((result) => Object.values(result).every(Number.isFinite))) {
    return null;
  }

  const changes: InputChange[] = fields
    .filter(({ key }) => a[key] !== b[key])
    .map(({ key, label, unit }) => ({
      key,
      label,
      a: `${formatNumber(a[key], 20)} ${unit}`,
      b: `${formatNumber(b[key], 20)} ${unit}`,
    }));
  if (a.hasIVA !== b.hasIVA) {
    changes.push({
      key: 'hasIVA', label: 'Añadir IVA', a: a.hasIVA ? 'Sí' : 'No', b: b.hasIVA ? 'Sí' : 'No',
    });
  }

  const metricDefinitions: MetricDefinition[] = [
    { key: 'bufferedProjectHours', label: 'Horas con buffer', unit: 'hours' },
    { key: 'projectFloorPrice', label: 'Precio mínimo sin IVA', unit: 'currency' },
    { key: 'recommendedProjectBudget', label: 'Presupuesto recomendado sin IVA', unit: 'currency' },
  ];
  if (a.hasIVA || b.hasIVA) {
    metricDefinitions.push({ key: 'vatAmount', label: 'IVA añadido', unit: 'currency' });
  }
  const metrics = metricDefinitions.map(({ key, label, unit }) => {
    const valueA = resultA[key];
    const valueB = resultB[key];
    return {
      key, label, unit, a: valueA, b: valueB,
      difference: unit === 'currency' ? subtractMoney(valueB, valueA) : difference(valueA, valueB),
    };
  });

  const budgetDelta = subtractMoney(resultB.recommendedProjectBudget, resultA.recommendedProjectBudget);
  const budgetSummary = budgetDelta === 0
    ? 'El presupuesto recomendado sin IVA no cambia a la precisión mostrada.'
    : `El presupuesto recomendado sin IVA ${budgetDelta > 0 ? 'sube' : 'baja'} ${formatCurrency(Math.abs(budgetDelta))}.`;
  const summary = changes.length === 0
    ? 'A y B tienen los mismos datos y resultados.'
    : changes.length === 1
      ? `Se ha modificado una entrada: ${changes[0].label.toLocaleLowerCase('es-ES')}. ${budgetSummary}`
      : `Han cambiado ${changes.length} entradas. ${budgetSummary} La diferencia refleja su efecto conjunto, no el de una sola variable.`;

  return { changes, metrics, summary };
}
