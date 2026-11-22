import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import StoreCatalogBudget from '@/app/cuanto-cobrar-tienda-online-freelance/StoreCatalogBudget';
import { formatCurrency } from '@/lib/format';

const rateLabel = 'Tarifa de venta sin IVA (€/h)';
const initialProductsLabel = 'Productos iniciales';
const initialHoursLabel = 'Horas presupuestadas';
const initialCostsLabel = 'Costes directos sin IVA (€)';
const addedProductsLabel = 'Productos adicionales';
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

describe('StoreCatalogBudget', () => {
  it('shows the initial budget and charges only the work and costs of the catalog extension', async () => {
    const user = userEvent.setup();
    render(<StoreCatalogBudget />);

    const initial = scopeFields('Alcance inicial');
    const extension = scopeFields('Ampliación');
    const rate = screen.getByLabelText(rateLabel);
    const calculate = screen.getByRole('button', { name: 'Calcular alcance y ampliación' });
    expect(rate).toHaveDisplayValue('');
    expect(initial.getByLabelText(initialProductsLabel)).toHaveDisplayValue('10');
    expect(initial.getByLabelText(initialHoursLabel)).toHaveDisplayValue('80,5');
    expect(initial.getByLabelText(initialCostsLabel)).toHaveDisplayValue('180');
    expect(extension.getByLabelText(addedProductsLabel)).toHaveDisplayValue('0');
    expect(extension.getByLabelText(addedHoursLabel)).toHaveDisplayValue('0');
    expect(extension.getByLabelText(addedCostsLabel)).toHaveDisplayValue('0');

    await user.type(rate, '40');
    await user.click(calculate);
    expect(displayedAmounts()).toEqual([3400, 0, 3400].map(formatCurrency));

    await setField(user, extension.getByLabelText(addedProductsLabel), '20');
    expect(displayedAmounts()).toEqual([]);
    await setField(user, extension.getByLabelText(addedHoursLabel), '10');
    await setField(user, extension.getByLabelText(addedCostsLabel), '60');
    await user.click(calculate);

    expect(displayedAmounts()).toEqual([3400, 460, 3860].map(formatCurrency));
    const [base, increase, total] = screen.getByRole('status').querySelectorAll('dt');
    expect(base).toHaveTextContent(/10\s+productos/i);
    expect(increase).toHaveTextContent(/20\s+productos/i);
    expect(total).toHaveTextContent(/30\s+productos/i);
  });

  it('accepts an empty initial catalog and sums the two individually rounded price lines', async () => {
    const user = userEvent.setup();
    render(<StoreCatalogBudget />);

    const initial = scopeFields('Alcance inicial');
    const extension = scopeFields('Ampliación');
    await user.type(screen.getByLabelText(rateLabel), '37,50');
    await setField(user, initial.getByLabelText(initialProductsLabel), '0');
    await setField(user, initial.getByLabelText(initialHoursLabel), '0,75');
    await setField(user, initial.getByLabelText(initialCostsLabel), '0');
    await setField(user, extension.getByLabelText(addedProductsLabel), '1');
    await setField(user, extension.getByLabelText(addedHoursLabel), '0,75');
    await user.click(screen.getByRole('button', { name: 'Calcular alcance y ampliación' }));

    expect(displayedAmounts()).toEqual([28.13, 28.13, 56.26].map(formatCurrency));
    const [base, , total] = screen.getByRole('status').querySelectorAll('dt');
    expect(base).toHaveTextContent(/0\s+productos/i);
    expect(total).toHaveTextContent(/1\s+producto\b/i);
  });

  it.each([
    { scope: 'Alcance inicial', label: initialProductsLabel, value: '-1' },
    { scope: 'Ampliación', label: addedProductsLabel, value: '1,5' },
  ])('rejects $value in $label', async ({ scope, label, value }) => {
    const user = userEvent.setup();
    render(<StoreCatalogBudget />);

    await user.type(screen.getByLabelText(rateLabel), '40');
    const input = scopeFields(scope).getByLabelText(label);
    await setField(user, input, value);
    await user.click(screen.getByRole('button', { name: 'Calcular alcance y ampliación' }));

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('status')).not.toBeEmptyDOMElement();
    expect(displayedAmounts()).toEqual([]);
  });
});
