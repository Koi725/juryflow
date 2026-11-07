import { routes } from "@/data/routes/routes-data";
import type { DefenceSchedulingData } from "@/types/defence-scheduling/defence-scheduling-types";

export const defenceSchedulingData: DefenceSchedulingData = {
  title: "Defence scheduling and jury",
  subtitle: "Project course - 2025/2026",
  sections: [
    {
      kind: "table",
      title: "Projects ready for defence",
      table: {
        columns: ["Project", "Supervisor", "Final submitted", "Defence"],
        rows: [
          ["Lab inventory tracker", "Prof. Supervisor Name", "30 May 2026", { tag: "Not scheduled" }],
          ["Parking guidance system", "Prof. Another Name", "31 May 2026", { tag: "18 Jun 14:00" }],
        ],
      },
    },
    {
      kind: "row",
      sections: [
        {
          kind: "fields",
          title: "Schedule - Lab inventory tracker",
          fields: [
            { label: "Date", kind: "date" },
            { label: "Start time", kind: "time" },
            { label: "Room", kind: "text", placeholder: "Room or online link" },
            { label: "Planned duration (min)", kind: "number", placeholder: "45" },
          ],
        },
        {
          kind: "fields",
          title: "Jury (about 3 members)",
          fields: [
            { label: "Jury member 1", kind: "select", options: ["Select a professor", "Prof. Supervisor Name", "Prof. Another Name"] },
            { label: "Jury member 2", kind: "select", options: ["Select a professor", "Prof. Supervisor Name", "Prof. Another Name"] },
            { label: "Jury member 3", kind: "select", options: ["Select a professor", "Prof. Supervisor Name", "Prof. Another Name"] },
          ],
        },
      ],
    },
    { kind: "placeholder", title: "Schedule overview", label: "Calendar of all defences, jury conflicts highlighted", height: "md" },
    {
      kind: "actions",
      actions: [
        { label: "Save schedule and jury", href: routes.professorDashboard, variant: "primary" },
        { label: "Cancel", href: routes.professorDashboard },
      ],
    },
  ],
};
