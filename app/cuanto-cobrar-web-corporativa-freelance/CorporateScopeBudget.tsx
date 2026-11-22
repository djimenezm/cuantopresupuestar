import ScopeExpansionBudget from '@/components/ScopeExpansionBudget';

const help = 'Las páginas describen el alcance. Cada importe sin IVA suma las horas a tu tarifa de venta '
  + 'y los costes directos de ese tramo. En la ampliación, indica solo las horas y costes que '
  + 'se añaden. Prueba con 40 €/h y añade 2 páginas, 18,4 h y 30 € de costes al ejemplo inicial.';

export default function CorporateScopeBudget() {
  return (
    <ScopeExpansionBudget
      id="calcular-web-corporativa"
      title="Calcula el precio y la ampliación de tu web"
      help={help}
      unit={{ singular: 'página', plural: 'páginas' }}
      initial={{ count: '3', hours: '36,8', costs: '90' }}
    />
  );
}
