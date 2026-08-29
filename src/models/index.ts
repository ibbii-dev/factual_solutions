export interface IInquiry {
  _id?: string;
  id: string;
  fullName: string;
  workEmail: string;
  companyName: string;
  phone: string;
  serviceOfInterest: string;
  message: string;
  status: "New" | "In Progress" | "Contacted" | "Closed";
  priority: "Normal" | "High" | "Urgent";
  date: string;
  aiAssessment?: {
    clientName: string;
    industryCategory: string;
    executiveSummary: string;
    keyStrategicFocus: string[];
    recommendedConsultingPath: string;
    consultantPrepNotes?: string;
    autoReplyEmailBody?: string;
  };
  createdAt: Date;
  updatedAt?: Date;
}

export interface ISubscriber {
  _id?: string;
  email: string;
  source: string;
  subscribedAt: Date;
  isActive: boolean;
}

export interface IService {
  _id?: string;
  id: string;
  title: string;
  category: "business" | "consultancy";
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  metrics: string;
  deliverables: string[];
  idealFor: string;
  duration: string;
  tags: string[];
  executionPhases?: {
    phase: string;
    title: string;
    desc: string;
  }[];
  pricingTier?: string;
  createdAt: Date;
}

export interface IAiChatMessage {
  _id?: string;
  sessionId: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  detectedIntent?: string;
  capturedLead?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

export interface IAdminUser {
  _id?: string;
  email: string;
  name: string;
  role: "SuperAdmin" | "SeniorConsultant" | "Analyst";
  lastLogin: Date;
}
