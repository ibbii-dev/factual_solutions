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
    fullName: "Kamran Qureshi",
    workEmail: "k.qureshi@novabiz.com.pk",
    companyName: "Nova Commercial Logistics",
    phone: "+92 300 551 2291",
    serviceOfInterest: "New Business Idea & Feasibility Modeling",
    message: "Seeking commercial model validation and ROI sensitivity projections for a cold-chain storage facility in Lahore.",
    date: "2026-08-25 16:45",
    status: "Contacted",
    priority: "Normal"
  }
];

const STORAGE_KEY = "factual_inquiries_db";

export function getInquiries(): Inquiry[] {
  if (typeof window === "undefined") return INITIAL_INQUIRIES;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_INQUIRIES));
    return INITIAL_INQUIRIES;
  }
  try {
    return JSON.parse(stored);
  } catch (err) {
    return INITIAL_INQUIRIES;
  }
}

export function saveInquiry(inquiry: Omit<Inquiry, "id" | "date" | "status" | "priority"> & { priority?: Inquiry["priority"] }): Inquiry {
  const current = getInquiries();
  const newId = `INQ-${new Date().getFullYear()}-${String(current.length + 1).padStart(3, "0")}`;
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const newEntry: Inquiry = {
    ...inquiry,
    companyName: inquiry.companyName || "",
    phone: inquiry.phone || "",
    id: newId,
    date: dateStr,
    status: "New",
    priority: inquiry.priority || "Normal"
  };

  const updated = [newEntry, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return newEntry;
}

export function updateInquiryStatus(id: string, status: Inquiry["status"]): Inquiry[] {
  const current = getInquiries();
  const updated = current.map((item) => (item.id === id ? { ...item, status } : item));
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function deleteInquiry(id: string): Inquiry[] {
  const current = getInquiries();
  const updated = current.filter((item) => item.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}
