import { MongoClient } from "mongodb";
export type MongoDatabase = ReturnType<MongoClient["db"]>;
import dns from "dns";
import { IInquiryReply, IBlogPost } from "@/models";

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

export type DatabaseBlogPost = IBlogPost;

// In-memory fallback cache when MongoDB is initializing or offline
let fallbackBlogPosts: DatabaseBlogPost[] = [
  {
    id: "post-001",
    title: "Navigating Enterprise Restructuring in Volatile Macroeconomic Environments",
    slug: "navigating-enterprise-restructuring-2026",
    excerpt: "A structured methodology for modernizing cost structures, optimizing departmental throughput, and preserving institutional capital during periods of high rate volatility.",
    content: `## The Imperative for Modern Operational Architecture

In today's unpredictable economic climate, traditional top-down corporate cost cutting often creates severe structural bottlenecks rather than sustainable efficiency. Executive leadership must move beyond simplistic percentage headcount reductions toward data-driven organizational redesign.

### 1. Identifying Structural Value Leaks
Organizations frequently suffer from misaligned operational overhead where administrative processes outgrow their revenue-generating capacity:
- Redundant administrative layers separating decision-makers from front-line execution
- Unmeasured software subscriptions and fragmented tooling ecosystems
- Unindexed supplier contracts subject to passive inflationary renewals

> "True enterprise agility is not about doing more with less; it is about eliminating friction that generates zero commercial value."

### 2. Multi-Horizon Financial Stress Testing
To prepare a resilient corporate structure, financial leadership must evaluate three distinct operating scenarios:
- **Baseline Forecast**: Stable market conditions with historical run-rate metrics.
- **Moderate Contraction**: A 15-20% contraction in gross margin combined with supply chain elongation.
- **Liquidity Conservation**: Defensive capital allocation emphasizing working capital cycles and cash conversion velocity.

### 3. Execution Governance & Change Enablement
Restructuring initiatives succeed or fail on the clarity of their execution roadmap. By establishing cross-functional transformation war rooms and milestone tracking dashboards, management maintains operational continuity while executing decisive structural pivots.`,
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    category: "Strategic Management",
    author: {
      name: "Ahsan Malik",
      role: "Managing Director & Principal Consultant",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"
    },
    readTime: "6 min read",
    tags: ["Strategy", "Restructuring", "Cost Optimization", "Governance"],
    status: "published",
    featured: true,
    publishedAt: "2026-08-20",
    createdAt: new Date("2026-08-20T10:00:00Z"),
    updatedAt: new Date("2026-08-20T10:00:00Z")
  },
  {
    id: "post-002",
    title: "Dynamic Financial Modeling: Aligning Sensitivity Projections with Real-World Cash Flows",
    slug: "dynamic-financial-modeling-ma-valuation",
    excerpt: "Why traditional static spreadsheets fail modern mid-market acquisitions, and how multi-scenario probabilistic simulations de-risk private equity allocations.",
    content: `## The Fallacy of the Static Financial Model

Static three-statement models designed on single-point growth estimates regularly blindside acquisition teams. In fluctuating interest rate regimes and evolving supply chains, single deterministic numbers provide false certainty.

### Key Flaws in Traditional Models
1. **Linear Revenue Assumptions**: Assuming steady quarter-over-quarter compounding without seasonality or capacity limits.
2. **Ignored Working Capital Lag**: Failing to model the cash-burn gap between client invoicing and supplier payment terms.
3. **Static Debt Amortization**: Not accounting for variable benchmark interest rate shifts.

### Building Probabilistic Cash Flow Simulations
By integrating Monte Carlo simulations and multi-variable sensitivity tables into standard DCF and LBO frameworks, investment committees can stress-test:
- Customer churn volatility impact on debt service coverage ratios (DSCR)
- Currency exchange rate fluctuations across multi-jurisdiction procurement
- Working capital buffer requirements under stretched receivables

### Decision-Making for Investment Committees
Clear, scenario-driven modeling empowers partners to negotiate realistic earn-outs, working capital adjustments, and performance covenants before signing binding acquisition agreements.`,
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    category: "Financial Modeling",
    author: {
      name: "Sufyan Tariq",
      role: "Head of Corporate Finance Advisory",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80"
    },
    readTime: "5 min read",
    tags: ["M&A", "Valuation", "Financial Modeling", "Due Diligence"],
    status: "published",
    featured: false,
    publishedAt: "2026-08-28",
    createdAt: new Date("2026-08-28T14:30:00Z"),
    updatedAt: new Date("2026-08-28T14:30:00Z")
  },
  {
    id: "post-003",
    title: "Rigorous Feasibility Studies: De-risking Capital Deployment in Regional Markets",
    slug: "market-feasibility-analysis-emerging-regions",
    excerpt: "How ground-truth consumer surveys, competitive cluster mapping, and regulatory barrier analysis protect multi-million dollar investments from costly market entry blunders.",
    content: `## Beyond Desktop Research: The Need for Empirical Field Feasibility

Many multi-million dollar expansions into new metropolitan or regional hubs stall because sponsors rely on generic aggregate macroeconomic statistics. Successful commercial ventures require ground-level validation.

### The Four Pillars of Feasibility Analysis
- **1. Micro-Demographic Purchasing Power**: Dissecting real disposable income and discretionary spending patterns in specific target postcodes.
- **2. Supply Chain & Logistics Reality**: Auditing local warehouse availability, haulage lead times, and port clearance timelines.
- **3. Regulatory & Licensing Hurdles**: Mapping municipal permits, environmental clearances, and zoning compliance before committing capital.
- **4. Unit Economic Sensitivity**: Calculating breakeven occupancy or throughput under aggressive local competitor pricing pressure.

> "A well-researched negative feasibility study saves ten times more capital than a poorly executed project ever returns."

### Structuring the Go/No-Go Decision Matrix
A professional feasibility report should never be an academic exercise; it must conclude with explicit trigger milestones, phased capital expenditure gates, and minimum ROI thresholds for board approval.`,
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    category: "Feasibility Studies",
    author: {
      name: "Dr. Hamza Siddiqui",
      role: "Senior Research & Analytics Partner",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80"
    },
    readTime: "7 min read",
    tags: ["Feasibility", "Market Research", "Expansion", "Capital Allocation"],
    status: "published",
    featured: false,
    publishedAt: "2026-09-02",
    createdAt: new Date("2026-09-02T09:15:00Z"),
    updatedAt: new Date("2026-09-02T09:15:00Z")
  }
];

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

// ==========================================
// BLOG POSTS CRUD OPERATIONS
// ==========================================

export async function dbGetBlogPosts(filter?: {
  status?: string;
  category?: string;
  search?: string;
  tag?: string;
  featured?: boolean;
}): Promise<DatabaseBlogPost[]> {
  try {
    const db = await getDatabase();
    if (db) {
      const collection = db.collection("posts");
      const query: any = {};

      if (filter?.status && filter.status !== "all") {
        query.status = filter.status;
      }

      if (filter?.category && filter.category !== "All") {
        query.category = { $regex: new RegExp(`^${filter.category}$`, "i") };
      }

      if (filter?.featured !== undefined) {
        query.featured = filter.featured;
      }

      if (filter?.tag) {
        query.tags = { $in: [new RegExp(filter.tag, "i")] };
      }

      if (filter?.search) {
        const regex = new RegExp(filter.search, "i");
        query.$or = [
          { title: regex },
          { excerpt: regex },
          { content: regex },
          { category: regex },
          { "author.name": regex },
          { tags: regex }
        ];
      }

      const docs = await collection.find(query).sort({ publishedAt: -1, createdAt: -1 }).toArray();
      if (docs && docs.length > 0) {
        return docs.map((d: any) => ({ ...d, _id: d._id?.toString() }));
      }
    }
  } catch (err) {
    console.error("[MongoDB] dbGetBlogPosts failed, falling back to cache:", err);
  }

  // Resilient fallback logic
  let res = [...fallbackBlogPosts];

  if (filter?.status && filter.status !== "all") {
    res = res.filter((p) => p.status === filter.status);
  }

  if (filter?.category && filter.category !== "All") {
    res = res.filter((p) => p.category.toLowerCase() === filter.category!.toLowerCase());
  }

  if (filter?.featured !== undefined) {
    res = res.filter((p) => Boolean(p.featured) === filter.featured);
  }

  if (filter?.tag) {
    const targetTag = filter.tag.toLowerCase();
    res = res.filter((p) => p.tags.some((t) => t.toLowerCase() === targetTag));
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase();
    res = res.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.author.name.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return res.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function dbGetBlogPostBySlug(slug: string): Promise<DatabaseBlogPost | null> {
  try {
    const db = await getDatabase();
    if (db) {
      const collection = db.collection("posts");
      const doc = await collection.findOne({ slug });
      if (doc) {
        return { ...doc, _id: doc._id?.toString() };
      }
    }
  } catch (err) {
    console.error("[MongoDB] dbGetBlogPostBySlug error:", err);
  }

  return fallbackBlogPosts.find((p) => p.slug === slug) || null;
}

export async function dbGetBlogPostById(id: string): Promise<DatabaseBlogPost | null> {
  try {
    const db = await getDatabase();
    if (db) {
      const collection = db.collection("posts");
      const doc = await collection.findOne({ id });
      if (doc) {
        return { ...doc, _id: doc._id?.toString() };
      }
    }
  } catch (err) {
    console.error("[MongoDB] dbGetBlogPostById error:", err);
  }

  return fallbackBlogPosts.find((p) => p.id === id) || null;
}

export async function dbSaveBlogPost(post: DatabaseBlogPost): Promise<DatabaseBlogPost> {
  const record: DatabaseBlogPost = {
    ...post,
    createdAt: post.createdAt || new Date(),
    updatedAt: new Date()
  };

  try {
    const db = await getDatabase();
    if (db) {
      const collection = db.collection("posts");
      await collection.insertOne(record);
      console.log(`[MongoDB] Persisted blog post ${record.slug} to Atlas`);
      return record;
    }
  } catch (err) {
    console.error("[MongoDB] dbSaveBlogPost failed, saving in memory:", err);
  }

  fallbackBlogPosts = [record, ...fallbackBlogPosts];
  return record;
}

export async function dbUpdateBlogPost(id: string, updates: Partial<DatabaseBlogPost>): Promise<boolean> {
  const cleanUpdates = { ...updates, updatedAt: new Date() };

  try {
    const db = await getDatabase();
    if (db) {
      const collection = db.collection("posts");
      const res = await collection.updateOne({ id }, { $set: cleanUpdates });
      if (res.matchedCount > 0) return true;
    }
  } catch (err) {
    console.error("[MongoDB] dbUpdateBlogPost error:", err);
  }

  let found = false;
  fallbackBlogPosts = fallbackBlogPosts.map((p) => {
    if (p.id === id) {
      found = true;
      return { ...p, ...cleanUpdates };
    }
    return p;
  });

  return found;
}

export async function dbDeleteBlogPost(id: string): Promise<boolean> {
  try {
    const db = await getDatabase();
    if (db) {
      const collection = db.collection("posts");
      const res = await collection.deleteOne({ id });
      if (res.deletedCount > 0) return true;
    }
  } catch (err) {
    console.error("[MongoDB] dbDeleteBlogPost error:", err);
  }

  fallbackBlogPosts = fallbackBlogPosts.filter((p) => p.id !== id);
  return true;
}
