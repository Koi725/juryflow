import { routes } from "@/data/routes/routes-data";
import type { StudentDashboardData } from "@/types/student-dashboard/student-dashboard-types";

export const studentDashboardData: StudentDashboardData = {
  title: "Student dashboard",
  subtitle: "Project course - 2025/2026",
  sections: [
    {
      kind: "row",
      sections: [
        {
          kind: "keyvalue",
          title: "My project",
          pairs: [
            ["Theme", "Smart campus occupancy monitor"],
            ["Status", "In progress"],
            ["Supervisor", "Prof. Supervisor Name"],
            ["Group", "Student A, Student B, Student C"],
            ["Next deadline", "Milestone 2 - 12 Apr 2026"],
          ],
        },
        {
          kind: "list",
          title: "Notifications",
          items: [
            "Supervisor commented on Milestone 1",
            "Milestone 2 is due in 9 days",
            "Defence dates will be announced after the final submission",
          ],
        },
      ],
    },
    {
      kind: "table",
      title: "Milestones and deadlines",
      table: {
        columns: ["Milestone", "Type", "Deadline", "Status", ""],
        rows: [
          ["Milestone 1", "Intermediate", "01 Mar 2026", { tag: "Reviewed" }, { label: "Open", href: routes.projectDetail }],
          ["Milestone 2", "Intermediate", "12 Apr 2026", { tag: "Open" }, { label: "Submit", href: routes.deliverableSubmission }],
          ["Final submission", "Final", "31 May 2026", { tag: "Not started" }, { label: "Open", href: routes.deliverableSubmission }],
        ],
      },
    },
    {
      kind: "actions",
      actions: [
        { label: "Open project", href: routes.projectDetail, variant: "primary" },
        { label: "New proposal", href: routes.proposalForm },
      ],
    },
  ],
};
