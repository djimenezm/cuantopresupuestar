'use client';

import { useState, type FormEvent } from 'react';
import { formatCurrency, formatNumber } from '@/lib/format';
import { parseEuroCents, roundPaymentCents } from '@/lib/paymentSchedule';
import { parseSpanishNumber } from '@/lib/spanishNumber';
import styles from './AdaptedBudgetExample.module.css';

const exampleVatPercent = 21;
const hoursPattern = /^\d+(?:[,.]\d{1,2})?$/;

type BudgetResult = {
  hoursHundredths: number;
  rateCents: number;
  workCents: number;
  costCents: number;
  baseCents: number;
  vatCents: number;
};

type InputError = { field: 'hours' | 'rate' | 'cost'; message: string };

function calculateExample(hours: string, rate: string, cost: string): BudgetResult | InputError {
  const hoursHundredths = Math.round(parseSpanishNumber(hours) * 100);
  if (!hoursPattern.test(hours.trim()) || !Number.isSafeInteger(hoursHundredths) || hoursHundredths < 1) {
    return { field: 'hours', message: 'Introduce horas mayores que 0, con un máximo de dos decimales.' };
  }

  const hourlyRate = parseEuroCents(rate.trim().replace(/\s*\/\s*h$/i, ''));
  if ('error' in hourlyRate || hourlyRate.cents === 0) {
    return {
      field: 'rate',
      message: 'Introduce una tarifa válida mayor que 0 €/h, con un máximo de dos decimales.',
    };
  }

  const directCost = parseEuroCents(cost);
  if ('error' in directCost) {
    return {
      field: 'cost',
      message: 'Introduce un coste válido igual o mayor que 0 €, con un máximo de dos decimales.',
    };
  }

  const rateCents = hourlyRate.cents;
  const workHundredthsOfCent = hoursHundredths * rateCents;
  if (!Number.isSafeInteger(workHundredthsOfCent)) {
    return { field: 'hours', message: 'El importe del trabajo es demasiado alto. Reduce las horas o la tarifa.' };
  }

  const workCents = Math.round(workHundredthsOfCent / 100);
  const costCents = directCost.cents;
  const baseCents = workCents + costCents;
  const vatCents = roundPaymentCents(baseCents, exampleVatPercent);
  return { hoursHundredths, rateCents, workCents, costCents, baseCents, vatCents };
}

export default function AdaptedBudgetExample() {
  const [hours, setHours] = useState('');
  const [rate, setRate] = useState('');
  const [cost, setCost] = useState('0');
  const [outcome, setOutcome] = useState<BudgetResult | InputError | null>(null);
  const error = outcome && 'field' in outcome ? outcome : null;
  const result = outcome && 'baseCents' in outcome ? outcome : null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutcome(calculateExample(hours, rate, cost));
  }

  return (
    <section id="adaptar-ejemplo" aria-labelledby="adaptar-ejemplo-title" className={`feature-card ${styles.card}`}>
      <h3 id="adaptar-ejemplo-title">Adapta el presupuesto a tu proyecto</h3>
      <p id="adaptar-ejemplo-help">
        Usa horas con las revisiones ya incluidas, tu tarifa de venta y los costes directos que
        cobrarás al cliente. En este ejercicio, el precio sale de tu tarifa de venta sin añadir
        un recargo aparte. Prueba con 36,8 h a 40 €/h y 90 € de costes. El cálculo usa un IVA
        del {exampleVatPercent} % como supuesto y lo aplica al total sin IVA redondeado a céntimos.
      </p>
      <form className="calculator-form" onSubmit={handleSubmit} onChange={() => setOutcome(null)} noValidate>
        <div className={styles.fields}>
          <label>
            <span>Horas presupuestadas</span>
            <input
              inputMode="decimal"
              value={hours}
              onChange={(event) => setHours(event.target.value)}
              required
              aria-invalid={error?.field === 'hours' || undefined}
              aria-describedby={error?.field === 'hours' ? 'adaptar-ejemplo-error' : 'adaptar-ejemplo-help'}
            />
          </label>
          <label>
            <span>Tarifa de venta sin IVA (€/h)</span>
            <input
              inputMode="decimal"
              value={rate}
              onChange={(event) => setRate(event.target.value)}
              required
              aria-invalid={error?.field === 'rate' || undefined}
              aria-describedby={error?.field === 'rate' ? 'adaptar-ejemplo-error' : undefined}
            />
          </label>
          <label>
            <span>Costes directos sin IVA (€)</span>
            <input
              inputMode="decimal"
              value={cost}
              onChange={(event) => setCost(event.target.value)}
              required
              aria-invalid={error?.field === 'cost' || undefined}
              aria-describedby={error?.field === 'cost' ? 'adaptar-ejemplo-error' : undefined}
            />
          </label>
        </div>
        <button type="submit" className="primary-button">Calcular presupuesto</button>
      </form>

      <div role="status">
        {error && <small id="adaptar-ejemplo-error" className={`field-error ${styles.error}`}>{error.message}</small>}
        {result && (
          <dl className="worked-example">
            <div>
              <dt>Trabajo ({formatNumber(result.hoursHundredths / 100, 2)} h × {formatCurrency(result.rateCents / 100)}/h)</dt>
              <dd>{formatCurrency(result.workCents / 100)}</dd>
            </div>
            <div><dt>Costes directos</dt><dd>{formatCurrency(result.costCents / 100)}</dd></div>
            <div><dt>Total sin IVA</dt><dd>{formatCurrency(result.baseCents / 100)}</dd></div>
            <div><dt>IVA del ejemplo ({exampleVatPercent} %)</dt><dd>{formatCurrency(result.vatCents / 100)}</dd></div>
            <div><dt>Total con IVA</dt><dd>{formatCurrency((result.baseCents + result.vatCents) / 100)}</dd></div>
          </dl>
        )}
      </div>
    </section>
  );
}
