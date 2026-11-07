import type { EditionAdminData } from "@/types/edition-admin/edition-admin-types";

export const editionAdminData: EditionAdminData = {
  title: "Edition administration",
  subtitle: "Administrators only - editions are isolated from each other",
  sections: [
    {
      kind: "table",
      title: "Editions",
      table: {
        columns: ["Course", "Academic year", "Projects", "State", ""],
        rows: [
          ["Project course", "2025/2026", "14", { tag: "Active" }, { label: "Manage", href: "#" }],
          ["Project course", "2024/2025", "12", { tag: "Closed" }, { label: "Compare", href: "#" }],
        ],
      },
      actions: [{ label: "New edition" }],
    },
    {
      kind: "fields",
      title: "New edition",
      columns: 2,
      fields: [
        { label: "Course", kind: "select", options: ["Project course", "Add a course..."] },
        { label: "Academic year", kind: "text", placeholder: "2026/2027" },
      ],
    },
    {
      kind: "table",
      title: "Milestones and deadlines - 2025/2026",
      table: {
        columns: ["Milestone", "Type", "Deadline", ""],
        rows: [
          ["Milestone 1", "Intermediate", "01 Mar 2026, 23:59", "Edit"],
          ["Milestone 2", "Intermediate", "12 Apr 2026, 23:59", "Edit"],
          ["Final submission", "Final (enforced)", "31 May 2026, 23:59", "Edit"],
        ],
      },
      actions: [{ label: "Add milestone" }],
    },
    {
      kind: "table",
      title: "Assessment criteria - 2025/2026",
      table: {
        columns: ["Criterion", "Weight (%)", "Scale", ""],
        rows: [
          ["Report quality", "30", "0 - 20", "Edit"],
          ["Technical solution", "30", "0 - 20", "Edit"],
          ["Presentation", "20", "0 - 20", "Edit"],
          ["Answers to questions", "20", "0 - 20", "Edit"],
          ["Total", "100", "", ""],
        ],
      },
      caption: "Weights must add up to 100. Grade formula: weighted average per jury member, then the average across jury members.",
      actions: [{ label: "Add criterion" }, { label: "Save criteria", variant: "primary" }],
    },
  ],
};
