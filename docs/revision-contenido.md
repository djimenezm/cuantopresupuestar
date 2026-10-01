# Revisión del contenido y uso real

Volver al [README](../README.md).

## Objetivo

AdSense marcó `cuantopresupuestar.es` como «Contenido de poco valor». Su guía pide
contenido original suficiente, páginas diferenciadas, navegación clara y un
motivo para que las personas vuelvan. Ningún cambio de código garantiza la
aprobación: la revisión depende de Google y de señales de uso observables.

## Qué aporta cada página principal

| Página | Decisión que ayuda a tomar |
| --- | --- |
| `/` | Calcular el mínimo y el presupuesto recomendado a partir de datos propios. |
| `/como-presupuestar-un-proyecto-freelance` | Decidir qué alcance recortar cuando una oferta no cubre el mínimo. |
| `/ejemplo-presupuesto-freelance` | Ver el cálculo completo y cómo cambia al ampliar el proyecto. |
| `/kit-presupuesto-freelance` | Descargar y rellenar una propuesta con entregables, pagos y control de cambios. |

La antigua URL `/plantilla-presupuesto-freelance` redirige al kit. No debe
publicarse otra página que repita la misma lista con un título diferente.

## Revisión editorial periódica

Una vez al mes, el responsable del sitio debería:

1. Abrir las consultas y páginas de Search Console de los últimos 28 días.
   Anotar consultas reales y qué páginas reciben impresiones y clics.
2. Revisar en Vercel Web Analytics las visitas a la calculadora, al ejemplo y
   al kit. Comparar con los eventos `project_quote_calculated`,
   `client_offer_compared`, `proposal_summary_copied` y
   `budget_template_download_clicked`. Este último mide clics en la descarga,
   no descargas completadas. Los eventos no contienen importes ni emails.
3. Leer al menos una pregunta o comentario real de usuarios, si lo hay.
   Corregir una explicación confusa antes de añadir páginas nuevas.
4. Comprobar enlaces, descarga, cálculo de ejemplo y legibilidad móvil.
   Ejecutar `npm run lint`, `npm test` y `npm run build` antes de publicar.
5. Comparar las guías similares. Fusionar o redirigir las que responden a la
   misma pregunta; ampliar solo cuando exista una decisión diferente y un
   ejemplo que la aclare.

Registrar la fecha, la evidencia y la decisión tomada. No actualizar fechas de
artículos si solo cambió la navegación ni publicar textos nuevos para simular
actividad.

## Cuándo volver a solicitar la revisión de AdSense

Primero verificar que el recurso se descarga sin registro, que las páginas
principales responden a preguntas distintas y que sus ejemplos siguen
coincidiendo con la calculadora. Después observar el uso y las consultas reales
durante un periodo razonable; no existe un umbral público de clics que garantice
la aprobación. Solicitar la revisión solo cuando se pueda confirmar de buena fe
que se han atendido los problemas indicados por Google.
