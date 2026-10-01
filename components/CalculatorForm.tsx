'use client';

import {
  type ClipboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ResultCard from '@/components/ResultCard';
import { calculateProjectQuote } from '@/lib/calculator';
import {
  DEFAULT_FORM_VALUES,
  type FieldName,
  getNormalizedPastedValue,
  normalizeFieldValue,
  validateForm,
} from '@/lib/calculatorForm';
import { parseSpanishNumber } from '@/lib/spanishNumber';

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

function handleNumericPaste(
  event: ClipboardEvent<HTMLInputElement>,
  field: FieldName,
  setValue: (value: string) => void,
) {
  const pastedValue = event.clipboardData.getData('text');
  const normalizedValue = getNormalizedPastedValue(field, pastedValue);

  if (normalizedValue === null) {
    return;
  }

  event.preventDefault();
  setValue(normalizedValue);
}

export default function CalculatorForm() {
  const [targetMonthlyNet, setTargetMonthlyNet] = useState(DEFAULT_FORM_VALUES.targetMonthlyNet);
  const [monthlyFixedCosts, setMonthlyFixedCosts] = useState(DEFAULT_FORM_VALUES.monthlyFixedCosts);
  const [billableHoursPerMonth, setBillableHoursPerMonth] = useState(
    DEFAULT_FORM_VALUES.billableHoursPerMonth,
  );
  const [projectHours, setProjectHours] = useState(DEFAULT_FORM_VALUES.projectHours);
  const [revisionBufferPercent, setRevisionBufferPercent] = useState(
    DEFAULT_FORM_VALUES.revisionBufferPercent,
  );
  const [directProjectCosts, setDirectProjectCosts] = useState(DEFAULT_FORM_VALUES.directProjectCosts);
  const [taxReservePercent, setTaxReservePercent] = useState(
    DEFAULT_FORM_VALUES.taxReservePercent,
  );
  const [profitMarginPercent, setProfitMarginPercent] = useState(
    DEFAULT_FORM_VALUES.profitMarginPercent,
  );
  const [hasIVA, setHasIVA] = useState(DEFAULT_FORM_VALUES.hasIVA);
  const [submitted, setSubmitted] = useState(false);
  const [invalidSubmissionCount, setInvalidSubmissionCount] = useState(0);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [hasTrackedConversion, setHasTrackedConversion] = useState(false);
  const [validSubmissionCount, setValidSubmissionCount] = useState(0);
  const resultRegionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (invalidSubmissionCount > 0) {
      formRef.current?.querySelector<HTMLInputElement>('[aria-invalid="true"]')?.focus();
    }
  }, [invalidSubmissionCount]);

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

  const parsedBillableHours = parseSpanishNumber(billableHoursPerMonth);
  const hasValidationErrors = Object.keys(validationErrors).length > 0;
  const showBillableHoursError =
    Boolean(validationErrors.billableHoursPerMonth) &&
    (submitted ||
      (billableHoursPerMonth.trim() !== '' &&
        Number.isFinite(parsedBillableHours) &&
        parsedBillableHours <= 0));

  const result = useMemo(() => {
    return calculateProjectQuote({
      targetMonthlyNet: parseSpanishNumber(targetMonthlyNet),
      monthlyFixedCosts: parseSpanishNumber(monthlyFixedCosts),
      billableHoursPerMonth: parseSpanishNumber(billableHoursPerMonth),
      projectHours: parseSpanishNumber(projectHours),
      revisionBufferPercent: parseSpanishNumber(revisionBufferPercent),
      directProjectCosts: parseSpanishNumber(directProjectCosts),
      taxReservePercent: parseSpanishNumber(taxReservePercent),
      profitMarginPercent: parseSpanishNumber(profitMarginPercent),
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

  const setResultRegionRef = useCallback(
    (node: HTMLElement | null) => {
      resultRegionRef.current = node;

      if (node && validSubmissionCount > 0) {
        window.requestAnimationFrame(() => node.focus({ preventScroll: false }));
      }
    },
    [validSubmissionCount],
  );

  return (
    <div className="calculator-card" id="calculadora">
      <h2>Calculadora</h2>
      <p className="card-intro" id="calculator-intro">
        Define tus números y el proyecto. El resultado aparece al calcular, sin registro.
      </p>

      <form
        ref={formRef}
        noValidate
        aria-describedby="calculator-intro"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);

          if (hasValidationErrors) {
            setInvalidSubmissionCount((count) => count + 1);
          }

          if (!hasValidationErrors) {
            setValidSubmissionCount((currentCount) => currentCount + 1);
          }

          if (!hasValidationErrors && !hasTrackedConversion) {
            trackProjectQuoteCalculated({
              hasIVA: hasIVA ? 'yes' : 'no',
              hasMargin: parseSpanishNumber(profitMarginPercent) > 0 ? 'yes' : 'no',
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
            onPaste={(event) =>
              handleNumericPaste(event, 'targetMonthlyNet', setTargetMonthlyNet)
            }
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
            onPaste={(event) =>
              handleNumericPaste(event, 'monthlyFixedCosts', setMonthlyFixedCosts)
            }
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
            onPaste={(event) =>
              handleNumericPaste(event, 'billableHoursPerMonth', setBillableHoursPerMonth)
            }
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
            onPaste={(event) => handleNumericPaste(event, 'projectHours', setProjectHours)}
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
            onPaste={(event) =>
              handleNumericPaste(event, 'revisionBufferPercent', setRevisionBufferPercent)
            }
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
            onPaste={(event) =>
              handleNumericPaste(event, 'directProjectCosts', setDirectProjectCosts)
            }
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
            max="99"
            step="0.5"
            value={taxReservePercent}
            onChange={(event) => setTaxReservePercent(event.target.value)}
            onPaste={(event) =>
              handleNumericPaste(event, 'taxReservePercent', setTaxReservePercent)
            }
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
          <span>Recargo sobre el precio mínimo (%)</span>
          <input
            type="number"
            min="0"
            max="100"
            step="0.5"
            value={profitMarginPercent}
            onChange={(event) => setProfitMarginPercent(event.target.value)}
            onPaste={(event) =>
              handleNumericPaste(event, 'profitMarginPercent', setProfitMarginPercent)
            }
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
        <ResultCard ref={setResultRegionRef} result={result} hasIVA={hasIVA} />
      )}
    </div>
  );
}
