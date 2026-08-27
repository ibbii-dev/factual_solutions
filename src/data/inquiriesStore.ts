export interface Inquiry {
  id: string;
  fullName: string;
  workEmail: string;
  companyName: string;
  phone: string;
  serviceOfInterest: string;
  message: string;
  date: string;
  status: "New" | "Contacted" | "In Progress" | "Closed";
  priority: "Normal" | "High" | "Urgent";
}

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: "INQ-2026-001",
    fullName: "Tariq Al-Mansoor",
    workEmail: "tariq@alnoorgroup.com",
    companyName: "Al-Noor Consumer Retail",
    phone: "+966 50 492 1180",
    serviceOfInterest: "Business Growth & Sales Optimization",
    message: "We operate 3 retail branches in Riyadh and are looking for advice on inventory budgeting and store-level financial modeling before opening 2 more stores next quarter.",
    date: "2026-08-26 14:30",
    status: "In Progress",
    priority: "High"
  },
  {
    id: "INQ-2026-002",
    fullName: "Bilal Farooq",
    workEmail: "bfarooq@apexpack.com",
    companyName: "Apex Industrial Packaging",
    phone: "+92 321 884 1029",
    serviceOfInterest: "Strategic Management Consulting",
    message: "We need an operational audit of our factory floor handovers and scrap rates. Looking for an advisory team to conduct a 4-week review.",
    date: "2026-08-26 11:15",
    status: "New",
    priority: "Urgent"
  },
  {
    id: "INQ-2026-003",
    fullName: "Kareem Hamdan",
    workEmail: "kareem@hamdan-holding.com",
    companyName: "Hamdan Brothers Enterprises",
    phone: "+971 50 319 4481",
    serviceOfInterest: "Team Structure & Operational Leadership",
    message: "Looking for assistance structuring job descriptions, reporting lines, and management KPIs across our trading and real estate divisions.",
    date: "2026-08-25 16:45",
    status: "Contacted",
    priority: "Normal"
  },
  {
    id: "INQ-2026-004",
    fullName: "Sara Qasim",
    workEmail: "sara@qasimlogistics.com",
    companyName: "Qasim Global Logistics",
    phone: "+92 345 889 2210",
    serviceOfInterest: "Global Business & Regional Expansion",
    message: "Requesting a callback regarding cross-border trade guidelines and finding commercial distributor partners in the GCC.",
    date: "2026-08-25 09:20",
    status: "New",
    priority: "High"
  }
];

export function getInquiries(): Inquiry[] {
  if (typeof window === "undefined") return INITIAL_INQUIRIES;
  const stored = localStorage.getItem("factual_inquiries");
  if (!stored) {
    localStorage.setItem("factual_inquiries", JSON.stringify(INITIAL_INQUIRIES));
    return INITIAL_INQUIRIES;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_INQUIRIES;
  }
}

export function saveInquiry(inquiry: Omit<Inquiry, "id" | "date" | "status" | "priority">): Inquiry {
  const existing = getInquiries();
  const newInq: Inquiry = {
    ...inquiry,
    id: `INQ-${new Date().getFullYear()}-${String(existing.length + 1).padStart(3, "0")}`,
    date: new Date().toISOString().replace("T", " ").substring(0, 16),
    status: "New",
    priority: "High"
  };
  const updated = [newInq, ...existing];
  if (typeof window !== "undefined") {
    localStorage.setItem("factual_inquiries", JSON.stringify(updated));
  }
  return newInq;
}

export function updateInquiryStatus(id: string, status: Inquiry["status"]): Inquiry[] {
  const existing = getInquiries();
  const updated = existing.map((item) => (item.id === id ? { ...item, status } : item));
  if (typeof window !== "undefined") {
    localStorage.setItem("factual_inquiries", JSON.stringify(updated));
  }
  return updated;
}

export function deleteInquiry(id: string): Inquiry[] {
  const existing = getInquiries();
  const updated = existing.filter((item) => item.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem("factual_inquiries", JSON.stringify(updated));
  }
  return updated;
}
