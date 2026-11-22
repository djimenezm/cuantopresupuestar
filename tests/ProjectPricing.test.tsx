import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import ProjectPricing from '@/app/como-presupuestar-un-proyecto-freelance/ProjectPricing';
import { formatCurrency } from '@/lib/format';

const fieldLabels = {
  hours: 'Horas estimadas del proyecto',
  rate: 'Tarifa interna sin IVA (€/h)',
  costs: 'Costes directos sin IVA (€)',
  reserve: 'Reserva para revisiones (%)',
  markup: 'Recargo sobre el mínimo (%)',
} as const;

type PricingField = keyof typeof fieldLabels;

async function fillPricing(user: ReturnType<typeof userEvent.setup>, values: Partial<Record<PricingField, string>>) {
  for (const field of Object.keys(fieldLabels) as PricingField[]) {
    const value = values[field];
    if (value === undefined) continue;

    const input = screen.getByLabelText(fieldLabels[field]);
    await user.clear(input);
    await user.type(input, value);
  }
}

function displayedValues() {
  return [...screen.getByRole('status').querySelectorAll('dd')].map((value) => value.textContent);
}

describe('ProjectPricing', () => {
  it('calculates the minimum and recommended estimates and clears them on edit', async () => {
    const user = userEvent.setup();
    render(<ProjectPricing />);

    expect(screen.getByLabelText(fieldLabels.hours)).toHaveDisplayValue('');
    expect(screen.getByLabelText(fieldLabels.rate)).toHaveDisplayValue('');
    expect(screen.getByLabelText(fieldLabels.costs)).toHaveDisplayValue('0');
    expect(screen.getByLabelText(fieldLabels.reserve)).toHaveDisplayValue('15');
    expect(screen.getByLabelText(fieldLabels.markup)).toHaveDisplayValue('10');

    await fillPricing(user, { hours: '32', rate: '40', costs: '90' });
    await user.click(screen.getByRole('button', { name: 'Calcular precios' }));

    expect(displayedValues()).toEqual(['36,8 h', ...[1472, 90, 1562, 156.2, 1718.2].map(formatCurrency)]);

    await fillPricing(user, { costs: '0' });
    expect(displayedValues()).toEqual([]);
  });

  it.each([
    {
      example: 'half-cent work and markup',
      values: { hours: '0,75', rate: '37,50', costs: '1,42', reserve: '0', markup: '10' },
      hoursWithReserve: '0,75 h',
      amounts: [28.13, 1.42, 29.55, 2.96, 32.51],
    },
    {
      example: 'fractional hours after applying reserve',
      values: { hours: '0,5', rate: '100', reserve: '13', markup: '0' },
      hoursWithReserve: '0,565 h',
      amounts: [56.5, 0, 56.5, 0, 56.5],
    },
    {
      example: 'percentages with a fractional part',
      values: { hours: '10', rate: '40', reserve: '12,5', markup: '15,5' },
      hoursWithReserve: '11,25 h',
      amounts: [450, 0, 450, 69.75, 519.75],
    },
    {
      example: 'percentages at the upper bound',
      values: { hours: '0,5', rate: '100', reserve: '100', markup: '100' },
      hoursWithReserve: '1 h',
      amounts: [100, 0, 100, 100, 200],
    },
  ])('calculates the breakdown for $example', async ({ values, hoursWithReserve, amounts }) => {
    const user = userEvent.setup();
    render(<ProjectPricing />);

    await fillPricing(user, values);
    await user.click(screen.getByRole('button', { name: 'Calcular precios' }));

    expect(displayedValues()).toEqual([hoursWithReserve, ...amounts.map(formatCurrency)]);
  });

  it.each([
    { field: 'hours', value: '1..2' },
    { field: 'rate', value: '0' },
    { field: 'costs', value: '-1' },
    { field: 'reserve', value: '100,1' },
    { field: 'markup', value: '-1' },
    { field: 'markup', value: '10,55' },
  ] as const)('rejects a $field input of $value', async ({ field, value }) => {
    const user = userEvent.setup();
    render(<ProjectPricing />);

    await fillPricing(user, { hours: '32', rate: '40', [field]: value });
    await user.click(screen.getByRole('button', { name: 'Calcular precios' }));

    expect(screen.getByLabelText(fieldLabels[field])).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('status')).not.toBeEmptyDOMElement();
    expect(displayedValues()).toEqual([]);
  });
});
