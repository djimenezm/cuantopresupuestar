import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import CorporateScopeBudget from '@/app/cuanto-cobrar-web-corporativa-freelance/CorporateScopeBudget';
import { formatCurrency } from '@/lib/format';

const rateLabel = 'Tarifa de venta sin IVA (€/h)';
const initialPagesLabel = 'Páginas iniciales';
const initialHoursLabel = 'Horas presupuestadas';
const initialCostsLabel = 'Costes directos sin IVA (€)';
const addedPagesLabel = 'Páginas adicionales';
const addedHoursLabel = 'Horas adicionales';
const addedCostsLabel = 'Costes adicionales sin IVA (€)';

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

describe('CorporateScopeBudget', () => {
  it('separates the initial quote from the extension and updates the amount and page count', async () => {
    const user = userEvent.setup();
    render(<CorporateScopeBudget />);

    const initial = scopeFields('Alcance inicial');
    const extension = scopeFields('Ampliación');
    const rate = screen.getByLabelText(rateLabel);
    const calculate = screen.getByRole('button', { name: 'Calcular alcance y ampliación' });
    expect(rate).toHaveDisplayValue('');
    expect(initial.getByLabelText(initialPagesLabel)).toHaveDisplayValue('3');
    expect(initial.getByLabelText(initialHoursLabel)).toHaveDisplayValue('36,8');
    expect(initial.getByLabelText(initialCostsLabel)).toHaveDisplayValue('90');
    expect(extension.getByLabelText(addedPagesLabel)).toHaveDisplayValue('0');
    expect(extension.getByLabelText(addedHoursLabel)).toHaveDisplayValue('0');
    expect(extension.getByLabelText(addedCostsLabel)).toHaveDisplayValue('0');

    await user.type(rate, '40');
    await user.click(calculate);
    expect(displayedAmounts()).toEqual([1562, 0, 1562].map(formatCurrency));

    await setField(user, extension.getByLabelText(addedPagesLabel), '2');
    expect(displayedAmounts()).toEqual([]);
    await setField(user, extension.getByLabelText(addedHoursLabel), '18,4');
    await setField(user, extension.getByLabelText(addedCostsLabel), '30');
    await user.click(calculate);

    expect(displayedAmounts()).toEqual([1562, 766, 2328].map(formatCurrency));
    const [base, increase, total] = screen.getByRole('status').querySelectorAll('dt');
    expect(base).toHaveTextContent(/3\s+páginas/i);
    expect(increase).toHaveTextContent(/2\s+páginas/i);
    expect(total).toHaveTextContent(/5\s+páginas/i);
  });

  it('adds the separately rounded amounts so the published amounts add up to the cent', async () => {
    const user = userEvent.setup();
    render(<CorporateScopeBudget />);

    const initial = scopeFields('Alcance inicial');
    const extension = scopeFields('Ampliación');
    await user.type(screen.getByLabelText(rateLabel), '37,50');
    await setField(user, initial.getByLabelText(initialHoursLabel), '0,75');
    await setField(user, initial.getByLabelText(initialCostsLabel), '0');
    await setField(user, extension.getByLabelText(addedPagesLabel), '1');
    await setField(user, extension.getByLabelText(addedHoursLabel), '0,75');
    await user.click(screen.getByRole('button', { name: 'Calcular alcance y ampliación' }));

    expect(displayedAmounts()).toEqual([28.13, 28.13, 56.26].map(formatCurrency));
  });

  it.each([
    { scope: 'Alcance inicial', label: initialPagesLabel, value: '0' },
    { scope: 'Alcance inicial', label: initialPagesLabel, value: '3,5' },
    { scope: 'Ampliación', label: addedPagesLabel, value: '-1' },
    { scope: 'Ampliación', label: addedPagesLabel, value: '1,5' },
    { scope: 'Alcance inicial', label: initialHoursLabel, value: '1..2' },
    { scope: 'Ampliación', label: addedCostsLabel, value: '-1' },
    { scope: null, label: rateLabel, value: '0' },
  ])('rejects $value in $label', async ({ scope, label, value }) => {
    const user = userEvent.setup();
    render(<CorporateScopeBudget />);

    const fields = scope ? scopeFields(scope) : screen;
    if (scope) await user.type(screen.getByLabelText(rateLabel), '40');
    const input = fields.getByLabelText(label);
    await setField(user, input, value);
    await user.click(screen.getByRole('button', { name: 'Calcular alcance y ampliación' }));

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('status')).not.toBeEmptyDOMElement();
    expect(displayedAmounts()).toEqual([]);
  });
});
