import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DefenceScheduling } from "./defence-scheduling";
import { defenceSchedulingData as data } from "@/data/defence-scheduling/defence-scheduling-data";
import type { Section } from "@/types/wireframe/wireframe-types";

function titledSections(sections: Section[]): string[] {
  return sections.flatMap((section) => {
    if (section.kind === "row") return titledSections(section.sections);
    return "title" in section ? [section.title] : [];
  });
}

describe("DefenceScheduling", () => {
  it("renders the screen title", () => {
    render(<DefenceScheduling />);

    expect(screen.getByRole("heading", { level: 1, name: data.title })).toBeInTheDocument();
  });

  it("renders every titled section", () => {
    render(<DefenceScheduling />);

    for (const title of titledSections(data.sections)) {
      expect(screen.getByRole("heading", { level: 2, name: title })).toBeInTheDocument();
    }
  });
});
