import { routes } from "@/data/routes/routes-data";
import type { ShellData } from "@/types/app-shell/app-shell-types";

const adminGroup = {
  title: "Administration",
  links: [
    { label: "Editions", href: routes.editionAdmin },
    { label: "Students", href: routes.studentsAdmin },
  ],
};

export const appShellData: ShellData = {
  appName: "JuryFlow",
  tagline: "Low-fidelity prototype - not functional",
  allScreensLink: { label: "All screens", href: routes.index },
  signOutLink: { label: "Sign out", href: routes.login },
  roleLabels: {
    student: "Student view",
    professor: "Professor view (admin)",
  },
  navigation: {
    student: [
      {
        title: "My project",
        links: [
          { label: "Dashboard", href: routes.studentDashboard },
          { label: "Proposal", href: routes.proposalForm },
          { label: "Project", href: routes.projectDetail },
          { label: "Submit deliverable", href: routes.deliverableSubmission },
        ],
      },
    ],
    professor: [
      {
        title: "Projects",
        links: [
          { label: "Dashboard", href: routes.professorDashboard },
          { label: "Proposal review", href: routes.proposalReview },
          { label: "Deliverable review", href: routes.deliverableReview },
        ],
      },
      {
        title: "Defences",
        links: [
          { label: "Scheduling and jury", href: routes.defenceScheduling },
          { label: "Session record", href: routes.defenceSession },
          { label: "Grading sheet", href: routes.gradingSheet },
          { label: "Minutes", href: routes.minutesPreview },
        ],
      },
      adminGroup,
    ],
  },
};
