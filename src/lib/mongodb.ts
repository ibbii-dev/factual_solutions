import { MongoClient } from "mongodb";
export type MongoDatabase = ReturnType<MongoClient["db"]>;
import dns from "dns";
import { IInquiryReply, IBlogPost, ICaseStudy, IBlogComment } from "@/models";

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
let fallbackBlogPosts: DatabaseBlogPost[] = [];

// In-memory fallback cache when MongoDB is initializing or offline
let fallbackInquiries: DatabaseInquiry[] = [];

let fallbackSubscribers: DatabaseSubscriber[] = [];

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

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Next inquiry id for the year, e.g. INQ-2026-014, from an atomic counter so ids never
 * repeat (counting existing inquiries repeated ids after deletions). The counter starts
 * from the highest id already stored. Without a database, a time-based id is used.
 */
export async function dbNextInquiryId(year: number): Promise<string> {
  const prefix = `INQ-${year}-`;
  try {
    const db = await getDatabase();
    if (db) {
      const counters = db.collection("counters");
      const counterId = `inquiry-${year}`;
      if (!(await counters.findOne({ _id: counterId }))) {
        const existing = await db
          .collection("inquiries")
          .find({ id: { $regex: `^${prefix}\\d+$` } }, { projection: { id: 1 } })
          .toArray();
        const highest = existing.reduce((max: number, d: any) => Math.max(max, Number(String(d.id).slice(prefix.length)) || 0), 0);
        await counters.insertOne({ _id: counterId, seq: highest }).catch(() => {
          /* another request created it first */
        });
      }
      const next = await counters.findOneAndUpdate({ _id: counterId }, { $inc: { seq: 1 } }, { returnDocument: "after" });
      const seq = (next as { seq?: number } | null)?.seq;
      if (seq) return `${prefix}${String(seq).padStart(3, "0")}`;
    }
  } catch (err) {
    console.error("[MongoDB] dbNextInquiryId failed, using a time-based id:", err);
  }
  return `${prefix}${Date.now().toString(36).toUpperCase()}`;
}

export async function dbGetInquiries(filter?: { status?: string; search?: string; email?: string }): Promise<DatabaseInquiry[]> {
  try {
    const db = await getDatabase();
    if (db) {
      const collection = db.collection("inquiries");
      const query: any = {};

      if (filter?.status && filter.status !== "All") {
        query.status = filter.status;
      }

      if (filter?.email) {
        query.workEmail = { $regex: new RegExp(`^${escapeRegex(filter.email.trim())}$`, "i") };
      }

      if (filter?.search) {
        const regex = new RegExp(escapeRegex(filter.search), "i");
        query.$or = [
          { fullName: regex },
          { workEmail: regex },
          { companyName: regex },
          { serviceOfInterest: regex },
          { id: regex }
        ];
      }

      // Connected: return what the database holds, even when that is nothing.
      // (The sample inquiries below are only for running without a database.)
      const docs = await collection.find(query).sort({ createdAt: -1, date: -1 }).toArray();
      return docs.map((d: any) => ({ ...d, _id: d._id?.toString() }));
    }
  } catch (err) {
    console.error("[MongoDB] dbGetInquiries failed, using fallback:", err);
  }

  // Fallback
  let res = [...fallbackInquiries];
  if (filter?.status && filter.status !== "All") {
    res = res.filter((i) => i.status === filter.status);
  }
  if (filter?.email) {
    const targetEmail = filter.email.toLowerCase().trim();
    res = res.filter((i) => i.workEmail.toLowerCase().trim() === targetEmail);
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

/** Adds a reply. Staff replies mark the inquiry "Contacted"; client follow-ups set it back to "New". */
export async function dbAddInquiryReply(
  id: string,
  reply: IInquiryReply,
  status: DatabaseInquiry["status"] = "Contacted"
): Promise<boolean> {
  try {
    const db = await getDatabase();
    if (db) {
      const collection = db.collection("inquiries");
      const res = await collection.updateOne(
        { id },
        {
          $push: { replies: reply } as any,
          $set: { status, updatedAt: new Date() }
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
      return { ...i, replies: [...existingReplies, reply], status, updatedAt: new Date() };
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

// ==========================================
// Case studies (posted from the admin panel)
// ==========================================
let fallbackCaseStudies: ICaseStudy[] = [];

export async function dbGetCaseStudies(filter?: { status?: ICaseStudy["status"] }): Promise<ICaseStudy[]> {
  const query = filter?.status ? { status: filter.status } : {};
  try {
    const db = await getDatabase();
    if (db) {
      const docs = await db.collection("case_studies").find(query).sort({ publishedAt: -1, createdAt: -1 }).toArray();
      return docs.map(({ _id, ...rest }: Record<string, unknown>) => rest as unknown as ICaseStudy);
    }
  } catch (err) {
    console.error("[MongoDB] dbGetCaseStudies error:", err);
  }
  return fallbackCaseStudies.filter((c) => !filter?.status || c.status === filter.status);
}

export async function dbGetCaseStudyBySlug(slug: string): Promise<ICaseStudy | null> {
  try {
    const db = await getDatabase();
    if (db) {
      const doc = await db.collection("case_studies").findOne({ slug });
      if (!doc) return null;
      const { _id, ...rest } = doc;
      return rest as unknown as ICaseStudy;
    }
  } catch (err) {
    console.error("[MongoDB] dbGetCaseStudyBySlug error:", err);
  }
  return fallbackCaseStudies.find((c) => c.slug === slug) || null;
}

export async function dbCaseStudySlugTaken(slug: string, exceptId?: string): Promise<boolean> {
  const all = await dbGetCaseStudies();
  return all.some((c) => c.slug === slug && c.id !== exceptId);
}

export async function dbSaveCaseStudy(study: ICaseStudy): Promise<ICaseStudy> {
  const record: ICaseStudy = { ...study, createdAt: new Date(), updatedAt: new Date() };
  try {
    const db = await getDatabase();
    if (db) {
      await db.collection("case_studies").insertOne({ ...record });
      return record;
    }
  } catch (err) {
    console.error("[MongoDB] dbSaveCaseStudy failed, saving in memory:", err);
  }
  fallbackCaseStudies = [record, ...fallbackCaseStudies];
  return record;
}

export async function dbUpdateCaseStudy(id: string, updates: Partial<ICaseStudy>): Promise<boolean> {
  const { _id, id: _ignore, createdAt, ...rest } = updates;
  const clean = { ...rest, updatedAt: new Date() };
  try {
    const db = await getDatabase();
    if (db) {
      const res = await db.collection("case_studies").updateOne({ id }, { $set: clean });
      return res.matchedCount > 0;
    }
  } catch (err) {
    console.error("[MongoDB] dbUpdateCaseStudy error:", err);
  }
  let found = false;
  fallbackCaseStudies = fallbackCaseStudies.map((c) => (c.id === id ? ((found = true), { ...c, ...clean }) : c));
  return found;
}

export async function dbDeleteCaseStudy(id: string): Promise<boolean> {
  try {
    const db = await getDatabase();
    if (db) {
      const res = await db.collection("case_studies").deleteOne({ id });
      return res.deletedCount > 0;
    }
  } catch (err) {
    console.error("[MongoDB] dbDeleteCaseStudy error:", err);
  }
  const before = fallbackCaseStudies.length;
  fallbackCaseStudies = fallbackCaseStudies.filter((c) => c.id !== id);
  return fallbackCaseStudies.length < before;
}

// ==========================================
// Blog comments
// ==========================================
let fallbackComments: IBlogComment[] = [];

export async function dbGetComments(filter?: { postSlug?: string; status?: IBlogComment["status"] }): Promise<IBlogComment[]> {
  const query: Record<string, string> = {};
  if (filter?.postSlug) query.postSlug = filter.postSlug;
  if (filter?.status) query.status = filter.status;
  try {
    const db = await getDatabase();
    if (db) {
      // Oldest first on an article reads like a conversation; the admin list reverses it.
      const docs = await db.collection("blog_comments").find(query).sort({ createdAt: 1 }).limit(500).toArray();
      return docs.map(({ _id, ...rest }: Record<string, unknown>) => rest as unknown as IBlogComment);
    }
  } catch (err) {
    console.error("[MongoDB] dbGetComments error:", err);
  }
  return fallbackComments.filter(
    (c) => (!filter?.postSlug || c.postSlug === filter.postSlug) && (!filter?.status || c.status === filter.status)
  );
}

export async function dbSaveComment(comment: IBlogComment): Promise<IBlogComment> {
  try {
    const db = await getDatabase();
    if (db) {
      await db.collection("blog_comments").insertOne({ ...comment });
      return comment;
    }
  } catch (err) {
    console.error("[MongoDB] dbSaveComment failed, saving in memory:", err);
  }
  fallbackComments = [...fallbackComments, comment];
  return comment;
}

export async function dbGetCommentById(id: string): Promise<IBlogComment | null> {
  try {
    const db = await getDatabase();
    if (db) {
      const doc = await db.collection("blog_comments").findOne({ id });
      if (!doc) return null;
      const { _id, ...rest } = doc;
      return rest as unknown as IBlogComment;
    }
  } catch (err) {
    console.error("[MongoDB] dbGetCommentById error:", err);
  }
  return fallbackComments.find((c) => c.id === id) || null;
}

export async function dbSetCommentStatus(id: string, status: IBlogComment["status"]): Promise<boolean> {
  try {
    const db = await getDatabase();
    if (db) {
      const res = await db.collection("blog_comments").updateOne({ id }, { $set: { status } });
      return res.matchedCount > 0;
    }
  } catch (err) {
    console.error("[MongoDB] dbSetCommentStatus error:", err);
  }
  let found = false;
  fallbackComments = fallbackComments.map((c) => (c.id === id ? ((found = true), { ...c, status }) : c));
  return found;
}

export async function dbDeleteComment(id: string): Promise<boolean> {
  try {
    const db = await getDatabase();
    if (db) {
      const res = await db.collection("blog_comments").deleteOne({ id });
      return res.deletedCount > 0;
    }
  } catch (err) {
    console.error("[MongoDB] dbDeleteComment error:", err);
  }
  const before = fallbackComments.length;
  fallbackComments = fallbackComments.filter((c) => c.id !== id);
  return fallbackComments.length < before;
}
