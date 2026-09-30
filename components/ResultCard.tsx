'use client';

import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { assessClientPrice, type CalculationResult } from '@/lib/calculator';
import { formatCurrency, formatNumber } from '@/lib/format';
import { parseSpanishNumber } from '@/lib/spanishNumber';

type ResultCardProps = {
  result: CalculationResult;
  hasIVA: boolean;
};

type CopyStatus = 'idle' | 'copied' | 'error';

async function copyTextToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('readonly', '');
  textArea.setAttribute('aria-hidden', 'true');
  textArea.tabIndex = -1;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.select();

  const copied = document.execCommand('copy');
  document.body.removeChild(textArea);

  if (!copied) {
    throw new Error('No se pudo copiar el resumen.');
  }
}

const ResultCard = forwardRef<HTMLElement, ResultCardProps>(function ResultCard(
  { result, hasIVA },
  ref,
) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');
  const [clientPrice, setClientPrice] = useState('');
  const lastTrackedPrice = useRef<number | null>(null);
  const parsedClientPrice = parseSpanishNumber(clientPrice);
  const hasClientPrice = clientPrice.trim() !== '';
  const clientPriceIsValid = Number.isFinite(parsedClientPrice) && parsedClientPrice >= 0;
  const priceAssessment = hasClientPrice && clientPriceIsValid
    ? assessClientPrice(result, parsedClientPrice)
    : null;
  const hoursToTrim = priceAssessment?.hoursToTrim.toLocaleString('es-ES', {
    maximumFractionDigits: 2,
  });
  const pricingBuffer = Math.max(0, result.recommendedProjectBudget - result.projectFloorPrice);
  const proposalSummary = [
    'Resumen de presupuesto - Cuánto Presupuestar',
    `Precio mínimo defendible: ${formatCurrency(result.projectFloorPrice)} sin IVA`,
    `Presupuesto recomendado: ${formatCurrency(result.recommendedProjectBudget)} sin IVA`,
    hasIVA
      ? `Total final con IVA: ${formatCurrency(result.totalWithVAT)}`
      : 'IVA: no añadido en esta simulación',
    `Horas estimadas: ${formatNumber(result.projectHours, 2)} h`,
    `Horas con buffer: ${formatNumber(result.bufferedProjectHours, 2)} h`,
    `Buffer de revisiones e imprevistos: ${formatNumber(result.revisionBufferPercent, 2)}%`,
    `Referencia base: ${formatCurrency(result.baseHourlyRate)}/h`,
    `Tarifa efectiva del proyecto: ${formatCurrency(result.effectiveHourlyRate)}/h`,
    `Costes directos: ${formatCurrency(result.directProjectCosts)}`,
    `Colchón de negociación: ${formatCurrency(pricingBuffer)}`,
    ...(priceAssessment
      ? [
          `Precio propuesto por el cliente: ${formatCurrency(priceAssessment.offeredPrice)} sin IVA`,
          `Diferencia frente al mínimo: ${formatCurrency(priceAssessment.gapToFloor)}`,
        ]
      : []),
    'Nota: si el cliente pide bajar precio, conviene ajustar alcance antes de bajar del mínimo defendible.',
  ].join('\n');

  const trackPriceComparison = useCallback(() => {
    if (!priceAssessment || lastTrackedPrice.current === parsedClientPrice) return;

    lastTrackedPrice.current = parsedClientPrice;
    const outcome = priceAssessment.directCostsUncovered
      ? 'below_costs'
      : priceAssessment.gapToFloor < 0
        ? 'below_floor'
        : priceAssessment.gapToRecommended < 0
          ? 'below_recommended'
          : 'meets_recommended';
    window.va?.('event', {
      name: 'client_offer_compared',
      data: { outcome },
    });
  }, [parsedClientPrice, priceAssessment]);

  useEffect(() => {
    if (!priceAssessment || lastTrackedPrice.current === parsedClientPrice) return;

    const timeout = window.setTimeout(trackPriceComparison, 800);
    return () => window.clearTimeout(timeout);
  }, [parsedClientPrice, priceAssessment, trackPriceComparison]);

  async function handleCopySummary() {
    try {
      await copyTextToClipboard(proposalSummary);
      setCopyStatus('copied');
      window.setTimeout(() => setCopyStatus('idle'), 2500);
    } catch {
      setCopyStatus('error');
    }
  }

  return (
    <section
      ref={ref}
      className="result-card"
      tabIndex={-1}
      aria-live="polite"
      aria-labelledby="result-card-title"
    >
      <h3 id="result-card-title">Tu presupuesto recomendado para este proyecto</h3>

      <p className="result-lead">
        Con esta simulación, una propuesta razonable quedaría en{' '}
        <strong>{formatCurrency(result.recommendedProjectBudget)}</strong> sin IVA. Tu suelo para no
        quedarte corto con este alcance estaría alrededor de{' '}
        <strong>{formatCurrency(result.projectFloorPrice)}</strong>, así que la diferencia entre una
        cifra y otra es el aire real que te das para negociar sin comerte todo el margen.
      </p>

      <div className="result-grid">
        <div className="result-item">
          <span>Referencia base por hora</span>
          <strong>{formatCurrency(result.baseHourlyRate)}/h</strong>
        </div>

        <div className="result-item">
          <span>Horas del proyecto con buffer</span>
          <strong>{formatNumber(result.bufferedProjectHours, 2)} h</strong>
        </div>

        <div className="result-item">
          <span>Costes directos del proyecto</span>
          <strong>{formatCurrency(result.directProjectCosts)}</strong>
        </div>

        <div className="result-item">
          <span>Precio mínimo defendible</span>
          <strong>{formatCurrency(result.projectFloorPrice)}</strong>
        </div>

        <div className="result-item">
          <span>Presupuesto recomendado sin IVA</span>
          <strong>{formatCurrency(result.recommendedProjectBudget)}</strong>
        </div>

        <div className="result-item">
          <span>Colchón entre mínimo y recomendado</span>
          <strong>{formatCurrency(pricingBuffer)}</strong>
        </div>

        <div className="result-item result-item-full">
          <span>Total final con IVA</span>
          <strong>{formatCurrency(result.totalWithVAT)}</strong>
        </div>
      </div>

      <div className="price-check">
        <label htmlFor="client-price">¿Qué precio propone el cliente? (sin IVA)</label>
        <input
          id="client-price"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={clientPrice}
          onChange={(event) => setClientPrice(event.target.value)}
          onBlur={trackPriceComparison}
          aria-invalid={hasClientPrice && !clientPriceIsValid}
          aria-describedby={hasClientPrice && !clientPriceIsValid ? 'client-price-error' : undefined}
          placeholder="Ej. 900"
        />
        {hasClientPrice && !clientPriceIsValid && (
          <p id="client-price-error" className="field-error" role="alert">
            Escribe un importe válido de 0 o más.
          </p>
        )}
        {priceAssessment && (
          <p className="price-check-result" role="status">
            {priceAssessment.directCostsUncovered ? (
              <>Ese precio ni siquiera cubre los costes directos del proyecto.</>
            ) : priceAssessment.gapToFloor < 0 ? (
              <>
                Faltan <strong>{formatCurrency(-priceAssessment.gapToFloor)}</strong> para cubrir
                tu mínimo. Tendrías que reducir aproximadamente{' '}
                <strong>{hoursToTrim} h</strong> del alcance con buffer, o revisar
                los costes.
              </>
            ) : priceAssessment.gapToRecommended < 0 ? (
              <>
                Cubre tu mínimo, pero queda a{' '}
                <strong>{formatCurrency(-priceAssessment.gapToRecommended)}</strong> del margen
                que habías previsto.
              </>
            ) : (
              <>
                Cubre tu mínimo y el margen previsto. Supera tu recomendación en{' '}
                <strong>{formatCurrency(priceAssessment.gapToRecommended)}</strong>.
              </>
            )}
          </p>
        )}
      </div>

      <div className="result-next-step">
        <strong>Lectura rápida para defender el precio</strong>
        <p>
          Si el cliente te aprieta, toma <strong>{formatCurrency(result.projectFloorPrice)}</strong>{' '}
          como referencia de suelo: por debajo de esa cifra empiezas a absorber tú el margen, los
          imprevistos o parte del tiempo real del proyecto. La zona cómoda para presentar propuesta
          está más cerca de <strong>{formatCurrency(result.recommendedProjectBudget)}</strong>.
        </p>
      </div>

      <div className="result-copy-box">
        <div className="result-copy-header">
          <div>
            <strong>Resumen listo para guardar</strong>
            <p>
              Copia una versión corta del cálculo para pegarla en una propuesta, una nota interna o
              una conversación con el cliente.
            </p>
          </div>
          <button type="button" className="result-copy-button" onClick={handleCopySummary}>
            {copyStatus === 'copied' ? 'Resumen copiado' : 'Copiar resumen'}
          </button>
        </div>
        <pre className="result-copy-preview">{proposalSummary}</pre>
        {copyStatus === 'copied' && (
          <span className="result-copy-status" role="status">
            Resumen copiado.
          </span>
        )}
        {copyStatus === 'error' && (
          <span className="result-copy-status result-copy-status-error" role="status">
            No se ha podido copiar automáticamente. Puedes seleccionar el resumen manualmente.
          </span>
        )}
      </div>

      <p className="result-summary">
        Para sostener un objetivo mensual de <strong>{formatCurrency(result.targetMonthlyNet)}</strong>
        , con unos costes fijos de <strong>{formatCurrency(result.monthlyFixedCosts)}</strong> y{' '}
        <strong>{formatNumber(result.billableHoursPerMonth, 2)}</strong> horas facturables al mes, tu referencia
        mensual se sitúa en <strong>{formatCurrency(result.monthlyRevenueTarget)}</strong> antes de
        repartirla entre proyectos.
      </p>

      <p className="result-summary">
        En este caso hemos partido de <strong>{formatNumber(result.projectHours, 2)} horas estimadas</strong> y les
        hemos aplicado un buffer del <strong>{formatNumber(result.revisionBufferPercent, 2)}%</strong>, lo que deja el
        proyecto en <strong>{formatNumber(result.bufferedProjectHours, 2)} horas</strong> de trabajo razonablemente
        presupuestables. Sobre esa base, el precio mínimo defendible sería{' '}
        <strong>{formatCurrency(result.projectFloorPrice)}</strong>.
      </p>

      <p className="result-summary">
        Además, has dejado una reserva fiscal orientativa del{' '}
        <strong>{formatNumber(result.taxReservePercent, 2)}%</strong> y un margen extra del{' '}
        <strong>{formatNumber(result.profitMarginPercent, 2)}%</strong>. Eso sitúa el proyecto en una referencia
        efectiva de <strong>{formatCurrency(result.effectiveHourlyRate)}/h</strong> sobre las horas
        ya amortiguadas por buffer, con un colchón adicional de{' '}
        <strong>{formatCurrency(pricingBuffer)}</strong> frente al mínimo.
        {hasIVA ? (
          <>
            {' '}
            Si repercutes IVA, tendrías que añadir aproximadamente{' '}
            <strong>{formatCurrency(result.vatAmount)}</strong>, dejando la propuesta final en{' '}
            <strong>{formatCurrency(result.totalWithVAT)}</strong>.
          </>
        ) : (
          <> En esta simulación no se añade IVA al total.</>
        )}
      </p>

      <div className="result-next-step">
        <strong>Siguiente paso recomendado</strong>
        <p>
          Usa la cifra recomendada como base para presentar un presupuesto cerrado o dividirlo en
          hitos. Si el cliente aprieta precio, intenta primero ajustar alcance, fases o entregables:
          bajar por debajo del mínimo defendible significa asumir tu parte del coste del proyecto.
        </p>
      </div>
    </section>
  );
});

export default ResultCard;
