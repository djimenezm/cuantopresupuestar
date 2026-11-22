'use client';

import { useState, type FormEvent } from 'react';
import { formatCurrency, formatNumber } from '@/lib/format';
import { calculateQuoteLine, maxQuoteCents, parseQuoteRate } from '@/lib/quoteLine';
import styles from './ScopeExpansionBudget.module.css';

const scopeSections = [
  {
    scope: 'initial',
    title: 'Alcance inicial',
    fields: [
      { field: 'count', label: 'iniciales' },
      { field: 'hours', label: 'Horas presupuestadas' },
      { field: 'costs', label: 'Costes directos sin IVA (€)' },
    ],
  },
  {
    scope: 'extra',
    title: 'Ampliación',
    fields: [
      { field: 'count', label: 'adicionales' },
      { field: 'hours', label: 'Horas adicionales' },
      { field: 'costs', label: 'Costes adicionales sin IVA (€)' },
    ],
  },
] as const;

type Scope = 'initial' | 'extra';
type ScopeUnit = { singular: string; plural: string };
type ScopeFields = { count: string; hours: string; costs: string };
type ScopeQuote = { count: number; amountCents: number };
type BudgetResult = { initial: ScopeQuote; extra: ScopeQuote; totalCount: number; totalCents: number };
type InputError =
  | { field: 'rate' | 'total'; message: string }
  | { scope: Scope; field: keyof ScopeFields; message: string };
type ScopeExpansionBudgetProps = {
  id: string;
  title: string;
  help: string;
  unit: ScopeUnit;
  initial: ScopeFields;
  minimumInitialCount?: 0 | 1;
};

function calculateScope(
  scope: Scope,
  fields: ScopeFields,
  rateCents: number,
  unitPlural: string,
  minimumCount: 0 | 1,
): ScopeQuote | InputError {
  const count = Number(fields.count);
  if (!/^\d+$/.test(fields.count.trim()) || !Number.isSafeInteger(count) || count < minimumCount) {
    const countType = scope === 'initial' ? 'iniciales' : 'adicionales';
    return {
      scope,
      field: 'count',
      message: `Introduce un número entero de ${unitPlural} ${countType}, igual o mayor que ${minimumCount}.`,
    };
  }

  const line = calculateQuoteLine(fields.hours, fields.costs, rateCents);
  if ('error' in line) {
    const scopeName = scope === 'initial' ? 'del alcance inicial' : 'de la ampliación';
    if (line.error === 'cost') {
      return {
        scope,
        field: 'costs',
        message: `Introduce un coste válido ${scopeName} igual o mayor que 0 €, con un máximo de dos decimales.`,
      };
    }
    return {
      scope,
      field: 'hours',
      message: line.error === 'hours'
        ? `Introduce las horas ${scopeName} con un valor igual o mayor que 0 y hasta dos decimales.`
        : `Reduce las horas ${scopeName} o la tarifa.`,
    };
  }

  return { count, amountCents: line.amountCents };
}

function calculateBudget(
  rate: string,
  fields: Record<Scope, ScopeFields>,
  unitPlural: string,
  minimumInitialCount: 0 | 1,
): BudgetResult | InputError {
  const rateCents = parseQuoteRate(rate);
  if (rateCents === null) {
    return { field: 'rate', message: 'Introduce una tarifa válida mayor que 0 €/h, con un máximo de dos decimales.' };
  }

  const initial = calculateScope('initial', fields.initial, rateCents, unitPlural, minimumInitialCount);
  if ('field' in initial) return initial;

  const extra = calculateScope('extra', fields.extra, rateCents, unitPlural, 0);
  if ('field' in extra) return extra;

  const totalCount = initial.count + extra.count;
  if (!Number.isSafeInteger(totalCount)) {
    return { scope: 'extra', field: 'count', message: `El total de ${unitPlural} es demasiado alto.` };
  }

  const totalCents = initial.amountCents + extra.amountCents;
  if (totalCents > maxQuoteCents) {
    return { field: 'total', message: 'El presupuesto es demasiado alto. Revisa las horas, la tarifa y los costes.' };
  }

  return { initial, extra, totalCount, totalCents };
}

function formatScopeCount(count: number, unit: ScopeUnit) {
  return `${formatNumber(count, 0)} ${count === 1 ? unit.singular : unit.plural}`;
}

export default function ScopeExpansionBudget({
  id,
  title,
  help,
  unit,
  initial,
  minimumInitialCount = 1,
}: ScopeExpansionBudgetProps) {
  const [rate, setRate] = useState('');
  const [fields, setFields] = useState<Record<Scope, ScopeFields>>({
    initial,
    extra: { count: '0', hours: '0', costs: '0' },
  });
  const [outcome, setOutcome] = useState<BudgetResult | InputError | null>(null);
  const error = outcome && 'field' in outcome ? outcome : null;
  const result = outcome && 'totalCents' in outcome ? outcome : null;
  const titleId = `${id}-title`;
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;
  const countLabel = unit.plural.charAt(0).toUpperCase() + unit.plural.slice(1);

  function updateScope(scope: Scope, field: keyof ScopeFields, value: string) {
    setFields((current) => ({ ...current, [scope]: { ...current[scope], [field]: value } }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutcome(calculateBudget(rate, fields, unit.plural, minimumInitialCount));
  }

  return (
    <div id={id} className={`feature-card ${styles.card}`}>
      <h2 id={titleId}>{title}</h2>
      <p id={helpId}>{help}</p>

      <form
        className="calculator-form"
        onSubmit={handleSubmit}
        onChange={() => setOutcome(null)}
        aria-labelledby={titleId}
        aria-describedby={helpId}
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
            aria-describedby={error?.field === 'rate' ? errorId : undefined}
          />
        </label>
        <div className={styles.scopes}>
          {scopeSections.map(({ scope, title, fields: scopeFields }) => (
            <fieldset className={styles.scope} key={scope}>
              <legend>{title}</legend>
              {scopeFields.map(({ field, label }) => {
                const invalid = error?.field === field && error.scope === scope;

                return (
                  <label key={field}>
                    <span>{field === 'count' ? `${countLabel} ${label}` : label}</span>
                    <input
                      inputMode={field === 'count' ? 'numeric' : 'decimal'}
                      value={fields[scope][field]}
                      onChange={(event) => updateScope(scope, field, event.target.value)}
                      required
                      aria-invalid={invalid || undefined}
                      aria-describedby={invalid ? errorId : undefined}
                    />
                  </label>
                );
              })}
            </fieldset>
          ))}
        </div>
        <button type="submit" className="primary-button">Calcular alcance y ampliación</button>
      </form>

      <div role="status">
        {error && <small id={errorId} className={`field-error ${styles.error}`}>{error.message}</small>}
        {result && (
          <dl className="worked-example">
            <div>
              <dt>Alcance inicial ({formatScopeCount(result.initial.count, unit)})</dt>
              <dd>{formatCurrency(result.initial.amountCents / 100)}</dd>
            </div>
            <div>
              <dt>Ampliación ({formatScopeCount(result.extra.count, unit)} más)</dt>
              <dd>{formatCurrency(result.extra.amountCents / 100)}</dd>
            </div>
            <div>
              <dt>Total sin IVA ({formatScopeCount(result.totalCount, unit)})</dt>
              <dd>{formatCurrency(result.totalCents / 100)}</dd>
            </div>
          </dl>
        )}
      </div>
    </div>
  );
}
