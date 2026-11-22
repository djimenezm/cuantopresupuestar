import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import BudgetDraft from '@/app/kit-presupuesto-freelance/BudgetDraft';
import { formatCurrency } from '@/lib/format';

const scope = 'Tres páginas\nFormulario de contacto';
const payments = '600,01 € al aceptar\n600,00 € antes de publicar';

async function generateDraft(values = { project: '', scope, price: '1.200,01 €', payments }) {
  const user = userEvent.setup();
  render(<BudgetDraft />);

  const projectField = screen.getByLabelText('Proyecto (opcional)');
  if (values.project) await user.type(projectField, values.project);
  if (values.scope) await user.type(screen.getByLabelText('Alcance'), values.scope);
  if (values.price) await user.type(screen.getByLabelText('Precio sin IVA (€)'), values.price);
  if (values.payments) await user.type(screen.getByLabelText('Condiciones de pago'), values.payments);
  await user.click(screen.getByRole('button', { name: 'Generar borrador' }));

  return { user, projectField };
}

describe('BudgetDraft', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('copies the displayed draft exactly, preserving line breaks and trimming the field edges', async () => {
    const { user, projectField } = await generateDraft({
      project: '  Web de estudio  ',
      scope: `  ${scope}  `,
      price: '1.200,01 €',
      payments: `  ${payments}  `,
    });
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);
    const expected = [
      'Presupuesto freelance — Web de estudio',
      `Alcance\n${scope}`,
      `Precio sin IVA\n${formatCurrency(1200.01)}`,
      `Condiciones de pago\n${payments}`,
    ].join('\n\n');

    const preview = screen.getByRole('textbox', { name: 'Borrador de presupuesto' });
    expect(preview).toHaveAttribute('readonly');
    expect(preview).toHaveValue(expected);
    await user.click(screen.getByRole('button', { name: 'Copiar borrador' }));

    expect(writeText).toHaveBeenCalledExactlyOnceWith(expected);
    expect(await screen.findByText('Borrador copiado.')).toBeInTheDocument();
    await user.type(projectField, ' revisado');
    expect(screen.queryByRole('textbox', { name: 'Borrador de presupuesto' })).not.toBeInTheDocument();
    expect(screen.queryByText('Borrador copiado.')).not.toBeInTheDocument();
  });

  it.each(['absent', 'rejected'])('selects the draft when clipboard access is %s', async (failure) => {
    const { user } = await generateDraft();
    const preview = screen.getByRole<HTMLTextAreaElement>('textbox', { name: 'Borrador de presupuesto' });
    expect(preview.value).toMatch(/^Presupuesto freelance\n\nAlcance/);

    const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard')!;
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: failure === 'absent'
        ? undefined
        : { writeText: vi.fn().mockRejectedValue(new Error('Clipboard unavailable')) },
    });

    try {
      await user.click(screen.getByRole('button', { name: 'Copiar borrador' }));
      expect(await screen.findByText(/seleccionad/i)).toHaveTextContent(/manual/i);
      expect(preview).toHaveFocus();
      expect(preview.selectionStart).toBe(0);
      expect(preview.selectionEnd).toBe(preview.value.length);
    } finally {
      Object.defineProperty(navigator, 'clipboard', clipboardDescriptor);
    }
  });

  it.each([
    { field: 'Alcance', scope: '   ', price: '1200', payments },
    { field: 'Precio sin IVA (€)', scope, price: '1..2', payments },
    { field: 'Condiciones de pago', scope, price: '1200', payments: '' },
  ])('blocks generation if the $field field is invalid', async (values) => {
    await generateDraft({ project: '', ...values });

    expect(screen.getByLabelText(values.field)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.queryByRole('textbox', { name: 'Borrador de presupuesto' })).not.toBeInTheDocument();
  });
});
