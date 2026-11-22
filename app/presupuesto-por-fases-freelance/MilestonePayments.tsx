'use client';

import { useState, type FormEvent } from 'react';
import { formatCurrency } from '@/lib/format';
import { parsePaymentBudget, parsePaymentPercentage, roundPaymentCents } from '@/lib/paymentSchedule';
import styles from './MilestonePayments.module.css';

type PaymentResult = {
  budgetCents: number;
  payments: { moment: string; percent: number; cents: number }[];
};

type InputError = {
  field: 'budget' | 'initial' | 'intermediate' | 'percentages' | 'schedule';
  message: string;
};

function calculateMilestonePayments(
  budget: string,
  initial: string,
  intermediate: string,
): PaymentResult | InputError {
  const amount = parsePaymentBudget(budget);
  if ('error' in amount) return { field: 'budget', message: amount.error };
  const budgetCents = amount.cents;
  if (budgetCents < 3) {
    return { field: 'budget', message: 'Introduce al menos 0,03 € para repartir el presupuesto en tres hitos.' };
  }

  const initialPercent = parsePaymentPercentage(initial);
  if (initialPercent === null) return { field: 'initial', message: 'Introduce un porcentaje entero del 1 al 99.' };

  const intermediatePercent = parsePaymentPercentage(intermediate);
  if (intermediatePercent === null) {
    return { field: 'intermediate', message: 'Introduce un porcentaje entero del 1 al 99.' };
  }

  const finalPercent = 100 - initialPercent - intermediatePercent;
  if (finalPercent < 1) {
    return { field: 'percentages', message: 'Deja al menos un 1 % para el hito de cierre.' };
  }

  const initialCents = roundPaymentCents(budgetCents, initialPercent);
  const intermediateCents = roundPaymentCents(budgetCents, intermediatePercent);
  const finalCents = budgetCents - initialCents - intermediateCents;
  if (Math.min(initialCents, intermediateCents, finalCents) < 1) {
    return {
      field: 'schedule',
      message: 'Ajusta el presupuesto o los porcentajes para que cada hito sea de al menos 0,01 €.',
    };
  }

  return {
    budgetCents,
    payments: [
      { moment: 'al aceptar el presupuesto, antes de empezar', percent: initialPercent, cents: initialCents },
      { moment: 'al aprobar la fase principal', percent: intermediatePercent, cents: intermediateCents },
      { moment: 'antes de la entrega final', percent: finalPercent, cents: finalCents },
    ],
  };
}

export default function MilestonePayments() {
  const [budget, setBudget] = useState('');
  const [initial, setInitial] = useState('40');
  const [intermediate, setIntermediate] = useState('40');
  const [outcome, setOutcome] = useState<PaymentResult | InputError | null>(null);
  const error = outcome && 'field' in outcome ? outcome : null;
  const result = outcome && 'payments' in outcome ? outcome : null;
  const budgetInvalid = error?.field === 'budget';
  const initialInvalid = error?.field === 'initial' || error?.field === 'percentages';
  const intermediateInvalid = error?.field === 'intermediate' || error?.field === 'percentages';

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutcome(calculateMilestonePayments(budget, initial, intermediate));
  }

  return (
    <section id="reparto-hitos" aria-labelledby="reparto-hitos-title" className={`feature-card ${styles.card}`}>
      <h3 id="reparto-hitos-title">Reparte tu presupuesto en tres hitos</h3>
      <p id="reparto-hitos-help">
        Prueba con 1.200,01 € y el reparto inicial del 40 %, 40 % y 20 %. Puedes ajustar los dos
        primeros porcentajes. El último se calcula con lo que falta hasta el 100 % y su importe
        recoge el ajuste de redondeo.
      </p>
      <form className="calculator-form" onSubmit={handleSubmit} onChange={() => setOutcome(null)} noValidate>
        <div className={styles.fields}>
          <label>
            <span>Presupuesto sin IVA (€)</span>
            <input
              inputMode="decimal"
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
              required
              aria-invalid={budgetInvalid || undefined}
              aria-describedby={budgetInvalid ? 'reparto-hitos-error' : 'reparto-hitos-help'}
            />
          </label>
          <label>
            <span>Hito inicial (%)</span>
            <input
              inputMode="numeric"
              value={initial}
              onChange={(event) => setInitial(event.target.value)}
              required
              aria-invalid={initialInvalid || undefined}
              aria-describedby={initialInvalid ? 'reparto-hitos-error' : undefined}
            />
          </label>
          <label>
            <span>Hito intermedio (%)</span>
            <input
              inputMode="numeric"
              value={intermediate}
              onChange={(event) => setIntermediate(event.target.value)}
              required
              aria-invalid={intermediateInvalid || undefined}
              aria-describedby={intermediateInvalid ? 'reparto-hitos-error' : undefined}
            />
          </label>
        </div>
        <button type="submit" className="primary-button">Calcular reparto</button>
      </form>

      <div role="status">
        {error && <small id="reparto-hitos-error" className={`field-error ${styles.error}`}>{error.message}</small>}
        {result && (
          <dl className="worked-example">
            {result.payments.map(({ moment, percent, cents }) => (
              <div key={moment}>
                <dt>{percent} % {moment}</dt>
                <dd>{formatCurrency(cents / 100)}</dd>
              </div>
            ))}
            <div>
              <dt>Total sin IVA</dt>
              <dd>{formatCurrency(result.budgetCents / 100)}</dd>
            </div>
          </dl>
        )}
      </div>
    </section>
  );
}
