import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Screen } from "./wireframe";
import type { ScreenData } from "@/types/wireframe/wireframe-types";
import { withoutTrailingSlash } from "@/test-utils/links";

const sample: ScreenData = {
  title: "Sample screen",
  subtitle: "Sample subtitle",
  sections: [
    { kind: "fields", title: "Fields", fields: [{ label: "Name", kind: "text" }] },
    { kind: "table", title: "Table", table: { columns: ["A"], rows: [[{ tag: "Tag" }]] } },
    { kind: "timeline", title: "Timeline", items: [{ label: "Step", state: "current" }] },
    { kind: "choice", title: "Choice", name: "c", options: [{ label: "One" }] },
    { kind: "actions", actions: [{ label: "Go", href: "/x/", variant: "primary" }, { label: "Stay" }] },
  ],
};

describe("Screen", () => {
  it("renders the title and every section kind", () => {
    render(<Screen data={sample} />);

    expect(screen.getByRole("heading", { level: 1, name: "Sample screen" })).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByText("Tag")).toBeInTheDocument();
    expect(screen.getByText("Step")).toBeInTheDocument();
    expect(screen.getByLabelText(/One/)).toBeInTheDocument();
  });

  it("renders actions with a href as links and others as buttons", () => {
    render(<Screen data={sample} />);

    expect(screen.getByRole("link", { name: "Go" })).toHaveAttribute("href", withoutTrailingSlash("/x/"));
    expect(screen.getByRole("button", { name: "Stay" })).toBeInTheDocument();
  });
});
