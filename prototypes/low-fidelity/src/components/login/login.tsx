"use client";

import { useState } from "react";
import { ActionButton, Field } from "@/components/wireframe";
import { loginData as data } from "@/data/login/login-data";
import type { DemoRole } from "@/types/login/login-types";

export function Login() {
  const [role, setRole] = useState<DemoRole>("student");
  const destination = data.roles.find((entry) => entry.key === role)?.destination ?? "";

  return (
    <main className="login">
      <section className="login__card">
        <h1 className="login__title">{data.title}</h1>
        <p className="login__subtitle">{data.subtitle}</p>

        <div className="login__switch" role="group" aria-label={data.switchLabel}>
          <span className="login__switch-label">{data.switchLabel}</span>
          {data.roles.map((entry) => (
            <button
              key={entry.key}
              type="button"
              aria-pressed={entry.key === role}
              className={entry.key === role ? "login__option login__option--active" : "login__option"}
              onClick={() => setRole(entry.key)}
            >
              {entry.label}
            </button>
          ))}
        </div>

        <div className="wf-fields">
          {data.fields.map((field) => (
            <Field key={field.label} field={field} />
          ))}
        </div>

        <ActionButton action={{ label: data.submitLabel, href: destination, variant: "primary" }} />
        <p className="wf-note">{data.note}</p>
      </section>
    </main>
  );
}
