import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProposalReview } from "./proposal-review";
import { proposalReviewData as data } from "@/data/proposal-review/proposal-review-data";
import type { Section } from "@/types/wireframe/wireframe-types";

function titledSections(sections: Section[]): string[] {
  return sections.flatMap((section) => {
    if (section.kind === "row") return titledSections(section.sections);
    return "title" in section ? [section.title] : [];
  });
}

describe("ProposalReview", () => {
  it("renders the screen title", () => {
    render(<ProposalReview />);

    expect(screen.getByRole("heading", { level: 1, name: data.title })).toBeInTheDocument();
  });

  it("renders every titled section", () => {
    render(<ProposalReview />);

    for (const title of titledSections(data.sections)) {
      expect(screen.getByRole("heading", { level: 2, name: title })).toBeInTheDocument();
    }
  });
});
