// Blog taxonomy aligned with the Factual Solutions service lines.
// Keeping categories few and broad (with tags for detail) follows common
// blogging guidance: categories group the archive, tags describe specifics.
export const BLOG_CATEGORIES = [
  "Operational Excellence",
  "Strategy & Performance",
  "Lean Six Sigma",
  "Quality & Risk",
  "ERP & Digital Transformation",
  "People & Change",
  "Training & Capability",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const BLOG_CATEGORY_AR: Record<string, string> = {
  All: "الكل",
  "Operational Excellence": "التميز التشغيلي",
  "Strategy & Performance": "الاستراتيجية والأداء",
  "Lean Six Sigma": "لين ستة سيجما",
  "Quality & Risk": "الجودة والمخاطر",
  "ERP & Digital Transformation": "ERP والتحول الرقمي",
  "People & Change": "الأفراد والتغيير",
  "Training & Capability": "التدريب وبناء القدرات",
};

export function categoryLabel(cat: string, lang: string) {
  return lang === "ar" ? BLOG_CATEGORY_AR[cat] || cat : cat;
}

export const DEFAULT_BLOG_CATEGORY: BlogCategory = "Operational Excellence";

export const DEFAULT_BLOG_AUTHOR = {
  name: "Qadeer Bhatti",
  role: "Lead Consultant & Trainer",
  avatar: "/images/qadeer-ahmad-bhatti.jpg",
};

export const DEFAULT_BLOG_COVER = "/images/consulting-meeting.webp";

export function calculateReadTime(content: string): string {
  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}
