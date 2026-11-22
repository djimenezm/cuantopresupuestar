'use client';

import { useState, type FormEvent } from 'react';
import CopyableDraft from '@/components/CopyableDraft';
import styles from '@/components/DraftEditor.module.css';
import { formatCurrency } from '@/lib/format';
import { parseEuroCents } from '@/lib/paymentSchedule';

type DraftFields = { project: string; scope: string; price: string; paymentTerms: string };
type InputError = { field: Exclude<keyof DraftFields, 'project'>; message: string };

function buildDraft(fields: DraftFields): { text: string } | InputError {
  const scope = fields.scope.trim();
  if (!scope) return { field: 'scope', message: 'Describe qué incluye el alcance del proyecto.' };

  const price = parseEuroCents(fields.price);
  if ('error' in price) {
    return {
      field: 'price',
      message: price.error === 'limit'
        ? 'Introduce un precio menor.'
        : 'Introduce un precio válido igual o mayor que 0 €, con un máximo de dos decimales.',
    };
  }

  const paymentTerms = fields.paymentTerms.trim();
  if (!paymentTerms) return { field: 'paymentTerms', message: 'Indica cuánto y cuándo se paga.' };

  const project = fields.project.trim();
  const heading = project ? `Presupuesto freelance — ${project}` : 'Presupuesto freelance';
  return {
    text: [
      heading,
      `Alcance\n${scope}`,
      `Precio sin IVA\n${formatCurrency(price.cents / 100)}`,
      `Condiciones de pago\n${paymentTerms}`,
    ].join('\n\n'),
  };
}

export default function BudgetDraft() {
  const [fields, setFields] = useState<DraftFields>({ project: '', scope: '', price: '', paymentTerms: '' });
  const [outcome, setOutcome] = useState<{ text: string } | InputError | null>(null);
  const error = outcome && 'field' in outcome ? outcome : null;
  const draft = outcome && 'text' in outcome ? outcome.text : null;

  function updateField(field: keyof DraftFields, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
    setOutcome(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutcome(buildDraft(fields));
  }

  return (
    <div id="rellenar-plantilla" className={`feature-card ${styles.card}`}>
      <h2 id="rellenar-plantilla-title">Rellena tu borrador de presupuesto</h2>
      <p>Incluye los entregables y las revisiones en el alcance. Indica cuánto se paga y en qué momento.</p>

      <form className="calculator-form" onSubmit={handleSubmit} noValidate>
        <div className={styles.fields}>
          <label>
            <span>Proyecto (opcional)</span>
            <input value={fields.project} onChange={(event) => updateField('project', event.target.value)} />
          </label>
          <label>
            <span>Precio sin IVA (€)</span>
            <input
              inputMode="decimal"
              placeholder="1.200,01 €"
              value={fields.price}
              onChange={(event) => updateField('price', event.target.value)}
              required
              aria-invalid={error?.field === 'price' || undefined}
              aria-describedby={error?.field === 'price' ? 'rellenar-plantilla-status' : undefined}
            />
          </label>
        </div>
        <label>
          <span>Alcance</span>
          <textarea
            rows={4}
            placeholder={'3 páginas y formulario de contacto.\nIncluye dos rondas de revisión.'}
            value={fields.scope}
            onChange={(event) => updateField('scope', event.target.value)}
            required
            aria-invalid={error?.field === 'scope' || undefined}
            aria-describedby={error?.field === 'scope' ? 'rellenar-plantilla-status' : undefined}
          />
        </label>
        <label>
          <span>Condiciones de pago</span>
          <textarea
            rows={3}
            placeholder={'600,01 € al aceptar el presupuesto.\n600,00 € antes de la entrega.'}
            value={fields.paymentTerms}
            onChange={(event) => updateField('paymentTerms', event.target.value)}
            required
            aria-invalid={error?.field === 'paymentTerms' || undefined}
            aria-describedby={error?.field === 'paymentTerms' ? 'rellenar-plantilla-status' : undefined}
          />
        </label>
        <button type="submit" className="primary-button">Generar borrador</button>
      </form>

      <div id="rellenar-plantilla-status" role="status" className={styles.status}>
        {error && <small className="field-error">{error.message}</small>}
        {draft && 'Borrador listo para revisar y copiar.'}
      </div>

      {draft && (
        <CopyableDraft text={draft} label="Borrador de presupuesto" copyLabel="Copiar borrador" />
      )}
    </div>
  );
}
