# Cuánto Presupuestar

MVP en Next.js para calcular cuánto presupuestar un proyecto freelance a partir de un objetivo mensual, unos costes fijos, tus horas facturables, un buffer de revisiones y una reserva fiscal orientativa.

## Requisitos

- Node.js 20.9 o superior
- npm 10 o superior

## Arranque en local

```bash
npm install
npm run dev
```

Después abre:

```bash
http://localhost:3002
```

## Variable de entorno

Para producción, configura:

```bash
NEXT_PUBLIC_SITE_URL=https://www.cuantopresupuestar.es
```

## Estructura

```text
cuanto-presupuestar/
  app/
    aviso-legal/page.tsx
    cookies/page.tsx
    privacidad/page.tsx
    globals.css
    layout.tsx
    page.tsx
  components/
    CalculatorForm.tsx
    FAQ.tsx
    Footer.tsx
    Header.tsx
    ResultCard.tsx
  lib/
    calculator.ts
    format.ts
    site.ts
  public/
  .env.example
  .gitignore
  next-env.d.ts
  next.config.ts
  package.json
  README.md
  tsconfig.json
```
