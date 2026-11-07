import { routes } from "@/data/routes/routes-data";
import type { ProjectDetailData } from "@/types/project-detail/project-detail-types";

export const projectDetailData: ProjectDetailData = {
  title: "Project detail",
  subtitle: "Smart campus occupancy monitor - 2025/2026",
  sections: [
    {
      kind: "row",
      sections: [
        {
          kind: "timeline",
          title: "Status",
          items: [
            { label: "Proposed", detail: "10 Jan", state: "done" },
            { label: "Under evaluation", detail: "12 Jan", state: "done" },
            { label: "Approved", detail: "20 Jan", state: "done" },
            { label: "Supervisor assigned", detail: "22 Jan", state: "done" },
            { label: "In progress", detail: "since 22 Jan", state: "current" },
            { label: "Final submitted", state: "todo" },
            { label: "Defence scheduled", state: "todo" },
            { label: "Defended", state: "todo" },
            { label: "Graded", state: "todo" },
            { label: "Closed", state: "todo" },
          ],
        },
        {
          kind: "keyvalue",
          title: "Summary",
          pairs: [
            ["Theme", "Smart campus occupancy monitor"],
            ["Edition", "Project course 2025/2026"],
            ["Supervisor", "Prof. Supervisor Name"],
            ["Group", "Student A, Student B, Student C"],
            ["Jury", "Not formed yet"],
          ],
        },
      ],
    },
    {
      kind: "table",
      title: "Deliverables",
      table: {
        columns: ["Milestone", "Deadline", "Submitted", "Supervisor", ""],
        rows: [
          ["Milestone 1", "01 Mar 2026", "28 Feb 2026", { tag: "Commented" }, { label: "View", href: routes.deliverableSubmission }],
          ["Milestone 2", "12 Apr 2026", "-", { tag: "Waiting" }, { label: "Submit", href: routes.deliverableSubmission }],
          ["Final submission", "31 May 2026", "-", "-", { label: "Open", href: routes.deliverableSubmission }],
        ],
      },
    },
    {
      kind: "table",
      title: "Action history",
      table: {
        columns: ["Date", "Who", "Action", "Change"],
        rows: [
          ["28 Feb 2026", "Student A", "Submitted Milestone 1", "-"],
          ["22 Jan 2026", "Admin", "Assigned supervisor", "Approved to Supervisor assigned"],
          ["20 Jan 2026", "Prof. Reviewer", "Approved proposal", "Under evaluation to Approved"],
          ["10 Jan 2026", "Student A", "Submitted proposal", "Proposed"],
        ],
      },
      caption: "Every action is kept in the audit history.",
    },
  ],
};
