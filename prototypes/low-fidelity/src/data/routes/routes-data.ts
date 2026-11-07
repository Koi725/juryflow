import type { Routes } from "@/types/routes/routes-types";

export const routes: Routes = {
  index: "/",
  login: "/login/",
  studentDashboard: "/student/",
  proposalForm: "/student/proposal/",
  projectDetail: "/student/project/",
  deliverableSubmission: "/student/project/deliverable/",
  professorDashboard: "/professor/",
  proposalReview: "/professor/proposal-review/",
  deliverableReview: "/professor/deliverable-review/",
  editionAdmin: "/admin/editions/",
  studentsAdmin: "/admin/students/",
  defenceScheduling: "/professor/defence-scheduling/",
  defenceSession: "/professor/defence-session/",
  gradingSheet: "/professor/grading/",
  minutesPreview: "/professor/minutes/",
};
