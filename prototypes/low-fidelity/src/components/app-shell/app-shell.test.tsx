import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppShell } from "./app-shell";
import { appShellData } from "@/data/app-shell/app-shell-data";
import { routes } from "@/data/routes/routes-data";
import { withoutTrailingSlash } from "@/test-utils/links";

vi.mock("next/navigation", () => ({ usePathname: () => "/student/project/" }));

describe("AppShell", () => {
  it("shows the student navigation and marks the current page", () => {
    render(
      <AppShell role="student">
        <p>content</p>
      </AppShell>,
    );

    expect(screen.getByText(appShellData.roleLabels.student)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Project" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute("href", withoutTrailingSlash(routes.studentDashboard));
    expect(screen.queryByRole("link", { name: "Editions" })).not.toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("shows the administration links to professors", () => {
    render(
      <AppShell role="professor">
        <p>content</p>
      </AppShell>,
    );

    expect(screen.getByRole("link", { name: "Editions" })).toHaveAttribute("href", withoutTrailingSlash(routes.editionAdmin));
  });
});
