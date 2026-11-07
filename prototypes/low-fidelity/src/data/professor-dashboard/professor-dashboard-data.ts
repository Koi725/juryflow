import { routes } from "@/data/routes/routes-data";
import type { ProfessorDashboardData } from "@/types/professor-dashboard/professor-dashboard-types";

export const professorDashboardData: ProfessorDashboardData = {
  title: "Professor dashboard",
  subtitle: "Project course - 2025/2026",
  sections: [
    {
      kind: "table",
      title: "Pending proposals",
      table: {
        columns: ["Theme", "Group", "Submitted", ""],
        rows: [
          ["Smart campus occupancy monitor", "Student A, B, C", "10 Jan 2026", { label: "Review", href: routes.proposalReview }],
          ["Library seat booking app", "Student D, E", "11 Jan 2026", { label: "Review", href: routes.proposalReview }],
        ],
      },
    },
    {
      kind: "table",
      title: "Supervised projects",
      table: {
        columns: ["Theme", "Status", "Waiting for you", ""],
        rows: [
          ["Campus energy dashboard", { tag: "In progress" }, "Milestone 2 review", { label: "Review", href: routes.deliverableReview }],
          ["Lab inventory tracker", { tag: "Final submitted" }, "Schedule defence", { label: "Schedule", href: routes.defenceScheduling }],
        ],
      },
    },
    {
      kind: "table",
      title: "My juries",
      table: {
        columns: ["Project", "Date", "My role", ""],
        rows: [
          ["Lab inventory tracker", "18 Jun 2026, 10:00", "Jury member", { label: "Open session", href: routes.defenceSession }],
          ["Parking guidance system", "18 Jun 2026, 14:00", "Jury member", { label: "Grade", href: routes.gradingSheet }],
        ],
      },
    },
  ],
};
