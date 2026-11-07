import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StudentDashboard } from "./student-dashboard";
import { studentDashboardData as data } from "@/data/student-dashboard/student-dashboard-data";
import type { Section } from "@/types/wireframe/wireframe-types";

function titledSections(sections: Section[]): string[] {
  return sections.flatMap((section) => {
    if (section.kind === "row") return titledSections(section.sections);
    return "title" in section ? [section.title] : [];
  });
}

describe("StudentDashboard", () => {
  it("renders the screen title", () => {
    render(<StudentDashboard />);

    expect(screen.getByRole("heading", { level: 1, name: data.title })).toBeInTheDocument();
  });

  it("renders every titled section", () => {
    render(<StudentDashboard />);

    for (const title of titledSections(data.sections)) {
      expect(screen.getByRole("heading", { level: 2, name: title })).toBeInTheDocument();
    }
  });
});
