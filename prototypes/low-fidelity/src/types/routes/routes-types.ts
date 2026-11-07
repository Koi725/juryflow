export type RouteKey =
  | "index"
  | "login"
  | "studentDashboard"
  | "proposalForm"
  | "projectDetail"
  | "deliverableSubmission"
  | "professorDashboard"
  | "proposalReview"
  | "deliverableReview"
  | "editionAdmin"
  | "studentsAdmin"
  | "defenceScheduling"
  | "defenceSession"
  | "gradingSheet"
  | "minutesPreview";

export type Routes = Record<RouteKey, string>;
