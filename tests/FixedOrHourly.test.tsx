import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import FixedOrHourly from '@/app/precio-cerrado-o-por-horas-freelance/FixedOrHourly';
import { formatCurrency } from '@/lib/format';

function setupComparison() {
  const user = userEvent.setup();
  render(<FixedOrHourly />);

  return {
    user,
    fixedPrice: screen.getByLabelText('Precio cerrado sin IVA (€)'),
    hourlyRate: screen.getByLabelText('Tarifa sin IVA (€/h)'),
    billableHours: screen.getByLabelText('Horas facturables estimadas (opcional)'),
    compare: screen.getByRole('button', { name: 'Comparar importes' }),
  };
}

function displayedValues() {
  return [...screen.getByRole('status').querySelectorAll('dd')].map((value) => value.textContent);
}

describe('FixedOrHourly', () => {
  it('finds the break-even point without an estimate and compares when the hours change', async () => {
    const { user, fixedPrice, hourlyRate, billableHours, compare } = setupComparison();
    expect(fixedPrice).toHaveDisplayValue('');
    expect(hourlyRate).toHaveDisplayValue('');
    expect(billableHours).toHaveDisplayValue('');

    await user.type(fixedPrice, '1.500 €');
    await user.type(hourlyRate, '60');
    await user.click(compare);

    expect(displayedValues()).toEqual(['25 h', formatCurrency(1500)]);
    expect(screen.getByRole('status')).toHaveTextContent(/por debajo|menos/i);
    expect(screen.getByRole('status')).toHaveTextContent(/por encima|más/i);

    await user.type(billableHours, '30');
    expect(displayedValues()).toEqual([]);
    await user.click(compare);

    expect(displayedValues()).toEqual(['25 h', ...[1500, 1800, 300].map(formatCurrency)]);
    expect(screen.getByRole('status')).toHaveTextContent(/más por horas/i);

    await user.clear(billableHours);
    await user.type(billableHours, '25');
    expect(displayedValues()).toEqual([]);
    await user.click(compare);

    expect(displayedValues()).toEqual(['25 h', ...[1500, 1500, 0].map(formatCurrency)]);
  });

  it('labels the rounded break-even time as approximate and compares actual amounts to the cent', async () => {
    const { user, fixedPrice, hourlyRate, billableHours, compare } = setupComparison();

    await user.type(fixedPrice, '1200');
    await user.type(hourlyRate, '65');
    await user.type(billableHours, '18,46');
    await user.click(compare);

    const [breakEven, ...amounts] = displayedValues();
    expect(breakEven).toMatch(/18,46\s*h/i);
    expect(screen.getByRole('status')).toHaveTextContent(/aprox|≈|alrededor/i);
    expect(amounts).toEqual([1200, 1199.90, 0.10].map(formatCurrency));
    expect(screen.getByRole('status')).toHaveTextContent(/más a precio cerrado/i);
  });

  it.each([
    { rate: '0', hours: '25', invalidField: 'hourlyRate' },
    { rate: '60', hours: '1..2', invalidField: 'billableHours' },
  ] as const)('rejects $invalidField when the rate is $rate and the estimate is $hours', async (testCase) => {
    const fields = setupComparison();

    await fields.user.type(fields.fixedPrice, '1500');
    await fields.user.type(fields.hourlyRate, testCase.rate);
    await fields.user.type(fields.billableHours, testCase.hours);
    await fields.user.click(fields.compare);

    expect(fields[testCase.invalidField]).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('status')).not.toBeEmptyDOMElement();
    expect(displayedValues()).toEqual([]);
  });

  it('rounds a half-cent hourly total before comparing the two billing amounts', async () => {
    const { user, fixedPrice, hourlyRate, billableHours, compare } = setupComparison();

    await user.type(fixedPrice, '0,02');
    await user.type(hourlyRate, '0,50');
    await user.type(billableHours, '0,01');
    await user.click(compare);

    expect(displayedValues()).toEqual(['0,04 h', ...[0.02, 0.01, 0.01].map(formatCurrency)]);
  });
});
