import { calculateProjectQuote, type CalculatorInput } from './calculator';

export const projectExampleInput = {
  targetMonthlyNet: 2000,
  monthlyFixedCosts: 350,
  billableHoursPerMonth: 80,
  projectHours: 32,
  revisionBufferPercent: 15,
  directProjectCosts: 90,
  taxReservePercent: 20,
  profitMarginPercent: 10,
  hasIVA: true,
} satisfies CalculatorInput;

export const projectExampleQuote = calculateProjectQuote(projectExampleInput);

const total = projectExampleQuote.recommendedProjectBudget;
const definitionAmount = Math.round(total * 0.2 * 100) / 100;
const productionAmount = Math.round(total * 0.6 * 100) / 100;

export const projectExamplePhases = [
  { name: 'Definición y arquitectura', share: 20, amount: definitionAmount },
  { name: 'Diseño y desarrollo', share: 60, amount: productionAmount },
  { name: 'Pruebas y entrega', share: 20, amount: Math.round((total - definitionAmount - productionAmount) * 100) / 100 },
] as const;
