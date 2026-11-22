'use client';

import { useState, type FormEvent } from 'react';
import { formatCurrency } from '@/lib/format';
import { calculateQuoteLine, maxQuoteCents, parseQuoteRate } from '@/lib/quoteLine';
import styles from './WebScopeComparison.module.css';

type ExampleScenario = { name: string; hours: number; costs: number };
type ScenarioInput = { name: string; hours: string; costs: string };
type ScenarioPrice = { name: string; amountCents: number };
type InputError =
  | { field: 'rate' | 'price'; message: string }
  | { field: 'hours' | 'costs'; scenarioIndex: number; message: string };

function compareWebPrices(rate: string, scenarios: ScenarioInput[]): { prices: ScenarioPrice[] } | InputError {
  const rateCents = parseQuoteRate(rate);
  if (rateCents === null) {
    return { field: 'rate', message: 'Introduce una tarifa válida mayor que 0 €/h, con un máximo de dos decimales.' };
  }

  const prices: ScenarioPrice[] = [];
  for (const [scenarioIndex, scenario] of scenarios.entries()) {
    const price = calculateQuoteLine(scenario.hours, scenario.costs, rateCents);
    if ('error' in price) {
      if (price.error === 'cost') {
        return {
          field: 'costs',
          scenarioIndex,
          message: `Introduce un coste válido en «${scenario.name}» igual o mayor que 0 €, con un máximo de dos decimales.`,
        };
      }
      return {
        field: 'hours',
        scenarioIndex,
        message: price.error === 'hours'
          ? `Introduce las horas de «${scenario.name}» con un valor igual o mayor que 0 y hasta dos decimales.`
          : `Reduce las horas de «${scenario.name}» o la tarifa.`,
      };
    }
    if (price.amountCents > maxQuoteCents) {
      return { field: 'price', message: `El precio de «${scenario.name}» es demasiado alto. Revisa los importes.` };
    }

    prices.push({ name: scenario.name, amountCents: price.amountCents });
  }

  return { prices };
}

export default function WebScopeComparison({ scenarios }: { scenarios: readonly ExampleScenario[] }) {
  const [rate, setRate] = useState('');
  const [inputs, setInputs] = useState<ScenarioInput[]>(() => scenarios.map(({ name, hours, costs }) => ({
    name,
    hours: String(hours).replace('.', ','),
    costs: String(costs).replace('.', ','),
  })));
  const [outcome, setOutcome] = useState<{ prices: ScenarioPrice[] } | InputError | null>(null);
  const error = outcome && 'field' in outcome ? outcome : null;
  const result = outcome && 'prices' in outcome ? outcome : null;

  function updateScenario(scenarioIndex: number, field: 'hours' | 'costs', value: string) {
    setInputs((current) => current.map((scenario, index) => (
      index === scenarioIndex ? { ...scenario, [field]: value } : scenario
    )));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutcome(compareWebPrices(rate, inputs));
  }

  return (
    <section id="comparar-precios-web" aria-labelledby="comparar-precios-web-title" className={`feature-card ${styles.card}`}>
      <h3 id="comparar-precios-web-title">Compara tres presupuestos con tus datos</h3>
      <p id="comparar-precios-web-help">
        Las horas iniciales ya incluyen la reserva para revisiones. En este formulario, introduce
        directamente tu tarifa de venta para comparar los tres encargos y ajusta las horas y los
        costes de cada uno. Cada precio sin IVA suma el trabajo redondeado a céntimos y sus costes
        directos. Prueba con 40 €/h.
      </p>
      <form
        className="calculator-form"
        onSubmit={handleSubmit}
        onChange={() => setOutcome(null)}
        aria-labelledby="comparar-precios-web-title"
        aria-describedby="comparar-precios-web-help"
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
            aria-describedby={error?.field === 'rate' ? 'comparar-precios-web-error' : undefined}
          />
        </label>
        <div className={styles.scenarios}>
          {inputs.map((scenario, index) => {
            const hoursInvalid = error?.field === 'hours' && error.scenarioIndex === index;
            const costsInvalid = error?.field === 'costs' && error.scenarioIndex === index;

            return (
              <fieldset className={styles.scenario} key={scenario.name}>
                <legend>{scenario.name}</legend>
                <label>
                  <span>Horas presupuestadas</span>
                  <input
                    inputMode="decimal"
                    value={scenario.hours}
                    onChange={(event) => updateScenario(index, 'hours', event.target.value)}
                    required
                    aria-invalid={hoursInvalid || undefined}
                    aria-describedby={hoursInvalid ? 'comparar-precios-web-error' : undefined}
                  />
                </label>
                <label>
                  <span>Costes directos sin IVA (€)</span>
                  <input
                    inputMode="decimal"
                    value={scenario.costs}
                    onChange={(event) => updateScenario(index, 'costs', event.target.value)}
                    required
                    aria-invalid={costsInvalid || undefined}
                    aria-describedby={costsInvalid ? 'comparar-precios-web-error' : undefined}
                  />
                </label>
              </fieldset>
            );
          })}
        </div>
        <button type="submit" className="primary-button">Comparar precios</button>
      </form>

      <div role="status">
        {error && <small id="comparar-precios-web-error" className={`field-error ${styles.error}`}>{error.message}</small>}
        {result && (
          <div className={styles.summary}>
            <h4>Precios sin IVA</h4>
            <dl className={styles.prices}>
              {result.prices.map(({ name, amountCents }) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd>{formatCurrency(amountCents / 100)}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
