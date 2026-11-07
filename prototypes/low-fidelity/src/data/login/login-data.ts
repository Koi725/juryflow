import { routes } from "@/data/routes/routes-data";
import type { LoginData } from "@/types/login/login-types";

export const loginData: LoginData = {
  title: "JuryFlow",
  subtitle: "Project workflow and jury management",
  switchLabel: "Demo: sign in as",
  roles: [
    { key: "student", label: "Student", destination: routes.studentDashboard },
    { key: "professor", label: "Professor", destination: routes.professorDashboard },
  ],
  fields: [
    { label: "Username", kind: "text", placeholder: "username" },
    { label: "Password", kind: "password", placeholder: "password" },
  ],
  submitLabel: "Sign in",
  note: "Prototype only: no authentication happens. The demo switch decides which dashboard opens.",
};
