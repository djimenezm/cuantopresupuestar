import { CalculationResult } from '@/lib/calculator';
import { formatCurrency } from '@/lib/format';

type ResultCardProps = {
  result: CalculationResult;
  hasIVA: boolean;
};

export default function ResultCard({ result, hasIVA }: ResultCardProps) {
  const pricingBuffer = Math.max(0, result.recommendedProjectBudget - result.projectFloorPrice);

  return (
    <section className="result-card" aria-live="polite">
      <h3>Tu presupuesto recomendado para este proyecto</h3>

      <p className="result-lead">
        Con esta simulacion, una propuesta razonable quedaria en{' '}
        <strong>{formatCurrency(result.recommendedProjectBudget)}</strong> sin IVA. Tu suelo para no
        quedarte corto con este alcance estaria alrededor de{' '}
        <strong>{formatCurrency(result.projectFloorPrice)}</strong>, asi que la diferencia entre una
        cifra y otra es el aire real que te das para negociar sin comerte todo el margen.
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
          <span>Precio minimo defendible</span>
          <strong>{formatCurrency(result.projectFloorPrice)}</strong>
        </div>

        <div className="result-item">
          <span>Presupuesto recomendado sin IVA</span>
          <strong>{formatCurrency(result.recommendedProjectBudget)}</strong>
        </div>

        <div className="result-item">
          <span>Colchon entre minimo y recomendado</span>
          <strong>{formatCurrency(pricingBuffer)}</strong>
        </div>

        <div className="result-item result-item-full">
          <span>Total final con IVA</span>
          <strong>{formatCurrency(result.totalWithVAT)}</strong>
        </div>
      </div>

      <div className="result-next-step">
        <strong>Lectura rapida para defender el precio</strong>
        <p>
          Si el cliente te aprieta, toma <strong>{formatCurrency(result.projectFloorPrice)}</strong>{' '}
          como referencia de suelo: por debajo de esa cifra empiezas a absorber tu el margen, los
          imprevistos o parte del tiempo real del proyecto. La zona comoda para presentar propuesta
          esta mas cerca de <strong>{formatCurrency(result.recommendedProjectBudget)}</strong>.
        </p>
      </div>

      <p className="result-summary">
        Para sostener un objetivo mensual de <strong>{formatCurrency(result.targetMonthlyNet)}</strong>
        , con unos costes fijos de <strong>{formatCurrency(result.monthlyFixedCosts)}</strong> y{' '}
        <strong>{result.billableHoursPerMonth}</strong> horas facturables al mes, tu referencia
        mensual se situa en <strong>{formatCurrency(result.monthlyRevenueTarget)}</strong> antes de
        repartirla entre proyectos.
      </p>

      <p className="result-summary">
        En este caso hemos partido de <strong>{result.projectHours} horas estimadas</strong> y les
        hemos aplicado un buffer del <strong>{result.revisionBufferPercent}%</strong>, lo que deja el
        proyecto en <strong>{result.bufferedProjectHours} horas</strong> de trabajo razonablemente
        presupuestables. Sobre esa base, el precio minimo defendible seria{' '}
        <strong>{formatCurrency(result.projectFloorPrice)}</strong>.
      </p>

      <p className="result-summary">
        Ademas, has dejado una reserva fiscal orientativa del{' '}
        <strong>{result.taxReservePercent}%</strong> y un margen extra del{' '}
        <strong>{result.profitMarginPercent}%</strong>. Eso situa el proyecto en una referencia
        efectiva de <strong>{formatCurrency(result.effectiveHourlyRate)}/h</strong> sobre las horas
        ya amortiguadas por buffer, con un colchon adicional de{' '}
        <strong>{formatCurrency(pricingBuffer)}</strong> frente al minimo.
        {hasIVA ? (
          <>
            {' '}
            Si repercutes IVA, tendrias que anadir aproximadamente{' '}
            <strong>{formatCurrency(result.vatAmount)}</strong>, dejando la propuesta final en{' '}
            <strong>{formatCurrency(result.totalWithVAT)}</strong>.
          </>
        ) : (
          <> En esta simulacion no se anade IVA al total.</>
        )}
      </p>

      <div className="result-next-step">
        <strong>Siguiente paso recomendado</strong>
        <p>
          Usa la cifra recomendada como base para presentar un presupuesto cerrado o dividirlo en
          hitos. Si el cliente aprieta precio, intenta primero ajustar alcance, fases o entregables:
          bajar por debajo del minimo defendible significa asumir tu parte del coste del proyecto.
        </p>
      </div>
    </section>
  );
}
