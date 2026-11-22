# Validación técnica de Cuánto Presupuestar

Volver al [piloto de comparación](../piloto-comparacion.md).

El piloto se valida con pruebas automatizadas y ensayos técnicos internos con
datos ficticios. **Queda prohibido reclutar, invitar o contactar con personas
ajenas al desarrollo para este piloto.**

## Comprobaciones de software

Ejecutar `npm test` y `npm run lint` sobre la revisión que se valida. Las pruebas
del comparador cubren el recálculo de B, la conservación de A, el redondeo, el
IVA y la recuperación de valores inválidos.

## Preparar el equipo de prueba

Desde una copia local de la revisión que se valida, instalar las dependencias
con `npm ci` si aún no están presentes. Arrancar en PowerShell con los anuncios
desactivados para ese proceso.

```powershell
$env:NEXT_PUBLIC_ADSENSE_ENABLED = 'false'
npm run dev -- --hostname 127.0.0.1
```

Abrir <http://127.0.0.1:3002/> y seguir la comprobación local del
[piloto de comparación](../piloto-comparacion.md#comprobación-local).

Anotar la revisión, los datos usados, los resultados esperados y observados y
las incidencias reproducibles.

## Material archivado

La [ficha](ficha-participante.md), el [guion](guion-moderacion.md) y el
[registro](registro-sesiones.md) pertenecen a la ronda descartada. Se conservan
como referencia histórica.
