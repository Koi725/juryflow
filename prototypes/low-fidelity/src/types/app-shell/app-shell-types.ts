import type { LinkData } from "@/types/wireframe/wireframe-types";

export type ShellRole = "student" | "professor";

export type NavGroup = {
  title: string;
  links: LinkData[];
};

export type ShellData = {
  appName: string;
  tagline: string;
  allScreensLink: LinkData;
  signOutLink: LinkData;
  roleLabels: Record<ShellRole, string>;
  navigation: Record<ShellRole, NavGroup[]>;
};
