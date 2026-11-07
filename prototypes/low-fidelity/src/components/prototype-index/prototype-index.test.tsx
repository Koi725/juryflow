import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PrototypeIndex } from "./prototype-index";
import { prototypeIndexData as data } from "@/data/prototype-index/prototype-index-data";
import { routes } from "@/data/routes/routes-data";
import { withoutTrailingSlash } from "@/test-utils/links";

describe("PrototypeIndex", () => {
  it("renders the title", () => {
    render(<PrototypeIndex />);

    expect(screen.getByRole("heading", { level: 1, name: data.title })).toBeInTheDocument();
  });

  it("links to every screen", () => {
    render(<PrototypeIndex />);

    for (const entry of data.screens) {
      expect(screen.getByRole("link", { name: entry.title })).toHaveAttribute("href", withoutTrailingSlash(entry.href));
    }
  });

  it("lists each route except the index itself", () => {
    const listed = data.screens.map((entry) => entry.href).sort();
    const expected = Object.values(routes).filter((href) => href !== routes.index).sort();

    expect(listed).toEqual(expected);
  });
});
