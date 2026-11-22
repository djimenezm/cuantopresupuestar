import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import ProfessionalWebBudget from '@/app/precio-pagina-web-profesional-freelance/ProfessionalWebBudget';
import { formatCurrency } from '@/lib/format';

const rateLabel = 'Tarifa de venta sin IVA (€/h)';
const baseHoursLabel = 'Horas base';
const baseCostsLabel = 'Costes base sin IVA (€)';
const extraNameLabel = 'Nombre del extra (opcional)';
const extraHoursLabel = 'Horas del extra';
const extraCostsLabel = 'Costes del extra sin IVA (€)';

function scopeFields(name: string) {
  return within(screen.getByRole('group', { name }));
}

function displayedAmounts() {
  return [...screen.getByRole('status').querySelectorAll('dd')].map((amount) => amount.textContent);
}

async function setField(user: ReturnType<typeof userEvent.setup>, field: HTMLElement, value: string) {
  await user.clear(field);
  await user.type(field, value);
}

describe('ProfessionalWebBudget', () => {
  it('prices the base and editable extras, focuses new rows and clears stale results', async () => {
    const user = userEvent.setup();
    render(<ProfessionalWebBudget />);

    const base = scopeFields('Alcance base');
    const rate = screen.getByLabelText(rateLabel);
    const calculate = screen.getByRole('button', { name: 'Calcular base y extras' });
    const add = screen.getByRole('button', { name: 'Añadir extra' });
    expect(rate).toHaveDisplayValue('');
    expect(base.getByLabelText(baseHoursLabel)).toHaveDisplayValue('24');
    expect(base.getByLabelText(baseCostsLabel)).toHaveDisplayValue('60');
    expect(screen.queryByRole('group', { name: 'Extra 1' })).not.toBeInTheDocument();

    await user.type(rate, '40');
    await user.click(calculate);
    expect(displayedAmounts()).toEqual([1020, 0, 1020].map(formatCurrency));

    await user.click(add);
    expect(displayedAmounts()).toEqual([]);
    const firstExtra = scopeFields('Extra 1');
    const firstName = firstExtra.getByLabelText(extraNameLabel);
    await waitFor(() => expect(firstName).toHaveFocus());
    expect(firstName).toHaveDisplayValue('');
    expect(firstExtra.getByLabelText(extraHoursLabel)).toHaveDisplayValue('0');
    expect(firstExtra.getByLabelText(extraCostsLabel)).toHaveDisplayValue('0');
    await user.type(firstName, 'Redacción');
    await setField(user, firstExtra.getByLabelText(extraHoursLabel), '5');

    await user.click(add);
    const secondExtra = scopeFields('Extra 2');
    await user.type(secondExtra.getByLabelText(extraNameLabel), 'Integración');
    await setField(user, secondExtra.getByLabelText(extraHoursLabel), '2,5');
    await setField(user, secondExtra.getByLabelText(extraCostsLabel), '30');
    await user.click(calculate);

    expect(displayedAmounts()).toEqual([1020, 200, 130, 330, 1350].map(formatCurrency));
    expect(screen.getByRole('status')).toHaveTextContent('Redacción');
    expect(screen.getByRole('status')).toHaveTextContent('Integración');

    await user.click(screen.getByRole('button', { name: 'Quitar extra 1' }));
    expect(screen.queryByDisplayValue('Redacción')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('Integración')).toBeInTheDocument();
    expect(displayedAmounts()).toEqual([]);
    await user.click(calculate);
    expect(displayedAmounts()).toEqual([1020, 130, 130, 1150].map(formatCurrency));

    await setField(user, scopeFields('Alcance base').getByLabelText(baseHoursLabel), '25');
    expect(displayedAmounts()).toEqual([]);
  });

  it('rounds each unnamed extra separately before adding the displayed amounts', async () => {
    const user = userEvent.setup();
    render(<ProfessionalWebBudget />);

    const base = scopeFields('Alcance base');
    const add = screen.getByRole('button', { name: 'Añadir extra' });
    await user.type(screen.getByLabelText(rateLabel), '37,50');
    await setField(user, base.getByLabelText(baseHoursLabel), '0,75');
    await setField(user, base.getByLabelText(baseCostsLabel), '0');
    await user.click(add);
    await user.click(add);
    const firstExtra = scopeFields('Extra 1');
    await setField(user, firstExtra.getByLabelText(extraHoursLabel), '0,75');
    await setField(user, firstExtra.getByLabelText(extraCostsLabel), '1,37');
    await setField(user, scopeFields('Extra 2').getByLabelText(extraHoursLabel), '0,75');
    await user.click(screen.getByRole('button', { name: 'Calcular base y extras' }));

    expect(displayedAmounts()).toEqual([28.13, 29.5, 28.13, 57.63, 85.76].map(formatCurrency));
  });

  it.each([
    { scope: null, label: rateLabel, value: '0' },
    { scope: 'Alcance base', label: baseHoursLabel, value: '1..2' },
    { scope: 'Extra 1', label: extraCostsLabel, value: '-1' },
  ])('rejects $value in $label', async ({ scope, label, value }) => {
    const user = userEvent.setup();
    render(<ProfessionalWebBudget />);

    if (scope) await user.type(screen.getByLabelText(rateLabel), '40');
    if (scope === 'Extra 1') await user.click(screen.getByRole('button', { name: 'Añadir extra' }));
    const fields = scope ? scopeFields(scope) : screen;
    const input = fields.getByLabelText(label);
    await setField(user, input, value);
    await user.click(screen.getByRole('button', { name: 'Calcular base y extras' }));

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('status')).not.toBeEmptyDOMElement();
    expect(displayedAmounts()).toEqual([]);
  });
});
