import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import WebScopeComparison from '@/app/cuanto-cobrar-por-una-pagina-web-freelance/WebScopeComparison';
import { formatCurrency, formatNumber } from '@/lib/format';

const scenarios = [
  { name: 'Landing de una página', hours: 20.7, costs: 30 },
  { name: 'Web corporativa pequeña', hours: 36.8, costs: 90 },
  { name: 'Tienda con catálogo preparado', hours: 80.5, costs: 180 },
] as const;

const rateLabel = 'Tarifa de venta sin IVA (€/h)';
const hoursLabel = 'Horas presupuestadas';
const costsLabel = 'Costes directos sin IVA (€)';

function scopeFields(name: string) {
  return within(screen.getByRole('group', { name }));
}

function displayedAmounts() {
  return [...screen.getByRole('status').querySelectorAll('dd')].map((amount) => amount.textContent);
}

describe('WebScopeComparison', () => {
  it('shows three separate quotes and changes only the edited scope price', async () => {
    const user = userEvent.setup();
    render(<WebScopeComparison scenarios={scenarios} />);

    const rate = screen.getByLabelText(rateLabel);
    const compare = screen.getByRole('button', { name: 'Comparar precios' });
    expect(rate).toHaveDisplayValue('');
    for (const scenario of scenarios) {
      const fields = scopeFields(scenario.name);
      expect(fields.getByLabelText(hoursLabel)).toHaveDisplayValue(formatNumber(scenario.hours, 2));
      expect(fields.getByLabelText(costsLabel)).toHaveDisplayValue(String(scenario.costs));
    }

    await user.type(rate, '40');
    await user.click(compare);

    expect(displayedAmounts()).toEqual([858, 1562, 3400].map(formatCurrency));
    const result = screen.getByRole('status');
    for (const scenario of scenarios) expect(result).toHaveTextContent(scenario.name);
    expect(result.textContent).not.toContain(formatCurrency(5820));

    const corporateHours = scopeFields(scenarios[1].name).getByLabelText(hoursLabel);
    await user.clear(corporateHours);
    await user.type(corporateHours, '40');
    expect(displayedAmounts()).toEqual([]);
    await user.click(compare);

    expect(displayedAmounts()).toEqual([858, 1690, 3400].map(formatCurrency));
  });

  it('rounds half cents while keeping direct costs in the relevant scope', async () => {
    const user = userEvent.setup();
    render(<WebScopeComparison scenarios={scenarios} />);

    await user.type(screen.getByLabelText(rateLabel), '37,50');
    const landing = scopeFields(scenarios[0].name);
    const hours = landing.getByLabelText(hoursLabel);
    const costs = landing.getByLabelText(costsLabel);
    await user.clear(hours);
    await user.type(hours, '0,75');
    await user.clear(costs);
    await user.type(costs, '1,37');
    await user.click(screen.getByRole('button', { name: 'Comparar precios' }));

    expect(displayedAmounts()).toEqual([29.5, 1470, 3198.75].map(formatCurrency));
  });

  it.each([
    { scope: null, label: rateLabel, value: '0' },
    { scope: scenarios[1].name, label: hoursLabel, value: '1..2' },
    { scope: scenarios[2].name, label: costsLabel, value: '-1' },
  ])('rejects $value in $label', async ({ scope, label, value }) => {
    const user = userEvent.setup();
    render(<WebScopeComparison scenarios={scenarios} />);

    const fields = scope ? scopeFields(scope) : screen;
    if (scope) await user.type(screen.getByLabelText(rateLabel), '40');
    const input = fields.getByLabelText(label);
    await user.clear(input);
    await user.type(input, value);
    await user.click(screen.getByRole('button', { name: 'Comparar precios' }));

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('status')).not.toBeEmptyDOMElement();
    expect(displayedAmounts()).toEqual([]);
  });
});
