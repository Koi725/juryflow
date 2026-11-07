export type LinkData = {
  label: string;
  href: string;
};

export type ActionData = {
  label: string;
  /** When missing the button is a non-functional placeholder. */
  href?: string;
  variant?: "primary" | "secondary";
};

export type FieldKind =
  | "text"
  | "password"
  | "textarea"
  | "select"
  | "date"
  | "time"
  | "number"
  | "file"
  | "checkbox";

export type FieldData = {
  label: string;
  kind: FieldKind;
  placeholder?: string;
  hint?: string;
  options?: string[];
  value?: string;
};

export type TableCell =
  | string
  | { tag: string }
  | { label: string; href: string }
  | { input: string }
  | { check: boolean };

export type TableData = {
  columns: string[];
  rows: TableCell[][];
};

export type TimelineItem = {
  label: string;
  detail?: string;
  state: "done" | "current" | "todo";
};

export type ChoiceOption = {
  label: string;
  hint?: string;
};

export type PlaceholderHeight = "sm" | "md" | "lg";

export type Section =
  | { kind: "fields"; title: string; fields: FieldData[]; columns?: 1 | 2 }
  | { kind: "table"; title: string; table: TableData; caption?: string; actions?: ActionData[] }
  | { kind: "timeline"; title: string; items: TimelineItem[] }
  | { kind: "list"; title: string; items: string[] }
  | { kind: "keyvalue"; title: string; pairs: [string, string][] }
  | { kind: "choice"; title: string; name: string; options: ChoiceOption[] }
  | { kind: "placeholder"; title: string; label: string; height?: PlaceholderHeight }
  | { kind: "note"; text: string }
  | { kind: "actions"; actions: ActionData[] }
  | { kind: "row"; sections: Section[] };

export type ScreenData = {
  title: string;
  subtitle?: string;
  sections: Section[];
};
