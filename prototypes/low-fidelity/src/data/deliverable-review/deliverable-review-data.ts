import { routes } from "@/data/routes/routes-data";
import type { DeliverableReviewData } from "@/types/deliverable-review/deliverable-review-types";

export const deliverableReviewData: DeliverableReviewData = {
  title: "Deliverable review",
  subtitle: "Campus energy dashboard - Milestone 2",
  sections: [
    {
      kind: "row",
      sections: [
        {
          kind: "keyvalue",
          title: "Submission",
          pairs: [
            ["Group", "Student F, Student G"],
            ["Milestone", "Milestone 2"],
            ["Deadline", "12 Apr 2026"],
            ["Submitted", "11 Apr 2026, 21:40 (on time)"],
            ["File", "milestone-2.pdf (3.2 MB)"],
          ],
        },
        { kind: "placeholder", title: "Document preview", label: "Embedded preview of the submitted file", height: "md" },
      ],
    },
    {
      kind: "list",
      title: "Notes from the students",
      items: ["Added the data model and the first prototype of the API."],
    },
    {
      kind: "table",
      title: "Earlier comments",
      table: {
        columns: ["Date", "Milestone", "Comment"],
        rows: [["05 Mar 2026", "Milestone 1", "Please detail the data model."]],
      },
    },
    {
      kind: "fields",
      title: "Your feedback",
      fields: [{ label: "Comment", kind: "textarea", placeholder: "Feedback shown to the group" }],
    },
    {
      kind: "actions",
      actions: [
        { label: "Acknowledge", href: routes.professorDashboard, variant: "primary" },
        { label: "Send comment", href: routes.professorDashboard },
        { label: "Back", href: routes.professorDashboard },
      ],
    },
  ],
};
