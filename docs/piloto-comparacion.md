# Piloto local: comparación de situaciones

Volver a [Desarrollo](desarrollo.md).

## Alcance

Solo Cuánto Presupuestar, en local. Se mantienen las fórmulas de estimación,
el tipo de IVA y la reserva fiscal. `lib/calculator.ts` cambia únicamente el
cierre monetario y la comparación de importes finales, según la política
acordada tras la revisión. No se publica ni extiende este piloto todavía.

La comparación de situaciones responde a cómo cambia el presupuesto al
modificar los datos del trabajo. La comparación con la oferta del cliente
sigue respondiendo a si esa oferta cubre el mínimo y el recargo previsto.

## Responsabilidades del código

| Archivo | Responsabilidad |
| --- | --- |
| `lib/quoteComparison.ts` | Copia validada e independiente de los nueve datos, recálculo de ambos casos, diferencias y texto determinista. |
| `lib/calculatorForm.ts` | Lee valores canónicos del formulario, normaliza texto pegado y valida los límites del motor. |
| `lib/money.ts` | Redondeo decimal, céntimos enteros, porcentaje exacto, suma y resta monetarias y límites de precisión. |
| `lib/calculator.ts` | Mantiene la estimación sin redondeos intermedios y cierra recomendado, IVA y total con la política acordada. |
| `components/CalculatorForm.tsx` | Guarda A en memoria y deriva B del formulario. |
| `components/ScenarioComparison.tsx` | Acciones, comparación compacta, estado inválido y cambios de entradas. |
| `components/ResultCard.tsx` | Mantiene el desglose y la oferta del cliente; no muestra cifras de B si no es válida. |
| `app/page.tsx` | Añade las comprobaciones al desplegable de la metodología existente, sin otra sección de portada. |
| `app/styles/calculator.css` | Estilos de comparación, adaptación móvil y foco visible. |
| `tests/quoteComparison.test.ts` | Pruebas del modelo de comparación y sus límites. |
| `tests/ScenarioComparison.test.tsx` | Pruebas del flujo de interacción y conservación de estado. |
| `tests/calculatorForm.test.ts` y `tests/CalculatorForm.test.tsx` | Regresiones de decimales, pegado, mínimo de horas y etiqueta y copia del IVA. |
| `tests/money.test.ts` y `tests/calculator.test.ts` | Empates de medio céntimo, límites, precisión y suma exacta del presupuesto. |
| `docs/desarrollo.md` y `docs/piloto-comparacion.md` | Mapa del código, alcance, comprobaciones y prueba pendiente con personas. |

A contiene todos los datos de entrada, no una cifra ajustada ni una referencia
mutable al formulario. A y B se vuelven a calcular con la misma función importada
en la página. No se conservan modelos de versiones anteriores.

La diferencia es **B menos A** sobre los importes finales convertidos a céntimos
enteros, para que coincida con las cifras visibles. Las horas mantienen su
tratamiento como magnitud distinta. No se muestran porcentajes relativos:
evitamos divisiones por un precio de referencia cero y no fingimos precisión extra.
El IVA tiene su propia fila; mínimo y recomendado se comparan siempre sin IVA.

Si B es inválida o el cálculo desborda el rango numérico, se ocultan sus resultados
y la tabla. A permanece guardada y puede eliminarse; no puede sustituirse por B
hasta corregirla. La oferta del cliente se conserva durante la corrección.

A desaparece al recargar, salir de la página o desmontar la calculadora. No se
guarda en URL, almacenamiento local, cuentas ni servicios externos. Este piloto
no añade eventos analíticos ni transmite entradas, importes o diferencias.

## Supuestos y límites existentes

La [metodología de la portada](https://www.cuantopresupuestar.es/#quote-method-heading)
explica los supuestos. El [ejemplo](https://www.cuantopresupuestar.es/ejemplo-presupuesto-freelance)
y la [guía del margen](https://www.cuantopresupuestar.es/margen-presupuesto-freelance)
amplían su interpretación. En local, abrir las mismas rutas en el puerto del piloto.

La reserva fiscal es una hipótesis introducida por el usuario, no el IRPF calculado.
El recargo se aplica sobre el mínimo, no es un margen contable sobre ventas. El motor
usa un IVA del 21 % cuando se selecciona; no decide su aplicabilidad. No se añaden
afirmaciones fiscales, fuentes nuevas ni fechas o credenciales de revisión.

## Tres niveles de comprobación

### Pruebas automatizadas de software

`tests/calculator.test.ts` protege el cálculo original. Las pruebas nuevas de
`quoteComparison.test.ts` y `ScenarioComparison.test.tsx` cubren copia independiente,
casos iguales, cambios de una o varias entradas, IVA, límites, datos inválidos,
desbordamiento, diferencias redondeadas, sustitución, eliminación, pérdida al
desmontar y conservación de la oferta. Son pruebas de software, no fiscales.

### Comprobación numérica independiente

Caso de control aritmético, sin llamar al motor para obtener los valores esperados:

| Dato | Valor |
| --- | --- |
| Neto objetivo mensual | 2.000 EUR |
| Costes fijos | 400 EUR/mes |
| Horas facturables | 80 h/mes |
| Proyecto | 20 h |
| Buffer | 15 % |
| Costes directos | 150 EUR |
| Reserva fiscal orientativa | 20 % |
| Recargo | 15 % |
| Añadir IVA | Sí |

1. Objetivo previo a la reserva: `2000 / (1 - 0.20) = 2500`.
2. Facturación mensual objetivo: `2500 + 400 = 2900`.
3. Referencia por hora: `2900 / 80 = 36.25`.
4. Horas con buffer: `20 * 1.15 = 23`.
5. Mínimo: `23 * 36.25 + 150 = 983.75`.
6. Recomendado: `983.75 * 1.15 = 1131.3125`, visible **1131,31 EUR**.
7. IVA sobre el recomendado cerrado: `1131.31 * 0.21 = 237.5751`,
   visible **237,58 EUR**.
8. Total: `(113131 + 23758) / 100 = 1368.89`, visible **1368,89 EUR**.

Los valores esperados fijos de `tests/calculator.test.ts` contrastan esta
comprobación con el motor. Los ejemplos publicados se generan con el motor:
son útiles para interpretar el cálculo, pero no una validación independiente.
La estimación mantiene aritmética de coma flotante sin redondeos intermedios;
el cierre monetario usa céntimos enteros. No es un motor contable de facturación
ni verifica las obligaciones fiscales. Puede diferir de herramientas que
utilicen otras políticas de redondeo.

### Revisión de entradas y presentación (3 de octubre de 2026)

Los tres primeros hallazgos del informe externo se reprodujeron mediante pruebas
de regresión en la aplicación original. Antes de corregirlos fallaban 12
comprobaciones; después de la corrección pasan junto con la suite completa.

- Los campos `type="number"` utilizan `parseInputNumber`: el punto es decimal,
  sin separadores de miles, monedas ni coerción de texto vacío a cero. Admite
  decimales y exponentes finitos. La validación y las copias de A/B usan la misma
  interpretación; no vuelven a pasar esos valores por el parser localizado.
- `parseSpanishNumber` se conserva para texto pegado y la oferta del cliente,
  que es un campo de texto. Se sigue aceptando `2.500,50 €`.
- Al pegar o perder el foco se conserva la precisión prevista del formulario:
  dos decimales para importes y horas del proyecto, uno para porcentajes y
  horas facturables enteras. Los datos inválidos se conservan para corregirlos.
  Durante la escritura, el estado y el cálculo mantienen la precisión introducida
  hasta esa normalización. No se cambia la precisión interna del motor.
- `0,125`, `1,005` y `12,345` pegados como costes quedan en `0.13`, `1.01` y
  `12.35`, nunca en 125, 1005 o 12345. Con los demás valores iniciales, los
  recomendados son 811,32, 812,29 y 824,77 EUR, respectivamente.
- El formulario rechaza horas de proyecto inferiores a 0,5, sin sustituir
  silenciosamente la entrada. B se oculta mientras sea inválida; A y la oferta
  del cliente se conservan.
- La etiqueta principal cambia entre «Total final con IVA» y «Total final sin
  IVA» según la selección. El resumen copiado mantiene la misma distinción.

### Política de cierre monetario acordada

1. Estimar horas, tarifa, costes, reserva y recargo sin redondear cada operación.
2. Cerrar el recomendado sin IVA al céntimo más cercano. Los empates decimales
   de medio céntimo se redondean hacia arriba para importes positivos:
   `1.005 -> 1.01`, `10.075 -> 10.08`.
3. Calcular el IVA sobre esa base cerrada. El 21 % se obtiene con aritmética
   entera `BigInt` y se redondea al céntimo; no se multiplica otra base oculta.
4. Sumar base e IVA como céntimos enteros. Sin IVA, cuota cero y total igual a base.

`lib/money.ts` usa `Intl.NumberFormat` con `halfExpand` y partes estructuradas
para la conversión decimal a céntimos, sin multiplicar primero el número
binario por 100 ni añadir un epsilon arbitrario. Para las diferencias negativas,
el redondeo es simétrico; una diferencia de cero nunca se presenta como -0.

Todos los importes monetarios devueltos por el motor usan el mismo cierre.
La tarifa mostrada se redondea solo al devolver el resultado, no antes de
multiplicarla por las horas. Las horas y porcentajes no usan el helper monetario.
La oferta del cliente se cierra a céntimos antes de comparar; sus diferencias y
el colchón se restan sobre importes finales. Tarjeta, comparador, interpretación,
ejemplos y resumen consumen el mismo resultado, sin correcciones visuales aparte.

El límite monetario conservador es `2^46 * 100 - 1` céntimos: bajo ese umbral
la separación entre números representables en euros es menor de un céntimo.
Se exige además que convertir céntimos a euros y de vuelta no pierda ninguno.
Se rechazan valores no finitos, operaciones no enteras y cierres fuera del rango;
el formulario oculta B y muestra el aviso de rango seguro, conservando A y oferta.
No se cambia una cifra silenciosamente para hacerla caber.

Cambios de referencia contrastados, no expectativas regeneradas automáticamente:

| Caso | Antes: base / IVA / total (EUR) | Ahora: base / IVA / total (EUR) |
| --- | --- | --- |
| Valores iniciales y 1,5 h | 67,60 / 14,20 / 81,79 | 67,60 / 14,20 / 81,80 |
| Mismo caso sin IVA | 67,60 / 0,00 / 67,60 | Sin cambios |
| Base exacta 0,50 | 0,50 / 0,11 / 0,61 | Sin cambios |
| Coste directo exacto 1,005, sin recargo ni ingreso por horas | 1,00 / 0,21 / 1,22 | 1,01 / 0,21 / 1,22 |
| Coste directo exacto 10,075, mismo supuesto | 10,07 / 2,12 / 12,19 | 10,08 / 2,12 / 12,20 |
| Control aritmético anterior | 1131,31 / 237,58 / 1368,89 | Sin cambios |

El cambio de cierre puede modificar algún IVA, total o empate monetario respecto
al motor anterior. Se documenta como decisión de coherencia, no revisión fiscal.
Las regresiones anteriores se conservan. Queda pendiente la prueba con personas.

### Revisión fiscal profesional

No se acredita una revisión fiscal profesional. Las pruebas y las operaciones
anteriores no verifican la situación tributaria de una persona ni sustituyen a
su asesoría. No presentar el piloto como una auditoría fiscal.

## Comprobación local

1. `npm run dev` (puerto habitual 3002; usar otro si está ocupado).
2. Calcular con valores iniciales: recomendado **811,18 EUR sin IVA**.
3. Guardar como situación A. Introducir una oferta del cliente de **900 EUR**.
4. Cambiar las horas estimadas de 18 a 36. B debe pasar a **1.622,36 EUR sin IVA**,
   A seguir en **811,18 EUR** y la diferencia ser **+811,18 EUR**.
5. Vaciar las horas: no debe quedar una tabla antigua ni un resultado válido de B.
   Corregirlas: A y la oferta del cliente deben seguir ahí.
6. Cambiar dos campos y el IVA. Comprobar las entradas cambiadas y que no se
   atribuye el efecto conjunto a una sola causa.
7. Sustituir A, volver a editar, eliminar la comparación y recargar.
8. Repetir con teclado y pantallas de 320, 390, 768 y 1440 px, sin desbordamiento.

Ejecutar `npm test`, `npm run lint` y `npm run build` antes de plantear publicación.

## Validación realizada en local

- `npm test`: **171 pruebas correctas en 32 archivos**, incluidas las del motor
  original y 77 nuevas de comparación, entradas, redondeo e interacción.
- `npm run lint`: correcto, sin errores.
- `npm run build`: correcto, incluida la comprobación de TypeScript.
- Chrome con Playwright: flujo completo en **320, 390, 768 y 1440 px**, guardado,
  recálculo, corrección de datos inválidos, oferta del cliente, IVA, sustitución,
  borrado con teclado, pérdida al recargar y enlace a metodología.
- Regresiones en Chrome en esos cuatro tamaños: pegado real desde el
  portapapeles, decimales canónicos, rechazo de 0,25 horas, recuperación con
  0,5 horas conservando A y oferta, B igual al cálculo independiente, etiqueta
  sin IVA y contenido realmente copiado al portapapeles.
- Anchura del documento igual a la pantalla en los cuatro tamaños: sin
  desplazamiento horizontal ni celdas o botones desbordados.
- Sin errores de ejecución o hidratación de la calculadora y sin solicitudes
  POST durante el flujo. El servidor local responde 404 al script existente
  `/_vercel/insights/script.js`, servido por Vercel en su plataforma; queda
  registrado como aviso del entorno, no como un resultado limpio de consola.
- `lib/calculator.ts` cambia el cierre monetario; `lib/calculatorForm.ts`
  corrige las entradas y el mínimo de horas. Dependencias y sitemap no modificados.
  Validado con Next.js 16.3.5 y React 19.2.4 del proyecto, no con un
  montaje aislado en otra versión. No se ha desplegado ni extendido el piloto.

Vitest también informa de una advertencia existente sobre una futura carga
nativa de su configuración; no es un fallo de prueba. Ninguna de estas
comprobaciones equivale a una prueba con usuarios ajenos al desarrollo.

## Guion para personas reales (pendiente de realizar)

La ronda técnica está cerrada; no añadir funciones antes de observar su uso.
La [preparación de la prueba](validacion-usuarios/README.md) separa la ficha del
participante, el guion privado del moderador y el registro anónimo de sesiones.

Primera ronda propuesta: 3 a 5 personas ajenas al desarrollo. El escenario de
investigación mantiene 150 EUR de costes directos, amplía el trabajo de 18 a
36 horas y conserva una oferta de 1.200 EUR sin IVA. Es distinto del caso técnico
de 900 EUR descrito en la comprobación local; no sustituye esas pruebas.

No se han realizado sesiones ni confirmado participantes. No inventar resultados
ni confundir recorridos automatizados con investigación de usuarios. Mantener el
piloto local y no extenderlo mientras queden confusiones que puedan cambiar el
importe enviado. Una decisión comercial distinta no es por sí misma un error.
