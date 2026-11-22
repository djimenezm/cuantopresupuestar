'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { formatCurrency } from '@/lib/format';
import { calculateQuoteLine, maxQuoteCents, parseQuoteRate } from '@/lib/quoteLine';
import styles from './ProfessionalWebBudget.module.css';

type QuoteFields = { hours: string; costs: string };
type Extra = QuoteFields & { id: number; name: string };
type LineId = 'base' | number;
type BudgetResult = {
  baseCents: number;
  extras: { id: number; name: string; amountCents: number }[];
  extrasCents: number;
  totalCents: number;
};
type InputError =
  | { field: 'rate' | 'total'; message: string }
  | { field: keyof QuoteFields; lineId: LineId; message: string };

const quoteFields = [
  { field: 'hours', baseLabel: 'Horas base', extraLabel: 'Horas del extra' },
  { field: 'costs', baseLabel: 'Costes base sin IVA (€)', extraLabel: 'Costes del extra sin IVA (€)' },
] as const;
const errorId = 'calcular-precio-web-profesional-error';
const addExtraId = 'calcular-precio-web-profesional-anadir';
const extraNameId = (id: number) => `calcular-precio-web-profesional-extra-${id}`;

function priceLine(fields: QuoteFields, rateCents: number, lineId: LineId, label: string) {
  const line = calculateQuoteLine(fields.hours, fields.costs, rateCents);
  if (!('error' in line)) return line;

  if (line.error === 'cost') {
    return {
      field: 'costs' as const,
      lineId,
      message: `Introduce un coste válido ${label} igual o mayor que 0 €, con un máximo de dos decimales.`,
    };
  }

  return {
    field: 'hours' as const,
    lineId,
    message: line.error === 'hours'
      ? `Introduce las horas ${label} con un valor igual o mayor que 0 y hasta dos decimales.`
      : `Reduce las horas ${label} o la tarifa.`,
  };
}

function calculateBudget(rate: string, base: QuoteFields, extras: Extra[]): BudgetResult | InputError {
  const rateCents = parseQuoteRate(rate);
  if (rateCents === null) {
    return { field: 'rate', message: 'Introduce una tarifa válida mayor que 0 €/h, con un máximo de dos decimales.' };
  }

  const basePrice = priceLine(base, rateCents, 'base', 'del alcance base');
  if ('field' in basePrice) return basePrice;

  const baseCents = basePrice.amountCents;
  const estimates: BudgetResult['extras'] = [];
  let extrasCents = 0;

  for (const [index, extra] of extras.entries()) {
    const line = priceLine(extra, rateCents, extra.id, `del extra ${index + 1}`);
    if ('field' in line) return line;

    extrasCents += line.amountCents;
    estimates.push({ id: extra.id, name: extra.name.trim() || `Extra ${index + 1}`, amountCents: line.amountCents });
  }

  const totalCents = baseCents + extrasCents;
  if (totalCents > maxQuoteCents) {
    return { field: 'total', message: 'El presupuesto es demasiado alto. Revisa las horas, la tarifa y los costes.' };
  }

  return { baseCents, extras: estimates, extrasCents, totalCents };
}

function QuoteLineFields({ values, lineId, error, onChange }: {
  values: QuoteFields;
  lineId: LineId;
  error: InputError | null;
  onChange: (field: keyof QuoteFields, value: string) => void;
}) {
  return quoteFields.map(({ field, baseLabel, extraLabel }) => {
    const invalid = error?.field === field && error.lineId === lineId;

    return (
      <label key={field}>
        <span>{lineId === 'base' ? baseLabel : extraLabel}</span>
        <input
          inputMode="decimal"
          value={values[field]}
          onChange={(event) => onChange(field, event.target.value)}
          required
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? errorId : undefined}
        />
      </label>
    );
  });
}

export default function ProfessionalWebBudget() {
  const [rate, setRate] = useState('');
  const [base, setBase] = useState<QuoteFields>({ hours: '24', costs: '60' });
  const [extras, setExtras] = useState<Extra[]>([]);
  const [outcome, setOutcome] = useState<BudgetResult | InputError | null>(null);
  const nextExtraId = useRef(1);
  const focusTarget = useRef<string | null>(null);
  const error = outcome && 'field' in outcome ? outcome : null;
  const result = outcome && 'totalCents' in outcome ? outcome : null;

  useEffect(() => {
    if (!focusTarget.current) return;
    document.getElementById(focusTarget.current)?.focus();
    focusTarget.current = null;
  }, [extras]);

  function addExtra() {
    const id = nextExtraId.current++;
    focusTarget.current = extraNameId(id);
    setExtras((current) => [...current, { id, name: '', hours: '0', costs: '0' }]);
    setOutcome(null);
  }

  function removeExtra(index: number) {
    const neighbor = extras[index + 1] ?? extras[index - 1];
    focusTarget.current = neighbor ? extraNameId(neighbor.id) : addExtraId;
    setExtras((current) => current.filter((_, currentIndex) => currentIndex !== index));
    setOutcome(null);
  }

  function updateExtra(id: number, field: 'name' | keyof QuoteFields, value: string) {
    setExtras((current) => current.map((extra) => extra.id === id ? { ...extra, [field]: value } : extra));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutcome(calculateBudget(rate, base, extras));
  }

  return (
    <div id="calcular-precio-web-profesional" className={`feature-card ${styles.card}`}>
      <h2 id="calcular-precio-web-profesional-title">Calcula el precio base y los extras de tu web</h2>
      <p id="calcular-precio-web-profesional-help">
        Usa tus horas presupuestadas y una tarifa de venta común. Cada partida suma el trabajo
        redondeado a céntimos y sus costes directos. Prueba con 24 h a 40 €/h y 60 € de costes.
        Añade 5 h de redacción y 2,5 h de integración con 30 € de licencia. Los importes son sin IVA.
      </p>

      <form
        className="calculator-form"
        onSubmit={handleSubmit}
        onChange={() => setOutcome(null)}
        aria-labelledby="calcular-precio-web-profesional-title"
        aria-describedby="calcular-precio-web-profesional-help"
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
        <fieldset className={styles.line}>
          <legend>Alcance base</legend>
          <div className={styles.baseFields}>
            <QuoteLineFields
              values={base}
              lineId="base"
              error={error}
              onChange={(field, value) => setBase((current) => ({ ...current, [field]: value }))}
            />
          </div>
        </fieldset>

        <div className={styles.extras}>
          <h3>Extras</h3>
          {extras.map((extra, index) => (
            <fieldset className={styles.line} key={extra.id}>
              <legend>Extra {index + 1}</legend>
              <div className={styles.extraFields}>
                <label>
                  <span>Nombre del extra (opcional)</span>
                  <input
                    id={extraNameId(extra.id)}
                    value={extra.name}
                    onChange={(event) => updateExtra(extra.id, 'name', event.target.value)}
                  />
                </label>
                <QuoteLineFields
                  values={extra}
                  lineId={extra.id}
                  error={error}
                  onChange={(field, value) => updateExtra(extra.id, field, value)}
                />
                <button
                  type="button"
                  className={styles.secondaryButton}
                  aria-label={`Quitar extra ${index + 1}`}
                  onClick={() => removeExtra(index)}
                >
                  Quitar
                </button>
              </div>
            </fieldset>
          ))}
          <button type="button" id={addExtraId} className={styles.secondaryButton} onClick={addExtra}>
            Añadir extra
          </button>
        </div>
        <button type="submit" className="primary-button">Calcular base y extras</button>
      </form>

      <div role="status">
        {error && <small id={errorId} className={`field-error ${styles.error}`}>{error.message}</small>}
        {result && (
          <dl className="worked-example">
            <div><dt>Precio base</dt><dd>{formatCurrency(result.baseCents / 100)}</dd></div>
            {result.extras.map((extra) => (
              <div key={extra.id}><dt>{extra.name}</dt><dd>{formatCurrency(extra.amountCents / 100)}</dd></div>
            ))}
            <div><dt>Total de extras</dt><dd>{formatCurrency(result.extrasCents / 100)}</dd></div>
            <div><dt>Total sin IVA</dt><dd>{formatCurrency(result.totalCents / 100)}</dd></div>
          </dl>
        )}
      </div>
    </div>
  );
}
