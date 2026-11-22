import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import PaymentSplit from '@/app/condiciones-pago-presupuesto-freelance/PaymentSplit';
import { formatCurrency } from '@/lib/format';

describe('PaymentSplit', () => {
  it('splits a Spanish budget to the cent and accepts a pasted percentage', async () => {
    const user = userEvent.setup();
    render(<PaymentSplit />);

    const budget = screen.getByLabelText('Presupuesto sin IVA (€)');
    const deposit = screen.getByLabelText('Anticipo (%)');
    const calculate = screen.getByRole('button', { name: 'Calcular reparto' });
    expect(budget).toHaveDisplayValue('');
    expect(deposit).toHaveDisplayValue('50');

    await user.type(budget, '1.200,01 €');
    await user.click(calculate);

    const result = screen.getByRole('status');
    expect(result).toHaveTextContent(/al aceptar, antes de empezar/i);
    expect(result).toHaveTextContent(/antes de la entrega final/i);
    expect([...result.querySelectorAll('dd')].map((amount) => amount.textContent)).toEqual(
      [600.01, 600, 1200.01].map(formatCurrency),
    );

    await user.clear(deposit);
    await user.paste('30 %');
    expect(screen.getByRole('status').querySelector('dl')).not.toBeInTheDocument();

    await user.click(calculate);
    expect([...screen.getByRole('status').querySelectorAll('dd')].map((amount) => amount.textContent)).toEqual(
      [360, 840.01, 1200.01].map(formatCurrency),
    );
  });

  it.each(['', '1..2', '-20', '0.001'])('rejects an invalid budget of %j', async (value) => {
    const user = userEvent.setup();
    render(<PaymentSplit />);

    const budget = screen.getByLabelText('Presupuesto sin IVA (€)');
    if (value) await user.type(budget, value);
    await user.click(screen.getByRole('button', { name: 'Calcular reparto' }));

    expect(budget).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('status')).not.toBeEmptyDOMElement();
    expect(screen.getByRole('status').querySelector('dl')).not.toBeInTheDocument();
  });

  it.each([
    ['1200,01', '100'],
    ['0,02', '1'],
  ])('rejects a budget of %s with a deposit of %s%% when one payment would be zero', async (budget, percent) => {
    const user = userEvent.setup();
    render(<PaymentSplit />);

    await user.type(screen.getByLabelText('Presupuesto sin IVA (€)'), budget);
    const deposit = screen.getByLabelText('Anticipo (%)');
    await user.clear(deposit);
    await user.type(deposit, percent);
    await user.click(screen.getByRole('button', { name: 'Calcular reparto' }));

    expect(deposit).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('status')).not.toBeEmptyDOMElement();
    expect(screen.getByRole('status').querySelector('dl')).not.toBeInTheDocument();
  });

  it('marks a budget that cannot cover two cent-sized payments as invalid', async () => {
    const user = userEvent.setup();
    render(<PaymentSplit />);

    const budget = screen.getByLabelText('Presupuesto sin IVA (€)');
    const deposit = screen.getByLabelText('Anticipo (%)');
    const calculate = screen.getByRole('button', { name: 'Calcular reparto' });
    await user.type(budget, '0,01');
    await user.click(calculate);

    expect(budget).toHaveAttribute('aria-invalid', 'true');
    expect(deposit).not.toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('status')).toHaveTextContent(/al menos 0,02\s*€/i);
    expect(screen.getByRole('status').querySelector('dl')).not.toBeInTheDocument();

    await user.clear(budget);
    await user.type(budget, '0,02');
    await user.click(calculate);
    expect([...screen.getByRole('status').querySelectorAll('dd')].map((amount) => amount.textContent)).toEqual(
      [0.01, 0.01, 0.02].map(formatCurrency),
    );
  });
});
