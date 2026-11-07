import { ActionButton, DataTable } from "@/components/wireframe";
import { gradingSheetData as data } from "@/data/grading-sheet/grading-sheet-data";

export function GradingSheet() {
  return (
    <article className="wf-screen grading">
      <header className="wf-screen__header">
        <h1 className="wf-screen__title">{data.title}</h1>
        <p className="wf-screen__subtitle">{data.subtitle}</p>
      </header>

      <dl className="grading__context">
        {data.context.map(([key, value]) => (
          <div key={key} className="grading__context-item">
            <dt>{key}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <section className="wf-panel">
        <h2 className="wf-panel__title">{data.scoreSheetTitle}</h2>
        <DataTable table={data.scoreSheet} />
      </section>

      <section className="wf-panel">
        <h2 className="wf-panel__title">{data.summaryTitle}</h2>
        <DataTable table={data.summary} />
        <p className="wf-caption">{data.formulaNote}</p>
      </section>

      <div className="wf-actions">
        {data.actions.map((action) => (
          <ActionButton key={action.label} action={action} />
        ))}
      </div>
    </article>
  );
}
