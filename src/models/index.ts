export interface IInquiryReply {
  id: string;
  author: string;
  content: string;
  sentAt: string;
  channel: "Email" | "WhatsApp" | "Internal Note";
  subject?: string;
  deliveryStatus?: "Sent" | "Logged" | "Failed";
}

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
  replies?: IInquiryReply[];
  internalNotes?: string;
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
  category: "consulting" | "training" | "digital";
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

export interface IBlogPost {
  _id?: string;
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  coverImageAlt?: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
    bio?: string;
  };
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  readTime: string;
  tags: string[];
  status: "published" | "draft";
  featured?: boolean;
  publishedAt: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/** A client story posted from the admin panel and shown on /case-studies. */
export interface ICaseStudy {
  _id?: string;
  id: string;
  title: string;
  slug: string;
  /** Client name, or a description when the client stays anonymous ("A textile exporter in Faisalabad"). */
  client: string;
  industry: string;
  serviceLine: "consulting" | "training" | "digital";
  /** One or two sentences for the card and search results. */
  summary: string;
  challenge: string;
  approach: string;
  /** Outcomes the client agreed to share, one per line. */
  results: string[];
  /** Up to three headline numbers, e.g. { value: "32%", label: "shorter lead time" }. */
  metrics: { value: string; label: string }[];
  testimonial?: { quote: string; name: string; role: string };
  coverImage?: string;
  coverImageAlt?: string;
  /** e.g. "8 weeks" */
  duration?: string;
  status: "published" | "draft";
  publishedAt: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/** A reader comment on a blog article. The email is kept private (never sent to the page). */
export interface IBlogComment {
  _id?: string;
  id: string;
  postSlug: string;
  postTitle: string;
  name: string;
  email: string;
  message: string;
  /** "visible" shows on the article; staff can hide a comment without deleting it. */
  status: "visible" | "hidden";
  createdAt: string;
}

/** What the public page receives. */
export type PublicBlogComment = Pick<IBlogComment, "id" | "name" | "message" | "createdAt">;
