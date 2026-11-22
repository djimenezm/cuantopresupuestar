# Guion para moderar la prueba de Cuánto Presupuestar

Volver a la [preparación de la ronda](README.md).

**Documento exclusivo del moderador.** No enseñar las observaciones ni las
respuestas numéricas al participante. No se han realizado sesiones.

## Preparación

- Reservar 30 a 40 minutos por sesión. Orientativamente, dedicar 5 minutos a la
  introducción, 20 a 25 a las tareas y 5 a 10 al cierre. Dejar tiempo aparte para
  ordenar las notas.
- Abrir <http://127.0.0.1:3002/> con la revisión `a7e87de` y preparar un editor
  de texto local vacío. Confirmar que la calculadora empieza sin resultados y
  que el editor está vacío. Recargar entre sesiones para borrar el estado de
  la anterior.
- Entregar solo la [ficha ficticia](ficha-participante.md). El participante maneja
  los controles; no hacer una demostración previa.
- Pedir permiso para tomar notas anónimas. No grabar audio, vídeo o pantalla;
  requeriría una decisión y una autorización específicas.
- Preparar una copia de la [plantilla de registro](registro-sesiones.md). Usar un
  código como P1, no nombres, contactos, ingresos o información fiscal personal.

## Introducción

Leer con naturalidad:

> Estamos probando la herramienta, no tus conocimientos. Utiliza los datos de
> esta ficha y cuéntame qué intentas hacer y qué entiendes de los resultados.
> Si algo no está claro, nos interesa descubrirlo. Tomaremos notas sin tu nombre;
> puedes parar cuando quieras. ¿Te parece bien?

Si no acepta las notas, no iniciar el registro. No presentar la comparación como
una función que debería encontrar ni anticipar sus etiquetas.

## Tareas de una en una

Leer solo la tarea actual y dejar que la persona actúe. La columna de observación
es para el moderador, no para el participante.

| Tarea | Qué observar y registrar |
| --- | --- |
| 1. Prepara el presupuesto inicial con los datos de la ficha. Explica los importes que obtienes. | Anota las horas, el coste directo y el IVA que quedaron en pantalla. Observa si diferencia el mínimo, el recomendado y el total. Los costes directos empiezan en 0 EUR y la ficha pide 150 EUR. |
| 2. El cliente amplía el encargo a 36 horas. Conserva la propuesta inicial y valora la ampliación con los demás datos de la ficha. | Observa cómo intenta conservar la cifra inicial antes de editar. Anota qué situación queda guardada y si identifica cuál está modificando. |
| 3. El cliente propone pagar 1.200 EUR sin IVA por el encargo ampliado. ¿Cómo encaja esa oferta con el encargo inicial y con el ampliado? ¿Qué le responderías y en qué te basas? | Anota qué cifras compara para cada alcance, si corresponden a importes sin IVA y cómo fundamenta la decisión sobre el encargo ampliado. |
| 4. Usa el resumen del encargo ampliado para preparar un borrador en el editor de texto. Explica qué importe indicarías al cliente, qué incluye y qué revisarías antes de enviarlo. | Observa si encuentra cómo obtener el resumen, si procede del encargo ampliado y si lo distingue de la oferta. Registra qué parte del borrador enviaría. La tarea termina en el editor local. |
| 5. Antes de utilizar esta cifra en un trabajo real, ¿qué comprobarías sobre cómo está calculada? | Busca los supuestos y reconoce límites, sin tomar la herramienta por una revisión fiscal. |

No evaluar la decisión comercial como correcta o incorrecta. Aceptar, negociar,
reducir alcance o rechazar pueden ser decisiones razonadas: lo importante es que
la explicación utilice los datos y la situación que la persona pretende elegir.

## Moderación neutral

Observar y escuchar; no señalar controles, completar frases o aprobar una
interpretación. Si hace falta aclarar una acción, preguntar «¿qué esperabas que
ocurriera?» o «¿qué significa esa cifra para ti?». No corregir una confusión
mientras se evalúa la tarea. Este enfoque sigue la [guía de sesiones moderadas
de GOV.UK](https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing)
y sus [consejos para no dirigir a los participantes](https://userresearch.blog.gov.uk/2019/08/05/advice-for-better-moderated-usability-testing/).

Repetir un dato de la ficha no equivale a explicar la interfaz, pero anotar también
esa aclaración. Si necesita una pista sobre controles o importes para completar
la tarea, clasificarla «con ayuda» y registrar las palabras exactas de la intervención.
Si no llega al objetivo, registrar «no completada», sin forzar que continúe.

Si no conserva la inicial, no restaurarla en silencio: anotar el hecho. Si acepta
ayuda para poder seguir, registrar la intervención y que las tareas siguientes
ya no prueban un descubrimiento completamente espontáneo.

Antes de pasar a la tarea siguiente, registrar los valores con los que terminó.
Si un dato de la ficha quedó mal introducido y hace falta corregirlo para seguir,
anotar el estado original, la ayuda exacta y qué tareas posteriores dependen de
esa corrección.

## Referencias privadas del moderador

Con todos los datos de la ficha y cambiando únicamente las horas del proyecto:

| Indicador | Inicial, 18 h | Ampliación, 36 h | Diferencia, ampliación menos inicial |
| --- | ---: | ---: | ---: |
| Horas con buffer | 20,70 h | 41,40 h | +20,70 h |
| Precio mínimo sin IVA | 887,44 EUR | 1.624,88 EUR | +737,44 EUR |
| Recomendado sin IVA | 976,18 EUR | 1.787,36 EUR | +811,18 EUR |
| IVA añadido | 205,00 EUR | 375,35 EUR | +170,35 EUR |
| Total con IVA | 1.181,18 EUR | 2.162,71 EUR | +981,53 EUR |

La oferta de 1.200 EUR **sin IVA** supera el recomendado inicial en 223,82 EUR.
Para el proyecto ampliado queda 424,88 EUR por debajo del mínimo y 587,36 EUR
por debajo del recomendado. No compararla directamente con un total con IVA.

En la tarea 4, el resumen corresponde al presupuesto que se está editando. Con
36 h muestra 1.787,36 EUR recomendado sin IVA, 375,35 EUR de IVA y 2.162,71 EUR
en total. También incluye el mínimo, las tarifas, los costes, el colchón de
negociación y la oferta introducida. Observar qué conservaría la persona para
el cliente y qué trataría como información interna. Mantener estas referencias
fuera de la vista durante la tarea.

Las horas se duplican, pero no los costes directos: se mantienen en 150 EUR en
ambos trabajos. No suponer que todos los importes se duplican. Pedir que señale
qué cambia en la pantalla, sin darle estos valores de referencia.

Referencias calculadas con aritmética decimal independiente: tarifa interna
`(2000 / 0,8 + 350) / 80 = 35,625`; horas multiplicadas por `1,15`; mínimo
igual a horas con buffer por tarifa más 150; recargo `1,10`. Cerrar el recomendado
a céntimos, calcular y cerrar el 21 % sobre esa base y sumar base e IVA. Las
diferencias monetarias se restan entre importes finales. No es validación fiscal.

## Cierre y decisión

Preguntar qué le generó dudas y en qué trabajo usaría, o no usaría, el resultado.
Agradecer su participación sin interpretar el resultado por ella. Separar hechos
y citas de las hipótesis de solución en el registro.

Marcar como crítica cualquier confusión observada que pueda llevar a enviar otro
importe: situación equivocada, oferta tomada por recomendado, base tomada por
total o IVA tratado incorrectamente. No cerrar la ronda con un problema crítico
sin resolver. Corregirlo y repetir la tarea con alguien que no conozca la interfaz.

Documentar qué tareas se completaron sin ayuda y qué casos necesitaron una
intervención. Limitar las conclusiones a las personas y tareas observadas.
