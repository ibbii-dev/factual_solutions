import { allServices } from "@/data/servicesData";
import { IInquiry, IService, ISubscriber, IAdminUser } from "@/models";

const INITIAL_SEED_INQUIRIES: Omit<IInquiry, "_id">[] = [
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
    aiAssessment: {
      clientName: "Tariq Al-Mansoor",
      industryCategory: "Retail & Multi-Unit Distribution",
      executiveSummary: "Multi-branch retail expansion requiring working capital modeling and inventory turnover optimization.",
      keyStrategicFocus: [
        "Store-level Unit Economics & Payback Modeling",
        "Centralized Inventory Working Capital Forecast",
        "Riyadh Commercial Expansion Feasibility Analysis"
      ],
      recommendedConsultingPath: "36-Month Dynamic Financial & Working Capital Roadmap"
    },
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
    aiAssessment: {
      clientName: "Bilal Farooq",
      industryCategory: "Industrial Manufacturing & Packaging",
      executiveSummary: "Factory floor operational audit targeting scrap rate reduction and shift handover standardization.",
      keyStrategicFocus: [
        "DMAIC Root-Cause Waste & Scrap Diagnostic",
        "Factory Floor Shift Handover Protocol Engineering",
        "Lean Six Sigma Production Efficiency Blueprint"
      ],
      recommendedConsultingPath: "Lean Six Sigma Operational Excellence Engagement"
    },
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
    aiAssessment: {
      clientName: "Kamran Qureshi",
      industryCategory: "Commercial Cold-Chain Logistics",
      executiveSummary: "Feasibility study and ROI sensitivity modeling for industrial cold-chain infrastructure.",
      keyStrategicFocus: [
        "CapEx/OpEx Sensitivity & IRR Projection",
        "Competitor Cold-Storage Capacity Benchmarking",
        "Bankable Feasibility Study Preparation"
      ],
      recommendedConsultingPath: "Empirical Feasibility Study & Venture Launch Blueprint"
    },
    createdAt: new Date("2026-08-25T16:45:00Z")
  }
];

const INITIAL_SUBSCRIBERS: Omit<ISubscriber, "_id">[] = [
  { email: "director@gulfinvestments.com", source: "Website Footer", subscribedAt: new Date(), isActive: true },
  { email: "cfo@pakventures.pk", source: "Executive Briefing", subscribedAt: new Date(), isActive: true },
  { email: "operations@almanargroup.sa", source: "Advisor Quiz", subscribedAt: new Date(), isActive: true }
];

const INITIAL_ADMIN: Omit<IAdminUser, "_id"> = {
  email: "admin@factual-solutions.com",
  name: "Managing Partner",
  role: "SuperAdmin",
  lastLogin: new Date()
};

export async function seedDatabase(): Promise<{
  success: boolean;
  message: string;
  collectionsCreated: { [key: string]: number };
}> {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || "factual_solutions";

  if (!uri) {
    return {
      success: false,
      message: "MONGODB_URI is not set in environment.",
      collectionsCreated: {}
    };
  }

  try {
    const { MongoClient } = await import("mongodb");
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);

    // 1. Seed Services
    const servicesColl = db.collection("services");
    await servicesColl.deleteMany({});
    const serviceDocs: IService[] = allServices.map((s) => ({
      id: s.id,
      title: s.title,
      category: s.category as "business" | "consultancy",
      shortDescription: s.shortDescription,
      fullDescription: s.fullDescription,
      iconName: s.iconName,
      metrics: s.metrics,
      deliverables: s.deliverables,
      idealFor: s.idealFor,
      duration: s.duration,
      tags: s.tags,
      executionPhases: s.executionPhases,
      pricingTier: s.category === "business" ? "Tier 1 Commercial Advisory" : "Tier 2 Strategic Transformation",
      createdAt: new Date()
    }));
    await servicesColl.insertMany(serviceDocs);

    // 2. Seed Inquiries
    const inquiriesColl = db.collection("inquiries");
    const existingInquiriesCount = await inquiriesColl.countDocuments();
    if (existingInquiriesCount === 0) {
      await inquiriesColl.insertMany(INITIAL_SEED_INQUIRIES);
    }

    // 3. Seed Subscribers
    const subscribersColl = db.collection("subscribers");
    const existingSubCount = await subscribersColl.countDocuments();
    if (existingSubCount === 0) {
      await subscribersColl.insertMany(INITIAL_SUBSCRIBERS);
    }

    // 4. Seed Admin
    const adminColl = db.collection("admin_users");
    await adminColl.updateOne(
      { email: INITIAL_ADMIN.email },
      { $set: INITIAL_ADMIN },
      { upsert: true }
    );

    await client.close();

    return {
      success: true,
      message: `Database '${dbName}' seeded successfully in MongoDB Atlas!`,
      collectionsCreated: {
        services: serviceDocs.length,
        inquiries: Math.max(existingInquiriesCount, INITIAL_SEED_INQUIRIES.length),
        subscribers: Math.max(existingSubCount, INITIAL_SUBSCRIBERS.length),
        admin_users: 1
      }
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Seed failed: ${err.message}`,
      collectionsCreated: {}
    };
  }
}
