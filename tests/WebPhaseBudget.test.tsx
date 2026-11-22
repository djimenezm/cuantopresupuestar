import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import WebPhaseBudget from '@/app/presupuesto-desarrollo-web-freelance/WebPhaseBudget';
import { formatCurrency } from '@/lib/format';
import { webDevelopmentExamplePhases } from '@/lib/projectExample';

const rateLabel = 'Tarifa de venta sin IVA (€/h)';
const hoursLabel = 'Horas presupuestadas';
const costsLabel = 'Costes directos sin IVA (€)';

function phaseFields(name: string) {
  return within(screen.getByRole('group', { name }));
}

function displayedAmounts() {
  return [...screen.getByRole('status').querySelectorAll('dd')].map((amount) => amount.textContent);
}

describe('WebPhaseBudget', () => {
  it('prices the five example phases, adds direct costs only to their phase and clears the result on edit', async () => {
    const user = userEvent.setup();
    render(<WebPhaseBudget phases={webDevelopmentExamplePhases} />);

    const rate = screen.getByLabelText(rateLabel);
    const calculate = screen.getByRole('button', { name: 'Calcular presupuesto web' });
    expect(rate).toHaveDisplayValue('');
    for (const phase of webDevelopmentExamplePhases) {
      const fields = phaseFields(phase.name);
      expect(fields.getByLabelText(hoursLabel)).toHaveDisplayValue(String(phase.hours));
      expect(fields.getByLabelText(costsLabel)).toHaveDisplayValue('0');
    }

    const developmentCosts = phaseFields('Desarrollo y carga inicial').getByLabelText(costsLabel);
    await user.type(rate, '40');
    await user.clear(developmentCosts);
    await user.type(developmentCosts, '90,00 €');
    await user.click(calculate);

    expect(displayedAmounts()).toEqual([240, 320, 970, 320, 160, 2010].map(formatCurrency));

    await user.clear(developmentCosts);
    await user.type(developmentCosts, '0');
    expect(displayedAmounts()).toEqual([]);
    await user.click(calculate);

    expect(displayedAmounts()).toEqual([240, 320, 880, 320, 160, 1920].map(formatCurrency));
  });

  it('rounds each phase to the nearest cent before summing the total', async () => {
    const user = userEvent.setup();
    render(<WebPhaseBudget phases={webDevelopmentExamplePhases} />);

    await user.type(screen.getByLabelText(rateLabel), '37,50');
    for (const [index, phase] of webDevelopmentExamplePhases.entries()) {
      const hours = phaseFields(phase.name).getByLabelText(hoursLabel);
      await user.clear(hours);
      await user.type(hours, index < 2 ? '0,75' : '0');
    }
    const firstPhaseCosts = phaseFields(webDevelopmentExamplePhases[0].name).getByLabelText(costsLabel);
    await user.clear(firstPhaseCosts);
    await user.type(firstPhaseCosts, '1,37');
    await user.click(screen.getByRole('button', { name: 'Calcular presupuesto web' }));

    expect(displayedAmounts()).toEqual([29.5, 28.13, 0, 0, 0, 57.63].map(formatCurrency));
  });

  it.each([
    { phase: null, label: rateLabel, value: '0' },
    { phase: 'Arquitectura y diseño', label: hoursLabel, value: '1..2' },
    { phase: 'Pruebas y ajustes', label: costsLabel, value: '-1' },
  ])('rejects $value in $label', async ({ phase, label, value }) => {
    const user = userEvent.setup();
    render(<WebPhaseBudget phases={webDevelopmentExamplePhases} />);

    const fields = phase ? phaseFields(phase) : screen;
    if (phase) await user.type(screen.getByLabelText(rateLabel), '40');
    const input = fields.getByLabelText(label);
    await user.clear(input);
    await user.type(input, value);
    await user.click(screen.getByRole('button', { name: 'Calcular presupuesto web' }));

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('status')).not.toBeEmptyDOMElement();
    expect(displayedAmounts()).toEqual([]);
  });
});
