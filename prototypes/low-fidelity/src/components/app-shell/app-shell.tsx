"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appShellData } from "@/data/app-shell/app-shell-data";
import type { ShellRole } from "@/types/app-shell/app-shell-types";

export function AppShell({ role, children }: { role: ShellRole; children: React.ReactNode }) {
  const pathname = usePathname();
  const current = pathname.replace(/\/$/, "");
  const { appName, tagline, allScreensLink, signOutLink, roleLabels, navigation } = appShellData;

  const isCurrent = (href: string) => href.replace(/\/$/, "") === current;

  return (
    <div className="shell">
      <header className="shell__header">
        <div className="shell__brand">
          <strong>{appName}</strong>
          <span className="shell__tagline">{tagline}</span>
        </div>
        <div className="shell__user">
          <span className="wf-tag">{roleLabels[role]}</span>
          <Link href={allScreensLink.href} className="wf-link">
            {allScreensLink.label}
          </Link>
          <Link href={signOutLink.href} className="wf-link">
            {signOutLink.label}
          </Link>
        </div>
      </header>
      <div className="shell__body">
        <nav className="shell__nav" aria-label="Main">
          {navigation[role].map((group) => (
            <div key={group.title} className="shell__group">
              <h2 className="shell__group-title">{group.title}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={isCurrent(link.href) ? "shell__link shell__link--active" : "shell__link"}
                      aria-current={isCurrent(link.href) ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <main className="shell__main">{children}</main>
      </div>
    </div>
  );
}
