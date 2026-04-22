export type CalculatorInput = {
  targetMonthlyNet: number;
  monthlyFixedCosts: number;
  billableHoursPerMonth: number;
  projectHours: number;
  revisionBufferPercent: number;
  directProjectCosts: number;
  taxReservePercent: number;
  profitMarginPercent: number;
  hasIVA: boolean;
};

export type CalculationResult = {
  targetMonthlyNet: number;
  monthlyFixedCosts: number;
  billableHoursPerMonth: number;
  projectHours: number;
  bufferedProjectHours: number;
  revisionBufferPercent: number;
  directProjectCosts: number;
  taxReservePercent: number;
  profitMarginPercent: number;
  preTaxIncomeTarget: number;
  monthlyRevenueTarget: number;
  baseHourlyRate: number;
  projectFloorPrice: number;
  recommendedProjectBudget: number;
  vatAmount: number;
  totalWithVAT: number;
  effectiveHourlyRate: number;
};

function roundToTwo(value: number) {
  return Math.round(value * 100) / 100;
}

function safeNumber(value: number, fallback = 0) {
  return Number.isFinite(value) ? value : fallback;
}

export function calculateProjectQuote({
  targetMonthlyNet,
  monthlyFixedCosts,
  billableHoursPerMonth,
  projectHours,
  revisionBufferPercent,
  directProjectCosts,
  taxReservePercent,
  profitMarginPercent,
  hasIVA,
}: CalculatorInput): CalculationResult {
  const safeTargetMonthlyNet = Math.max(0, safeNumber(targetMonthlyNet));
  const safeMonthlyFixedCosts = Math.max(0, safeNumber(monthlyFixedCosts));
  const safeBillableHoursPerMonth = Math.max(1, Math.round(safeNumber(billableHoursPerMonth, 1)));
  const safeProjectHours = Math.max(0.5, safeNumber(projectHours, 0.5));
  const safeRevisionBufferPercent = Math.min(100, Math.max(0, safeNumber(revisionBufferPercent)));
  const safeDirectProjectCosts = Math.max(0, safeNumber(directProjectCosts));
  const safeTaxReservePercent = Math.min(99, Math.max(0, safeNumber(taxReservePercent)));
  const safeProfitMarginPercent = Math.min(100, Math.max(0, safeNumber(profitMarginPercent)));

  const taxReserveRate = safeTaxReservePercent / 100;
  const marginRate = safeProfitMarginPercent / 100;

  const preTaxIncomeTarget = safeTargetMonthlyNet / Math.max(0.01, 1 - taxReserveRate);
  const monthlyRevenueTarget = preTaxIncomeTarget + safeMonthlyFixedCosts;
  const baseHourlyRate = monthlyRevenueTarget / safeBillableHoursPerMonth;
  const bufferedProjectHours = safeProjectHours * (1 + safeRevisionBufferPercent / 100);
  const projectFloorPrice = bufferedProjectHours * baseHourlyRate + safeDirectProjectCosts;
  const recommendedProjectBudget = projectFloorPrice * (1 + marginRate);
  const vatAmount = hasIVA ? recommendedProjectBudget * 0.21 : 0;
  const totalWithVAT = recommendedProjectBudget + vatAmount;
  const effectiveHourlyRate = recommendedProjectBudget / bufferedProjectHours;

  return {
    targetMonthlyNet: roundToTwo(safeTargetMonthlyNet),
    monthlyFixedCosts: roundToTwo(safeMonthlyFixedCosts),
    billableHoursPerMonth: safeBillableHoursPerMonth,
    projectHours: roundToTwo(safeProjectHours),
    bufferedProjectHours: roundToTwo(bufferedProjectHours),
    revisionBufferPercent: roundToTwo(safeRevisionBufferPercent),
    directProjectCosts: roundToTwo(safeDirectProjectCosts),
    taxReservePercent: roundToTwo(safeTaxReservePercent),
    profitMarginPercent: roundToTwo(safeProfitMarginPercent),
    preTaxIncomeTarget: roundToTwo(preTaxIncomeTarget),
    monthlyRevenueTarget: roundToTwo(monthlyRevenueTarget),
    baseHourlyRate: roundToTwo(baseHourlyRate),
    projectFloorPrice: roundToTwo(projectFloorPrice),
    recommendedProjectBudget: roundToTwo(recommendedProjectBudget),
    vatAmount: roundToTwo(vatAmount),
    totalWithVAT: roundToTwo(totalWithVAT),
    effectiveHourlyRate: roundToTwo(effectiveHourlyRate),
  };
}
