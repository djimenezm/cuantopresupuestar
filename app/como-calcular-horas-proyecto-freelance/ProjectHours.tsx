'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { formatNumber } from '@/lib/format';
import { parseSpanishNumber } from '@/lib/spanishNumber';
import styles from './ProjectHours.module.css';

type Task = { id: number; name: string; hours: string };

type Estimate = { baseHundredths: number; reserveHundredths: number; reservePercent: number };
type InputError = { field: number | 'reserve' | 'total'; message: string };

const taskHoursPattern = /^\d+(?:[,.]\d{1,2})?$/;
const reservePattern = /^\d+(?:[,.]\d)?(?:\s*%)?$/;
const taskNameId = (id: number) => `estimar-horas-tarea-${id}`;

function estimateProjectHours(tasks: Task[], reserve: string): Estimate | InputError {
  let baseHundredths = 0;

  for (const task of tasks) {
    const hours = task.hours.trim();
    if (!task.name.trim() && !hours) continue;

    const hundredths = Math.round(parseSpanishNumber(hours) * 100);
    if (!taskHoursPattern.test(hours) || !Number.isSafeInteger(hundredths) || hundredths < 1) {
      return {
        field: task.id,
        message: 'Introduce horas mayores que 0, con un máximo de dos decimales.',
      };
    }
    baseHundredths += hundredths;
  }

  if (baseHundredths === 0) {
    return { field: tasks[0].id, message: 'Introduce las horas de al menos una tarea.' };
  }
  // Reserve percentages are entered in tenths, so keep the multiplication exact.
  if (!Number.isSafeInteger(baseHundredths * 1000)) {
    return { field: 'total', message: 'El total de horas es demasiado alto.' };
  }

  const reservePercent = parseSpanishNumber(reserve);
  if (!reservePattern.test(reserve.trim()) || !Number.isFinite(reservePercent) || reservePercent > 100) {
    return { field: 'reserve', message: 'Introduce un porcentaje del 0 al 100, con un máximo de un decimal.' };
  }

  const reserveTenths = Math.round(reservePercent * 10);
  const reserveHundredths = Math.round(baseHundredths * reserveTenths / 1000);
  return { baseHundredths, reserveHundredths, reservePercent };
}

export default function ProjectHours() {
  const [tasks, setTasks] = useState<Task[]>([{ id: 1, name: '', hours: '' }]);
  const [reserve, setReserve] = useState('15');
  const [outcome, setOutcome] = useState<Estimate | InputError | null>(null);
  const nextTaskId = useRef(2);
  const taskToFocus = useRef<number | null>(null);
  const error = outcome && 'field' in outcome ? outcome : null;
  const estimate = outcome && 'baseHundredths' in outcome ? outcome : null;

  useEffect(() => {
    if (taskToFocus.current === null) return;
    document.getElementById(taskNameId(taskToFocus.current))?.focus();
    taskToFocus.current = null;
  }, [tasks]);

  function addTask() {
    const id = nextTaskId.current++;
    taskToFocus.current = id;
    setTasks((currentTasks) => [...currentTasks, { id, name: '', hours: '' }]);
    setOutcome(null);
  }

  function removeTask(id: number) {
    const index = tasks.findIndex((task) => task.id === id);
    const neighbor = tasks[index + 1] ?? tasks[index - 1];
    if (!neighbor) return;

    taskToFocus.current = neighbor.id;
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    setOutcome(null);
  }

  function updateTask(id: number, field: 'name' | 'hours', value: string) {
    setTasks((currentTasks) => currentTasks.map((task) => (
      task.id === id ? { ...task, [field]: value } : task
    )));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutcome(estimateProjectHours(tasks, reserve));
  }

  return (
    <section id="estimar-horas" aria-labelledby="estimar-horas-title" className={`feature-card ${styles.card}`}>
      <h3 id="estimar-horas-title">Suma las horas de tu proyecto</h3>
      <p id="estimar-horas-help">
        Incluye las revisiones previstas como una tarea. La reserva se calcula sobre la suma de
        todas las tareas y cubre ajustes adicionales. Prueba con 4 h de definición, 22 h de
        producción y 6 h de revisión y entrega, más un 15 % de reserva.
      </p>
      <form className="calculator-form" onSubmit={handleSubmit} onChange={() => setOutcome(null)} noValidate>
        {tasks.map((task, index) => (
          <div className={styles.taskFields} key={task.id}>
            <label>
              <span>Tarea {index + 1}</span>
              <input
                id={taskNameId(task.id)}
                value={task.name}
                placeholder="Nombre opcional"
                onChange={(event) => updateTask(task.id, 'name', event.target.value)}
              />
            </label>
            <label>
              <span>Horas de la tarea {index + 1}</span>
              <input
                inputMode="decimal"
                value={task.hours}
                onChange={(event) => updateTask(task.id, 'hours', event.target.value)}
                aria-invalid={error?.field === task.id || undefined}
                aria-describedby={error?.field === task.id ? 'estimar-horas-error' : undefined}
              />
            </label>
            {tasks.length > 1 && (
              <button
                type="button"
                className={styles.secondaryButton}
                aria-label={`Quitar tarea ${index + 1}`}
                onClick={() => removeTask(task.id)}
              >
                Quitar
              </button>
            )}
          </div>
        ))}
        <button type="button" className={styles.secondaryButton} onClick={addTask}>Añadir tarea</button>
        <label className={styles.reserve}>
          <span>Reserva para revisiones (%)</span>
          <input
            inputMode="decimal"
            value={reserve}
            onChange={(event) => setReserve(event.target.value)}
            required
            aria-invalid={error?.field === 'reserve' || undefined}
            aria-describedby={error?.field === 'reserve' ? 'estimar-horas-error' : 'estimar-horas-help'}
          />
        </label>
        <button type="submit" className="primary-button">Calcular horas</button>
      </form>

      <div role="status">
        {error && <small id="estimar-horas-error" className={`field-error ${styles.error}`}>{error.message}</small>}
        {estimate && (
          <dl className="worked-example">
            <div>
              <dt>Horas base</dt>
              <dd>{formatNumber(estimate.baseHundredths / 100, 2)} h</dd>
            </div>
            <div>
              <dt>Reserva para revisiones ({formatNumber(estimate.reservePercent)} %)</dt>
              <dd>{formatNumber(estimate.reserveHundredths / 100, 2)} h</dd>
            </div>
            <div>
              <dt>Total con reserva</dt>
              <dd>{formatNumber((estimate.baseHundredths + estimate.reserveHundredths) / 100, 2)} h</dd>
            </div>
          </dl>
        )}
      </div>
      {estimate && (
        <p>
          Para <Link href="/como-presupuestar-un-proyecto-freelance#calcular-precio-proyecto">calcular el precio</Link>,
          lleva las horas base y el porcentaje de reserva a sus campos respectivos. Aquí se muestran
          hasta dos decimales de hora. El cálculo del precio conserva la precisión de la reserva.
        </p>
      )}
    </section>
  );
}
