import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GradingSheet } from "./grading-sheet";
import { finalGrade, finalGrades, gradingSheetData as data, memberGrade, scores } from "@/data/grading-sheet/grading-sheet-data";

describe("GradingSheet", () => {
  it("renders the title and both tables", () => {
    render(<GradingSheet />);

    expect(screen.getByRole("heading", { level: 1, name: data.title })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: data.scoreSheetTitle })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: data.summaryTitle })).toBeInTheDocument();
  });

  it("shows one score input per student and criterion", () => {
    render(<GradingSheet />);

    const expected = scores[0].length * scores[0][0].length;
    expect(screen.getAllByLabelText("score")).toHaveLength(expected);
  });

  it("shows the final grade of each student", () => {
    render(<GradingSheet />);

    for (const { grade } of finalGrades) {
      expect(screen.getAllByText(grade).length).toBeGreaterThan(0);
    }
  });
});

describe("grading sample data", () => {
  it("weights criteria within a jury member", () => {
    // 16*30 + 15*30 + 14*20 + 15*20 = 1510 -> 15.1
    expect(memberGrade(scores[0][0])).toBeCloseTo(15.1, 5);
  });

  it("averages the jury members for the final grade", () => {
    const members = scores.map((member) => memberGrade(member[0]));
    const mean = members.reduce((a, b) => a + b, 0) / members.length;
    expect(finalGrade(0)).toBeCloseTo(mean, 10);
  });
});
