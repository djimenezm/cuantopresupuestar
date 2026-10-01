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

export const expandedProjectExampleInput = {
  ...projectExampleInput,
  projectHours: 48,
} satisfies CalculatorInput;

export const expandedProjectExampleQuote = calculateProjectQuote(expandedProjectExampleInput);

export const webDevelopmentExamplePhases = [
  { name: 'Definición: mapa y requisitos', hours: 6 },
  { name: 'Arquitectura y diseño', hours: 8 },
  { name: 'Desarrollo y carga inicial', hours: 22 },
  { name: 'Pruebas y ajustes', hours: 8 },
  { name: 'Publicación y entrega', hours: 4 },
] as const;

const total = projectExampleQuote.recommendedProjectBudget;
const definitionAmount = Math.round(total * 0.2 * 100) / 100;
const productionAmount = Math.round(total * 0.6 * 100) / 100;

export const projectExamplePhases = [
  { name: 'Definición y arquitectura', share: 20, amount: definitionAmount },
  { name: 'Diseño y desarrollo', share: 60, amount: productionAmount },
  { name: 'Pruebas y entrega', share: 20, amount: Math.round((total - definitionAmount - productionAmount) * 100) / 100 },
] as const;
