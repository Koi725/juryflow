import { routes } from "@/data/routes/routes-data";
import type { GradingSheetData } from "@/types/grading-sheet/grading-sheet-types";

/** Sample criteria of the 2025/2026 edition: name and weight in percent. Scale 0 - 20. */
export const criteria = [
  { name: "Report quality", weight: 30 },
  { name: "Technical solution", weight: 30 },
  { name: "Presentation", weight: 20 },
  { name: "Answers to questions", weight: 20 },
];

export const students = ["Student H", "Student I"];
export const juryMembers = ["Prof. Jury One (you)", "Prof. Jury Two", "Prof. Jury Three"];

/** scores[member][student][criterion] */
export const scores: number[][][] = [
  [
    [16, 15, 14, 15],
    [13, 14, 15, 12],
  ],
  [
    [15, 14, 16, 14],
    [14, 13, 14, 13],
  ],
  [
    [17, 16, 15, 16],
    [12, 13, 14, 13],
  ],
];

const totalWeight = criteria.reduce((sum, criterion) => sum + criterion.weight, 0);

/** Weighted average of one jury member's scores for one student. */
export function memberGrade(memberScores: number[]): number {
  const weighted = memberScores.reduce((sum, score, index) => sum + score * criteria[index].weight, 0);
  return weighted / totalWeight;
}

/** Final grade of a student: average of the jury members' weighted averages. */
export function finalGrade(studentIndex: number): number {
  const grades = scores.map((member) => memberGrade(member[studentIndex]));
  return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
}

const format = (value: number) => value.toFixed(1);

export const finalGrades = students.map((name, index) => ({ name, grade: format(finalGrade(index)) }));

export const gradingSheetData: GradingSheetData = {
  title: "Jury grading sheet",
  subtitle: "Lab inventory tracker - 18 Jun 2026",
  context: [
    ["Edition", "Project course 2025/2026"],
    ["Scale", "0 - 20"],
    ["You are grading as", juryMembers[0]],
  ],
  scoreSheetTitle: "My scores",
  scoreSheet: {
    columns: ["Criterion", "Weight (%)", ...students],
    rows: [
      ...criteria.map((criterion, criterionIndex) => [
        criterion.name,
        String(criterion.weight),
        ...students.map((_, studentIndex) => ({ input: String(scores[0][studentIndex][criterionIndex]) })),
      ]),
      [
        "My weighted average",
        String(totalWeight),
        ...students.map((_, studentIndex) => format(memberGrade(scores[0][studentIndex]))),
      ],
    ],
  },
  summaryTitle: "All jury members and final grade",
  summary: {
    columns: ["Student", ...juryMembers, "Final grade"],
    rows: students.map((name, studentIndex) => [
      name,
      ...scores.map((member) => format(memberGrade(member[studentIndex]))),
      format(finalGrade(studentIndex)),
    ]),
  },
  formulaNote:
    "Formula of this edition: each jury member's weighted average per student, then the average across jury members. Other members' scores are shown only after they submit.",
  actions: [
    { label: "Save draft" },
    { label: "Submit my scores", variant: "primary" },
    { label: "Preview minutes", href: routes.minutesPreview },
  ],
};
