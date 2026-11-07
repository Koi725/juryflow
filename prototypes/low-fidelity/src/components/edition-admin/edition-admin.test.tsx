import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EditionAdmin } from "./edition-admin";
import { editionAdminData as data } from "@/data/edition-admin/edition-admin-data";
import type { Section } from "@/types/wireframe/wireframe-types";

function titledSections(sections: Section[]): string[] {
  return sections.flatMap((section) => {
    if (section.kind === "row") return titledSections(section.sections);
    return "title" in section ? [section.title] : [];
  });
}

describe("EditionAdmin", () => {
  it("renders the screen title", () => {
    render(<EditionAdmin />);

    expect(screen.getByRole("heading", { level: 1, name: data.title })).toBeInTheDocument();
  });

  it("renders every titled section", () => {
    render(<EditionAdmin />);

    for (const title of titledSections(data.sections)) {
      expect(screen.getByRole("heading", { level: 2, name: title })).toBeInTheDocument();
    }
  });
});
