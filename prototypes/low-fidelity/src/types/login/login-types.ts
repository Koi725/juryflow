import type { FieldData } from "@/types/wireframe/wireframe-types";

export type DemoRole = "student" | "professor";

export type LoginData = {
  title: string;
  subtitle: string;
  switchLabel: string;
  roles: { key: DemoRole; label: string; destination: string }[];
  fields: FieldData[];
  submitLabel: string;
  note: string;
};
