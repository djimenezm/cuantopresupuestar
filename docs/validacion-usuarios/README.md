# Validación con personas de Cuánto Presupuestar

Volver al [piloto de comparación](../piloto-comparacion.md).

La primera ronda comprueba si una persona puede conservar un presupuesto,
comparar un cambio de alcance y explicar qué enviaría al cliente. Las sesiones se
preparan en una copia local de `a7e87de`, la revisión verificada en producción.
**Aún no hay participantes confirmados ni sesiones realizadas.**

## Material separado por destinatario

| Documento | Destinatario | Uso |
| --- | --- | --- |
| [Ficha de datos](ficha-participante.md) | Participante | Único documento que se entrega antes de empezar. No contiene respuestas ni instrucciones sobre controles. |
| [Guion de moderación](guion-moderacion.md) | Moderador | Preparación, tareas de una en una, preguntas neutrales y referencias numéricas privadas. |
| [Registro de sesiones](registro-sesiones.md) | Moderador y observador | Plantilla por persona y síntesis de hallazgos basada en hechos. |

## Primera ronda

Preparar sesiones individuales de 30 a 40 minutos con 3 a 5 personas ajenas al
desarrollo. Buscar usuarios potenciales con distinta experiencia al presupuestar
y priorizar a quienes todavía no hayan usado el comparador. Identificar las tres
primeras sesiones como P1 a P3 y usar P4 y P5 si se incorporan más personas.

Cada persona maneja los controles en el equipo de prueba y trabaja con la
ficha ficticia. Entregar solo la ficha, plantear las tareas de una en una y
registrar cualquier ayuda. Reservar tiempo entre sesiones para ordenar notas,
cerrar el borrador de prueba y reiniciar la calculadora.

## Preparar el equipo de prueba

Desde una copia local de `a7e87de`, instalar las dependencias con `npm ci` si
aún no están presentes. En PowerShell, arrancar la aplicación en el equipo de la
sesión con los anuncios desactivados para ese proceso.

```powershell
$env:NEXT_PUBLIC_ADSENSE_ENABLED = 'false'
npm run dev -- --hostname 127.0.0.1
```

Abrir <http://127.0.0.1:3002/> y preparar un editor local vacío para la tarea del
borrador. Antes de recibir a la primera persona, ensayar el caso con los importes
de referencia del guion. Empezar cada sesión con la portada recién cargada, el
editor vacío y una copia del registro sin rellenar.

## Decisión posterior

Revisar cuántas personas conservaron la propuesta inicial, interpretaron la
oferta con el alcance correcto y prepararon el borrador con los importes que
pretendían usar. Distinguir los intentos autónomos de los que necesitaron ayuda.
Si queda una confusión que pueda llevar a enviar un importe equivocado o una
tarea clave solo se completa con ayuda, revisar ese punto y repetir la tarea
afectada con alguien que todavía no conozca la interfaz. Las conclusiones se
limitan a las personas y tareas observadas.
