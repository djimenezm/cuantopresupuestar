import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import BudgetMargin from '@/app/margen-presupuesto-freelance/BudgetMargin';
import { formatCurrency } from '@/lib/format';

function setupBudgetMargin() {
  const user = userEvent.setup();
  render(<BudgetMargin />);

  return {
    user,
    costField: screen.getByLabelText('Coste total sin IVA (€)'),
    priceField: screen.getByLabelText('Precio sin IVA (€)'),
    calculate: screen.getByRole('button', { name: 'Calcular margen y recargo' }),
  };
}

function displayedValues() {
  return [...screen.getByRole('status').querySelectorAll('dd')].map((value) => value.textContent);
}

function expectSummary(amount: number, margin: string, markup: string) {
  const [profit, ...ratios] = displayedValues();
  expect(profit).toBe(formatCurrency(amount));
  expect(ratios.map((value) => value?.replace(/\s+/g, ' ').trim())).toEqual([margin, markup]);
}

describe('BudgetMargin', () => {
  it('uses the price for the margin and the cost for the markup, and clears results on edit', async () => {
    const { user, costField, priceField, calculate } = setupBudgetMargin();
    expect(costField).toHaveDisplayValue('');
    expect(priceField).toHaveDisplayValue('');

    await user.type(costField, '1.000,00 €');
    await user.type(priceField, '1250');
    await user.click(calculate);
    expectSummary(250, '20 %', '25 %');

    await user.clear(priceField);
    await user.type(priceField, '1200');
    expect(displayedValues()).toEqual([]);
    await user.click(calculate);
    expectSummary(200, '16,67 %', '20 %');
  });

  it('reports a loss and preserves the signs of both percentages', async () => {
    const { user, costField, priceField, calculate } = setupBudgetMargin();
    await user.type(costField, '1000');
    await user.type(priceField, '800');
    await user.click(calculate);

    expect(screen.getByRole('status')).toHaveTextContent(/pérdida/i);
    expectSummary(-200, '-25 %', '-20 %');
  });

  it.each([
    { cost: '1000', price: '1000', amount: 0, margin: '0 %', markup: '0 %' },
    { cost: '0', price: '500', amount: 500, margin: '100 %', markup: 'Indefinido con coste de 0 €' },
    { cost: '1000', price: '0', amount: -1000, margin: 'Indefinido con precio de 0 €', markup: '-100 %' },
  ])('reports valid results for cost $cost and price $price', async ({ cost, price, amount, margin, markup }) => {
    const { user, costField, priceField, calculate } = setupBudgetMargin();
    await user.type(costField, cost);
    await user.type(priceField, price);
    await user.click(calculate);

    expectSummary(amount, margin, markup);
  });

  it.each([
    { cost: '-1', price: '1250', invalidField: 'costField' },
    { cost: '1000', price: '', invalidField: 'priceField' },
    { cost: '1000', price: '1..2', invalidField: 'priceField' },
  ] as const)('rejects invalid cost $cost or price $price', async ({ cost, price, invalidField }) => {
    const fields = setupBudgetMargin();
    if (cost) await fields.user.type(fields.costField, cost);
    if (price) await fields.user.type(fields.priceField, price);
    await fields.user.click(fields.calculate);

    expect(fields[invalidField]).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('status')).not.toBeEmptyDOMElement();
    expect(displayedValues()).toEqual([]);
  });
});
