'use client';

import { useState, type FormEvent } from 'react';
import CopyableDraft from '@/components/CopyableDraft';
import styles from '@/components/DraftEditor.module.css';

const proposalSections = [
  {
    field: 'objective',
    label: 'Objetivo',
    example: 'Aumentar las solicitudes de presupuesto desde la web.',
    error: 'Describe el resultado que busca el cliente.',
  },
  {
    field: 'deliverables',
    label: 'Entregables',
    example: 'Tres páginas adaptadas a móvil.\nFormulario de contacto probado.',
    error: 'Indica qué entregables incluye la propuesta.',
  },
  {
    field: 'deadline',
    label: 'Plazo',
    example: 'Tres semanas desde la recepción de textos y accesos.',
    error: 'Indica un plazo y cuándo empieza a contar.',
  },
  {
    field: 'nextStep',
    label: 'Siguiente paso para el cliente',
    example: 'Confirma la propuesta por correo para reservar el inicio.',
    error: 'Indica qué debe hacer el cliente para avanzar.',
  },
] as const;

type ProposalField = (typeof proposalSections)[number]['field'];
type ProposalFields = Record<ProposalField, string>;
type InputError = { field: ProposalField; message: string };

function buildProposal(fields: ProposalFields): { text: string } | InputError {
  const sections = ['Propuesta comercial freelance'];

  for (const section of proposalSections) {
    const value = fields[section.field].trim();
    if (!value) return { field: section.field, message: section.error };
    sections.push(`${section.label}\n${value}`);
  }

  return { text: sections.join('\n\n') };
}

export default function CommercialProposalDraft() {
  const [fields, setFields] = useState<ProposalFields>({ objective: '', deliverables: '', deadline: '', nextStep: '' });
  const [outcome, setOutcome] = useState<{ text: string } | InputError | null>(null);
  const error = outcome && 'field' in outcome ? outcome : null;
  const draft = outcome && 'text' in outcome ? outcome.text : null;

  function updateField(field: ProposalField, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
    setOutcome(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutcome(buildProposal(fields));
  }

  return (
    <div id="preparar-propuesta" className={`feature-card ${styles.card}`}>
      <h3>Prepara tu propuesta comercial</h3>
      <p>Describe el resultado, lo que entregarás, cuándo estará listo y cómo puede avanzar el cliente.</p>

      <form className="calculator-form" onSubmit={handleSubmit} noValidate>
        <div className={styles.fields}>
          {proposalSections.map(({ field, label, example }) => (
            <label key={field}>
              <span>{label}</span>
              <textarea
                rows={3}
                placeholder={example}
                value={fields[field]}
                onChange={(event) => updateField(field, event.target.value)}
                required
                aria-invalid={error?.field === field || undefined}
                aria-describedby={error?.field === field ? 'preparar-propuesta-status' : undefined}
              />
            </label>
          ))}
        </div>
        <button type="submit" className="primary-button">Generar propuesta</button>
      </form>

      <div id="preparar-propuesta-status" role="status" className={styles.status}>
        {error && <small className="field-error">{error.message}</small>}
        {draft && 'Borrador listo para revisar y copiar.'}
      </div>
      {draft && <CopyableDraft text={draft} label="Borrador de propuesta" copyLabel="Copiar propuesta" />}
    </div>
  );
}
