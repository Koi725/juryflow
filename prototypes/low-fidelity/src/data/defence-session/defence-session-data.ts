import { routes } from "@/data/routes/routes-data";
import type { DefenceSessionData } from "@/types/defence-session/defence-session-types";

export const defenceSessionData: DefenceSessionData = {
  title: "Defence session record",
  subtitle: "Lab inventory tracker - 18 Jun 2026, 10:00 - Room B2.04",
  sections: [
    {
      kind: "table",
      title: "Participants",
      table: {
        columns: ["Name", "Role", "Present"],
        rows: [
          ["Student H", "Student", { check: true }],
          ["Student I", "Student", { check: true }],
          ["Prof. Jury One", "Jury member", { check: true }],
          ["Prof. Jury Two", "Jury member", { check: true }],
          ["Prof. Jury Three", "Jury member", { check: false }],
          ["Prof. Supervisor Name", "Supervisor", { check: true }],
        ],
      },
    },
    {
      kind: "table",
      title: "Time used per party",
      table: {
        columns: ["Party", "Planned (min)", "Used (min)"],
        rows: [
          ["Student H", "10", { input: "11" }],
          ["Student I", "10", { input: "9" }],
          ["Jury questions", "15", { input: "17" }],
          ["Deliberation", "10", { input: "8" }],
        ],
      },
      caption: "Total planned 45 min, total used 45 min.",
    },
    {
      kind: "fields",
      title: "Student behaviour",
      fields: [
        { label: "Student H", kind: "textarea", placeholder: "Notes on conduct and participation" },
        { label: "Student I", kind: "textarea", placeholder: "Notes on conduct and participation" },
      ],
    },
    {
      kind: "actions",
      actions: [
        { label: "Save record", variant: "primary" },
        { label: "Continue to grading", href: routes.gradingSheet },
        { label: "Back", href: routes.professorDashboard },
      ],
    },
  ],
};
