import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CalculatorForm from '@/components/CalculatorForm';
import { formatCurrency } from '@/lib/format';

function comparison() {
  return screen.getByRole('group', { name: 'Comparar situaciones' });
}

function budgetRow() {
  return within(comparison()).getByRole('rowheader', { name: 'Presupuesto recomendado sin IVA' }).closest('tr')!;
}

async function startComparison(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: 'Calcular presupuesto' }));
  await user.click(screen.getByRole('button', { name: 'Guardar como situación A' }));
}

describe('scenario comparison flow', () => {
  beforeEach(() => { window.va = vi.fn(); });

  it('only offers saving A after a valid calculation and explains its lifetime', async () => {
    const user = userEvent.setup();
    render(<CalculatorForm />);
    expect(screen.queryByRole('button', { name: 'Guardar como situación A' })).not.toBeInTheDocument();
    await startComparison(user);
    expect(within(comparison()).getByText(/A se pierde al recargar o salir/)).toBeInTheDocument();
    expect(within(comparison()).getByText('A y B tienen los mismos datos y resultados.')).toBeInTheDocument();
    expect(within(comparison()).getByRole('link', { name: /supuestos y comprobaciones/i })).toHaveAttribute('href', '#quote-method-heading');
  });

  it('updates B live, keeps A intact, and keeps keyboard focus in the edited field', async () => {
    const user = userEvent.setup();
    render(<CalculatorForm />);
    await startComparison(user);
    const hours = screen.getByRole('spinbutton', { name: 'Horas estimadas del proyecto' });
    await user.clear(hours);
    await user.type(hours, '36');
    expect(within(budgetRow()).getAllByRole('cell').map((cell) => cell.textContent)).toEqual([
      `A${formatCurrency(811.18)}`, `B${formatCurrency(1622.36)}`, `Diferencia+${formatCurrency(811.18)}`,
    ]);
    await waitFor(() => expect(hours).toHaveFocus());
    expect(window.va).toHaveBeenCalledTimes(1);
  });

  it('hides invalid B figures but keeps A and the client offer across corrections', async () => {
    const user = userEvent.setup();
    render(<CalculatorForm />);
    await startComparison(user);
    const clientOffer = screen.getByRole('textbox', { name: /qué precio propone el cliente/i });
    await user.type(clientOffer, '900');
    const hours = screen.getByRole('spinbutton', { name: 'Horas estimadas del proyecto' });
    await user.clear(hours);
    expect(within(comparison()).getByRole('status')).toHaveTextContent('B no es válida.');
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Tu presupuesto recomendado para este proyecto' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sustituir A por la situación actual' })).toBeDisabled();
    await user.type(hours, '36');
    expect(screen.getByRole('textbox', { name: /qué precio propone el cliente/i })).toHaveValue('900');
    expect(within(budgetRow()).getAllByRole('cell')[0].textContent).toContain(formatCurrency(811.18));
    expect(screen.getByText(/tendrías que reducir aproximadamente/i)).toBeInTheDocument();
  });

  it('rejects 0.25 hours and retains A and the offer until the minimum is corrected', async () => {
    const user = userEvent.setup();
    render(<CalculatorForm />);
    await startComparison(user);
    await user.type(screen.getByRole('textbox', { name: /qué precio propone el cliente/i }), '900');
    const hours = screen.getByRole('spinbutton', { name: 'Horas estimadas del proyecto' });
    fireEvent.change(hours, { target: { value: '0.25' } });
    await user.click(screen.getByRole('button', { name: 'Calcular presupuesto' }));

    expect(hours).toHaveValue(0.25);
    expect(hours).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Las horas del proyecto deben ser como mínimo 0,5.')).toBeInTheDocument();
    expect(within(comparison()).getByRole('status')).toHaveTextContent('B no es válida.');
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sustituir A por la situación actual' })).toBeDisabled();
    await waitFor(() => expect(hours).toHaveFocus());

    fireEvent.change(hours, { target: { value: '0.5' } });
    expect(screen.getByRole('textbox', { name: /qué precio propone el cliente/i })).toHaveValue('900');
    expect(within(budgetRow()).getAllByRole('cell')[0].textContent).toContain(formatCurrency(811.18));
    expect(screen.getByRole('button', { name: 'Sustituir A por la situación actual' })).toBeEnabled();
  });

  it('lists multiple changes and keeps taxes separate', async () => {
    const user = userEvent.setup();
    render(<CalculatorForm />);
    await startComparison(user);
    fireEvent.change(screen.getByRole('spinbutton', { name: 'Horas estimadas del proyecto' }), { target: { value: '24' } });
    fireEvent.change(screen.getByRole('spinbutton', { name: /costes directos del proyecto/i }), { target: { value: '150' } });
    await user.click(screen.getByRole('radio', { name: 'No' }));
    expect(within(comparison()).getByText(/Han cambiado 3 entradas/)).toHaveTextContent('efecto conjunto');
    await user.click(within(comparison()).getByText('Ver entradas que cambian (3)'));
    expect(within(comparison()).getAllByRole('listitem')).toHaveLength(3);
    expect(within(comparison()).getByText(/de Sí a No/)).toBeInTheDocument();
    const vatRow = within(comparison()).getByRole('rowheader', { name: 'IVA añadido' }).closest('tr')!;
    expect(within(vatRow).getAllByRole('cell')[1].textContent).toContain(formatCurrency(0));
  });

  it('replaces A independently and can remove it while B is invalid', async () => {
    const user = userEvent.setup();
    render(<CalculatorForm />);
    await startComparison(user);
    const hours = screen.getByRole('spinbutton', { name: 'Horas estimadas del proyecto' });
    fireEvent.change(hours, { target: { value: '36' } });
    await user.click(screen.getByRole('button', { name: 'Sustituir A por la situación actual' }));
    expect(within(comparison()).getByText('A y B tienen los mismos datos y resultados.')).toBeInTheDocument();
    fireEvent.change(hours, { target: { value: '18' } });
    expect(within(budgetRow()).getAllByRole('cell')[0].textContent).toContain(formatCurrency(1622.36));
    expect(within(budgetRow()).getAllByRole('cell')[2].textContent).toContain(formatCurrency(-811.18));
    await user.clear(hours);
    await user.click(screen.getByRole('button', { name: 'Eliminar comparación' }));
    expect(screen.queryByRole('group', { name: 'Comparar situaciones' })).not.toBeInTheDocument();
    await user.type(hours, '18');
    expect(screen.getByRole('button', { name: 'Guardar como situación A' })).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('drops A on unmount rather than persisting or sending its inputs', async () => {
    const user = userEvent.setup();
    const save = vi.spyOn(Storage.prototype, 'setItem');
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const { unmount } = render(<CalculatorForm />);
    await startComparison(user);
    unmount();
    render(<CalculatorForm />);
    await user.click(screen.getByRole('button', { name: 'Calcular presupuesto' }));
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(save).not.toHaveBeenCalled();
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(vi.mocked(window.va!).mock.calls.every(([, payload]) => payload.name === 'project_quote_calculated')).toBe(true);
    save.mockRestore();
    fetchSpy.mockRestore();
  });

  it('drops only A when the browser restores the page from its history cache', async () => {
    const user = userEvent.setup();
    render(<CalculatorForm />);
    await startComparison(user);

    const hours = screen.getByRole('spinbutton', { name: 'Horas estimadas del proyecto' });
    fireEvent.change(hours, { target: { value: '36' } });
    await user.type(screen.getByRole('textbox', { name: /qué precio propone el cliente/i }), '900');

    fireEvent(window, new PageTransitionEvent('pageshow', { persisted: false }));
    const cells = within(budgetRow()).getAllByRole('cell');
    expect(cells[0].textContent).toContain(formatCurrency(811.18));
    expect(cells[1].textContent).toContain(formatCurrency(1622.36));

    fireEvent(window, new PageTransitionEvent('pageshow', { persisted: true }));

    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Guardar como situación A' })).toBeEnabled();
    expect(hours).toHaveValue(36);
    expect(screen.getByRole('textbox', { name: /qué precio propone el cliente/i })).toHaveValue('900');
    expect(document.querySelector('.result-copy-preview')!.textContent)
      .toContain(`Presupuesto recomendado: ${formatCurrency(1622.36)} sin IVA`);
  });

  it('returns keyboard focus to saving A when the comparison is removed', async () => {
    const user = userEvent.setup();
    render(<CalculatorForm />);
    await startComparison(user);
    act(() => screen.getByRole('button', { name: 'Eliminar comparación' }).focus());
    await user.keyboard('{Enter}');
    expect(screen.getByRole('button', { name: 'Guardar como situación A' })).toHaveFocus();
  });

  it('returns focus to the invalid field when removing A would remove the comparison controls', async () => {
    const user = userEvent.setup();
    render(<CalculatorForm />);
    await startComparison(user);
    const hours = screen.getByRole('spinbutton', { name: 'Horas estimadas del proyecto' });
    await user.clear(hours);
    act(() => screen.getByRole('button', { name: 'Eliminar comparación' }).focus());
    await user.keyboard('{Enter}');
    expect(hours).toHaveFocus();
  });

  it('returns focus to the form when removing A with B outside the safe calculation range', async () => {
    const user = userEvent.setup();
    render(<CalculatorForm />);
    await startComparison(user);

    const costs = screen.getByRole('spinbutton', { name: /costes directos del proyecto/i });
    const form = costs.closest('form')!;
    fireEvent.change(costs, { target: { value: '100000000000000' } });
    expect(screen.getByRole('alert')).toHaveTextContent(/superan el rango seguro/);
    expect(form.querySelector('[aria-invalid="true"]')).not.toBeInTheDocument();
    expect(within(comparison()).getByRole('status')).toHaveTextContent('B no es válida.');

    act(() => screen.getByRole('button', { name: 'Eliminar comparación' }).focus());
    await user.keyboard('{Enter}');

    expect(screen.queryByRole('group', { name: 'Comparar situaciones' })).not.toBeInTheDocument();
    expect(form).toHaveFocus();
    expect(form).toHaveAccessibleName('Calculadora');
    expect(form).toHaveAccessibleDescription(/superan el rango seguro/);
    await user.tab();
    expect(within(form).getByRole('spinbutton', { name: /objetivo mensual neto/i })).toHaveFocus();
  });

  it('uses the same closed base, IVA and total in the result, comparison and copied summary', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    render(<CalculatorForm />);
    await startComparison(user);
    fireEvent.change(screen.getByRole('spinbutton', { name: /horas estimadas del proyecto/i }), {
      target: { value: '1.5' },
    });

    expect(document.querySelector('.result-item-full strong')!.textContent).toBe(formatCurrency(81.80));
    expect(within(budgetRow()).getAllByRole('cell')[1].textContent).toContain(formatCurrency(67.60));
    const vatRow = within(comparison()).getByRole('rowheader', { name: 'IVA añadido' }).closest('tr')!;
    expect(within(vatRow).getAllByRole('cell')[1].textContent).toContain(formatCurrency(14.20));
    await user.click(screen.getByRole('button', { name: 'Copiar resumen' }));
    expect(writeText.mock.calls[0][0]).toContain(`Presupuesto recomendado: ${formatCurrency(67.60)} sin IVA`);
    expect(writeText.mock.calls[0][0]).toContain(`IVA añadido: ${formatCurrency(14.20)}`);
    expect(writeText.mock.calls[0][0]).toContain(`Total final con IVA: ${formatCurrency(81.80)}`);

    await user.click(screen.getByRole('radio', { name: 'No' }));
    await user.click(screen.getByRole('button', { name: /Resumen copiado|Copiar resumen/ }));
    expect(writeText.mock.calls[1][0]).toContain('IVA: no añadido en esta simulación');
    expect(writeText.mock.calls[1][0]).toContain(`Total final sin IVA: ${formatCurrency(67.60)}`);
  });
});
