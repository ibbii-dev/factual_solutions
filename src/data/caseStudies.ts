// Case studies shown on /case-studies. Add real client stories here (anonymised if needed);
// the page shows a "coming soon" message while this list is empty. Never invent results.

export type CaseStudy = {
  /** Used in the address later, e.g. "textile-lead-time" */
  slug: string;
  title: string;
  /** Sector, from the industries list, e.g. "Textiles & Apparel" */
  industry: string;
  /** "consulting" | "training" | "digital" */
  serviceLine: "consulting" | "training" | "digital";
  challenge: string;
  approach: string;
  /** Measured outcomes the client has agreed to share. */
  results: string[];
};

export const caseStudies: CaseStudy[] = [];
