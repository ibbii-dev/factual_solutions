import dns from "dns";

// Configure high-speed resilient DNS resolvers for MongoDB SRV lookups
try {
  if (typeof dns.setServers === "function") {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  }
} catch (e) {
  // Ignore in browser/edge runtimes
}

export interface DatabaseInquiry {
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
  createdAt?: Date;
}

export interface DatabaseSubscriber {
  email: string;
  subscribedAt: Date;
}

// In-memory persistent cache for serverless environments when MONGODB_URI is not set
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
    serviceOfInterest: "Studies & Feasibility Research",
    message: "Seeking commercial model validation and ROI sensitivity projections for a cold-chain storage facility in Lahore.",
    date: "2026-08-25 16:45",
    status: "Contacted",
    priority: "Normal"
  }
];

let fallbackSubscribers: Set<string> = new Set();

function getMongoClientClass() {
  try {
    const req = typeof window === "undefined" ? eval("require") : null;
    if (req) {
      const { MongoClient } = req("mongodb");
      return MongoClient;
    }
  } catch (err) {
    // Driver not present in local node_modules
    return null;
  }
  return null;
}

/**
 * Save an inquiry to MongoDB (or fallback cache)
 */
export async function dbSaveInquiry(inquiry: DatabaseInquiry): Promise<DatabaseInquiry> {
  const uri = process.env.MONGODB_URI;
  const MongoClient = getMongoClientClass();

  if (uri && MongoClient) {
    try {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db(process.env.MONGODB_DB_NAME || "factual_solutions");
      const collection = db.collection("inquiries");

      await collection.insertOne({
        ...inquiry,
        createdAt: new Date()
      });
      await client.close();
      console.log(`[MongoDB] Successfully persisted inquiry ${inquiry.id}`);
      return inquiry;
    } catch (err) {
      console.error("[MongoDB] Connection error, using cache fallback:", err);
    }
  }

  // Fallback
  fallbackInquiries = [inquiry, ...fallbackInquiries];
  return inquiry;
}

/**
 * Get all inquiries with optional filter from MongoDB (or fallback cache)
 */
export async function dbGetInquiries(filter?: { status?: string; search?: string }): Promise<DatabaseInquiry[]> {
  const uri = process.env.MONGODB_URI;
  const MongoClient = getMongoClientClass();

  if (uri && MongoClient) {
    try {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db(process.env.MONGODB_DB_NAME || "factual_solutions");
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

      const results = await collection.find(query).sort({ date: -1 }).toArray();
      await client.close();

      if (results && results.length > 0) {
        return results;
      }
    } catch (err) {
      console.error("[MongoDB] Retrieval failed, using fallback cache:", err);
    }
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

/**
 * Update an inquiry status in MongoDB
 */
export async function dbUpdateInquiryStatus(id: string, status: DatabaseInquiry["status"]): Promise<boolean> {
  const uri = process.env.MONGODB_URI;
  const MongoClient = getMongoClientClass();

  if (uri && MongoClient) {
    try {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db(process.env.MONGODB_DB_NAME || "factual_solutions");
      const collection = db.collection("inquiries");

      await collection.updateOne({ id }, { $set: { status } });
      await client.close();
      return true;
    } catch (err) {
      console.error("[MongoDB] Update status failed:", err);
    }
  }

  fallbackInquiries = fallbackInquiries.map((item) => (item.id === id ? { ...item, status } : item));
  return true;
}

/**
 * Delete an inquiry in MongoDB
 */
export async function dbDeleteInquiry(id: string): Promise<boolean> {
  const uri = process.env.MONGODB_URI;
  const MongoClient = getMongoClientClass();

  if (uri && MongoClient) {
    try {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db(process.env.MONGODB_DB_NAME || "factual_solutions");
      const collection = db.collection("inquiries");

      await collection.deleteOne({ id });
      await client.close();
      return true;
    } catch (err) {
      console.error("[MongoDB] Delete failed:", err);
    }
  }

  fallbackInquiries = fallbackInquiries.filter((item) => item.id !== id);
  return true;
}

/**
 * Save subscriber email in MongoDB
 */
export async function dbSaveSubscriber(email: string): Promise<boolean> {
  const uri = process.env.MONGODB_URI;
  const normalized = email.trim().toLowerCase();
  const MongoClient = getMongoClientClass();

  if (uri && MongoClient) {
    try {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db(process.env.MONGODB_DB_NAME || "factual_solutions");
      const collection = db.collection("subscribers");

      await collection.updateOne(
        { email: normalized },
        { $setOnInsert: { email: normalized, subscribedAt: new Date() } },
        { upsert: true }
      );
      await client.close();
      return true;
    } catch (err) {
      console.error("[MongoDB] Subscriber save failed:", err);
    }
  }

  fallbackSubscribers.add(normalized);
  return true;
}
