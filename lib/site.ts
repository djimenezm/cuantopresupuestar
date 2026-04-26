const productionUrl = 'https://www.cuantopresupuestar.es';

export const siteConfig = {
  name: 'Cuánto Presupuestar',
  shortName: 'Cuánto Presupuestar',
  title: 'Calculadora para presupuestar proyectos freelance',
  description:
    'Calcula cuánto presupuestar un proyecto freelance a partir de tu objetivo mensual, tus costes fijos, tus horas facturables, el buffer de revisiones y una reserva fiscal orientativa.',
  locale: 'es_ES',
  keywords: [
    'cuánto presupuestar',
    'calculadora presupuesto freelance',
    'cuánto cobrar proyecto freelance',
    'precio proyecto freelance',
    'presupuestar proyecto freelance',
    'calculadora precio por proyecto',
  ],
  url: process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : productionUrl,
  ownerName: 'Equipo de Cuánto Presupuestar',
  contactEmail: 'hola@cuantopresupuestar.es',
  country: 'España',
  themeColor: '#145da0',
  backgroundColor: '#f6f8fb',
} as const;

export function getSiteUrl() {
  return new URL(siteConfig.url);
}
