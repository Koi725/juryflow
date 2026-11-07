import { routes } from "@/data/routes/routes-data";
import type { PrototypeIndexData } from "@/types/prototype-index/prototype-index-types";

export const prototypeIndexData: PrototypeIndexData = {
  title: "JuryFlow - low-fidelity prototype",
  subtitle: "Non-functional wireframes of the main screens. Pick a screen to open it.",
  columns: ["#", "Screen", "Audience", "Description"],
  screens: [
    { number: 1, slug: "login", title: "Login", audience: "Everyone", href: routes.login, description: "Sign in with a student / professor demo switch" },
    { number: 2, slug: "student-dashboard", title: "Student dashboard", audience: "Student", href: routes.studentDashboard, description: "Project summary, deadlines, notifications" },
    { number: 3, slug: "proposal-form", title: "Proposal form", audience: "Student", href: routes.proposalForm, description: "Group members, theme and summary" },
    { number: 4, slug: "project-detail", title: "Project detail", audience: "Student", href: routes.projectDetail, description: "Status timeline, action history, deliverables" },
    { number: 5, slug: "deliverable-submission", title: "Deliverable submission", audience: "Student", href: routes.deliverableSubmission, description: "Upload a milestone deliverable" },
    { number: 6, slug: "professor-dashboard", title: "Professor dashboard", audience: "Professor", href: routes.professorDashboard, description: "Pending proposals, supervised projects, juries" },
    { number: 7, slug: "proposal-review", title: "Proposal review", audience: "Professor", href: routes.proposalReview, description: "Approve, reject or request changes" },
    { number: 8, slug: "deliverable-review", title: "Supervisor review", audience: "Supervisor", href: routes.deliverableReview, description: "Acknowledge and comment on a deliverable" },
    { number: 9, slug: "edition-admin", title: "Edition admin", audience: "Admin", href: routes.editionAdmin, description: "Editions, milestones, deadlines, criteria" },
    { number: 10, slug: "students-admin", title: "Students admin", audience: "Admin", href: routes.studentsAdmin, description: "Student list, registration, Excel import preview" },
    { number: 11, slug: "defence-scheduling", title: "Defence scheduling", audience: "Professor", href: routes.defenceScheduling, description: "Schedule a defence and form the jury" },
    { number: 12, slug: "defence-session", title: "Defence session record", audience: "Jury", href: routes.defenceSession, description: "Participants, time per party, behaviour" },
    { number: 13, slug: "grading-sheet", title: "Jury grading sheet", audience: "Jury", href: routes.gradingSheet, description: "Scores per student, criterion and jury member" },
    { number: 14, slug: "minutes-preview", title: "Minutes preview", audience: "Jury", href: routes.minutesPreview, description: "Layout of the PDF with signature lines" },
  ],
};
