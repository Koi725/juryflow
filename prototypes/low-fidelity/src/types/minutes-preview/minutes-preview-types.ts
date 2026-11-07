import type { ActionData, TableData } from "@/types/wireframe/wireframe-types";

export type MinutesSection = {
  heading: string;
  body?: string;
  table?: TableData;
};

export type SignatureLine = {
  name: string;
  role: string;
};

export type MinutesPreviewData = {
  title: string;
  subtitle: string;
  paper: {
    institution: string;
    heading: string;
    meta: [string, string][];
    sections: MinutesSection[];
    signatureHeading: string;
    signatures: SignatureLine[];
    footer: string;
  };
  actions: ActionData[];
};
