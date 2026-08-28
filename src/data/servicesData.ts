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
    tags: ["فكرة عمل", "دراسة جدوى", "تخطيط", "إطلاق تجاري"]
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
    tags: ["تحليل السوق", "أبحاث", "منافسون", "تسعير"]
  },
  {
    id: "investment-planning",
    category: "business",
    title: "التخطيط الاستثماري والنمذجة المالية",
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
    tags: ["استثمار", "نمذجة مالية", "ميزانيات", "خطة عمل"]
  },
  {
    id: "business-growth",
    category: "business",
    title: "تنمية الأعمال وتحسين المبيعات",
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
    tags: ["تنمية الأعمال", "مبيعات", "ولاء العملاء", "عمليات"]
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
    tags: ["أعمال دولية", "توسع إقليمي", "تجارة", "توزيع"]
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
    tags: ["استشارات", "إدارة", "استراتيجية", "صحة الأعمال"]
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
    tags: ["إدارة المخاطر", "امتثال", "ضوابط", "حماية"]
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
    tags: ["تقارير أداء", "تحليلات", "KPIs", "تتبع"]
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
    tags: ["أبحاث العملاء", "حسابات كبرى", "استبقاء", "رضا العملاء"]
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
    tags: ["هيكل تنظيمي", "أدوار وظيفية", "إجراءات قياسية", "كفاءة"]
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

// Fallback static export for backward compatibility
export const businessServices = businessServicesEN;
export const consultancyServices = consultancyServicesEN;
export const allServices = [...businessServicesEN, ...consultancyServicesEN];
