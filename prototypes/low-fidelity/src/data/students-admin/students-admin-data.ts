import type { StudentsAdminData } from "@/types/students-admin/students-admin-types";

export const studentsAdminData: StudentsAdminData = {
  title: "Students administration",
  subtitle: "Administrators only",
  sections: [
    {
      kind: "fields",
      title: "Find",
      fields: [{ label: "Search students", kind: "text", placeholder: "Name, number or email" }],
    },
    {
      kind: "table",
      title: "Registered students",
      table: {
        columns: ["Number", "Name", "Email", "Username", "Status"],
        rows: [
          ["000001", "Student A", "student.a@example.edu", "student.a", { tag: "Active" }],
          ["000002", "Student B", "student.b@example.edu", "student.b", { tag: "Active" }],
          ["000003", "Student C", "student.c@example.edu", "student.c", { tag: "Inactive" }],
        ],
      },
    },
    {
      kind: "fields",
      title: "Register a student",
      columns: 2,
      fields: [
        { label: "Student number", kind: "text" },
        { label: "Full name", kind: "text" },
        { label: "Email", kind: "text" },
        { label: "Username", kind: "text" },
        { label: "Initial password", kind: "password" },
      ],
    },
    { kind: "actions", actions: [{ label: "Register student", variant: "primary" }] },
    {
      kind: "fields",
      title: "Import from Excel",
      fields: [
        { label: "Excel file", kind: "file", placeholder: "Drop an .xlsx file here", hint: "Columns: number, name, email, username" },
      ],
    },
    {
      kind: "table",
      title: "Import preview",
      table: {
        columns: ["Row", "Number", "Name", "Email", "Result"],
        rows: [
          ["2", "000101", "Student X", "student.x@example.edu", { tag: "OK" }],
          ["3", "000102", "Student Y", "student.y@example.edu", { tag: "OK" }],
          ["4", "000001", "Student Z", "student.z@example.edu", { tag: "Error: number already registered" }],
          ["5", "000104", "Student W", "not-an-email", { tag: "Error: invalid email" }],
          ["6", "", "Student V", "student.v@example.edu", { tag: "Error: number is required" }],
        ],
      },
      caption: "5 rows read: 2 valid, 3 with errors. Only valid rows are imported.",
      actions: [{ label: "Import valid rows", variant: "primary" }, { label: "Cancel" }],
    },
  ],
};
