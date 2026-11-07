import Link from "next/link";
import { prototypeIndexData as data } from "@/data/prototype-index/prototype-index-data";

export function PrototypeIndex() {
  return (
    <main className="index">
      <header className="index__header">
        <h1 className="index__title">{data.title}</h1>
        <p className="index__subtitle">{data.subtitle}</p>
      </header>

      <table className="wf-table">
        <thead>
          <tr>
            {data.columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.screens.map((screen) => (
            <tr key={screen.slug}>
              <td>{screen.number}</td>
              <td>
                <Link href={screen.href} className="wf-link" data-screen={screen.slug} data-number={screen.number}>
                  {screen.title}
                </Link>
              </td>
              <td>{screen.audience}</td>
              <td>{screen.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
