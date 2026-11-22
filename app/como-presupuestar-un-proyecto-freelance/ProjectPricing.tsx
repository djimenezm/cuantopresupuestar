'use client';

import { useState, type FormEvent } from 'react';
import { formatCurrency, formatNumber } from '@/lib/format';
import { parseEuroCents } from '@/lib/paymentSchedule';
import { parseSpanishNumber } from '@/lib/spanishNumber';
import styles from './ProjectPricing.module.css';

const projectFields = [
  { field: 'hours', label: 'Horas estimadas del proyecto' },
  { field: 'rate', label: 'Tarifa interna sin IVA (€/h)' },
  { field: 'cost', label: 'Costes directos sin IVA (€)' },
  { field: 'reserve', label: 'Reserva para revisiones (%)' },
  { field: 'markup', label: 'Recargo sobre el mínimo (%)' },
] as const;

type PricingField = (typeof projectFields)[number]['field'];
type PricingFields = Record<PricingField, string>;
type InputError = { field: PricingField; message: string };

type PricingResult = {
  bufferedHours: number;
  reservePercent: number;
  workCents: number;
  costCents: number;
  minimumCents: number;
  markupPercent: number;
  markupCents: number;
  recommendedCents: number;
};

const hoursPattern = /^\d+(?:[,.]\d{1,2})?$/;
const percentPattern = /^\d+(?:[,.]\d)?(?:\s*%)?$/;
const hundredthsOfHourScale = 100;
const percentTenthsScale = 1000;
const bufferedHoursScale = hundredthsOfHourScale * percentTenthsScale;
// Keep the calculated amounts exact when passing euros to the currency formatter.
const maxQuoteCents = BigInt(Math.floor(Number.MAX_SAFE_INTEGER / 100));

function parsePercentTenths(value: string) {
  const percent = parseSpanishNumber(value);
  if (!percentPattern.test(value.trim()) || !Number.isFinite(percent) || percent > 100) return null;
  return Math.round(percent * 10);
}

function roundRatio(numerator: bigint, denominator: number) {
  const divisor = BigInt(denominator);
  return (numerator + divisor / BigInt(2)) / divisor;
}

function calculatePricing(fields: PricingFields): PricingResult | InputError {
  const hoursHundredths = Math.round(parseSpanishNumber(fields.hours) * hundredthsOfHourScale);
  if (!hoursPattern.test(fields.hours.trim()) || !Number.isSafeInteger(hoursHundredths) || hoursHundredths < 1) {
    return { field: 'hours', message: 'Introduce horas mayores que 0, con un máximo de dos decimales.' };
  }

  const rate = parseEuroCents(fields.rate.trim().replace(/\s*\/\s*h$/i, ''));
  if ('error' in rate || rate.cents === 0) {
    return { field: 'rate', message: 'Introduce una tarifa válida mayor que 0 €/h, con un máximo de dos decimales.' };
  }

  const cost = parseEuroCents(fields.cost);
  if ('error' in cost) {
    return { field: 'cost', message: 'Introduce un coste válido igual o mayor que 0 €, con un máximo de dos decimales.' };
  }

  const reserveTenths = parsePercentTenths(fields.reserve);
  if (reserveTenths === null) {
    return { field: 'reserve', message: 'Introduce una reserva del 0 al 100 %, con un máximo de un decimal.' };
  }

  const markupTenths = parsePercentTenths(fields.markup);
  if (markupTenths === null) {
    return { field: 'markup', message: 'Introduce un recargo del 0 al 100 %, con un máximo de un decimal.' };
  }

  // The hours with reserve can have up to five decimal places. Round only the price of the work.
  const bufferedHoursUnits = BigInt(hoursHundredths) * BigInt(percentTenthsScale + reserveTenths);
  const workCents = roundRatio(bufferedHoursUnits * BigInt(rate.cents), bufferedHoursScale);
  const minimumCents = workCents + BigInt(cost.cents);
  const markupCents = roundRatio(minimumCents * BigInt(markupTenths), percentTenthsScale);
  const recommendedCents = minimumCents + markupCents;
  if (recommendedCents > maxQuoteCents || !Number.isSafeInteger(Number(bufferedHoursUnits))) {
    return { field: 'hours', message: 'El presupuesto es demasiado alto. Revisa las horas y los importes.' };
  }

  return {
    bufferedHours: Number(bufferedHoursUnits) / bufferedHoursScale,
    reservePercent: reserveTenths / 10,
    workCents: Number(workCents),
    costCents: cost.cents,
    minimumCents: Number(minimumCents),
    markupPercent: markupTenths / 10,
    markupCents: Number(markupCents),
    recommendedCents: Number(recommendedCents),
  };
}

export default function ProjectPricing() {
  const [fields, setFields] = useState<PricingFields>({ hours: '', rate: '', cost: '0', reserve: '15', markup: '10' });
  const [outcome, setOutcome] = useState<PricingResult | InputError | null>(null);
  const error = outcome && 'field' in outcome ? outcome : null;
  const result = outcome && 'minimumCents' in outcome ? outcome : null;

  function updateField(field: PricingField, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
    setOutcome(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutcome(calculatePricing(fields));
  }

  return (
    <section id="calcular-precio-proyecto" aria-labelledby="calcular-precio-proyecto-title" className={`feature-card ${styles.card}`}>
      <h3 id="calcular-precio-proyecto-title">Prueba con tus propios datos</h3>
      <p id="calcular-precio-proyecto-help">
        Prueba con 32 h a 40 €/h, 90 € de costes, un 15 % de reserva y un 10 % de recargo.
        La reserva aumenta las horas estimadas. El cálculo redondea el importe del trabajo a
        céntimos, suma los costes y aplica el recargo a ese mínimo. Los precios son sin IVA.
      </p>
      <form
        className="calculator-form"
        onSubmit={handleSubmit}
        aria-labelledby="calcular-precio-proyecto-title"
        aria-describedby="calcular-precio-proyecto-help"
        noValidate
      >
        <div className={styles.fields}>
          {projectFields.map(({ field, label }) => (
            <label key={field}>
              <span>{label}</span>
              <input
                inputMode="decimal"
                value={fields[field]}
                onChange={(event) => updateField(field, event.target.value)}
                required
                aria-invalid={error?.field === field || undefined}
                aria-describedby={error?.field === field ? 'calcular-precio-proyecto-error' : undefined}
              />
            </label>
          ))}
        </div>
        <button type="submit" className="primary-button">Calcular precios</button>
      </form>

      <div role="status">
        {error && <small id="calcular-precio-proyecto-error" className={`field-error ${styles.error}`}>{error.message}</small>}
        {result && (
          <dl className="worked-example">
            <div>
              <dt>Horas con reserva del {formatNumber(result.reservePercent)} %</dt>
              <dd>{formatNumber(result.bufferedHours, 5)} h</dd>
            </div>
            <div><dt>Trabajo a tu tarifa interna</dt><dd>{formatCurrency(result.workCents / 100)}</dd></div>
            <div><dt>Costes directos</dt><dd>{formatCurrency(result.costCents / 100)}</dd></div>
            <div><dt>Precio mínimo sin IVA</dt><dd>{formatCurrency(result.minimumCents / 100)}</dd></div>
            <div>
              <dt>Recargo del {formatNumber(result.markupPercent)} % sobre el mínimo</dt>
              <dd>{formatCurrency(result.markupCents / 100)}</dd>
            </div>
            <div><dt>Precio recomendado sin IVA</dt><dd>{formatCurrency(result.recommendedCents / 100)}</dd></div>
          </dl>
        )}
      </div>
    </section>
  );
}
