import type { ActionData, TableData } from "@/types/wireframe/wireframe-types";

export type GradingSheetData = {
  title: string;
  subtitle: string;
  context: [string, string][];
  scoreSheetTitle: string;
  scoreSheet: TableData;
  summaryTitle: string;
  summary: TableData;
  formulaNote: string;
  actions: ActionData[];
};
