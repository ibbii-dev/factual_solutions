import { Language } from "./translations";

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
  executionPhases?: { phase: string; title: string; desc: string }[];
}

export const businessServicesEN: ServiceItem[] = [
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
    tags: ["Business Idea", "Feasibility", "Planning", "Launch"],
    executionPhases: [
      { phase: "01", title: "Concept & Demand Validation", desc: "Evaluating market need, customer willingness-to-pay, and initial cost modeling." },
      { phase: "02", title: "Unit Economics & Pricing Strategy", desc: "Structuring gross margins, customer acquisition cost benchmarks, and pricing tiers." },
      { phase: "03", title: "Commercial Rollout Blueprint", desc: "Delivering a comprehensive operational launch roadmap with milestone checkpoints." }
    ]
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
    tags: ["Market Analysis", "Research", "Competitors", "Pricing"],
    executionPhases: [
      { phase: "01", title: "Sector Mapping", desc: "Gathering verified commercial market data, regulatory landscape, and sector growth indicators." },
      { phase: "02", title: "Competitor Benchmarking", desc: "Auditing direct and indirect competitor pricing, positioning, and service gaps." },
      { phase: "03", title: "Strategic Positioning", desc: "Defining clear market entry advantages and differentiation opportunities." }
    ]
  },
  {
    id: "investment-planning",
    category: "business",
    title: "Financial Modeling & Budgeting",
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
    tags: ["Investment", "Financial Modeling", "Budgeting", "Business Plan"],
    executionPhases: [
      { phase: "01", title: "Historical & Cost Audits", desc: "Analyzing current revenue drivers, fixed vs variable expenses, and working capital cycle." },
      { phase: "02", title: "Dynamic Financial Modeling", desc: "Building 36-month integrated P&L, Balance Sheet, and Cash Flow projection spreadsheets." },
      { phase: "03", title: "Investor & Bank Pack", desc: "Structuring executive summaries, sensitivity analyses, and capital repayment schedules." }
    ]
  },
  {
    id: "business-growth",
    category: "business",
    title: "Specialized Business Solutions",
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
    tags: ["Business Growth", "Sales", "Customer Retention", "Operations"],
    executionPhases: [
      { phase: "01", title: "Funnel Diagnostics", desc: "Tracking lead generation, inquiry drop-offs, and sales conversion rates." },
      { phase: "02", title: "Process Optimization", desc: "Redesigning closing scripts, incentive structures, and qualification workflows." },
      { phase: "03", title: "Execution & Monitoring", desc: "Implementing weekly KPI dashboards and coaching sales teams on deal progression." }
    ]
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
    tags: ["Global Business", "Regional Expansion", "Trade", "Distribution"],
    executionPhases: [
      { phase: "01", title: "Cross-Border Assessment", desc: "Reviewing regional tariff codes, business setup requirements, and logistics constraints." },
      { phase: "02", title: "Partner Screening", desc: "Identifying, vetting, and negotiating preliminary agreements with regional distributors." },
      { phase: "03", title: "Operational Launch", desc: "Setting up regional supply chains, localized pricing, and billing frameworks." }
    ]
  },
  {
    id: "studies-research",
    category: "business",
    title: "Studies & Feasibility Research",
    shortDescription: "Rigorous market analysis, unit-economic modeling, capital budgeting, and commercial feasibility studies for new ventures and enterprise expansions.",
    fullDescription: "We provide comprehensive feasibility studies based on real market data, cost benchmarking, regulatory reviews, and multi-scenario economic models suitable for bank financing and executive decisions.",
    iconName: "BarChart3",
    metrics: "Bank-Grade Feasibility Study",
    deliverables: [
      "Comprehensive Market Feasibility Report",
      "Technical & Operational Requirements Study",
      "Detailed Financial & Cash Flow Sensitivity Analysis",
      "Risk Mitigation & Regulatory Compliance Matrix"
    ],
    idealFor: "Enterprises planning major capital investments, industrial plants, or new commercial divisions.",
    duration: "4 - 8 Weeks",
    tags: ["Feasibility", "Research", "Financial Modeling", "Capital Investment"],
    executionPhases: [
      { phase: "01", title: "Scope & Baseline Research", desc: "Defining project technical parameters, location factors, and raw input economics." },
      { phase: "02", title: "Commercial & Economic Modeling", desc: "Evaluating revenue scenarios, break-even timelines, and CapEx recovery." },
      { phase: "03", title: "Institutional Documentation", desc: "Delivering bank-ready feasibility books and investor slide decks." }
    ]
  }
];

export const consultancyServicesEN: ServiceItem[] = [
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
    tags: ["Consulting", "Management", "Advisory", "Business Health"],
    executionPhases: [
      { phase: "01", title: "Executive Alignment & Audit", desc: "Interviews with leadership, operational diagnostics, and priority mapping." },
      { phase: "02", title: "Strategic Roadmap Authoring", desc: "Formulating milestone timelines, governance frameworks, and executive OKRs." },
      { phase: "03", title: "Implementation Oversight", desc: "Bi-weekly executive steering sessions to ensure cross-departmental accountability." }
    ]
  },
  {
    id: "projects-management",
    category: "consultancy",
    title: "Projects & Lean Management",
    shortDescription: "We provide project management and Lean Six Sigma services to ensure initiatives are executed efficiently, on time, within budget, and with top quality.",
    fullDescription: "Led by certified PMP and Lean Six Sigma Master Black Belt professionals, we help enterprises structure project governance, remove operational waste (Muda), and achieve predictable on-budget delivery.",
    iconName: "Target",
    metrics: "Zero-Waste Lean Execution",
    deliverables: [
      "PMP Project Charter & WBS Framework",
      "Lean Six Sigma DMAIC Process Analysis",
      "Resource Allocation & Gantt Timelines",
      "Quality Gate & Milestone Verification Protocol"
    ],
    idealFor: "Industrial manufacturers, commercial developers, and enterprises executing complex multi-stakeholder projects.",
    duration: "1 - 6 Months",
    tags: ["Project Management", "Lean Six Sigma", "Process Control", "PMP"],
    executionPhases: [
      { phase: "01", title: "Charter & Value Stream Mapping", desc: "Defining project deliverables, critical path schedules, and eliminating procedural bottlenecks." },
      { phase: "02", title: "DMAIC Implementation", desc: "Measuring baseline variance, analyzing root causes, and applying Lean waste reduction." },
      { phase: "03", title: "Control & Handover", desc: "Setting up control charts, standard operating procedures (SOPs), and final governance transfer." }
    ]
  },
  {
    id: "process-transformation",
    category: "consultancy",
    title: "Process & ERP Transformation",
    shortDescription: "Streamlining business operations, eliminating shop-floor waste, and supervising ERP implementation to ensure maximum productivity and compliance.",
    fullDescription: "We re-engineer organizational processes before automation, eliminating unnecessary steps and ensuring ERP systems (SAP, Oracle, Odoo, custom) mirror optimal real-world operations rather than digitizing broken workflows.",
    iconName: "Cpu",
    metrics: "Streamlined Enterprise ERP",
    deliverables: [
      "As-Is vs To-Be Business Process Mapping",
      "ERP Functional Requirements Specification (FRS)",
      "Vendor Selection & Implementation Supervision",
      "User Acceptance Testing (UAT) & Training SOPs"
    ],
    idealFor: "Growing enterprises upgrading legacy accounting, inventory, or management software to modern ERP.",
    duration: "2 - 6 Months",
    tags: ["ERP", "Process Transformation", "Digital Systems", "Automation"],
    executionPhases: [
      { phase: "01", title: "Process Diagnostics", desc: "Documenting all departmental handovers, approval chains, and bottlenecks." },
      { phase: "02", title: "Process Optimization & FRS", desc: "Designing simplified 'To-Be' workflows and technical specifications for software vendors." },
      { phase: "03", title: "Supervision & Change Management", desc: "Guiding data migration, employee training, and post-go-live stability." }
    ]
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
    tags: ["Risk Management", "Compliance", "Controls", "Safeguards"],
    executionPhases: [
      { phase: "01", title: "Risk Identification", desc: "Reviewing contractual agreements, fiscal filings, and operational exposure points." },
      { phase: "02", title: "Controls Design", desc: "Drafting preventative approval matrixes, compliance checklists, and audit schedules." },
      { phase: "03", title: "Business Continuity Protocol", desc: "Establishing actionable emergency response and risk mitigation plans." }
    ]
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
    tags: ["Success Reports", "Performance", "KPIs", "Tracking"],
    executionPhases: [
      { phase: "01", title: "Metric Definition", desc: "Isolating the top 5 to 10 factual indicators that dictate profitability and client satisfaction." },
      { phase: "02", title: "Reporting Architecture", desc: "Configuring automated data feeds and visual management dashboards." },
      { phase: "03", title: "Monthly Review Cadence", desc: "Establishing recurring leadership review meetings to evaluate factual variances." }
    ]
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
    tags: ["Customer Research", "Key Accounts", "Retention", "Satisfaction"],
    executionPhases: [
      { phase: "01", title: "ABC / Pareto Analysis", desc: "Calculating net contribution margins across customer tiers and product categories." },
      { phase: "02", title: "Client Retention Playbook", desc: "Defining dedicated SLA service levels and onboarding protocols for top accounts." },
      { phase: "03", title: "Account Growth Implementation", desc: "Structuring up-sell / cross-sell schedules and customer feedback loops." }
    ]
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
    tags: ["Team Structure", "Job Roles", "SOPs", "Efficiency"],
    executionPhases: [
      { phase: "01", title: "Workforce & Role Audit", desc: "Reviewing job descriptions, reporting lines, and operational overlap." },
      { phase: "02", title: "Hierarchical Architecture", desc: "Restructuring departments with clear decision authority and accountable metrics." },
      { phase: "03", title: "Performance Evaluation System", desc: "Deploying quarterly appraisal templates and departmental handover standards." }
    ]
  }
];

export const businessServicesAR: ServiceItem[] = [
  {
    id: "business-idea",
    category: "business",
    title: "تطوير نماذج وأفكار الأعمال",
    shortDescription: "تحويل المفاهيم التجارية الجديدة إلى خطط عمل مهيكلة وقابلة للتطبيق تجارياً.",
    fullDescription: "نقيّم الجدوى الاقتصادية لفكرتك التجارية، ونحلل حجم الطلب في السوق، ونحسب التكاليف التأسيسية والتشغيلية الواقعية، ونضع خطة إطلاق مرحلية تتيح لك الاستثمار بثقة.",
    iconName: "Sparkles",
    metrics: "خارطة طريق إطلاق متكاملة",
    deliverables: [
      "مراجعة الجدوى التجارية",
      "نموذج تقدير التكاليف والإيرادات",
      "الجدول الزمني للإطلاق خطوة بخطوة",
      "ملف العميل المستهدف وعرض القيمة"
    ],
    idealFor: "رواد الأعمال وأصحاب المشاريع والشركات التي تطلق منتجات أو خدمات جديدة.",
    duration: "3 - 6 أسابيع",
    tags: ["فكرة عمل", "دراسة جدوى", "تخطيط", "إطلاق تجاري"],
    executionPhases: [
      { phase: "01", title: "التحقق من الفكرة وحجم الطلب", desc: "تقييم احتياج السوق، واستعداد العملاء للشراء، ونمذجة التكاليف التأسيسية." },
      { phase: "02", title: "اقتصاديات الوحدة واستراتيجية التسعير", desc: "هيكلة هوامش الربح الإجمالية، وتكلفة اكتساب العملاء، وشرائح الأسعار." },
      { phase: "03", title: "مخطط الإطلاق التجاري", desc: "تسليم خطة تشغيلية تنفيذية كاملة بمراحل واضحة ومؤشرات أداء قابلة للقياس." }
    ]
  },
  {
    id: "market-analysis",
    category: "business",
    title: "تحليل السوق والأبحاث القطاعية",
    shortDescription: "أبحاث سوقية دقيقة حول المنافسين، الأسعار، اتجاهات المستهلكين، والفرص المتاحة محلياً.",
    fullDescription: "نجمع بيانات موثوقة حول سوقك المستهدف، ونحلل استراتيجيات المنافسين وأسعارهم، ونحدد الفجوات في العرض أو التسعير لمساعدتك على وضع تموضع تنافسي قوي.",
    iconName: "TrendingUp",
    metrics: "معايير قياس تنافسية دقيقة",
    deliverables: [
      "نظرة عامة على القطاع والصناعة",
      "مقارنة أسعار وعروض المنافسين",
      "استبيان طلب العملاء والجمهور المستهدف",
      "توصيات تنفيذية لدخول السوق"
    ],
    idealFor: "الشركات التي تسعى لدخول سوق جديد أو تعديل التسعير أو التميز عن المنافسين.",
    duration: "2 - 4 أسابيع",
    tags: ["تحليل السوق", "أبحاث", "منافسون", "تسعير"],
    executionPhases: [
      { phase: "01", title: "مسح وتحليل القطاع", desc: "جمع البيانات التجارية الميدانية الموثوقة واللوائح المنظمة ومؤشرات نمو الصناعة." },
      { phase: "02", title: "المقارنة المعيارية للمنافسين", desc: "تدقيق أسعار المنافسين المباشرين وغير المباشرين ومزاياهم وفجوات الخدمة لديهم." },
      { phase: "03", title: "التموضع الاستراتيجي", desc: "تحديد مزايا الدخول التجاري وفرص التميز والتفرد التنافسي في السوق." }
    ]
  },
  {
    id: "investment-planning",
    category: "business",
    title: "النمذجة المالية وإعداد الميزانيات",
    shortDescription: "توقعات مالية واقعية، إعداد الميزانيات، وملفات جاهزة للبنوك والمستثمرين.",
    fullDescription: "نبني توقعات مالية دقيقة، ونحلل متطلبات التدفق النقدي ورأس المال العامل، ونعد خطط عمل وعروض تقديمية تنفيذية للبنوك والمستثمرين والشركاء.",
    iconName: "BarChart3",
    metrics: "توقعات مالية لـ 3 سنوات",
    deliverables: [
      "نموذج توقعات مالية وتدفقات نقدية لـ 3 سنوات",
      "تفصيل الميزانية ورأس المال العامل",
      "خطة عمل وعرض تقديمي تنفيذي",
      "حساب نقطة التعادل والعائد على الاستثمار (ROI)"
    ],
    idealFor: "الشركات التي تسعى للحصول على تمويل بنكي أو استثمار أو تخطيط رأس المال الداخلي.",
    duration: "3 - 6 أسابيع",
    tags: ["استثمار", "نمذجة مالية", "ميزانيات", "خطة عمل"],
    executionPhases: [
      { phase: "01", title: "التدقيق المالي والتكاليف", desc: "تحليل محركات الإيرادات، والمصروفات الثابتة والمتغيرة، ودورة رأس المال العامل." },
      { phase: "02", title: "النمذجة المالية الديناميكية", desc: "بناء ملفات متكاملة لبيان الأرباح والخسائر والتدفقات النقدية لمدة 36 شهراً." },
      { phase: "03", title: "حقيبة المستثمرين والمصارف", desc: "إعداد الملخصات التنفيذية وجداول حساسية الأرباح وخطط سداد التمويل." }
    ]
  },
  {
    id: "business-growth",
    category: "business",
    title: "حلول الأعمال وتطوير المبيعات",
    shortDescription: "معالجة اختناقات البيع، زيادة ولاء العملاء، ورفع الإيرادات التجارية المتكررة.",
    fullDescription: "نراجع مسارات البيع الحالية، ونحدد نقاط تسرب العملاء، وندرّب فريق المبيعات على تقنيات التحويل المثبتة، ونبني إجراءات عمل عملية لزيادة ولاء العملاء وتكرار الشراء.",
    iconName: "Layers",
    metrics: "تحسين معدل تحويل المبيعات",
    deliverables: [
      "تدقيق مسار المبيعات ومراجعة نقاط الاختناق",
      "خطة اكتساب العملاء ومسار الفرص البيعية",
      "استراتيجية الاحتفاظ بالعملاء والشراء المتكرر",
      "إرشادات عملية لأداء فريق المبيعات"
    ],
    idealFor: "الشركات القائمة التي تسعى لزيادة المبيعات أو تحسين الاحتفاظ بالعملاء أو توسيع العمليات.",
    duration: "1 - 3 أشهر",
    tags: ["تنمية الأعمال", "مبيعات", "ولاء العملاء", "عمليات"],
    executionPhases: [
      { phase: "01", title: "تشخيص قنوات المبيعات", desc: "تتبع مسار توليد الفرص ونقاط انسحاب العملاء ومعدلات التحويل الفعلية." },
      { phase: "02", title: "إعادة هندسة الإجراءات البيعية", desc: "تحديث نصوص الإقناع وهياكل الحوافز وإجراءات تأهيل العملاء المحتملين." },
      { phase: "03", title: "التنفيذ والمتابعة الأسبوعية", desc: "تطبيق لوحات تتبع KPIs أسبوعية وتدريب الفرق الميدانية على إتمام الصفقات." }
    ]
  },
  {
    id: "global-business",
    category: "business",
    title: "الأعمال الإقليمية والتوسع الجغرافي",
    shortDescription: "إرشادات عملية لتأسيس العمليات الخارجية، إيجاد الشركاء، والتصدير الإقليمي.",
    fullDescription: "التوسع نحو مدن أو أسواق إقليمية جديدة يتطلب تخطيطاً دقيقاً. نساعدك على فهم اللوائح التجارية المحلية، وتقييم قنوات التوزيع، وإيجاد شركاء تجاريين وموزعين موثوقين.",
    iconName: "Cpu",
    metrics: "دعم مباشر لدخول الأسواق",
    deliverables: [
      "تقييم الجاهزية لدخول الأسواق الإقليمية",
      "قائمة التحقق للتأسيس التجاري المحلي",
      "استقطاب وتأهيل قنوات التوزيع والتوريد",
      "إرشادات العمليات التشغيلية عبر الحدود"
    ],
    idealFor: "الشركات الراغبة في التوسع إقليمياً في الأسواق المجاورة أو تصدير المنتجات.",
    duration: "2 - 4 أشهر",
    tags: ["أعمال دولية", "توسع إقليمي", "تجارة", "توزيع"],
    executionPhases: [
      { phase: "01", title: "التقييم الجمركي والتشغيلي", desc: "مراجعة متطلبات التأسيس، والتعرفات الجمركية، والقيود اللوجستية الإقليمية." },
      { phase: "02", title: "تأهيل الشركاء والموزعين", desc: "حصر وتقييم الشركاء التجاريين والتفاوض المبدئي على شروط التوزيع." },
      { phase: "03", title: "التشغيل والفوترة", desc: "تأسيس سلاسل الإمداد الإقليمية والتسعير المحلي وأنظمة التحصيل المالي." }
    ]
  },
  {
    id: "studies-research",
    category: "business",
    title: "الدراسات وأبحاث الجدوى الاقتصادية",
    shortDescription: "تحليلات سوقية دقيقة، نمذجة اقتصاديات الوحدة، ميزانيات الاستثمار، ودراسات جدوى تجارية للمشاريع والتوسعات الجديدة.",
    fullDescription: "نقدّم دراسات جدوى اقتصادية شاملة مبنية على بيانات واقعية من السوق المحلي، ومقارنات التكاليف واللوائح القانونية، ونماذج مالية متعددة السيناريوهات معتمدة للمصارف والمستثمرين.",
    iconName: "BarChart3",
    metrics: "دراسة جدوى بنكية متكاملة",
    deliverables: [
      "تقرير دراسة الجدوى التسويقية الشاملة",
      "دراسة المتطلبات الفنية والتشغيلية للمشروع",
      "تحليل الحساسية المالية والتدفقات النقدية",
      "مصفوفة إدارة المخاطر والامتثال النظامي"
    ],
    idealFor: "المؤسسات والمستثمرون الذين يخططون لاستثمارات رأسمالية كبرى أو مصانع أو قطاعات تجارية جديدة.",
    duration: "4 - 8 أسابيع",
    tags: ["دراسة جدوى", "أبحاث", "نمذجة مالية", "استثمار رأسمالي"],
    executionPhases: [
      { phase: "01", title: "تحديد النطاق والأبحاث الميدانية", desc: "حصر المحددات الفنية وتكاليف المواد الأولية والعوامل الجغرافية للمشروع." },
      { phase: "02", title: "النمذجة التجارية والاقتصادية", desc: "تقييم سيناريوهات الإيرادات، والجدول الزمني للوصول إلى نقطة التعادل، وفترة استرداد رأس المال." },
      { phase: "03", title: "التوثيق المؤسسي للاعتماد", desc: "تسليم ملفات الجدوى المعتمدة للبنوك والجهات التمويلية وصناديق الاستثمار." }
    ]
  }
];

export const consultancyServicesAR: ServiceItem[] = [
  {
    id: "strategic-consulting",
    category: "consultancy",
    title: "الاستشارات الإدارية والاستراتيجية",
    shortDescription: "مشورة موضوعية وتوجيه استراتيجي لأصحاب الأعمال والمديرين في القرارات الحيوية.",
    fullDescription: "عندما تصل شركتك إلى نقطة تحول—سواء لإعادة الهيكلة أو إطلاق قطاع جديد أو معالجة معوقات الأداء—نقدّم استشارات متمرسة ومحايدة لترشيد قراراتك وقيادة النمو.",
    iconName: "ShieldCheck",
    metrics: "خرائط طريق تنفيذية واضحة",
    deliverables: [
      "مراجعة شاملة للصحة المؤسسية والتشغيلية",
      "مصفوفة الأولويات الاستراتيجية وبنود العمل",
      "تخطيط وتوزيع الموارد على الأقسام",
      "جلسات استشارية تنفيذية نصف شهرية"
    ],
    idealFor: "أصحاب الشركات والمدراء التنفيذيين والشركاء الباحثين عن اتجاه استراتيجي ثابت.",
    duration: "استشارات مستمرة أو 2 - 4 أشهر",
    tags: ["استشارات", "إدارة", "استراتيجية", "صحة الأعمال"],
    executionPhases: [
      { phase: "01", title: "التشخيص والمواءمة القيادية", desc: "مقابلات تنفيذية، وتقييم ميداني للعمليات، وتحديد الأولويات الاستراتيجية." },
      { phase: "02", title: "صياغة خارطة الطريق", desc: "وضع الجداول الزمنية ومؤشرات الأداء المؤسسية (OKRs) وأطر الحوكمة." },
      { phase: "03", title: "الإشراف على التنفيذ", desc: "جلسات توجيه دورية مع الإدارة العليا لضمان التنسيق والمساءلة بين الأقسام." }
    ]
  },
  {
    id: "projects-management",
    category: "consultancy",
    title: "إدارة المشاريع والتميز التشغيلي",
    shortDescription: "خدمات إدارة المشاريع وتطبيق منهجية اللين ستة سيجما لضمان تنفيذ المبادرات بكفاءة وفي الوقت المحدد وضمن الميزانية.",
    fullDescription: "بإشراف مستشارين معتمدين بشهادات PMP و Master Black Belt في اللين ستة سيجما، نساعد الشركات على بناء حوكمة المشاريع، وإلغاء الهدر التشغيلي، وضمان الالتزام الصارم بالميزانيات والجداول الزمنية.",
    iconName: "Target",
    metrics: "تنفيذ رشيق وخالٍ من الهدر",
    deliverables: [
      "ميثاق المشروع (Project Charter) وهيكل تجزئة العمل (WBS)",
      "تحليل العمليات بمنهجية اللين ستة سيجما (DMAIC)",
      "تخطيط الموارد والجداول الزمنية (Gantt Charts)",
      "بروتوكول بوابات الجودة ومراجعة المخرجات"
    ],
    idealFor: "الشركات الصناعية، والمطورون، والمؤسسات التي تدير مشاريع متعددة الأطراف.",
    duration: "1 - 6 أشهر",
    tags: ["إدارة مشاريع", "لين ستة سيجما", "ضبط الجودة", "PMP"],
    executionPhases: [
      { phase: "01", title: "ميثاق المشروع وخريطة تدفق القيمة", desc: "تحديد نطاق العمل والمسار الحرج وإلغاء التعقيدات الإجرائية." },
      { phase: "02", title: "تطبيق منهجية DMAIC", desc: "قياس الانحرافات التشغيلية وتحليل الأسباب الجذرية وتقليص الهدر." },
      { phase: "03", title: "التحكم والضبط المستمر", desc: "إرساء لوحات التحكم، وإجراءات التشغيل القياسية (SOPs)، وتسليم القيادة للفريق الداخلي." }
    ]
  },
  {
    id: "process-transformation",
    category: "consultancy",
    title: "تحول العمليات وتطبيق أنظمة ERP",
    shortDescription: "تبسيط العمليات التشغيلية، تقليص الهدر، والإشراف على تطبيق برمجيات تخطيط موارد المؤسسات لتحقيق أعلى إنتاجية.",
    fullDescription: "نقوم بإعادة هندسة العمليات المؤسسية قبل التحول الرقمي لإلغاء الخطوات الفائضة وضمان أن أنظمة ERP (مثل SAP، Oracle، Odoo، والأنظمة المخصصة) تعكس أفضل الممارسات التشغيلية بدلاً من أتمتة إجراءات غير فعالة.",
    iconName: "Cpu",
    metrics: "أنظمة ERP مؤسسية متكاملة",
    deliverables: [
      "مخطط العمليات الحالي والمستقبلي (As-Is vs To-Be)",
      "وثيقة المتطلبات الوظيفية للأنظمة (FRS)",
      "اختيار مزودي البرمجيات والإشراف على التنفيذ",
      "اختبارات قبول المستخدم (UAT) وأدلة التدريب القياسية"
    ],
    idealFor: "الشركات النامية التي تقوم بترقية أنظمتها المحاسبية أو الإدارية القديمة إلى برمجيات ERP حديثة.",
    duration: "2 - 6 أشهر",
    tags: ["ERP", "تحول العمليات", "أنظمة رقمية", "أتمتة"],
    executionPhases: [
      { phase: "01", title: "تشخيص الإجراءات الحالية", desc: "توثيق سلاسل الموافقات والتسليم بين الإدارات ونقاط التعطل." },
      { phase: "02", title: "تصميم العمليات المستقبلية و FRS", desc: "ابتكار مسارات عمل مبسطة وصياغة المواصفات التقنية لمطوري البرمجيات." },
      { phase: "03", title: "الإشراف وإدارة التغيير", desc: "متابعة ترحيل البيانات، وتدريب الكوادر، وضمان الاستقرار بعد إطلاق النظام." }
    ]
  },
  {
    id: "risk-management",
    category: "consultancy",
    title: "إدارة المخاطر والامتثال المؤسسي",
    shortDescription: "تحديد المخاطر المالية والتشغيلية والنظامية قبل تحولها إلى أزمات.",
    fullDescription: "نراجع عقودك التجارية وإجراءاتك التشغيلية ومتطلبات الامتثال لحصر الالتزامات المحتملة ووضع الضوابط الوقائية لحماية أصول الشركة واستمرارية أعمالها.",
    iconName: "Scale",
    metrics: "قائمة تدقيق شاملة للمخاطر",
    deliverables: [
      "تدقيق المخاطر التشغيلية والمالية",
      "تقييم الامتثال التنظيمي والنظامي",
      "ضوابط وإجراءات حماية العمليات الداخلية",
      "إرشادات الطوارئ واستمرارية الأعمال"
    ],
    idealFor: "الشركات النامية الساعية لضمان الامتثال وحماية التدفق النقدي وتجنب النزاعات القانونية.",
    duration: "3 - 5 أسابيع",
    tags: ["إدارة المخاطر", "امتثال", "ضوابط", "حماية"],
    executionPhases: [
      { phase: "01", title: "حصر المخاطر والتعرضات", desc: "مراجعة الالتزامات التعاقدية والإيداعات النظامية ونقاط الانكشاف المالي." },
      { phase: "02", title: "تصميم الضوابط الوقائية", desc: "صياغة مصفوفات الصلاحيات وقوائم التحقق وجداول التدقيق الدوري." },
      { phase: "03", title: "بروتوكول استمرارية الأعمال", desc: "وضع خطط طوارئ تنفيذية وإجراءات حماية التدفقات التشغيلية." }
    ]
  },
  {
    id: "success-reports",
    category: "consultancy",
    title: "تقارير الأداء وتحليلات الأعمال",
    shortDescription: "تتبع واضح للأداء وتقارير شهرية واقعية لمؤشرات الأداء الرئيسية (KPIs).",
    fullDescription: "توقف عن التخمين في أداء شركتك. نساعدك على إعداد لوحات تتبع واضحة للإيرادات والمصروفات وإنتاجية الموظفين وتكاليف اكتساب العملاء عبر مؤشرات سهلة وموثوقة.",
    iconName: "BrainCircuit",
    metrics: "متابعة شهرية واضحة للأداء",
    deliverables: [
      "إعداد لوحة مخصصة لمؤشرات أداء الأعمال (KPIs)",
      "تقارير أداء شهرية وربع سنوية",
      "تحليل مراكز التكلفة والمصروفات العامة",
      "توصيات تنفيذية مستندة إلى البيانات"
    ],
    idealFor: "أصحاب الأعمال والمدراء الراغبين في تقارير شفافة ومباشرة دون مصطلحات معقدة.",
    duration: "2 - 4 أسابيع للإعداد",
    tags: ["تقارير أداء", "تحليلات", "KPIs", "تتبع"],
    executionPhases: [
      { phase: "01", title: "تحديد المؤشرات المحورية", desc: "عزل أهم 5 إلى 10 مؤشرات رقمية تقود الربحية ورضا العملاء." },
      { phase: "02", title: "هندسة لوحات البيانات", desc: "ربط مصادر البيانات وتجهيز لوحات مرئية واضحة لصناع القرار." },
      { phase: "03", title: "مراجعة الأداء الدورية", desc: "عقد اجتماعات تقييم شهرية منتظمة لتحليل الانحرافات واتخاذ القرارات التصحيحية." }
    ]
  },
  {
    id: "customer-prioritization",
    category: "consultancy",
    title: "تصنيف العملاء وأبحاث القيمة",
    shortDescription: "تحديد العملاء الأكثر ربحية ورفع مستوى رضاهم واستبقائهم.",
    fullDescription: "تحقق معظم الشركات 80% من أرباحها من 20% من عملائها. نساعدك على تحليل قاعدة عملائك لتحديد الحسابات الأكثر قيمة وبناء استراتيجيات لضمان ولائهم واستمرار تعاملهم.",
    iconName: "Users",
    metrics: "تقسيم واضح لشرائح العملاء",
    deliverables: [
      "تحليل ربحية شرائح العملاء",
      "مراجعة ملاحظات العملاء ومستوى الرضا",
      "إرشادات إدارة الحسابات الاستراتيجية",
      "خطة عمل للاحتفاظ بالعملاء المميزين"
    ],
    idealFor: "شركات الخدمات والتجارة والأعمال (B2B) التي تدير حسابات عملاء متعددة.",
    duration: "3 - 5 أسابيع",
    tags: ["أبحاث العملاء", "حسابات كبرى", "استبقاء", "رضا العملاء"],
    executionPhases: [
      { phase: "01", title: "تحليل باريتو وهوامش المساهمة", desc: "حساب صافي الهوامش الربحية لكل شريحة عملاء وتصنيف الحسابات الكبرى." },
      { phase: "02", title: "دليل إدارة الحسابات الاستراتيجية", desc: "تحديد مستويات الخدمة المخصصة (SLAs) وبروتوكولات الرعاية للحسابات المميزة." },
      { phase: "03", title: "توسيع الإيرادات والولاء", desc: "هيكلة برامج المبيعات الإضافية والمتابعة المستمرة لرضا العملاء." }
    ]
  },
  {
    id: "leadership-advisory",
    category: "consultancy",
    title: "الهيكل التنظيمي والقيادة التشغيلية",
    shortDescription: "تنظيم الهيكل الإداري، توضيح المهام الوظيفية، ورفع كفاءة التنسيق بين الأقسام.",
    fullDescription: "مع نمو فريق العمل، قد يؤدي تداخل المسؤوليات إلى تباطؤ العمليات. نساعدك على بناء هيكل تنظيمي واضح، وتحديد بطاقات الوصف الوظيفي، وتحديد مؤشرات أداء دقيقة لكل وظيفة.",
    iconName: "GitMerge",
    metrics: "مسؤوليات وظيفية محددة بدقة",
    deliverables: [
      "الهيكل التنظيمي وبطاقات الوصف الوظيفي",
      "إرشادات تقييم أداء الموظفين",
      "إجراءات التسليم المتبادل بين الأقسام (SOPs)",
      "بروتوكولات التواصل والتنسيق الإداري"
    ],
    idealFor: "الشركات التي توسع فريق عملها أو تواجه اختناقات في التواصل الداخلي.",
    duration: "1 - 2 أشهر",
    tags: ["هيكل تنظيمي", "أدوار وظيفية", "إجراءات قياسية", "كفاءة"],
    executionPhases: [
      { phase: "01", title: "تدقيق الأدوار وتوزيع المهام", desc: "مراجعة التوصيف الوظيفي وخطوط التبعية وحصر الازدواجية التشغيلية." },
      { phase: "02", title: "بناء الهيكل الإداري والمصفوفات", desc: "إعادة هيكلة الأقسام مع تحديد صلاحيات اتخاذ القرار ومؤشرات المساءلة." },
      { phase: "03", title: "نظام تقييم الأداء والتسليم", desc: "تطبيق نماذج التقييم الفصلي ومعايير التسليم القياسية بين الإدارات." }
    ]
  }
];

export function getBusinessServices(lang: Language = "en"): ServiceItem[] {
  return lang === "ar" ? businessServicesAR : businessServicesEN;
}

export function getConsultancyServices(lang: Language = "en"): ServiceItem[] {
  return lang === "ar" ? consultancyServicesAR : consultancyServicesEN;
}

export function getServices(lang: Language = "en"): ServiceItem[] {
  return lang === "ar" 
    ? [...businessServicesAR, ...consultancyServicesAR]
    : [...businessServicesEN, ...consultancyServicesEN];
}

export function getServiceById(id: string, lang: Language = "en"): ServiceItem | undefined {
  const list = getServices(lang);
  return list.find((s) => s.id === id);
}

// Static fallbacks
export const businessServices = businessServicesEN;
export const consultancyServices = consultancyServicesEN;
export const allServices = [...businessServicesEN, ...consultancyServicesEN];
