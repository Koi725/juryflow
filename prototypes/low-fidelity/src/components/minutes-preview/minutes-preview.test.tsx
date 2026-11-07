import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MinutesPreview } from "./minutes-preview";
import { minutesPreviewData as data } from "@/data/minutes-preview/minutes-preview-data";

describe("MinutesPreview", () => {
  it("renders the screen title and the document heading", () => {
    render(<MinutesPreview />);

    expect(screen.getByRole("heading", { level: 1, name: data.title })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: data.paper.heading })).toBeInTheDocument();
  });

  it("renders every section of the minutes", () => {
    render(<MinutesPreview />);

    for (const section of data.paper.sections) {
      expect(screen.getByRole("heading", { level: 3, name: section.heading })).toBeInTheDocument();
    }
  });

  it("renders a signature line for each jury member", () => {
    render(<MinutesPreview />);

    for (const signature of data.paper.signatures) {
      expect(screen.getAllByText(signature.name).length).toBeGreaterThan(0);
    }
  });
});
