import ScopeExpansionBudget from '@/components/ScopeExpansionBudget';

export default function StoreCatalogBudget() {
  return (
    <ScopeExpansionBudget
      id="calcular-tienda-online"
      title="Calcula el precio de tu tienda y la ampliación del catálogo"
      help="Cuenta los productos que prepararás o cargarás. Incluye en las horas la configuración, las fichas y las variantes de cada tramo. El precio sin IVA suma el trabajo a tu tarifa de venta y sus costes directos. Prueba con 40 €/h y añade 20 productos, 10 h y 60 € de costes al catálogo inicial."
      unit={{ singular: 'producto', plural: 'productos' }}
      initial={{ count: '10', hours: '80,5', costs: '180' }}
      minimumInitialCount={0}
    />
  );
}
