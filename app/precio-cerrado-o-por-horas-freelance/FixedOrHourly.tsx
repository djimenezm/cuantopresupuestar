'use client';

import { useState, type FormEvent } from 'react';
import { formatCurrency, formatNumber } from '@/lib/format';
import { parsePaymentBudget } from '@/lib/paymentSchedule';
import { parseSpanishNumber } from '@/lib/spanishNumber';
import styles from './FixedOrHourly.module.css';

type ComparisonResult = {
  fixedCents: number;
  equalityHours: string;
  estimate?: { hours: number; hourlyCents: number; differenceCents: number };
};

type InputError = { field: 'fixed' | 'rate' | 'hours'; message: string };

function formatEqualityHours(fixedCents: number, rateCents: number) {
  const hours = fixedCents / rateCents;
  if (hours < 0.01) return 'Menos de 0,01 h';

  const isApproximate = (fixedCents * 100) % rateCents !== 0;
  return `${formatNumber(hours, 2)} h${isApproximate ? ' aprox.' : ''}`;
}

function comparePrices(fixed: string, rate: string, hours: string): ComparisonResult | InputError {
  const price = parsePaymentBudget(fixed);
  if ('error' in price) return { field: 'fixed', message: price.error };

  const hourlyRate = parsePaymentBudget(rate.trim().replace(/\s*\/\s*h$/i, ''));
  if ('error' in hourlyRate) {
    return {
      field: 'rate',
      message: 'Introduce una tarifa por hora válida, mayor que 0 y con un máximo de dos decimales.',
    };
  }

  const fixedCents = price.cents;
  const rateCents = hourlyRate.cents;
  const equalityHours = formatEqualityHours(fixedCents, rateCents);
  const enteredHours = hours.trim();
  if (!enteredHours) return { fixedCents, equalityHours };

  if (!/^\d+(?:[,.]\d{1,2})?$/.test(enteredHours)) {
    return {
      field: 'hours',
      message: 'Introduce un número de horas igual o mayor que 0, con un máximo de dos decimales.',
    };
  }

  const hourHundredths = Math.round(parseSpanishNumber(enteredHours) * 100);
  const amountInHundredthsOfCent = rateCents * hourHundredths;
  if (!Number.isSafeInteger(amountInHundredthsOfCent)) {
    return { field: 'hours', message: 'El importe por horas es demasiado alto. Reduce las horas o la tarifa.' };
  }

  const hourlyCents = Math.round(amountInHundredthsOfCent / 100);
  return {
    fixedCents,
    equalityHours,
    estimate: { hours: hourHundredths / 100, hourlyCents, differenceCents: hourlyCents - fixedCents },
  };
}

export default function FixedOrHourly() {
  const [fixed, setFixed] = useState('');
  const [rate, setRate] = useState('');
  const [hours, setHours] = useState('');
  const [outcome, setOutcome] = useState<ComparisonResult | InputError | null>(null);
  const error = outcome && 'field' in outcome ? outcome : null;
  const result = outcome && 'fixedCents' in outcome ? outcome : null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutcome(comparePrices(fixed, rate, hours));
  }

  return (
    <section id="comparar-modelos" aria-labelledby="comparar-modelos-title" className={`feature-card ${styles.card}`}>
      <h3 id="comparar-modelos-title">Compara precio cerrado y cobro por horas</h3>
      <p id="comparar-modelos-help">
        Usa importes sin IVA para el mismo alcance. Las horas en que se igualan se calculan
        dividiendo el precio cerrado entre la tarifa por hora. Prueba con 1.500 €, 60 €/h y 30 horas.
      </p>
      <form className="calculator-form" onSubmit={handleSubmit} onChange={() => setOutcome(null)} noValidate>
        <div className={styles.fields}>
          <label>
            <span>Precio cerrado sin IVA (€)</span>
            <input
              inputMode="decimal"
              value={fixed}
              onChange={(event) => setFixed(event.target.value)}
              required
              aria-invalid={error?.field === 'fixed' || undefined}
              aria-describedby={error?.field === 'fixed' ? 'comparar-modelos-error' : 'comparar-modelos-help'}
            />
          </label>
          <label>
            <span>Tarifa sin IVA (€/h)</span>
            <input
              inputMode="decimal"
              value={rate}
              onChange={(event) => setRate(event.target.value)}
              required
              aria-invalid={error?.field === 'rate' || undefined}
              aria-describedby={error?.field === 'rate' ? 'comparar-modelos-error' : undefined}
            />
          </label>
          <label>
            <span>Horas facturables estimadas (opcional)</span>
            <input
              inputMode="decimal"
              value={hours}
              onChange={(event) => setHours(event.target.value)}
              aria-invalid={error?.field === 'hours' || undefined}
              aria-describedby={error?.field === 'hours' ? 'comparar-modelos-error' : undefined}
            />
          </label>
        </div>
        <button type="submit" className="primary-button">Comparar importes</button>
      </form>

      <div role="status">
        {error && <small id="comparar-modelos-error" className={`field-error ${styles.error}`}>{error.message}</small>}
        {result && (
          <>
            <dl className="worked-example">
              <div>
                <dt>Horas para igualar los importes</dt>
                <dd>{result.equalityHours}</dd>
              </div>
              <div>
                <dt>Precio cerrado</dt>
                <dd>{formatCurrency(result.fixedCents / 100)}</dd>
              </div>
              {result.estimate && <EstimateRows estimate={result.estimate} />}
            </dl>
            {!result.estimate && (
              <p>
                Antes del redondeo al céntimo, por debajo del punto de igualdad facturas más a
                precio cerrado. Por encima, facturas más por horas.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function EstimateRows({ estimate }: { estimate: NonNullable<ComparisonResult['estimate']> }) {
  const { hours, hourlyCents, differenceCents } = estimate;
  let differenceLabel = 'Diferencia';
  if (differenceCents > 0) differenceLabel = 'Más por horas';
  if (differenceCents < 0) differenceLabel = 'Más a precio cerrado';

  return (
    <>
      <div>
        <dt>Por horas a {formatNumber(hours, 2)} h</dt>
        <dd>{formatCurrency(hourlyCents / 100)}</dd>
      </div>
      <div>
        <dt>{differenceLabel}</dt>
        <dd>{formatCurrency(Math.abs(differenceCents) / 100)}</dd>
      </div>
    </>
  );
}
