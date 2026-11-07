import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Login } from "./login";
import { loginData as data } from "@/data/login/login-data";
import { withoutTrailingSlash } from "@/test-utils/links";

const [student, professor] = data.roles;

describe("Login", () => {
  it("renders the title and the credential fields", () => {
    render(<Login />);

    expect(screen.getByRole("heading", { level: 1, name: data.title })).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("opens the student dashboard by default", () => {
    render(<Login />);

    expect(screen.getByRole("link", { name: data.submitLabel })).toHaveAttribute("href", withoutTrailingSlash(student.destination));
  });

  it("opens the professor dashboard after switching the demo role", async () => {
    render(<Login />);

    await userEvent.click(screen.getByRole("button", { name: professor.label }));

    expect(screen.getByRole("link", { name: data.submitLabel })).toHaveAttribute("href", withoutTrailingSlash(professor.destination));
    expect(screen.getByRole("button", { name: professor.label })).toHaveAttribute("aria-pressed", "true");
  });
});
