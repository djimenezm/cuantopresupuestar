export const faqItems = [
  {
    question: '¿Cómo saber cuánto presupuestar un proyecto freelance?',
    answer:
      'Empieza por tu objetivo mensual, suma tus costes fijos y calcula una referencia por hora a partir de tus horas facturables reales. Después añade las horas del proyecto, un buffer de revisiones, costes directos y una reserva fiscal orientativa.',
  },
  {
    question: '¿Sirve si yo cierro precios por proyecto y no por horas?',
    answer:
      'Sí. Aunque vendas por proyecto, la referencia por hora sigue siendo útil para comprobar si ese precio cerrado te deja el margen que buscas o si estás presupuestando demasiado corto.',
  },
  {
    question: '¿El IVA cuenta como ingreso real?',
    answer:
      'No. Si tu actividad lleva IVA, ese importe normalmente se repercute al cliente y luego se liquida. Por eso la herramienta lo muestra aparte para no confundirlo con el dinero que realmente te queda.',
  },
  {
    question: '¿Qué pasa si no facturo todas mis horas de trabajo?',
    answer:
      'Precisamente por eso usamos horas facturables al mes, no horas totales trabajadas. Esa diferencia es clave para no sacar un precio por hora artificialmente bajo.',
  },
  {
    question: '¿La calculadora sustituye a una gestoría o a un asesor fiscal?',
    answer:
      'No. Sirve para orientarte y presupuestar con más criterio, pero no reemplaza una revisión profesional si vas a cerrar un proyecto importante o necesitas un encaje fiscal exacto.',
  },
  {
    question: '¿Sirve para diseño, desarrollo, marketing o consultoría?',
    answer:
      'Sí. Está pensada para actividades de servicios donde necesitas convertir un objetivo económico en un presupuesto por proyecto más defendible.',
  },
] as const;

export default function FAQ() {
  return (
    <section className="section alt" id="faq" aria-labelledby="faq-title">
      <div className="container text-block">
        <h2 id="faq-title">Preguntas frecuentes</h2>

        <div className="faq-list">
          {faqItems.map((item) => (
            <article className="faq-item" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
