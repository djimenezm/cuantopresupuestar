import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import ProjectHours from '@/app/como-calcular-horas-proyecto-freelance/ProjectHours';

function displayedHours() {
  return [...screen.getByRole('status').querySelectorAll('dd')].map((value) => value.textContent);
}

describe('ProjectHours', () => {
  it('adds and removes tasks, focuses the new name and recalculates the estimate', async () => {
    const user = userEvent.setup();
    render(<ProjectHours />);

    const add = screen.getByRole('button', { name: 'Añadir tarea' });
    const calculate = screen.getByRole('button', { name: 'Calcular horas' });
    const firstName = screen.getByLabelText(/^tarea 1(?: \(opcional\))?$/i);
    const firstHours = screen.getByLabelText('Horas de la tarea 1');
    expect(firstName).toHaveDisplayValue('');
    expect(firstHours).toHaveDisplayValue('');
    expect(screen.queryByLabelText('Horas de la tarea 2')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Reserva para revisiones (%)')).toHaveDisplayValue('15');

    await user.type(firstName, 'Definición');
    await user.type(firstHours, '4');
    await user.click(add);
    const secondName = screen.getByLabelText(/^tarea 2(?: \(opcional\))?$/i);
    await waitFor(() => expect(secondName).toHaveFocus());
    await user.type(secondName, 'Producción');
    await user.type(screen.getByLabelText('Horas de la tarea 2'), '22');
    await user.click(add);
    await user.type(screen.getByLabelText(/^tarea 3(?: \(opcional\))?$/i), 'Revisión y entrega');
    await user.type(screen.getByLabelText('Horas de la tarea 3'), '6');

    await user.click(calculate);
    expect(displayedHours()).toEqual(['32 h', '4,8 h', '36,8 h']);
    expect(screen.getByRole('link', { name: 'calcular el precio' })).toHaveAttribute(
      'href', '/como-presupuestar-un-proyecto-freelance#calcular-precio-proyecto',
    );

    await user.click(screen.getByRole('button', { name: 'Quitar tarea 2' }));
    expect(screen.queryByDisplayValue('Producción')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('Revisión y entrega')).toBeInTheDocument();
    expect(displayedHours()).toEqual([]);

    await user.click(calculate);
    expect(displayedHours()).toEqual(['10 h', '1,5 h', '11,5 h']);
    await user.type(screen.getByLabelText('Horas de la tarea 1'), '0');
    expect(displayedHours()).toEqual([]);
  });

  it.each([
    { hours: '0,5', reserve: '13', expected: ['0,5 h', '0,07 h', '0,57 h'] },
    { hours: '1,25', reserve: '12,5', expected: ['1,25 h', '0,16 h', '1,41 h'] },
    { hours: '2,25', reserve: '0', expected: ['2,25 h', '0 h', '2,25 h'] },
  ])('estimates $hours hours with a $reserve percent reserve', async ({ hours, reserve, expected }) => {
    const user = userEvent.setup();
    render(<ProjectHours />);

    await user.type(screen.getByLabelText('Horas de la tarea 1'), hours);
    const reserveField = screen.getByLabelText('Reserva para revisiones (%)');
    await user.clear(reserveField);
    await user.type(reserveField, reserve);
    await user.click(screen.getByRole('button', { name: 'Calcular horas' }));

    expect(displayedHours()).toEqual(expected);
  });

  it.each(['', '1..2', '-1'])('rejects %j hours for a named task', async (value) => {
    const user = userEvent.setup();
    render(<ProjectHours />);

    await user.type(screen.getByLabelText('Horas de la tarea 1'), '4');
    await user.click(screen.getByRole('button', { name: 'Añadir tarea' }));
    await user.type(screen.getByLabelText(/^tarea 2(?: \(opcional\))?$/i), 'Producción');
    const hours = screen.getByLabelText('Horas de la tarea 2');
    if (value) await user.type(hours, value);
    await user.click(screen.getByRole('button', { name: 'Calcular horas' }));

    expect(hours).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('status')).not.toBeEmptyDOMElement();
    expect(displayedHours()).toEqual([]);
  });

  it('rejects a reserve over 100 percent', async () => {
    const user = userEvent.setup();
    render(<ProjectHours />);

    await user.type(screen.getByLabelText('Horas de la tarea 1'), '4');
    const reserve = screen.getByLabelText('Reserva para revisiones (%)');
    await user.clear(reserve);
    await user.type(reserve, '100,1');
    await user.click(screen.getByRole('button', { name: 'Calcular horas' }));

    expect(reserve).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('status')).not.toBeEmptyDOMElement();
    expect(displayedHours()).toEqual([]);
  });
});
