import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CommercialProposalDraft from '@/app/como-hacer-una-propuesta-comercial/CommercialProposalDraft';

const example = [
  { label: 'Objetivo', text: 'Captar más consultas para el estudio.' },
  { label: 'Entregables', text: 'Tres páginas adaptadas a móvil.\nFormulario de contacto.' },
  { label: 'Plazo', text: 'Dos semanas tras recibir los materiales.' },
  { label: 'Siguiente paso para el cliente', text: 'Confirma por escrito para reservar el inicio.' },
] as const;

type FieldLabel = (typeof example)[number]['label'];

async function generateProposal(overrides: Partial<Record<FieldLabel, string>> = {}) {
  const user = userEvent.setup();
  render(<CommercialProposalDraft />);

  for (const { label, text } of example) {
    const value = overrides[label] ?? text;
    if (value) {
      await user.click(screen.getByRole('textbox', { name: label }));
      await user.paste(value);
    }
  }
  await user.click(screen.getByRole('button', { name: 'Generar propuesta' }));

  return user;
}

describe('CommercialProposalDraft', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('copies the exact reviewed proposal and clears the previous draft on edit', async () => {
    const user = await generateProposal({
      Objetivo: `  ${example[0].text}  `,
      Entregables: `\n${example[1].text}\n`,
    });
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);
    const expected = [
      'Propuesta comercial freelance',
      'Objetivo\nCaptar más consultas para el estudio.',
      'Entregables\nTres páginas adaptadas a móvil.\nFormulario de contacto.',
      'Plazo\nDos semanas tras recibir los materiales.',
      'Siguiente paso para el cliente\nConfirma por escrito para reservar el inicio.',
    ].join('\n\n');

    const preview = screen.getByRole('textbox', { name: 'Borrador de propuesta' });
    expect(preview).toHaveAttribute('readonly');
    expect(preview).toHaveValue(expected);
    await user.click(screen.getByRole('button', { name: 'Copiar propuesta' }));

    expect(writeText).toHaveBeenCalledExactlyOnceWith(expected);
    expect(await screen.findByText('Borrador copiado.')).toBeInTheDocument();

    await user.type(screen.getByRole('textbox', { name: 'Plazo' }), ' Sujeto a confirmación.');
    expect(screen.queryByRole('textbox', { name: 'Borrador de propuesta' })).not.toBeInTheDocument();
    expect(screen.queryByText('Borrador copiado.')).not.toBeInTheDocument();
  });

  it('selects the visible proposal for manual copying if the clipboard rejects it', async () => {
    const user = await generateProposal();
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('Clipboard unavailable'));
    const preview = screen.getByRole<HTMLTextAreaElement>('textbox', { name: 'Borrador de propuesta' });

    await user.click(screen.getByRole('button', { name: 'Copiar propuesta' }));

    expect(writeText).toHaveBeenCalledExactlyOnceWith(preview.value);
    expect(await screen.findByText(/texto seleccionado.*cópialo manualmente/i)).toBeInTheDocument();
    expect(preview).toHaveFocus();
    expect(preview.selectionStart).toBe(0);
    expect(preview.selectionEnd).toBe(preview.value.length);
  });

  it.each([
    { label: 'Plazo', text: '   ' },
    { label: 'Siguiente paso para el cliente', text: '' },
  ] as const)('requires a nonblank $label', async ({ label, text }) => {
    await generateProposal({ [label]: text });

    expect(screen.getByRole('textbox', { name: label })).toHaveAttribute('aria-invalid', 'true');
    expect(screen.queryByRole('textbox', { name: 'Borrador de propuesta' })).not.toBeInTheDocument();
  });
});
