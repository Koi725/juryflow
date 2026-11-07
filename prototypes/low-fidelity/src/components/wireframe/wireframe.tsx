import Link from "next/link";
import type {
  ActionData,
  FieldData,
  ScreenData,
  Section,
  TableCell,
  TableData,
} from "@/types/wireframe/wireframe-types";

export function ActionButton({ action }: { action: ActionData }) {
  const className = `wf-btn wf-btn--${action.variant ?? "secondary"}`;
  if (action.href) {
    return (
      <Link href={action.href} className={className}>
        {action.label}
      </Link>
    );
  }
  return (
    <button type="button" className={className}>
      {action.label}
    </button>
  );
}

function Actions({ actions }: { actions: ActionData[] }) {
  return (
    <div className="wf-actions">
      {actions.map((action) => (
        <ActionButton key={action.label} action={action} />
      ))}
    </div>
  );
}

export function Field({ field }: { field: FieldData }) {
  if (field.kind === "file") {
    return (
      <div className="wf-field">
        <span className="wf-field__label">{field.label}</span>
        <div className="wf-dropzone">{field.placeholder}</div>
        {field.hint && <span className="wf-field__hint">{field.hint}</span>}
      </div>
    );
  }
  if (field.kind === "checkbox") {
    return (
      <label className="wf-check">
        <input type="checkbox" defaultChecked={field.value === "checked"} />
        <span>{field.label}</span>
      </label>
    );
  }
  return (
    <label className="wf-field">
      <span className="wf-field__label">{field.label}</span>
      {field.kind === "textarea" ? (
        <textarea className="wf-input wf-input--area" placeholder={field.placeholder} defaultValue={field.value} />
      ) : field.kind === "select" ? (
        <select className="wf-input" defaultValue={field.value ?? field.options?.[0]}>
          {(field.options ?? []).map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          className="wf-input"
          type={field.kind}
          placeholder={field.placeholder}
          defaultValue={field.value}
        />
      )}
      {field.hint && <span className="wf-field__hint">{field.hint}</span>}
    </label>
  );
}

function Cell({ cell }: { cell: TableCell }) {
  if (typeof cell === "string") return <>{cell}</>;
  if ("tag" in cell) return <span className="wf-tag">{cell.tag}</span>;
  if ("href" in cell) {
    return (
      <Link href={cell.href} className="wf-link">
        {cell.label}
      </Link>
    );
  }
  if ("input" in cell) return <input className="wf-input wf-input--cell" defaultValue={cell.input} aria-label="score" />;
  return <input type="checkbox" defaultChecked={cell.check} aria-label="present" />;
}

export function DataTable({ table }: { table: TableData }) {
  return (
    <div className="wf-table-wrap">
      <table className="wf-table">
        <thead>
          <tr>
            {table.columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  <Cell cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="wf-panel">
      <h2 className="wf-panel__title">{title}</h2>
      {children}
    </section>
  );
}

export function SectionView({ section }: { section: Section }) {
  switch (section.kind) {
    case "fields":
      return (
        <Panel title={section.title}>
          <div className={section.columns === 2 ? "wf-fields wf-fields--two" : "wf-fields"}>
            {section.fields.map((field) => (
              <Field key={field.label} field={field} />
            ))}
          </div>
        </Panel>
      );
    case "table":
      return (
        <Panel title={section.title}>
          <DataTable table={section.table} />
          {section.caption && <p className="wf-caption">{section.caption}</p>}
          {section.actions && <Actions actions={section.actions} />}
        </Panel>
      );
    case "timeline":
      return (
        <Panel title={section.title}>
          <ol className="wf-timeline">
            {section.items.map((item) => (
              <li key={item.label} className={`wf-timeline__item wf-timeline__item--${item.state}`}>
                <span className="wf-timeline__dot" aria-hidden="true" />
                <span className="wf-timeline__label">{item.label}</span>
                {item.detail && <span className="wf-timeline__detail">{item.detail}</span>}
              </li>
            ))}
          </ol>
        </Panel>
      );
    case "list":
      return (
        <Panel title={section.title}>
          <ul className="wf-list">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Panel>
      );
    case "keyvalue":
      return (
        <Panel title={section.title}>
          <dl className="wf-keyvalue">
            {section.pairs.map(([key, value]) => (
              <div key={key} className="wf-keyvalue__row">
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </Panel>
      );
    case "choice":
      return (
        <Panel title={section.title}>
          <div className="wf-choices">
            {section.options.map((option) => (
              <label key={option.label} className="wf-choice">
                <input type="radio" name={section.name} />
                <span>
                  <strong>{option.label}</strong>
                  {option.hint && <span className="wf-field__hint">{option.hint}</span>}
                </span>
              </label>
            ))}
          </div>
        </Panel>
      );
    case "placeholder":
      return (
        <Panel title={section.title}>
          <div className={`wf-block wf-block--${section.height ?? "md"}`}>{section.label}</div>
        </Panel>
      );
    case "note":
      return <p className="wf-note">{section.text}</p>;
    case "actions":
      return <Actions actions={section.actions} />;
    case "row":
      return (
        <div className="wf-row">
          {section.sections.map((child, index) => (
            <SectionView key={index} section={child} />
          ))}
        </div>
      );
  }
}

export function Screen({ data }: { data: ScreenData }) {
  return (
    <article className="wf-screen">
      <header className="wf-screen__header">
        <h1 className="wf-screen__title">{data.title}</h1>
        {data.subtitle && <p className="wf-screen__subtitle">{data.subtitle}</p>}
      </header>
      {data.sections.map((section, index) => (
        <SectionView key={index} section={section} />
      ))}
    </article>
  );
}
