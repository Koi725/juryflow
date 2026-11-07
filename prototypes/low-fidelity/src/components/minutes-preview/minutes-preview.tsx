import { ActionButton, DataTable } from "@/components/wireframe";
import { minutesPreviewData as data } from "@/data/minutes-preview/minutes-preview-data";

export function MinutesPreview() {
  const { paper } = data;

  return (
    <article className="wf-screen">
      <header className="wf-screen__header">
        <h1 className="wf-screen__title">{data.title}</h1>
        <p className="wf-screen__subtitle">{data.subtitle}</p>
      </header>

      <div className="minutes__paper" aria-label="Minutes page">
        <p className="minutes__institution">{paper.institution}</p>
        <h2 className="minutes__heading">{paper.heading}</h2>

        <dl className="minutes__meta">
          {paper.meta.map(([key, value]) => (
            <div key={key} className="minutes__meta-row">
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        {paper.sections.map((section) => (
          <section key={section.heading} className="minutes__section">
            <h3 className="minutes__section-title">{section.heading}</h3>
            {section.body && <p className="minutes__body">{section.body}</p>}
            {section.table && <DataTable table={section.table} />}
          </section>
        ))}

        <section className="minutes__section">
          <h3 className="minutes__section-title">{paper.signatureHeading}</h3>
          <div className="minutes__signatures">
            {paper.signatures.map((signature) => (
              <div key={signature.name} className="minutes__signature">
                <div className="minutes__line" />
                <span>{signature.name}</span>
                <span className="minutes__role">{signature.role}</span>
              </div>
            ))}
          </div>
        </section>

        <p className="minutes__footer">{paper.footer}</p>
      </div>

      <div className="wf-actions">
        {data.actions.map((action) => (
          <ActionButton key={action.label} action={action} />
        ))}
      </div>
    </article>
  );
}
