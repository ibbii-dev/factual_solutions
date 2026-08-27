export interface ServiceItem {
  id: string;
  category: "business" | "consultancy";
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  metrics: string;
  deliverables: string[];
  idealFor: string;
  duration: string;
  tags: string[];
}

export const businessServices: ServiceItem[] = [
  {
    id: "business-idea",
    category: "business",
    title: "Business Idea & Model Development",
    shortDescription: "Turning new business concepts into structured, practical, and viable commercial plans.",
    fullDescription: "We assess the feasibility of your business idea, review customer demand, calculate realistic startup and running costs, and outline a step-by-step launch plan so you can invest with confidence.",
    iconName: "Sparkles",
    metrics: "Structured Launch Roadmap",
    deliverables: [
      "Commercial Feasibility Review",
      "Cost & Revenue Estimation Model",
      "Step-by-Step Launch Timeline",
      "Target Customer Profile & Value Proposition"
    ],
    idealFor: "Entrepreneurs, business owners, and companies launching new products or services.",
    duration: "3 - 6 Weeks",
    tags: ["Business Idea", "Feasibility", "Planning", "Launch"]
  },
  {
    id: "market-analysis",
    category: "business",
    title: "Market Analysis & Industry Research",
    shortDescription: "Clear research on competitors, market pricing, customer trends, and local opportunities.",
    fullDescription: "We gather reliable data on your target market, evaluate what competitors are doing, identify gaps in supply or pricing, and help you position your business effectively.",
    iconName: "TrendingUp",
    metrics: "Clear Competitor Benchmarks",
    deliverables: [
      "Industry & Sector Overview",
      "Competitor Pricing & Offer Comparison",
      "Customer Demand & Target Audience Survey",
      "Actionable Market Entry Recommendations"
    ],
    idealFor: "Businesses looking to enter a new market, adjust pricing, or differentiate from competitors.",
    duration: "2 - 4 Weeks",
    tags: ["Market Analysis", "Research", "Competitors", "Pricing"]
  },
  {
    id: "investment-planning",
    category: "business",
    title: "Investment Planning & Financial Modeling",
    shortDescription: "Realistic financial forecasting, budget planning, and investor-ready documentation.",
    fullDescription: "We build clear financial projections, evaluate cash flow requirements, and prepare structured business plans and presentations for banks, partners, or investors.",
    iconName: "BarChart3",
    metrics: "Detailed 3-Year Projections",
    deliverables: [
      "3-Year Financial Forecast & Cash Flow Model",
      "Budget & Working Capital Breakdown",
      "Business Plan & Executive Presentation",
      "Break-Even & ROI Calculation"
    ],
    idealFor: "Companies seeking bank financing, partner investments, or internal capital planning.",
    duration: "3 - 6 Weeks",
    tags: ["Investment", "Financial Modeling", "Budgeting", "Business Plan"]
  },
  {
    id: "business-growth",
    category: "business",
    title: "Business Growth & Sales Optimization",
    shortDescription: "Identifying sales bottlenecks, improving customer retention, and scaling everyday revenue.",
    fullDescription: "We review your existing sales processes, identify where potential customers drop off, train your sales team on proven conversion techniques, and build practical customer retention workflows.",
    iconName: "Layers",
    metrics: "Improved Sales Conversion",
    deliverables: [
      "Sales Process Audit & Bottleneck Review",
      "Customer Acquisition & Lead Funnel Plan",
      "Client Retention & Repeat Purchase Strategy",
      "Practical Sales Performance Guidelines"
    ],
    idealFor: "Established businesses looking to increase sales, improve customer retention, or expand operations.",
    duration: "1 - 3 Months",
    tags: ["Business Growth", "Sales", "Customer Retention", "Operations"]
  },
  {
    id: "global-business",
    category: "business",
    title: "Global Business & Regional Expansion",
    shortDescription: "Practical guidance for setting up operations, finding partners, and exporting regionally.",
    fullDescription: "Expanding into a new city or country requires careful planning. We help you navigate local commercial regulations, evaluate distribution channels, and find reliable local commercial partners.",
    iconName: "Cpu",
    metrics: "Direct Market Entry Support",
    deliverables: [
      "Regional Market Readiness Assessment",
      "Local Commercial Setup Checklist",
      "Distribution & Supply Partner Sourcing",
      "Cross-Border Operational Guidelines"
    ],
    idealFor: "Companies looking to expand regionally into neighboring markets or export products.",
    duration: "2 - 4 Months",
    tags: ["Global Business", "Regional Expansion", "Trade", "Distribution"]
  }
];

export const consultancyServices: ServiceItem[] = [
  {
    id: "strategic-consulting",
    category: "consultancy",
    title: "Strategic Management Consulting",
    shortDescription: "Objective advice and guidance for business owners facing key organizational decisions.",
    fullDescription: "When your business reaches a turning point—whether restructuring, launching a new division, or resolving internal bottlenecks—we provide seasoned, unbiased consulting to guide your decisions.",
    iconName: "ShieldCheck",
    metrics: "Clear Action Roadmaps",
    deliverables: [
      "Comprehensive Business Health Review",
      "Strategic Priority Matrix & Action Items",
      "Departmental Resource Planning",
      "Bi-Weekly Executive Advisory Sessions"
    ],
    idealFor: "Business owners, managing directors, and partners looking for steady strategic direction.",
    duration: "Ongoing Advisory or 2 - 4 Months",
    tags: ["Consulting", "Management", "Advisory", "Business Health"]
  },
  {
    id: "risk-management",
    category: "consultancy",
    title: "Risk Management & Compliance",
    shortDescription: "Identifying financial, operational, and regulatory risks before they cause problems.",
    fullDescription: "We systematically review your business contracts, operational workflows, and regulatory filings to pinpoint potential liabilities and put practical safeguards in place.",
    iconName: "Scale",
    metrics: "Comprehensive Risk Checklist",
    deliverables: [
      "Operational & Financial Risk Audit",
      "Regulatory Compliance Assessment",
      "Internal Workflow Safeguards & Controls",
      "Contingency & Continuity Guidelines"
    ],
    idealFor: "Growing businesses wanting to ensure compliance, protect cash flow, and avoid legal disputes.",
    duration: "3 - 5 Weeks",
    tags: ["Risk Management", "Compliance", "Controls", "Safeguards"]
  },
  {
    id: "success-reports",
    category: "consultancy",
    title: "Performance Reports & Business Analytics",
    shortDescription: "Clear, easy-to-read performance tracking and factual monthly KPI reports.",
    fullDescription: "Stop guessing how your business is performing. We help you set up straightforward tracking for revenue, expenses, employee productivity, and customer acquisition costs with easy-to-read dashboards.",
    iconName: "BrainCircuit",
    metrics: "Clear Monthly Tracking",
    deliverables: [
      "Custom Business KPI Dashboard Setup",
      "Monthly & Quarterly Performance Reports",
      "Cost Center & Overhead Breakdown",
      "Actionable Recommendations Based on Data"
    ],
    idealFor: "Owners and managers who want transparent, straightforward reporting without complex jargon.",
    duration: "2 - 4 Weeks Setup",
    tags: ["Success Reports", "Performance", "KPIs", "Tracking"]
  },
  {
    id: "customer-prioritization",
    category: "consultancy",
    title: "Customer Prioritization & Research",
    shortDescription: "Identifying your most profitable customers and improving client satisfaction.",
    fullDescription: "Most businesses get 80% of their profit from 20% of their clients. We analyze your customer base to identify your highest-value accounts and build strategies to keep them happy and loyal.",
    iconName: "Users",
    metrics: "Clear Account Segmentation",
    deliverables: [
      "Customer Profitability Analysis",
      "Client Feedback & Satisfaction Review",
      "Key Account Management Guidelines",
      "Customer Retention Action Plan"
    ],
    idealFor: "Service providers, trading firms, and B2B businesses managing multiple customer accounts.",
    duration: "3 - 5 Weeks",
    tags: ["Customer Research", "Key Accounts", "Retention", "Satisfaction"]
  },
  {
    id: "leadership-advisory",
    category: "consultancy",
    title: "Team Structure & Operational Leadership",
    shortDescription: "Organizing your team, clarifying job roles, and improving departmental efficiency.",
    fullDescription: "As your team grows, confusion over roles can slow things down. We help organize your company hierarchy, define clear job responsibilities, and establish practical KPIs for your staff.",
    iconName: "GitMerge",
    metrics: "Clear Team Responsibilities",
    deliverables: [
      "Organizational Chart & Role Definitions",
      "Staff Performance Evaluation Guidelines",
      "Departmental Handover & Workflow SOPs",
      "Management Communication Protocols"
    ],
    idealFor: "Companies expanding their workforce or experiencing internal communication bottlenecks.",
    duration: "1 - 2 Months",
    tags: ["Team Structure", "Job Roles", "SOPs", "Efficiency"]
  }
];

export const allServices = [...businessServices, ...consultancyServices];
