import { MongoClient } from "mongodb";
export type MongoDatabase = ReturnType<MongoClient["db"]>;
import dns from "dns";
import { IInquiryReply } from "@/models";

// Configure resilient DNS resolvers for MongoDB Atlas SRV lookups in Node.js
try {
  if (typeof dns.setServers === "function") {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  }
} catch (e) {
  // Ignore in non-Node environments
}

export interface DatabaseInquiry {
  _id?: string | any;
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
  aiAssessment?: any;
  replies?: IInquiryReply[];
  internalNotes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DatabaseSubscriber {
  _id?: string | any;
  email: string;
  source?: string;
  subscribedAt: Date;
  isActive?: boolean;
}

export interface DatabaseChatLog {
  _id?: string | any;
  sessionId: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  leadCaptured?: boolean;
  metadata?: any;
}

// In-memory fallback cache when MongoDB is initializing or offline
let fallbackInquiries: DatabaseInquiry[] = [
  {
    id: "INQ-2026-001",
    fullName: "Tariq Al-Mansoor",
    workEmail: "tariq@alnoorgroup.com",
    companyName: "Al-Noor Consumer Retail",
    phone: "+966 50 492 1180",
    serviceOfInterest: "Specialized Business Solutions",
    message: "We operate 3 retail branches in Riyadh and are looking for advice on inventory budgeting and store-level financial modeling before opening 2 more stores next quarter.",
    date: "2026-08-26 14:30",
    status: "In Progress",
    priority: "High",
    createdAt: new Date("2026-08-26T14:30:00Z")
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
    priority: "Urgent",
    createdAt: new Date("2026-08-26T11:15:00Z")
  },
  {
    id: "INQ-2026-003",
    fullName: "Kamran Qureshi",
    workEmail: "k.qureshi@novabiz.com.pk",
    companyName: "Nova Commercial Logistics",
    phone: "+92 300 551 2291",
    serviceOfInterest: "Studies & Feasibility Research",
    message: "Seeking commercial model validation and ROI sensitivity projections for a cold-chain storage facility in Lahore.",
    date: "2026-08-25 16:45",
    status: "Contacted",
    priority: "Normal",
    createdAt: new Date("2026-08-25T16:45:00Z")
  }
];

let fallbackSubscribers: DatabaseSubscriber[] = [
  { email: "director@gulfinvestments.com", source: "Website Footer", subscribedAt: new Date(), isActive: true },
  { email: "cfo@pakventures.pk", source: "Executive Briefing", subscribedAt: new Date(), isActive: true }
];

let fallbackChatLogs: DatabaseChatLog[] = [];

// ==========================================
// Official MongoDB Singleton Client Promise
// ==========================================
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "factual_solutions";

let clientPromise: Promise<MongoClient> | null = null;

if (uri) {
  const options = {
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 8000,
    maxPoolSize: 10
  };

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    const client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

/**
 * Get connected MongoDB Database instance
 */
export async function getDatabase(): Promise<MongoDatabase | null> {
  if (!clientPromise) return null;
  try {
    const client = await clientPromise;
    return client.db(dbName);
  } catch (err) {
    console.error("[MongoDB] Connection failure:", err);
    return null;
  }
}

/**
 * Test connectivity to MongoDB Atlas
 */
export async function dbTestConnection(): Promise<{ connected: boolean; message: string; dbName: string }> {
  try {
    const db = await getDatabase();
    if (!db) {
      return { connected: false, message: "MONGODB_URI not configured or client initialization failed", dbName };
    }
    const result = await db.command({ ping: 1 });
    return {
      connected: result.ok === 1,
      message: result.ok === 1 ? "Connected successfully to MongoDB Atlas Cluster0" : "Ping command returned non-ok",
      dbName
    };
  } catch (err: any) {
    return { connected: false, message: err.message || "Failed to reach MongoDB", dbName };
  }
}

// ==========================================
// INQUIRIES CRUD OPERATIONS
// ==========================================

export async function dbGetInquiries(filter?: { status?: string; search?: string }): Promise<DatabaseInquiry[]> {
  try {
    const db = await getDatabase();
    if (db) {
      const collection = db.collection("inquiries");
      const query: any = {};

      if (filter?.status && filter.status !== "All") {
        query.status = filter.status;
      }

      if (filter?.search) {
        const regex = new RegExp(filter.search, "i");
        query.$or = [
          { fullName: regex },
          { workEmail: regex },
          { companyName: regex },
          { serviceOfInterest: regex },
          { id: regex }
        ];
      }

      const docs = await collection.find(query).sort({ createdAt: -1, date: -1 }).toArray();
      if (docs && docs.length > 0) {
        return docs.map((d: any) => ({ ...d, _id: d._id?.toString() }));
      }
    }
  } catch (err) {
    console.error("[MongoDB] dbGetInquiries failed, using fallback:", err);
  }

  // Fallback
  let res = [...fallbackInquiries];
  if (filter?.status && filter.status !== "All") {
    res = res.filter((i) => i.status === filter.status);
  }
  if (filter?.search) {
    const q = filter.search.toLowerCase();
    res = res.filter(
      (i) =>
        i.fullName.toLowerCase().includes(q) ||
        i.workEmail.toLowerCase().includes(q) ||
        i.companyName.toLowerCase().includes(q) ||
        i.serviceOfInterest.toLowerCase().includes(q) ||
        i.id.toLowerCase().includes(q)
    );
  }
  return res;
}

export async function dbGetInquiryById(id: string): Promise<DatabaseInquiry | null> {
  try {
    const db = await getDatabase();
    if (db) {
      const collection = db.collection("inquiries");
      const doc = await collection.findOne({ id });
      if (doc) {
        return { ...doc, _id: doc._id?.toString() };
      }
    }
  } catch (err) {
    console.error("[MongoDB] dbGetInquiryById error:", err);
  }

  return fallbackInquiries.find((i) => i.id === id) || null;
}

export async function dbSaveInquiry(inquiry: DatabaseInquiry): Promise<DatabaseInquiry> {
  const record: DatabaseInquiry = {
    ...inquiry,
    createdAt: inquiry.createdAt || new Date(),
    updatedAt: new Date()
  };

  try {
    const db = await getDatabase();
    if (db) {
      const collection = db.collection("inquiries");
      await collection.insertOne(record);
      console.log(`[MongoDB] Persisted inquiry ${record.id} to Atlas`);
      return record;
    }
  } catch (err) {
    console.error("[MongoDB] dbSaveInquiry failed, caching in memory:", err);
  }

  fallbackInquiries = [record, ...fallbackInquiries];
  return record;
}

export async function dbUpdateInquiryStatus(id: string, status: DatabaseInquiry["status"]): Promise<boolean> {
  try {
    const db = await getDatabase();
    if (db) {
      const collection = db.collection("inquiries");
      const res = await collection.updateOne(
        { id },
        { $set: { status, updatedAt: new Date() } }
      );
      if (res.matchedCount > 0) return true;
    }
  } catch (err) {
    console.error("[MongoDB] dbUpdateInquiryStatus error:", err);
  }

  fallbackInquiries = fallbackInquiries.map((i) => (i.id === id ? { ...i, status, updatedAt: new Date() } : i));
  return true;
}

export async function dbDeleteInquiry(id: string): Promise<boolean> {
  try {
    const db = await getDatabase();
    if (db) {
      const collection = db.collection("inquiries");
      const res = await collection.deleteOne({ id });
      if (res.deletedCount > 0) return true;
    }
  } catch (err) {
    console.error("[MongoDB] dbDeleteInquiry error:", err);
  }

  fallbackInquiries = fallbackInquiries.filter((i) => i.id !== id);
  return true;
}

export async function dbAddInquiryReply(id: string, reply: IInquiryReply): Promise<boolean> {
  try {
    const db = await getDatabase();
    if (db) {
      const collection = db.collection("inquiries");
      const res = await collection.updateOne(
        { id },
        { 
          $push: { replies: reply } as any,
          $set: { status: "Contacted", updatedAt: new Date() }
        }
      );
      if (res.matchedCount > 0) return true;
    }
  } catch (err) {
    console.error("[MongoDB] dbAddInquiryReply error:", err);
  }

  fallbackInquiries = fallbackInquiries.map((i) => {
    if (i.id === id) {
      const existingReplies = i.replies || [];
      return { ...i, replies: [...existingReplies, reply], status: "Contacted", updatedAt: new Date() };
    }
    return i;
  });
  return true;
}

export async function dbUpdateInquiryNotes(id: string, internalNotes: string): Promise<boolean> {
  try {
    const db = await getDatabase();
    if (db) {
      const collection = db.collection("inquiries");
      const res = await collection.updateOne(
        { id },
        { $set: { internalNotes, updatedAt: new Date() } }
      );
      if (res.matchedCount > 0) return true;
    }
  } catch (err) {
    console.error("[MongoDB] dbUpdateInquiryNotes error:", err);
  }

  fallbackInquiries = fallbackInquiries.map((i) => (i.id === id ? { ...i, internalNotes, updatedAt: new Date() } : i));
  return true;
}

// ==========================================
// SUBSCRIBERS CRUD OPERATIONS
// ==========================================

export async function dbSaveSubscriber(email: string, source: string = "Website Footer"): Promise<boolean> {
  const normalized = email.trim().toLowerCase();
  const newSub: DatabaseSubscriber = {
    email: normalized,
    source,
    subscribedAt: new Date(),
    isActive: true
  };

  try {
    const db = await getDatabase();
    if (db) {
      const collection = db.collection("subscribers");
      await collection.updateOne(
        { email: normalized },
        { $setOnInsert: newSub },
        { upsert: true }
      );
      return true;
    }
  } catch (err) {
    console.error("[MongoDB] dbSaveSubscriber failed:", err);
  }

  if (!fallbackSubscribers.some((s) => s.email === normalized)) {
    fallbackSubscribers.push(newSub);
  }
  return true;
}

export async function dbGetSubscribers(): Promise<DatabaseSubscriber[]> {
  try {
    const db = await getDatabase();
    if (db) {
      const collection = db.collection("subscribers");
      const docs = await collection.find({}).sort({ subscribedAt: -1 }).toArray();
      if (docs && docs.length > 0) {
        return docs.map((d: any) => ({ ...d, _id: d._id?.toString() }));
      }
    }
  } catch (err) {
    console.error("[MongoDB] dbGetSubscribers error:", err);
  }

  return fallbackSubscribers;
}

// ==========================================
// AI CHAT LOGGING OPERATIONS
// ==========================================

export async function dbSaveChatLog(log: DatabaseChatLog): Promise<boolean> {
  try {
    const db = await getDatabase();
    if (db) {
      const collection = db.collection("chat_logs");
      await collection.insertOne({
        ...log,
        timestamp: log.timestamp || new Date()
      });
      return true;
    }
  } catch (err) {
    console.error("[MongoDB] dbSaveChatLog error:", err);
  }

  fallbackChatLogs.push(log);
  return true;
}

export async function dbGetChatLogs(limit: number = 60): Promise<DatabaseChatLog[]> {
  try {
    const db = await getDatabase();
    if (db) {
      const collection = db.collection("chat_logs");
      const docs = await collection.find({}).sort({ timestamp: -1 }).limit(limit).toArray();
      if (docs && docs.length > 0) {
        return docs.map((d: any) => ({ ...d, _id: d._id?.toString() }));
      }
    }
  } catch (err) {
    console.error("[MongoDB] dbGetChatLogs error:", err);
  }

  return fallbackChatLogs.slice(0, limit);
}

// ==========================================
// EXECUTIVE DASHBOARD STATS
// ==========================================

export async function dbGetDashboardStats(): Promise<{
  totalInquiries: number;
  newInquiries: number;
  inProgress: number;
  contacted: number;
  closed: number;
  totalSubscribers: number;
  recentInquiries: DatabaseInquiry[];
  serviceBreakdown: Record<string, number>;
}> {
  const inquiries = await dbGetInquiries();
  const subscribers = await dbGetSubscribers();

  const serviceBreakdown: Record<string, number> = {};
  inquiries.forEach((inq) => {
    const svc = inq.serviceOfInterest || "General Consultation";
    serviceBreakdown[svc] = (serviceBreakdown[svc] || 0) + 1;
  });

  return {
    totalInquiries: inquiries.length,
    newInquiries: inquiries.filter((i) => i.status === "New").length,
    inProgress: inquiries.filter((i) => i.status === "In Progress").length,
    contacted: inquiries.filter((i) => i.status === "Contacted").length,
    closed: inquiries.filter((i) => i.status === "Closed").length,
    totalSubscribers: subscribers.length,
    recentInquiries: inquiries.slice(0, 5),
    serviceBreakdown
  };
}
