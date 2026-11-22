# Desarrollo de Cuánto Presupuestar

Volver al [README](../README.md).

Para el mantenimiento editorial y la evaluación de uso, consulta
[Revisión del contenido y uso real](revision-contenido.md).

El [piloto de comparación de situaciones](piloto-comparacion.md) documenta
la integración, la comprobación aritmética y la validación técnica local.

## Mapa del código

| Ubicación | Responsabilidad |
| --- | --- |
| `app/page.tsx` | Portada y acceso a la calculadora. |
| `app/*/page.tsx` | Guías, ejemplos, recurso descargable y páginas legales. |
| `components/CalculatorForm.tsx` | Estado e interacción del formulario. |
| `components/ResultCard.tsx` | Desglose y acciones del resultado. |
| `components/ScenarioComparison.tsx` y `lib/quoteComparison.ts` | Comparación de dos situaciones completas con el mismo motor. |
| `lib/calculator.ts` | Cálculo del presupuesto, independiente de React. |
| `lib/money.ts` | Cierre monetario, operaciones en céntimos y control de precisión del piloto. |
| `lib/calculatorForm.ts` | Valores iniciales, lectura numérica canónica y validación. |
| `lib/spanishNumber.ts` | Lectura de texto localizado para pegado y oferta del cliente. |
| `app/globals.css` y `app/styles/` | Entrada de estilos y hojas en orden de cascada. |
| `tests/` | Pruebas de cálculo, formulario, accesibilidad y configuración. |

## Configuración

`NEXT_PUBLIC_SITE_URL` debe apuntar al dominio canónico <https://www.cuantopresupuestar.es/>. Consulta `.env.example` para el resto de variables.

Los espacios publicitarios están preparados, pero `lib/ads.ts` exige `NEXT_PUBLIC_ADSENSE_ENABLED=true` y consentimiento gestionado para mostrarlos. No actives esa variable hasta que AdSense apruebe el sitio.

## Rastreo y respuesta del servidor

- `vercel.json` sitúa las funciones en París (`cdg1`), cerca del público español.
- `/ads.txt` se genera al compilar con el ID de editor configurado. Cambiar ese ID requiere un nuevo despliegue; no contiene datos de visitantes.
- `app/sitemap.ts` registra fechas de cambios editoriales reales. No actualices `lastContentUpdates` solo por desplegar o cambiar estilos.
- Las solicitudes de indexación ya aceptadas no se repiten para intentar adelantar la cola. La aprobación de AdSense y la indexación son procesos independientes de Google.

## Revisión local antes de publicar

1. Ejecutar `npm run lint`, `npm test` y `npm run build`.
2. Probar un cálculo y un valor inválido.
3. Recorrer las guías y el formulario del recurso.
4. Comprobar `/sitemap.xml`, `/robots.txt` y `/ads.txt`.
