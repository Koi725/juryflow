import { routes } from "@/data/routes/routes-data";
import type { ProposalReviewData } from "@/types/proposal-review/proposal-review-types";

export const proposalReviewData: ProposalReviewData = {
  title: "Proposal review",
  subtitle: "Smart campus occupancy monitor - submitted 10 Jan 2026",
  sections: [
    {
      kind: "row",
      sections: [
        {
          kind: "keyvalue",
          title: "Proposal",
          pairs: [
            ["Theme", "Smart campus occupancy monitor"],
            ["Group", "Student A, Student B, Student C"],
            ["Edition", "Project course 2025/2026"],
          ],
        },
        { kind: "placeholder", title: "Summary", label: "Summary text written by the students", height: "sm" },
      ],
    },
    {
      kind: "table",
      title: "Previous decisions",
      table: {
        columns: ["Date", "Reviewer", "Decision", "Comment"],
        rows: [["-", "-", "-", "First submission"]],
      },
    },
    {
      kind: "choice",
      title: "Decision",
      name: "decision",
      options: [
        { label: "Approve", hint: "A supervisor is assigned next" },
        { label: "Reject", hint: "The proposal is closed" },
        { label: "Request changes", hint: "The group edits and resubmits" },
      ],
    },
    {
      kind: "fields",
      title: "Comment and supervisor",
      fields: [
        { label: "Comment", kind: "textarea", placeholder: "Visible to the group" },
        { label: "Supervisor (when approving)", kind: "select", options: ["Select a professor", "Prof. Supervisor Name", "Prof. Another Name"] },
      ],
    },
    {
      kind: "actions",
      actions: [
        { label: "Submit decision", href: routes.professorDashboard, variant: "primary" },
        { label: "Cancel", href: routes.professorDashboard },
      ],
    },
  ],
};
