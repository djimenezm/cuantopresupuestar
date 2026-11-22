'use client';

import { useState, type FormEvent } from 'react';
import { formatCurrency, formatNumber } from '@/lib/format';
import { calculateQuoteLine, maxQuoteCents, parseQuoteRate } from '@/lib/quoteLine';
import styles from './WebPhaseBudget.module.css';

type ExamplePhase = { name: string; hours: number };
type PhaseInput = { name: string; hours: string; cost: string };
type PhaseResult = { name: string; hoursHundredths: number; costCents: number; amountCents: number };
type BudgetResult = { phases: PhaseResult[]; totalCents: number };
type InputError =
  | { field: 'rate' | 'total'; message: string }
  | { field: 'hours' | 'cost'; phaseIndex: number; message: string };

function calculateWebBudget(rate: string, phases: PhaseInput[]): BudgetResult | InputError {
  const rateCents = parseQuoteRate(rate);
  if (rateCents === null) {
    return { field: 'rate', message: 'Introduce una tarifa válida mayor que 0 €/h, con un máximo de dos decimales.' };
  }

  const results: PhaseResult[] = [];
  let totalCents = 0;

  for (const [phaseIndex, phase] of phases.entries()) {
    const line = calculateQuoteLine(phase.hours, phase.cost, rateCents);
    if ('error' in line) {
      if (line.error === 'cost') {
        return {
          field: 'cost',
          phaseIndex,
          message: `Introduce un coste válido de «${phase.name}» igual o mayor que 0 €, con un máximo de dos decimales.`,
        };
      }
      if (line.error === 'workLimit') {
        return { field: 'hours', phaseIndex, message: `Reduce las horas de «${phase.name}» o la tarifa.` };
      }
      return {
        field: 'hours',
        phaseIndex,
        message: `Introduce las horas de «${phase.name}» con un valor igual o mayor que 0 y hasta dos decimales.`,
      };
    }

    totalCents += line.amountCents;
    if (totalCents > maxQuoteCents) {
      return { field: 'total', message: 'El presupuesto es demasiado alto. Revisa las horas, la tarifa y los costes.' };
    }

    results.push({ name: phase.name, ...line });
  }

  return { phases: results, totalCents };
}

export default function WebPhaseBudget({ phases }: { phases: readonly ExamplePhase[] }) {
  const [rate, setRate] = useState('');
  const [phaseInputs, setPhaseInputs] = useState<PhaseInput[]>(() => (
    phases.map(({ name, hours }) => ({ name, hours: String(hours), cost: '0' }))
  ));
  const [outcome, setOutcome] = useState<BudgetResult | InputError | null>(null);
  const error = outcome && 'field' in outcome ? outcome : null;
  const result = outcome && 'totalCents' in outcome ? outcome : null;

  function updatePhase(phaseIndex: number, field: 'hours' | 'cost', value: string) {
    setPhaseInputs((current) => current.map((phase, index) => (
      index === phaseIndex ? { ...phase, [field]: value } : phase
    )));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutcome(calculateWebBudget(rate, phaseInputs));
  }

  return (
    <div id="calcular-presupuesto-web" className={`feature-card ${styles.card}`}>
      <h2 id="calcular-presupuesto-web-title">Calcula el presupuesto web por fases</h2>
      <p id="calcular-presupuesto-web-help">
        Las 48 h iniciales son antes de revisiones. Al presupuestar tu proyecto, suma la reserva a
        las horas de las fases que la necesiten. Con las 48 h iniciales a 40 €/h y 90 € de costes
        en desarrollo, el resultado es 2.010 € sin IVA. El cálculo redondea el trabajo de cada
        fase a céntimos y añade sus costes directos. Pon a cero las horas y los costes de las fases
        que puedas omitir.
      </p>
      <form
        className="calculator-form"
        onSubmit={handleSubmit}
        onChange={() => setOutcome(null)}
        aria-labelledby="calcular-presupuesto-web-title"
        aria-describedby="calcular-presupuesto-web-help"
        noValidate
      >
        <label className={styles.rate}>
          <span>Tarifa de venta sin IVA (€/h)</span>
          <input
            inputMode="decimal"
            value={rate}
            onChange={(event) => setRate(event.target.value)}
            required
            aria-invalid={error?.field === 'rate' || undefined}
            aria-describedby={error?.field === 'rate' ? 'calcular-presupuesto-web-error' : undefined}
          />
        </label>
        {phaseInputs.map((phase, index) => {
          const hoursInvalid = error?.field === 'hours' && error.phaseIndex === index;
          const costInvalid = error?.field === 'cost' && error.phaseIndex === index;

          return (
            <fieldset className={styles.phase} key={phase.name}>
              <legend>{phase.name}</legend>
              <div className={styles.fields}>
                <label>
                  <span>Horas presupuestadas</span>
                  <input
                    inputMode="decimal"
                    value={phase.hours}
                    onChange={(event) => updatePhase(index, 'hours', event.target.value)}
                    required
                    aria-invalid={hoursInvalid || undefined}
                    aria-describedby={hoursInvalid ? 'calcular-presupuesto-web-error' : undefined}
                  />
                </label>
                <label>
                  <span>Costes directos sin IVA (€)</span>
                  <input
                    inputMode="decimal"
                    value={phase.cost}
                    onChange={(event) => updatePhase(index, 'cost', event.target.value)}
                    required
                    aria-invalid={costInvalid || undefined}
                    aria-describedby={costInvalid ? 'calcular-presupuesto-web-error' : undefined}
                  />
                </label>
              </div>
            </fieldset>
          );
        })}
        <button type="submit" className="primary-button">Calcular presupuesto web</button>
      </form>

      <div role="status">
        {error && <small id="calcular-presupuesto-web-error" className={`field-error ${styles.error}`}>{error.message}</small>}
        {result && (
          <dl className="worked-example">
            {result.phases.map((phase) => (
              <div key={phase.name}>
                <dt>
                  {phase.name} ({formatNumber(phase.hoursHundredths / 100, 2)} h
                  {phase.costCents > 0 && ` y ${formatCurrency(phase.costCents / 100)} de costes`})
                </dt>
                <dd>{formatCurrency(phase.amountCents / 100)}</dd>
              </div>
            ))}
            <div><dt>Total sin IVA</dt><dd>{formatCurrency(result.totalCents / 100)}</dd></div>
          </dl>
        )}
      </div>
    </div>
  );
}
