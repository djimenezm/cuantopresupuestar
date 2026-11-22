'use client';

import { useState, type FormEvent } from 'react';
import { formatCurrency, formatNumber } from '@/lib/format';
import { parseEuroCents } from '@/lib/paymentSchedule';
import styles from './BudgetMargin.module.css';

type MarginResult = { differenceCents: number; margin: string; markup: string };
type InputError = { field: 'cost' | 'price'; message: string };

const amountErrors = {
  invalid: 'Introduce un importe igual o mayor que 0 €, con un máximo de dos decimales.',
  limit: 'Introduce un importe menor.',
};

function formatPercentage(differenceCents: number, baseCents: number) {
  if (baseCents === 0) return null;

  const percent = differenceCents * 100 / baseCents;
  if (percent !== 0 && Math.abs(percent) < 0.005) return '≈ 0 %';
  return `${formatNumber(percent, 2)} %`;
}

function calculateMargin(cost: string, price: string): MarginResult | InputError {
  const parsedCost = parseEuroCents(cost);
  if ('error' in parsedCost) return { field: 'cost', message: amountErrors[parsedCost.error] };

  const parsedPrice = parseEuroCents(price);
  if ('error' in parsedPrice) return { field: 'price', message: amountErrors[parsedPrice.error] };

  const differenceCents = parsedPrice.cents - parsedCost.cents;
  return {
    differenceCents,
    margin: formatPercentage(differenceCents, parsedPrice.cents) ?? 'Indefinido con precio de 0 €',
    markup: formatPercentage(differenceCents, parsedCost.cents) ?? 'Indefinido con coste de 0 €',
  };
}

export default function BudgetMargin() {
  const [cost, setCost] = useState('');
  const [price, setPrice] = useState('');
  const [outcome, setOutcome] = useState<MarginResult | InputError | null>(null);
  const error = outcome && 'field' in outcome ? outcome : null;
  const result = outcome && 'differenceCents' in outcome ? outcome : null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutcome(calculateMargin(cost, price));
  }

  return (
    <section id="calcular-margen" aria-labelledby="calcular-margen-title" className={`feature-card ${styles.card}`}>
      <h3 id="calcular-margen-title">Calcula el margen real y el recargo</h3>
      <p id="calcular-margen-help">
        Incluye en el coste el valor de tu tiempo y los gastos del proyecto. Prueba con 1.000 € de
        coste y 1.250 € de precio, ambos sin IVA.
      </p>
      <form className="calculator-form" onSubmit={handleSubmit} onChange={() => setOutcome(null)} noValidate>
        <div className={styles.fields}>
          <label>
            <span>Coste total sin IVA (€)</span>
            <input
              inputMode="decimal"
              value={cost}
              onChange={(event) => setCost(event.target.value)}
              required
              aria-invalid={error?.field === 'cost' || undefined}
              aria-describedby={error?.field === 'cost' ? 'calcular-margen-error' : 'calcular-margen-help'}
            />
          </label>
          <label>
            <span>Precio sin IVA (€)</span>
            <input
              inputMode="decimal"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
              aria-invalid={error?.field === 'price' || undefined}
              aria-describedby={error?.field === 'price' ? 'calcular-margen-error' : undefined}
            />
          </label>
        </div>
        <button type="submit" className="primary-button">Calcular margen y recargo</button>
      </form>

      <div role="status">
        {error && <small id="calcular-margen-error" className={`field-error ${styles.error}`}>{error.message}</small>}
        {result && (
          <dl className="worked-example">
            <div>
              <dt>{result.differenceCents < 0 ? 'Pérdida' : 'Beneficio'} (precio menos coste)</dt>
              <dd>{formatCurrency(result.differenceCents / 100)}</dd>
            </div>
            <div>
              <dt>Margen real (diferencia sobre el precio)</dt>
              <dd>{result.margin}</dd>
            </div>
            <div>
              <dt>Recargo (diferencia sobre el coste)</dt>
              <dd>{result.markup}</dd>
            </div>
          </dl>
        )}
      </div>
    </section>
  );
}
