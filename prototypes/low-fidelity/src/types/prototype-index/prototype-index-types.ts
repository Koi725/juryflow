export type ScreenEntry = {
  number: number;
  slug: string;
  title: string;
  audience: string;
  href: string;
  description: string;
};

export type PrototypeIndexData = {
  title: string;
  subtitle: string;
  columns: string[];
  screens: ScreenEntry[];
};
