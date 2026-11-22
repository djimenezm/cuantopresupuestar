'use client';

import { useState, type FormEvent } from 'react';
import { formatCurrency } from '@/lib/format';
import { parsePaymentBudget, parsePaymentPercentage, roundPaymentCents } from '@/lib/paymentSchedule';
import styles from './PaymentSplit.module.css';

type SplitResult = {
  budgetCents: number;
  advanceCents: number;
  balanceCents: number;
  advancePercent: number;
};

type InputError = { field: 'budget' | 'advance'; message: string };

function calculatePaymentSplit(budget: string, advance: string): SplitResult | InputError {
  const parsedBudget = parsePaymentBudget(budget);
  if ('error' in parsedBudget) {
    return { field: 'budget', message: parsedBudget.error };
  }
  const { cents: budgetCents } = parsedBudget;
  if (budgetCents < 2) {
    return { field: 'budget', message: 'Introduce al menos 0,02 € para repartir el presupuesto en dos pagos.' };
  }

  const advancePercent = parsePaymentPercentage(advance);
  if (advancePercent === null) {
    return { field: 'advance', message: 'Introduce un porcentaje entero del 1 al 99.' };
  }

  const advanceCents = roundPaymentCents(budgetCents, advancePercent);
  const balanceCents = budgetCents - advanceCents;
  if (advanceCents < 1 || balanceCents < 1) {
    return {
      field: 'advance',
      message: 'Ajusta el presupuesto o el porcentaje para que cada pago sea de al menos 0,01 €.',
    };
  }

  return { budgetCents, advanceCents, balanceCents, advancePercent };
}

export default function PaymentSplit() {
  const [budget, setBudget] = useState('');
  const [advance, setAdvance] = useState('50');
  const [outcome, setOutcome] = useState<SplitResult | InputError | null>(null);
  const error = outcome && 'field' in outcome ? outcome : null;
  const result = outcome && 'budgetCents' in outcome ? outcome : null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutcome(calculatePaymentSplit(budget, advance));
  }

  return (
    <section id="reparto-pagos" aria-labelledby="reparto-pagos-title" className={`feature-card ${styles.card}`}>
      <h3 id="reparto-pagos-title">Calcula el anticipo y el saldo</h3>
      <p id="reparto-pagos-help">
        Prueba con 1.200,01 € y un 50 % de anticipo. El anticipo se redondea al céntimo y el saldo
        completa el presupuesto.
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
              aria-invalid={error?.field === 'budget' || undefined}
              aria-describedby={error?.field === 'budget' ? 'reparto-pagos-error' : 'reparto-pagos-help'}
            />
          </label>
          <label>
            <span>Anticipo (%)</span>
            <input
              inputMode="numeric"
              value={advance}
              onChange={(event) => setAdvance(event.target.value)}
              required
              aria-invalid={error?.field === 'advance' || undefined}
              aria-describedby={error?.field === 'advance' ? 'reparto-pagos-error' : undefined}
            />
          </label>
        </div>
        <button type="submit" className="primary-button">Calcular reparto</button>
      </form>

      <div role="status">
        {error && <small id="reparto-pagos-error" className={`field-error ${styles.error}`}>{error.message}</small>}
        {result && (
          <dl className="worked-example">
            <div>
              <dt>Anticipo ({result.advancePercent} %) al aceptar, antes de empezar</dt>
              <dd>{formatCurrency(result.advanceCents / 100)}</dd>
            </div>
            <div>
              <dt>Saldo antes de la entrega final</dt>
              <dd>{formatCurrency(result.balanceCents / 100)}</dd>
            </div>
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
