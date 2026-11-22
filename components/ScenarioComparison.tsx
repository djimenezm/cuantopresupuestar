'use client';

import { useRef } from 'react';
import { compareQuoteSituations, type QuoteSituation } from '@/lib/quoteComparison';
import { formatCurrency, formatNumber } from '@/lib/format';

type ScenarioComparisonProps = {
  situationA: QuoteSituation | null;
  situationB: QuoteSituation | null;
  onSave: () => void;
  onClear: () => void;
};

function formatMetric(value: number, unit: 'hours' | 'currency') {
  return unit === 'hours' ? `${formatNumber(value, 2)} h` : formatCurrency(value);
}

export default function ScenarioComparison({
  situationA, situationB, onSave, onClear,
}: ScenarioComparisonProps) {
  const saveButtonRef = useRef<HTMLButtonElement | null>(null);
  const comparison = situationA ? compareQuoteSituations(situationA, situationB) : null;

  return (
    <div className="scenario-comparison" role="group" aria-labelledby="scenario-comparison-title">
      <div className="scenario-comparison-header">
        <h4 id="scenario-comparison-title">Comparar situaciones</h4>
        <div className="scenario-comparison-actions">
          <button ref={saveButtonRef} type="button" onClick={onSave} disabled={!situationB}>
            {situationA ? 'Sustituir A por la situación actual' : 'Guardar como situación A'}
          </button>
          {situationA && (
            <button type="button" onClick={() => {
              onClear();
              if (situationB) saveButtonRef.current?.focus();
            }}>
              Eliminar comparación
            </button>
          )}
        </div>
      </div>

      {situationA && (
        <>
          <p className="scenario-comparison-note">
            A guardada. B es el formulario actual. A se pierde al recargar o salir de la página.
          </p>
          {comparison ? (
            <>
              <table className="scenario-comparison-table" role="table">
                <caption>Diferencia: B menos A.</caption>
                <thead role="rowgroup">
                  <tr role="row">
                    <th scope="col" role="columnheader">Indicador</th>
                    <th scope="col" role="columnheader">A</th>
                    <th scope="col" role="columnheader">B</th>
                    <th scope="col" role="columnheader">Diferencia</th>
                  </tr>
                </thead>
                <tbody role="rowgroup">
                  {comparison.metrics.map((metric) => (
                    <tr key={metric.key} role="row">
                      <th scope="row" role="rowheader">{metric.label}</th>
                      <td role="cell">
                        <span className="scenario-mobile-label" aria-hidden="true">A</span>
                        {formatMetric(metric.a, metric.unit)}
                      </td>
                      <td role="cell">
                        <span className="scenario-mobile-label" aria-hidden="true">B</span>
                        {formatMetric(metric.b, metric.unit)}
                      </td>
                      <td role="cell">
                        <span className="scenario-mobile-label" aria-hidden="true">Diferencia</span>
                        {metric.difference > 0 ? '+' : ''}{formatMetric(metric.difference, metric.unit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="scenario-comparison-summary">{comparison.summary}</p>
              {comparison.changes.length > 0 && (
                <details className="scenario-comparison-changes">
                  <summary>Ver entradas que cambian ({comparison.changes.length})</summary>
                  <ul>
                    {comparison.changes.map((change) => (
                      <li key={change.key}><strong>{change.label}:</strong> de {change.a} a {change.b}.</li>
                    ))}
                  </ul>
                </details>
              )}
            </>
          ) : (
            <p className="field-error" role="status">
              B no es válida. Revisa el formulario; A sigue guardada y la comparación está pendiente.
            </p>
          )}
        </>
      )}
      <a className="scenario-comparison-method" href="#quote-method-heading">
        Supuestos y comprobaciones del cálculo
      </a>
    </div>
  );
}
