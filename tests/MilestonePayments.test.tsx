import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import MilestonePayments from '@/app/presupuesto-por-fases-freelance/MilestonePayments';
import { formatCurrency } from '@/lib/format';

function displayedAmounts() {
  return [...screen.getByRole('status').querySelectorAll('dd')].map((amount) => amount.textContent);
}

describe('MilestonePayments', () => {
  it('allocates the rounding cent to the final milestone and accepts a pasted percentage', async () => {
    const user = userEvent.setup();
    render(<MilestonePayments />);

    const budget = screen.getByLabelText('Presupuesto sin IVA (€)');
    const initial = screen.getByLabelText('Hito inicial (%)');
    const intermediate = screen.getByLabelText('Hito intermedio (%)');
    const calculate = screen.getByRole('button', { name: 'Calcular reparto' });
    expect(initial).toHaveDisplayValue('40');
    expect(intermediate).toHaveDisplayValue('40');

    await user.type(budget, '1.200,01 €');
    await user.click(calculate);

    const result = screen.getByRole('status');
    expect(result).toHaveTextContent(/al aceptar el presupuesto/i);
    expect(result).toHaveTextContent(/al aprobar la fase principal/i);
    expect(result).toHaveTextContent(/antes de la entrega final/i);
    expect(displayedAmounts()).toEqual([480, 480, 240.01, 1200.01].map(formatCurrency));

    await user.clear(initial);
    await user.paste('30 %');
    expect(displayedAmounts()).toEqual([]);

    await user.click(calculate);
    expect(displayedAmounts()).toEqual([360, 480, 360.01, 1200.01].map(formatCurrency));
  });

  it('requires at least one percent of the budget for the final milestone', async () => {
    const user = userEvent.setup();
    render(<MilestonePayments />);

    await user.type(screen.getByLabelText('Presupuesto sin IVA (€)'), '1200,01');
    const intermediate = screen.getByLabelText('Hito intermedio (%)');
    await user.clear(intermediate);
    await user.type(intermediate, '60');
    await user.click(screen.getByRole('button', { name: 'Calcular reparto' }));

    expect(intermediate).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText('Hito inicial (%)')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('status')).toHaveTextContent(/1\s*% para el hito de cierre/i);
    expect(displayedAmounts()).toEqual([]);
  });

  it('rejects fractional percentages', async () => {
    const user = userEvent.setup();
    render(<MilestonePayments />);

    await user.type(screen.getByLabelText('Presupuesto sin IVA (€)'), '1200,01');
    const initial = screen.getByLabelText('Hito inicial (%)');
    await user.clear(initial);
    await user.type(initial, '40,5');
    await user.click(screen.getByRole('button', { name: 'Calcular reparto' }));

    expect(initial).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('status')).toHaveTextContent(/porcentaje entero/i);
    expect(displayedAmounts()).toEqual([]);
  });

  it.each(['', '1..2'])('rejects an invalid budget of %j', async (value) => {
    const user = userEvent.setup();
    render(<MilestonePayments />);

    const budget = screen.getByLabelText('Presupuesto sin IVA (€)');
    if (value) await user.type(budget, value);
    await user.click(screen.getByRole('button', { name: 'Calcular reparto' }));

    expect(budget).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('status')).not.toBeEmptyDOMElement();
    expect(displayedAmounts()).toEqual([]);
  });

  it('marks a budget that cannot cover three cent-sized milestones as invalid', async () => {
    const user = userEvent.setup();
    render(<MilestonePayments />);

    const budget = screen.getByLabelText('Presupuesto sin IVA (€)');
    const calculate = screen.getByRole('button', { name: 'Calcular reparto' });
    await user.type(budget, '0,02');
    await user.click(calculate);

    expect(budget).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText('Hito inicial (%)')).not.toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText('Hito intermedio (%)')).not.toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('status')).toHaveTextContent(/al menos 0,03\s*€/i);
    expect(displayedAmounts()).toEqual([]);

    await user.clear(budget);
    await user.type(budget, '0,03');
    await user.click(calculate);
    expect(displayedAmounts()).toEqual([0.01, 0.01, 0.01, 0.03].map(formatCurrency));
  });
});
