import { routes } from "@/data/routes/routes-data";
import type { DeliverableSubmissionData } from "@/types/deliverable-submission/deliverable-submission-types";

export const deliverableSubmissionData: DeliverableSubmissionData = {
  title: "Submit deliverable",
  subtitle: "Milestone 2 - Smart campus occupancy monitor",
  sections: [
    {
      kind: "row",
      sections: [
        {
          kind: "keyvalue",
          title: "Milestone",
          pairs: [
            ["Name", "Milestone 2"],
            ["Type", "Intermediate"],
            ["Deadline", "12 Apr 2026, 23:59"],
            ["Time left", "9 days"],
          ],
        },
        {
          kind: "list",
          title: "Supervisor comments so far",
          items: [
            "Milestone 1: please detail the data model.",
            "Milestone 1: sensor choice is well justified.",
          ],
        },
      ],
    },
    {
      kind: "fields",
      title: "Your submission",
      fields: [
        { label: "Files", kind: "file", placeholder: "Drop files here or click to browse", hint: "PDF or ZIP, up to 25 MB" },
        { label: "Notes for the supervisor", kind: "textarea", placeholder: "What changed since the last milestone?" },
      ],
    },
    { kind: "note", text: "The final submission is refused after its deadline. Intermediate deliverables can be replaced until reviewed." },
    {
      kind: "actions",
      actions: [
        { label: "Submit deliverable", href: routes.projectDetail, variant: "primary" },
        { label: "Cancel", href: routes.projectDetail },
      ],
    },
    {
      kind: "table",
      title: "Previous submissions",
      table: {
        columns: ["Milestone", "Date", "File", "State"],
        rows: [["Milestone 1", "28 Feb 2026", "milestone-1.pdf", { tag: "Reviewed" }]],
      },
    },
  ],
};
