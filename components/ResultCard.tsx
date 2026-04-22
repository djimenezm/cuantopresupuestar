import { CalculationResult } from '@/lib/calculator';
import { formatCurrency } from '@/lib/format';

type ResultCardProps = {
  result: CalculationResult;
  hasIVA: boolean;
};

export default function ResultCard({ result, hasIVA }: ResultCardProps) {
  return (
    <section className="result-card" aria-live="polite">
      <h3>Tu presupuesto recomendado para este proyecto</h3>

      <p className="result-lead">
        Con esta simulación, una propuesta razonable quedaría en{' '}
        <strong>{formatCurrency(result.recommendedProjectBudget)}</strong> sin IVA. Esa cifra parte
        de una referencia base de <strong>{formatCurrency(result.baseHourlyRate)}/h</strong> y ya
        contempla el buffer de revisiones, los costes directos y el margen que has indicado.
      </p>

      <div className="result-grid">
        <div className="result-item">
          <span>Referencia base por hora</span>
          <strong>{formatCurrency(result.baseHourlyRate)}/h</strong>
        </div>

        <div className="result-item">
          <span>Horas del proyecto con buffer</span>
          <strong>{result.bufferedProjectHours} h</strong>
        </div>

        <div className="result-item">
          <span>Costes directos del proyecto</span>
          <strong>{formatCurrency(result.directProjectCosts)}</strong>
        </div>

        <div className="result-item">
          <span>Precio mínimo sin margen</span>
          <strong>{formatCurrency(result.projectFloorPrice)}</strong>
        </div>

        <div className="result-item">
          <span>Presupuesto recomendado sin IVA</span>
          <strong>{formatCurrency(result.recommendedProjectBudget)}</strong>
        </div>

        <div className="result-item result-item-full">
          <span>Total final con IVA</span>
          <strong>{formatCurrency(result.totalWithVAT)}</strong>
        </div>
      </div>

      <p className="result-summary">
        Para sostener un objetivo mensual de <strong>{formatCurrency(result.targetMonthlyNet)}</strong>,
        con unos costes fijos de <strong>{formatCurrency(result.monthlyFixedCosts)}</strong> y{' '}
        <strong>{result.billableHoursPerMonth}</strong> horas facturables al mes, tu referencia
        mensual se sitúa en <strong>{formatCurrency(result.monthlyRevenueTarget)}</strong> antes de
        repartirla entre proyectos.
      </p>

      <p className="result-summary">
        En este caso hemos partido de <strong>{result.projectHours} horas estimadas</strong> y les
        hemos aplicado un buffer del <strong>{result.revisionBufferPercent}%</strong>, lo que deja el
        proyecto en <strong>{result.bufferedProjectHours} horas</strong> de trabajo razonablemente
        presupuestables. Sobre esa base, el precio mínimo sin margen sería{' '}
        <strong>{formatCurrency(result.projectFloorPrice)}</strong>.
      </p>

      <p className="result-summary">
        Además, has dejado una reserva fiscal orientativa del{' '}
        <strong>{result.taxReservePercent}%</strong> y un margen extra del{' '}
        <strong>{result.profitMarginPercent}%</strong>. Eso sitúa el proyecto en una referencia
        efectiva de <strong>{formatCurrency(result.effectiveHourlyRate)}/h</strong> sobre las horas
        ya amortiguadas por buffer.
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
          Usa esta cifra como base para presentar un presupuesto cerrado o dividirlo en hitos. Si el
          cliente aprieta precio, ya tienes una referencia clara para decidir si bajas importe o
          reduces alcance.
        </p>
      </div>
    </section>
  );
}
