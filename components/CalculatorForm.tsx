'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import ResultCard from '@/components/ResultCard';
import { calculateProjectQuote } from '@/lib/calculator';

type FieldName =
  | 'targetMonthlyNet'
  | 'monthlyFixedCosts'
  | 'billableHoursPerMonth'
  | 'projectHours'
  | 'revisionBufferPercent'
  | 'directProjectCosts'
  | 'taxReservePercent'
  | 'profitMarginPercent';

type FormErrors = Partial<Record<FieldName, string>>;

declare global {
  interface Window {
    va?: (
      command: 'event',
      payload: {
        name: string;
        data?: Record<string, string>;
      },
    ) => void;
  }
}

function trackProjectQuoteCalculated(data: Record<string, string>) {
  window.va?.('event', {
    name: 'project_quote_calculated',
    data,
  });
}

function parseNumericValue(value: string) {
  const normalizedValue = value.replace(',', '.').trim();

  if (normalizedValue === '') {
    return Number.NaN;
  }

  return Number(normalizedValue);
}

function formatNormalizedNumber(value: number, maximumFractionDigits = 2) {
  return value.toLocaleString('en-US', {
    useGrouping: false,
    maximumFractionDigits,
  });
}

function normalizeFieldValue(field: FieldName, value: string) {
  const parsedValue = parseNumericValue(value);

  if (!Number.isFinite(parsedValue)) {
    return value.trim() === '' ? '' : value;
  }

  switch (field) {
    case 'targetMonthlyNet':
    case 'monthlyFixedCosts':
    case 'projectHours':
    case 'directProjectCosts':
      return formatNormalizedNumber(Math.max(0, parsedValue));
    case 'billableHoursPerMonth':
      return formatNormalizedNumber(Math.max(0, Math.round(parsedValue)), 0);
    case 'revisionBufferPercent':
    case 'taxReservePercent':
    case 'profitMarginPercent':
      return formatNormalizedNumber(Math.min(100, Math.max(0, parsedValue)), 1);
  }
}

function getFieldError(field: FieldName, value: string) {
  const parsedValue = parseNumericValue(value);

  if (value.trim() === '') {
    switch (field) {
      case 'targetMonthlyNet':
        return 'Indica tu objetivo mensual.';
      case 'monthlyFixedCosts':
        return 'Indica tus costes fijos mensuales.';
      case 'billableHoursPerMonth':
        return 'Indica tus horas facturables al mes.';
      case 'projectHours':
        return 'Indica las horas estimadas del proyecto.';
      case 'revisionBufferPercent':
        return 'Indica un buffer de revisiones.';
      case 'directProjectCosts':
        return 'Indica los costes directos del proyecto.';
      case 'taxReservePercent':
        return 'Indica una reserva fiscal orientativa.';
      case 'profitMarginPercent':
        return 'Indica el margen extra del proyecto.';
    }
  }

  if (!Number.isFinite(parsedValue)) {
    switch (field) {
      case 'billableHoursPerMonth':
        return 'Introduce un número válido de horas.';
      case 'revisionBufferPercent':
      case 'taxReservePercent':
      case 'profitMarginPercent':
        return 'Introduce un porcentaje válido.';
      default:
        return 'Introduce un importe válido.';
    }
  }

  if (field === 'targetMonthlyNet' && parsedValue <= 0) {
    return 'El objetivo mensual debe ser mayor que 0.';
  }

  if (field === 'billableHoursPerMonth' && parsedValue <= 0) {
    return 'Las horas facturables deben ser mayores que 0.';
  }

  if (field === 'billableHoursPerMonth' && !Number.isInteger(parsedValue)) {
    return 'Las horas facturables deben ser un número entero.';
  }

  if (field === 'projectHours' && parsedValue <= 0) {
    return 'Las horas del proyecto deben ser mayores que 0.';
  }

  if (
    (field === 'revisionBufferPercent' || field === 'taxReservePercent' || field === 'profitMarginPercent') &&
    parsedValue > 100
  ) {
    return 'El porcentaje debe ser como máximo 100.';
  }

  if (parsedValue < 0) {
    switch (field) {
      case 'targetMonthlyNet':
        return 'El objetivo mensual no puede ser negativo.';
      case 'monthlyFixedCosts':
        return 'Los costes fijos no pueden ser negativos.';
      case 'billableHoursPerMonth':
        return 'Las horas facturables no pueden ser negativas.';
      case 'projectHours':
        return 'Las horas del proyecto no pueden ser negativas.';
      case 'revisionBufferPercent':
        return 'El buffer no puede ser negativo.';
      case 'directProjectCosts':
        return 'Los costes directos no pueden ser negativos.';
      case 'taxReservePercent':
        return 'La reserva fiscal no puede ser negativa.';
      case 'profitMarginPercent':
        return 'El margen no puede ser negativo.';
    }
  }

  return '';
}

function validateForm(values: Record<FieldName, string>): FormErrors {
  const nextErrors: FormErrors = {};

  (Object.keys(values) as FieldName[]).forEach((field) => {
    const error = getFieldError(field, values[field]);

    if (error) {
      nextErrors[field] = error;
    }
  });

  return nextErrors;
}

export default function CalculatorForm() {
  const [targetMonthlyNet, setTargetMonthlyNet] = useState('2000');
  const [monthlyFixedCosts, setMonthlyFixedCosts] = useState('350');
  const [billableHoursPerMonth, setBillableHoursPerMonth] = useState('80');
  const [projectHours, setProjectHours] = useState('18');
  const [revisionBufferPercent, setRevisionBufferPercent] = useState('15');
  const [directProjectCosts, setDirectProjectCosts] = useState('0');
  const [taxReservePercent, setTaxReservePercent] = useState('20');
  const [profitMarginPercent, setProfitMarginPercent] = useState('10');
  const [hasIVA, setHasIVA] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [hasTrackedConversion, setHasTrackedConversion] = useState(false);
  const [validSubmissionCount, setValidSubmissionCount] = useState(0);
  const resultRegionRef = useRef<HTMLElement>(null);

  const validationErrors = useMemo(
    () =>
      validateForm({
        targetMonthlyNet,
        monthlyFixedCosts,
        billableHoursPerMonth,
        projectHours,
        revisionBufferPercent,
        directProjectCosts,
        taxReservePercent,
        profitMarginPercent,
      }),
    [
      targetMonthlyNet,
      monthlyFixedCosts,
      billableHoursPerMonth,
      projectHours,
      revisionBufferPercent,
      directProjectCosts,
      taxReservePercent,
      profitMarginPercent,
    ],
  );

  const parsedBillableHours = parseNumericValue(billableHoursPerMonth);
  const hasValidationErrors = Object.keys(validationErrors).length > 0;
  const showBillableHoursError =
    Boolean(validationErrors.billableHoursPerMonth) &&
    (submitted ||
      (billableHoursPerMonth.trim() !== '' &&
        Number.isFinite(parsedBillableHours) &&
        parsedBillableHours <= 0));

  const result = useMemo(() => {
    return calculateProjectQuote({
      targetMonthlyNet: parseNumericValue(targetMonthlyNet),
      monthlyFixedCosts: parseNumericValue(monthlyFixedCosts),
      billableHoursPerMonth: parseNumericValue(billableHoursPerMonth),
      projectHours: parseNumericValue(projectHours),
      revisionBufferPercent: parseNumericValue(revisionBufferPercent),
      directProjectCosts: parseNumericValue(directProjectCosts),
      taxReservePercent: parseNumericValue(taxReservePercent),
      profitMarginPercent: parseNumericValue(profitMarginPercent),
      hasIVA,
    });
  }, [
    targetMonthlyNet,
    monthlyFixedCosts,
    billableHoursPerMonth,
    projectHours,
    revisionBufferPercent,
    directProjectCosts,
    taxReservePercent,
    profitMarginPercent,
    hasIVA,
  ]);

  useEffect(() => {
    if (validSubmissionCount > 0) {
      resultRegionRef.current?.focus({ preventScroll: false });
    }
  }, [validSubmissionCount]);

  return (
    <div className="calculator-card" id="calculadora">
      <h2>Calculadora</h2>
      <p className="card-intro" id="calculator-intro">
        Calcula un precio base con horas facturables, buffer, costes y reserva fiscal.
      </p>

      <form
        noValidate
        aria-describedby="calculator-intro"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);

          if (!hasValidationErrors) {
            setValidSubmissionCount((currentCount) => currentCount + 1);
          }

          if (!hasValidationErrors && !hasTrackedConversion) {
            trackProjectQuoteCalculated({
              hasIVA: hasIVA ? 'yes' : 'no',
              hasMargin: parseNumericValue(profitMarginPercent) > 0 ? 'yes' : 'no',
            });
            setHasTrackedConversion(true);
          }
        }}
        className="calculator-form"
      >
        <label>
          <span>Objetivo mensual neto (EUR)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={targetMonthlyNet}
            onChange={(event) => setTargetMonthlyNet(event.target.value)}
            onBlur={(event) =>
              setTargetMonthlyNet(normalizeFieldValue('targetMonthlyNet', event.target.value))
            }
            aria-invalid={submitted && Boolean(validationErrors.targetMonthlyNet)}
            aria-describedby={
              submitted && validationErrors.targetMonthlyNet ? 'target-monthly-net-error' : undefined
            }
          />
          {submitted && validationErrors.targetMonthlyNet && (
            <small className="field-error" id="target-monthly-net-error" role="alert">
              {validationErrors.targetMonthlyNet}
            </small>
          )}
        </label>

        <label>
          <span>Costes fijos mensuales (EUR)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={monthlyFixedCosts}
            onChange={(event) => setMonthlyFixedCosts(event.target.value)}
            onBlur={(event) =>
              setMonthlyFixedCosts(normalizeFieldValue('monthlyFixedCosts', event.target.value))
            }
            aria-invalid={submitted && Boolean(validationErrors.monthlyFixedCosts)}
            aria-describedby={
              submitted && validationErrors.monthlyFixedCosts ? 'monthly-fixed-costs-error' : undefined
            }
          />
          {submitted && validationErrors.monthlyFixedCosts && (
            <small className="field-error" id="monthly-fixed-costs-error" role="alert">
              {validationErrors.monthlyFixedCosts}
            </small>
          )}
        </label>

        <label>
          <span>Horas facturables al mes</span>
          <input
            type="number"
            min="1"
            step="1"
            value={billableHoursPerMonth}
            onChange={(event) => setBillableHoursPerMonth(event.target.value)}
            onBlur={(event) =>
              setBillableHoursPerMonth(normalizeFieldValue('billableHoursPerMonth', event.target.value))
            }
            aria-invalid={showBillableHoursError}
            aria-describedby={showBillableHoursError ? 'billable-hours-error' : undefined}
          />
          {showBillableHoursError && validationErrors.billableHoursPerMonth && (
            <small className="field-error" id="billable-hours-error" role="alert">
              {validationErrors.billableHoursPerMonth}
            </small>
          )}
        </label>

        <label>
          <span>Horas estimadas del proyecto</span>
          <input
            type="number"
            min="0.5"
            step="0.5"
            value={projectHours}
            onChange={(event) => setProjectHours(event.target.value)}
            onBlur={(event) => setProjectHours(normalizeFieldValue('projectHours', event.target.value))}
            aria-invalid={submitted && Boolean(validationErrors.projectHours)}
            aria-describedby={submitted && validationErrors.projectHours ? 'project-hours-error' : undefined}
          />
          {submitted && validationErrors.projectHours && (
            <small className="field-error" id="project-hours-error" role="alert">
              {validationErrors.projectHours}
            </small>
          )}
        </label>

        <label>
          <span>Buffer de revisiones e imprevistos (%)</span>
          <input
            type="number"
            min="0"
            max="100"
            step="0.5"
            value={revisionBufferPercent}
            onChange={(event) => setRevisionBufferPercent(event.target.value)}
            onBlur={(event) =>
              setRevisionBufferPercent(normalizeFieldValue('revisionBufferPercent', event.target.value))
            }
            aria-invalid={submitted && Boolean(validationErrors.revisionBufferPercent)}
            aria-describedby={
              submitted && validationErrors.revisionBufferPercent ? 'revision-buffer-error' : 'revision-buffer-hint'
            }
          />
          <small className="field-hint" id="revision-buffer-hint">
            Úsalo para cubrir cambios, revisiones, reuniones extra o pequeños desvíos de alcance.
          </small>
          {submitted && validationErrors.revisionBufferPercent && (
            <small className="field-error" id="revision-buffer-error" role="alert">
              {validationErrors.revisionBufferPercent}
            </small>
          )}
        </label>

        <label>
          <span>Costes directos del proyecto (EUR)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={directProjectCosts}
            onChange={(event) => setDirectProjectCosts(event.target.value)}
            onBlur={(event) =>
              setDirectProjectCosts(normalizeFieldValue('directProjectCosts', event.target.value))
            }
            aria-invalid={submitted && Boolean(validationErrors.directProjectCosts)}
            aria-describedby={
              submitted && validationErrors.directProjectCosts ? 'direct-project-costs-error' : undefined
            }
          />
          {submitted && validationErrors.directProjectCosts && (
            <small className="field-error" id="direct-project-costs-error" role="alert">
              {validationErrors.directProjectCosts}
            </small>
          )}
        </label>

        <label>
          <span>Reserva fiscal orientativa (%)</span>
          <input
            type="number"
            min="0"
            max="100"
            step="0.5"
            value={taxReservePercent}
            onChange={(event) => setTaxReservePercent(event.target.value)}
            onBlur={(event) =>
              setTaxReservePercent(normalizeFieldValue('taxReservePercent', event.target.value))
            }
            aria-invalid={submitted && Boolean(validationErrors.taxReservePercent)}
            aria-describedby={
              submitted && validationErrors.taxReservePercent ? 'tax-reserve-percent-error' : 'tax-reserve-hint'
            }
          />
          <small className="field-hint" id="tax-reserve-hint">
            No intenta sustituir un cálculo fiscal exacto: solo te ayuda a no presupuestar como si
            todo el ingreso fuera limpio.
          </small>
          {submitted && validationErrors.taxReservePercent && (
            <small className="field-error" id="tax-reserve-percent-error" role="alert">
              {validationErrors.taxReservePercent}
            </small>
          )}
        </label>

        <label>
          <span>Margen extra sobre el proyecto (%)</span>
          <input
            type="number"
            min="0"
            max="100"
            step="0.5"
            value={profitMarginPercent}
            onChange={(event) => setProfitMarginPercent(event.target.value)}
            onBlur={(event) =>
              setProfitMarginPercent(normalizeFieldValue('profitMarginPercent', event.target.value))
            }
            aria-invalid={submitted && Boolean(validationErrors.profitMarginPercent)}
            aria-describedby={
              submitted && validationErrors.profitMarginPercent ? 'profit-margin-percent-error' : undefined
            }
          />
          {submitted && validationErrors.profitMarginPercent && (
            <small className="field-error" id="profit-margin-percent-error" role="alert">
              {validationErrors.profitMarginPercent}
            </small>
          )}
        </label>

        <fieldset className="radio-group">
          <legend>¿Añadir IVA al presupuesto?</legend>
          <label>
            <input
              type="radio"
              name="iva"
              checked={hasIVA}
              onChange={() => setHasIVA(true)}
            />
            Sí
          </label>
          <label>
            <input
              type="radio"
              name="iva"
              checked={!hasIVA}
              onChange={() => setHasIVA(false)}
            />
            No
          </label>
        </fieldset>

        <button type="submit" className="primary-button">
          Calcular presupuesto
        </button>

        {submitted && hasValidationErrors && (
          <p className="form-message" role="alert">
            Revisa los campos marcados antes de calcular.
          </p>
        )}

        <p className="form-note">
          La herramienta es orientativa: sirve para convertir una intuición difusa en un presupuesto
          más defendible, no para cerrar un encaje fiscal exacto.
        </p>
      </form>

      {submitted && !hasValidationErrors && (
        <ResultCard ref={resultRegionRef} result={result} hasIVA={hasIVA} />
      )}
    </div>
  );
}
