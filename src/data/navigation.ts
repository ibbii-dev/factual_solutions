import { contactDetails } from "@/data/companyData";

// Site navigation, shared by the header, the phone menu and the footer.

export type ServiceLine = {
  id: "consulting" | "training" | "digital";
  title: string;
  href: string;
  description: string;
  /** Which logo piece marks this line (decoration only). */
  piece: "navy" | "sky" | "brick";
};

export const serviceLines: ServiceLine[] = [
  {
    id: "consulting",
    title: "Consulting",
    href: "/services/consulting",
    description: "Operational excellence, strategy, quality and Lean Six Sigma improvement projects.",
    piece: "navy",
  },
  {
    id: "training",
    title: "Training",
    href: "/services/training",
    description: "Practical courses taught by practitioners and tailored to your teams.",
    piece: "sky",
  },
  {
    id: "digital",
    title: "ERP & Digital",
    href: "/services/digital",
    description: "ERPNext implementation, custom software, dashboards and integrations.",
    piece: "brick",
  },
];

export const mainNav = [
  { label: "Insights", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const bookingHref = "/contact";

export const contactLinks = {
  phone: contactDetails.phone,
  phoneHref: `tel:${contactDetails.phone.replace(/\s/g, "")}`,
  email: contactDetails.email,
  emailHref: `mailto:${contactDetails.email}`,
  whatsappHref: `https://wa.me/${contactDetails.whatsappRaw}`,
  hours: "Mon–Fri, 9:00–18:00 PKT",
  city: "Lahore, Pakistan",
};
