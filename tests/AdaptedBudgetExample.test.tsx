import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import AdaptedBudgetExample from '@/app/ejemplo-presupuesto-freelance/AdaptedBudgetExample';
import { formatCurrency } from '@/lib/format';

function setupBudgetExample() {
  const user = userEvent.setup();
  render(<AdaptedBudgetExample />);

  return {
    user,
    hoursField: screen.getByLabelText('Horas presupuestadas'),
    rateField: screen.getByLabelText('Tarifa de venta sin IVA (€/h)'),
    costsField: screen.getByLabelText('Costes directos sin IVA (€)'),
    calculate: screen.getByRole('button', { name: 'Calcular presupuesto' }),
  };
}

function displayedAmounts() {
  return [...screen.getByRole('status').querySelectorAll('dd')].map((value) => value.textContent);
}

describe('AdaptedBudgetExample', () => {
  it('shows both totals together and clears the breakdown when direct costs change', async () => {
    const { user, hoursField, rateField, costsField, calculate } = setupBudgetExample();
    expect(hoursField).toHaveDisplayValue('');
    expect(rateField).toHaveDisplayValue('');
    expect(costsField).toHaveDisplayValue('0');

    await user.type(hoursField, '36,8');
    await user.type(rateField, '40');
    await user.clear(costsField);
    await user.type(costsField, '90,00 €');
    await user.click(calculate);

    expect(screen.getByRole('status')).toHaveTextContent(/(?:base|total) sin iva/i);
    expect(screen.getByRole('status')).toHaveTextContent(/total con iva/i);
    expect(displayedAmounts()).toEqual([1472, 90, 1562, 328.02, 1890.02].map(formatCurrency));

    await user.clear(costsField);
    await user.type(costsField, '0');
    expect(displayedAmounts()).toEqual([]);
    await user.click(calculate);

    expect(displayedAmounts()).toEqual([1472, 0, 1472, 309.12, 1781.12].map(formatCurrency));
  });

  it('rounds half cents in labor and computes VAT from the displayed subtotal', async () => {
    const { user, hoursField, rateField, costsField, calculate } = setupBudgetExample();
    await user.type(hoursField, '0,75');
    await user.type(rateField, '37,50');
    await user.clear(costsField);
    await user.type(costsField, '1,37');
    await user.click(calculate);

    expect(displayedAmounts()).toEqual([28.13, 1.37, 29.5, 6.2, 35.7].map(formatCurrency));
  });

  it.each([
    { hours: '0', rate: '40', costs: '0', invalidField: 'hoursField' },
    { hours: '36,,8', rate: '40', costs: '0', invalidField: 'hoursField' },
    { hours: '36,8', rate: '0', costs: '0', invalidField: 'rateField' },
    { hours: '36,8', rate: '40,001', costs: '0', invalidField: 'rateField' },
    { hours: '36,8', rate: '40', costs: '-1', invalidField: 'costsField' },
  ] as const)('rejects $invalidField for $hours hours, $rate rate and $costs costs', async (example) => {
    const fields = setupBudgetExample();
    await fields.user.type(fields.hoursField, example.hours);
    await fields.user.type(fields.rateField, example.rate);
    await fields.user.clear(fields.costsField);
    await fields.user.type(fields.costsField, example.costs);
    await fields.user.click(fields.calculate);

    expect(fields[example.invalidField]).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('status')).not.toBeEmptyDOMElement();
    expect(displayedAmounts()).toEqual([]);
  });
});
