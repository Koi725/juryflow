import { routes } from "@/data/routes/routes-data";
import type { ProposalFormData } from "@/types/proposal-form/proposal-form-types";

export const proposalFormData: ProposalFormData = {
  title: "Project proposal",
  subtitle: "Project course - 2025/2026 - one proposal per group",
  sections: [
    {
      kind: "fields",
      title: "Project",
      fields: [
        { label: "Theme", kind: "text", placeholder: "Short title of the project" },
        { label: "Summary", kind: "textarea", placeholder: "Goals, scope and expected result (max 1500 characters)" },
      ],
    },
    {
      kind: "table",
      title: "Group members",
      table: {
        columns: ["#", "Student number", "Name", "Contact"],
        rows: [
          ["1", "(you) 000001", "Student A", "student.a@example.edu"],
          ["2", "(search)", "(select a registered student)", ""],
          ["3", "(search)", "(select a registered student)", ""],
        ],
      },
      caption: "Only students registered in this edition can be added.",
      actions: [{ label: "Add member" }],
    },
    { kind: "note", text: "After submission the proposal is evaluated by the professors. You will be notified of the decision." },
    {
      kind: "actions",
      actions: [
        { label: "Submit proposal", href: routes.studentDashboard, variant: "primary" },
        { label: "Save draft" },
        { label: "Cancel", href: routes.studentDashboard },
      ],
    },
  ],
};
