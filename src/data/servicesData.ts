import { Language } from "./translations";

/**
 * Factual Solutions — "What We Do"
 * Three service lines (Consulting, Training, ERP & Digital Transformation),
 * each broken into categories. Every category is a service page at /services/[id].
 */

export type ServiceCategory = "consulting" | "training" | "digital";

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  /** Service-line label shown as a tag (e.g. "Consulting") */
  metrics: string;
  /** Everything this category covers */
  deliverables: string[];
  idealFor: string;
  /** Engagement format (e.g. "Consulting Engagement") */
  duration: string;
  tags: string[];
  executionPhases?: { phase: string; title: string; desc: string }[];
}

export interface ServicePillar {
  id: ServiceCategory;
  title: string;
  tagline: string;
  intro: string;
}

/* ------------------------------------------------------------------ */
/* Shared phases per service line                                      */
/* ------------------------------------------------------------------ */
export const PHASES_EN = {
  consulting: [
    { phase: "01", title: "Understand & Measure", desc: "We map the current process and measure performance first—analyzing rigorously and recommending based on evidence, not assumptions." },
    { phase: "02", title: "Improve & Implement", desc: "We apply the method that fits the problem and work with your teams to put the improvement into practice where the work happens." },
    { phase: "03", title: "Sustain & Build Capability", desc: "We embed standards, measures, and ownership so your teams can continue improving long after the engagement ends." },
  ],
  training: [
    { phase: "01", title: "Align to Your Needs", desc: "We agree the learning objectives and tailor the content to your organization, industry, and participants." },
    { phase: "02", title: "Practical Learning", desc: "Proven methods taught by practitioners, with hands-on exercises built around real processes and real constraints." },
    { phase: "03", title: "Apply & Sustain", desc: "Participants apply the tools to their own work so new skills turn into measurable improvement." },
  ],
  digital: [
    { phase: "01", title: "Process First", desc: "We map, challenge, and improve the process before configuring any system—so technology supports good practice instead of automating waste." },
    { phase: "02", title: "Configure & Build", desc: "We translate operational requirements into practical systems, workflows, and reports around the way your organization works." },
    { phase: "03", title: "Go Live, Train & Optimize", desc: "Testing, go-live support, user training, and continuous improvement based on real performance data." },
  ],
};

export const PHASES_AR = {
  consulting: [
    { phase: "01", title: "الفهم والقياس", desc: "نرسم العملية الحالية ونقيس الأداء أولاً، ثم نحلل بدقة ونقدّم توصياتنا بناءً على الأدلة لا الافتراضات." },
    { phase: "02", title: "التحسين والتنفيذ", desc: "نطبّق المنهجية المناسبة للمشكلة ونعمل مع فرقكم لتحويل التحسين إلى واقع في موقع العمل." },
    { phase: "03", title: "الاستدامة وبناء القدرات", desc: "نرسّخ المعايير والمؤشرات والمسؤولية لتواصل فرقكم التحسين بعد انتهاء المشروع." },
  ],
  training: [
    { phase: "01", title: "المواءمة مع احتياجاتكم", desc: "نحدد أهداف التعلم ونكيّف المحتوى بما يناسب مؤسستكم وقطاعكم والمشاركين." },
    { phase: "02", title: "تعلّم عملي", desc: "منهجيات مثبتة يقدّمها ممارسون، مع تمارين تطبيقية مبنية على عمليات وتحديات حقيقية." },
    { phase: "03", title: "التطبيق والاستدامة", desc: "يطبّق المشاركون الأدوات على أعمالهم لتتحول المهارات الجديدة إلى تحسين ملموس." },
  ],
  digital: [
    { phase: "01", title: "العملية أولاً", desc: "نرسم العملية ونراجعها ونحسّنها قبل إعداد أي نظام، لتدعم التقنية الممارسات الجيدة بدلاً من أتمتة الهدر." },
    { phase: "02", title: "الإعداد والبناء", desc: "نحوّل المتطلبات التشغيلية إلى أنظمة وسير عمل وتقارير عملية تناسب طريقة عمل مؤسستكم." },
    { phase: "03", title: "الإطلاق والتدريب والتحسين", desc: "الاختبار ودعم الإطلاق وتدريب المستخدمين والتحسين المستمر بناءً على بيانات الأداء الفعلية." },
  ],
};

/* ------------------------------------------------------------------ */
/* Service lines                                                       */
/* ------------------------------------------------------------------ */
export const servicePillarsEN: ServicePillar[] = [
  {
    id: "consulting",
    title: "Consulting",
    tagline: "Identify what needs to change—and make it work in practice.",
    intro: "Consulting identifies what needs to change. We combine proven management methods with practical implementation and measurable improvement.",
  },
  {
    id: "training",
    title: "Training",
    tagline: "Build the capability to change it.",
    intro: "Training builds the capability to change it. Practical programs delivered by practitioners, so your teams can keep improving on their own.",
  },
  {
    id: "digital",
    title: "ERP & Digital Transformation",
    tagline: "Technology should make better processes easier to run, measure, and improve.",
    intro: "We help organizations translate operational requirements into practical digital systems—from ERP implementation and workflow automation to purpose-built software.",
  },
];

export const servicePillarsAR: ServicePillar[] = [
  {
    id: "consulting",
    title: "الاستشارات",
    tagline: "نحدد ما يجب تغييره، ونجعله ينجح على أرض الواقع.",
    intro: "تحدد الاستشارات ما يجب تغييره. نجمع بين أساليب إدارية مثبتة وتنفيذ عملي وتحسين قابل للقياس.",
  },
  {
    id: "training",
    title: "التدريب",
    tagline: "نبني القدرة على إحداث التغيير.",
    intro: "يبني التدريب القدرة على التغيير. برامج عملية يقدّمها ممارسون لتتمكن فرقكم من مواصلة التحسين بنفسها.",
  },
  {
    id: "digital",
    title: "تخطيط موارد المؤسسة والتحول الرقمي",
    tagline: "يجب أن تجعل التقنية العمليات الأفضل أسهل في التشغيل والقياس والتحسين.",
    intro: "نساعد المؤسسات على تحويل متطلباتها التشغيلية إلى أنظمة رقمية عملية، من تطبيق أنظمة ERP وأتمتة سير العمل إلى البرمجيات المصممة خصيصاً.",
  },
];

/* ------------------------------------------------------------------ */
/* English                                                             */
/* ------------------------------------------------------------------ */
export const consultingServicesEN: ServiceItem[] = [
  {
    id: "operational-excellence",
    category: "consulting",
    title: "Operational Excellence",
    shortDescription: "Lean, Six Sigma, planning, and process improvement that raise productivity where the work actually happens.",
    fullDescription: "We help organizations remove waste, reduce variation, and run operations more predictably. Drawing on Lean, the Toyota Production System, and Six Sigma, we map and re-engineer processes, strengthen production planning and supply chains, and improve productivity and yield on the shop floor.",
    iconName: "Layers",
    metrics: "Consulting",
    deliverables: [
      "Lean, Six Sigma & Operational Excellence",
      "Production Planning & Control (PPC)",
      "Process Re-engineering & Business Process Mapping",
      "Supply Chain Management",
      "Productivity & Yield Improvement",
    ],
    idealFor: "Manufacturing and service organizations that want higher productivity, shorter lead times, and more predictable operations.",
    duration: "Consulting Engagement",
    tags: ["Lean", "Six Sigma", "PPC", "Process Mapping", "Supply Chain", "Productivity"],
    executionPhases: PHASES_EN.consulting,
  },
  {
    id: "strategy-performance",
    category: "consulting",
    title: "Strategy & Performance",
    shortDescription: "Clear direction, strategic plans, and performance systems that connect goals to daily work.",
    fullDescription: "We help leadership teams define where the organization is going and how progress will be measured—from mission, vision, and SWOT analysis to strategic plans and Balanced Scorecard performance management.",
    iconName: "Target",
    metrics: "Consulting",
    deliverables: [
      "Strategy & Performance Management",
      "Balanced Scorecard",
      "Mission, Vision & Strategic Planning",
      "SWOT & Organizational Analysis",
    ],
    idealFor: "Leadership teams that need a clear strategy and a practical way to track and manage performance.",
    duration: "Consulting Engagement",
    tags: ["Strategy", "Balanced Scorecard", "Strategic Planning", "SWOT", "KPIs"],
    executionPhases: PHASES_EN.consulting,
  },
  {
    id: "quality-risk-compliance",
    category: "consulting",
    title: "Quality, Risk & Compliance",
    shortDescription: "Quality systems, standard procedures, and risk controls that make performance consistent and auditable.",
    fullDescription: "We design and strengthen quality management systems, standardize processes through clear SOPs, and apply risk management, FMEA, and statistical process control so quality is built into the process rather than inspected in.",
    iconName: "ShieldCheck",
    metrics: "Consulting",
    deliverables: [
      "Quality Management Systems",
      "SOP Development & Process Standardization",
      "Risk Management & FMEA",
      "Statistical Process Control (SPC)",
      "Quality Improvement & Control Systems",
    ],
    idealFor: "Organizations that need consistent quality, documented standards, and better control of operational risk.",
    duration: "Consulting Engagement",
    tags: ["Quality", "SOPs", "Risk Management", "FMEA", "SPC", "Compliance"],
    executionPhases: PHASES_EN.consulting,
  },
  {
    id: "operations-maintenance",
    category: "consulting",
    title: "Operations & Maintenance",
    shortDescription: "Reliable equipment, organized workplaces, and safer, more efficient operations.",
    fullDescription: "We improve equipment reliability and workplace efficiency through Total Productive Maintenance, 5S workplace organization, maintenance and reliability practices, energy efficiency, and ergonomics and occupational health and safety.",
    iconName: "Cpu",
    metrics: "Consulting",
    deliverables: [
      "Total Productive Maintenance (TPM)",
      "Workplace Organization (5S)",
      "Machine Maintenance & Reliability",
      "Energy Conservation & Efficiency",
      "Ergonomics, Occupational Health & Safety",
    ],
    idealFor: "Plants and facilities looking to reduce downtime, energy costs, and safety risks.",
    duration: "Consulting Engagement",
    tags: ["TPM", "5S", "Maintenance", "Reliability", "Energy", "Health & Safety"],
    executionPhases: PHASES_EN.consulting,
  },
  {
    id: "people-organizational-development",
    category: "consulting",
    title: "People & Organizational Development",
    shortDescription: "Competencies, assessments, and change management that help people make improvement stick.",
    fullDescription: "Even the best-designed improvement can fail if people aren't ready for it. We build competency frameworks, assess HR and organizational effectiveness, measure employee and customer satisfaction, and lead change using the ADKAR model.",
    iconName: "Users",
    metrics: "Consulting",
    deliverables: [
      "Competency Frameworks",
      "HR & Organizational Assessments",
      "Employee & Customer Satisfaction Surveys",
      "Change Management (ADKAR)",
    ],
    idealFor: "Organizations going through change, growth, or restructuring that need engaged, capable people.",
    duration: "Consulting Engagement",
    tags: ["HR", "Competencies", "Surveys", "ADKAR", "Change Management"],
    executionPhases: PHASES_EN.consulting,
  },
];

export const trainingServicesEN: ServiceItem[] = [
  {
    id: "training-project-strategy",
    category: "training",
    title: "Project & Strategy Training",
    shortDescription: "PMP preparation, project management, and strategy programs for managers and project teams.",
    fullDescription: "Practical training in managing projects and strategy—from PMP exam preparation and project management fundamentals to project cycle management, logframes, Balanced Scorecard performance management, and business model development.",
    iconName: "Compass",
    metrics: "Training",
    deliverables: [
      "PMP Preparatory Training",
      "Project Management Crash Course",
      "Project Cycle Management & Logframe",
      "Performance Management Using the Balanced Scorecard",
      "Business Model Development",
    ],
    idealFor: "Project managers, team leads, and managers responsible for planning and delivering results.",
    duration: "Training Program",
    tags: ["PMP", "Project Management", "Logframe", "Balanced Scorecard", "Business Model"],
    executionPhases: PHASES_EN.training,
  },
  {
    id: "training-lean-quality",
    category: "training",
    title: "Lean & Quality Training",
    shortDescription: "Lean Six Sigma belts, 5S, TPM, SPC, and quality tools for continuous improvement teams.",
    fullDescription: "Hands-on programs in Lean and quality—from Lean Six Sigma Green and Black Belt to 5S, TPM, statistical process control, data analysis with the 7 quality tools, quality control circles, and yield and productivity improvement.",
    iconName: "BarChart3",
    metrics: "Training",
    deliverables: [
      "Lean Six Sigma Green Belt",
      "Lean Six Sigma Black Belt",
      "5S Workplace Organization",
      "Total Productive Maintenance (TPM)",
      "Statistical Process Control (SPC)",
      "Data Analysis & the 7 Quality Tools",
      "Quality Control Circles",
      "Yield & Productivity Improvement",
    ],
    idealFor: "Engineers, supervisors, and quality and improvement teams who lead change on the shop floor.",
    duration: "Training Program",
    tags: ["Lean Six Sigma", "Green Belt", "Black Belt", "5S", "TPM", "SPC", "Quality Tools"],
    executionPhases: PHASES_EN.training,
  },
  {
    id: "training-operations-risk",
    category: "training",
    title: "Operations & Risk Training",
    shortDescription: "Planning, process mapping, risk analysis, and problem-solving skills for operations teams.",
    fullDescription: "Practical training for running operations well and managing risk—production planning and control, business process mapping, risk management and FMEA, TRIZ problem solving, and occupational health and safety.",
    iconName: "Scale",
    metrics: "Training",
    deliverables: [
      "Production Planning & Control (PPC)",
      "Business Process Mapping",
      "Risk Management & FMEA",
      "TRIZ Problem Solving",
      "Occupational Health & Safety",
    ],
    idealFor: "Operations, planning, and safety staff who need practical tools for day-to-day decisions.",
    duration: "Training Program",
    tags: ["PPC", "Process Mapping", "FMEA", "TRIZ", "Health & Safety"],
    executionPhases: PHASES_EN.training,
  },
  {
    id: "training-people-performance",
    category: "training",
    title: "People & Performance Training",
    shortDescription: "Change management, time management, and stress management for people at every level.",
    fullDescription: "Programs that help people perform at their best and adapt to change—change management with ADKAR, strategic time management, and workplace stress management.",
    iconName: "Sparkles",
    metrics: "Training",
    deliverables: [
      "Change Management (ADKAR)",
      "Strategic Time Management",
      "Workplace Stress Management",
    ],
    idealFor: "Managers and employees navigating change, heavy workloads, or new ways of working.",
    duration: "Training Program",
    tags: ["ADKAR", "Change Management", "Time Management", "Stress Management"],
    executionPhases: PHASES_EN.training,
  },
];

export const digitalServicesEN: ServiceItem[] = [
  {
    id: "erp-implementation",
    category: "digital",
    title: "ERP Implementation",
    shortDescription: "ERP systems configured around the way your organization operates—without unnecessary complexity.",
    fullDescription: "We configure and implement ERP systems around the way your organization operates, rather than forcing teams into unnecessary complexity. From requirements and process alignment to data migration, go-live, and training, we deliver ERPNext functional and technical implementation end to end.",
    iconName: "Cpu",
    metrics: "ERP & Digital",
    deliverables: [
      "ERP configuration and business process alignment",
      "ERPNext functional and technical implementation",
      "Requirements gathering and process analysis",
      "Module configuration and system setup",
      "Master data structure and data migration",
      "User roles, permissions, and approval workflows",
      "Reports, dashboards, and management information systems",
      "Integration with existing systems and applications",
      "Testing, user acceptance testing (UAT), and go-live support",
      "User training, documentation, and knowledge transfer",
      "Post-implementation optimization and continuous improvement",
    ],
    idealFor: "Organizations moving to an ERP, or getting more value from an existing one such as ERPNext.",
    duration: "Implementation Project",
    tags: ["ERP", "ERPNext", "Data Migration", "Dashboards", "Integration", "UAT"],
    executionPhases: PHASES_EN.digital,
  },
  {
    id: "workflow-automation",
    category: "digital",
    title: "Workflow Automation",
    shortDescription: "Turn manual processes into structured, trackable digital workflows.",
    fullDescription: "We design and implement workflows that reduce unnecessary manual work, improve accountability, and give management better visibility into operations—with digital approvals, escalations, audit trails, and live status tracking.",
    iconName: "GitMerge",
    metrics: "ERP & Digital",
    deliverables: [
      "Business process and workflow mapping",
      "Digital approval and authorization workflows",
      "Task assignment, escalation, and notifications",
      "Multi-level approval systems",
      "Document and record management workflows",
      "Automated data collection and validation",
      "Workflow dashboards and status tracking",
      "Integration between departments and business functions",
      "Process controls, audit trails, and accountability",
      "Workflow optimization based on performance data",
    ],
    idealFor: "Teams slowed down by paper, email chains, and spreadsheets who need clear approvals and visibility.",
    duration: "Implementation Project",
    tags: ["Workflow", "Automation", "Approvals", "Audit Trail", "Dashboards"],
    executionPhases: PHASES_EN.digital,
  },
  {
    id: "custom-software-development",
    category: "digital",
    title: "Custom Software Development",
    shortDescription: "Software built around specific business requirements when standard ERP functionality is not enough.",
    fullDescription: "When standard ERP functionality is not enough, we develop software solutions around specific business requirements—business applications and portals, web and mobile apps, dashboards, integrations, and custom ERPNext modules, through to deployment and support.",
    iconName: "BrainCircuit",
    metrics: "ERP & Digital",
    deliverables: [
      "Custom business applications and internal portals",
      "Web-based management systems",
      "Mobile and field-service applications",
      "Customer and employee portals",
      "Custom dashboards and reporting systems",
      "API development and system integrations",
      "Database design and application architecture",
      "Legacy-system modernization",
      "Custom modules and extensions for ERPNext",
      "Software testing, deployment, maintenance, and support",
    ],
    idealFor: "Organizations with specific needs that off-the-shelf systems don't cover.",
    duration: "Development Project",
    tags: ["Custom Software", "Web Apps", "Mobile Apps", "APIs", "ERPNext Modules", "Portals"],
    executionPhases: PHASES_EN.digital,
  },
];

/* ------------------------------------------------------------------ */
/* Arabic                                                              */
/* ------------------------------------------------------------------ */
export const consultingServicesAR: ServiceItem[] = [
  {
    id: "operational-excellence",
    category: "consulting",
    title: "التميز التشغيلي",
    shortDescription: "منهجيات لين وستة سيجما والتخطيط وتحسين العمليات لرفع الإنتاجية حيث يتم العمل فعلياً.",
    fullDescription: "نساعد المؤسسات على إزالة الهدر وتقليل التباين وإدارة العمليات بشكل أكثر انتظاماً. بالاعتماد على منهجية لين ونظام تويوتا للإنتاج وستة سيجما، نرسم العمليات ونعيد هندستها، ونعزز تخطيط الإنتاج وسلاسل الإمداد، ونحسّن الإنتاجية والمردود في مواقع العمل.",
    iconName: "Layers",
    metrics: "الاستشارات",
    deliverables: [
      "لين وستة سيجما والتميز التشغيلي",
      "تخطيط الإنتاج والتحكم فيه (PPC)",
      "إعادة هندسة العمليات ورسم عمليات الأعمال",
      "إدارة سلسلة الإمداد",
      "تحسين الإنتاجية والمردود",
    ],
    idealFor: "المؤسسات الصناعية والخدمية التي تسعى إلى إنتاجية أعلى وزمن تنفيذ أقصر وعمليات أكثر انتظاماً.",
    duration: "مشروع استشاري",
    tags: ["لين", "ستة سيجما", "تخطيط الإنتاج", "رسم العمليات", "سلسلة الإمداد", "الإنتاجية"],
    executionPhases: PHASES_AR.consulting,
  },
  {
    id: "strategy-performance",
    category: "consulting",
    title: "الاستراتيجية والأداء",
    shortDescription: "توجه واضح وخطط استراتيجية وأنظمة أداء تربط الأهداف بالعمل اليومي.",
    fullDescription: "نساعد فرق القيادة على تحديد وجهة المؤسسة وكيفية قياس التقدم، بدءاً من الرسالة والرؤية وتحليل SWOT وصولاً إلى الخطط الاستراتيجية وإدارة الأداء باستخدام بطاقة الأداء المتوازن.",
    iconName: "Target",
    metrics: "الاستشارات",
    deliverables: [
      "إدارة الاستراتيجية والأداء",
      "بطاقة الأداء المتوازن",
      "الرسالة والرؤية والتخطيط الاستراتيجي",
      "تحليل SWOT والتحليل المؤسسي",
    ],
    idealFor: "فرق القيادة التي تحتاج إلى استراتيجية واضحة وطريقة عملية لمتابعة الأداء وإدارته.",
    duration: "مشروع استشاري",
    tags: ["الاستراتيجية", "بطاقة الأداء المتوازن", "التخطيط الاستراتيجي", "SWOT", "مؤشرات الأداء"],
    executionPhases: PHASES_AR.consulting,
  },
  {
    id: "quality-risk-compliance",
    category: "consulting",
    title: "الجودة والمخاطر والامتثال",
    shortDescription: "أنظمة جودة وإجراءات معيارية وضوابط للمخاطر تجعل الأداء ثابتاً وقابلاً للتدقيق.",
    fullDescription: "نصمم أنظمة إدارة الجودة ونعززها، ونوحّد العمليات عبر إجراءات تشغيل معيارية واضحة، ونطبّق إدارة المخاطر وتحليل FMEA والتحكم الإحصائي في العمليات لتكون الجودة جزءاً من العملية لا مجرد فحص لاحق.",
    iconName: "ShieldCheck",
    metrics: "الاستشارات",
    deliverables: [
      "أنظمة إدارة الجودة",
      "إعداد إجراءات التشغيل المعيارية وتوحيد العمليات",
      "إدارة المخاطر وتحليل FMEA",
      "التحكم الإحصائي في العمليات (SPC)",
      "أنظمة تحسين الجودة والتحكم فيها",
    ],
    idealFor: "المؤسسات التي تحتاج إلى جودة ثابتة ومعايير موثقة وتحكم أفضل في المخاطر التشغيلية.",
    duration: "مشروع استشاري",
    tags: ["الجودة", "إجراءات التشغيل", "إدارة المخاطر", "FMEA", "SPC", "الامتثال"],
    executionPhases: PHASES_AR.consulting,
  },
  {
    id: "operations-maintenance",
    category: "consulting",
    title: "العمليات والصيانة",
    shortDescription: "معدات موثوقة وأماكن عمل منظمة وعمليات أكثر أماناً وكفاءة.",
    fullDescription: "نحسّن موثوقية المعدات وكفاءة بيئة العمل من خلال الصيانة الإنتاجية الشاملة وتنظيم مكان العمل 5S وممارسات الصيانة والموثوقية وكفاءة الطاقة وبيئة العمل والصحة والسلامة المهنية.",
    iconName: "Cpu",
    metrics: "الاستشارات",
    deliverables: [
      "الصيانة الإنتاجية الشاملة (TPM)",
      "تنظيم مكان العمل (5S)",
      "صيانة الآلات وموثوقيتها",
      "ترشيد الطاقة وكفاءتها",
      "بيئة العمل والصحة والسلامة المهنية",
    ],
    idealFor: "المصانع والمنشآت التي تسعى إلى تقليل التوقفات وتكاليف الطاقة ومخاطر السلامة.",
    duration: "مشروع استشاري",
    tags: ["TPM", "5S", "الصيانة", "الموثوقية", "الطاقة", "الصحة والسلامة"],
    executionPhases: PHASES_AR.consulting,
  },
  {
    id: "people-organizational-development",
    category: "consulting",
    title: "تطوير الأفراد والمؤسسات",
    shortDescription: "الكفاءات والتقييمات وإدارة التغيير لمساعدة الأفراد على ترسيخ التحسين.",
    fullDescription: "قد يفشل أفضل تحسين إذا لم يكن الأفراد مستعدين له. نبني أطر الكفاءات، ونقيّم فعالية الموارد البشرية والمؤسسة، ونقيس رضا الموظفين والعملاء، ونقود التغيير باستخدام نموذج ADKAR.",
    iconName: "Users",
    metrics: "الاستشارات",
    deliverables: [
      "أطر الكفاءات",
      "تقييمات الموارد البشرية والمؤسسة",
      "استبيانات رضا الموظفين والعملاء",
      "إدارة التغيير (ADKAR)",
    ],
    idealFor: "المؤسسات التي تمر بمرحلة تغيير أو نمو أو إعادة هيكلة وتحتاج إلى أفراد متفاعلين وقادرين.",
    duration: "مشروع استشاري",
    tags: ["الموارد البشرية", "الكفاءات", "الاستبيانات", "ADKAR", "إدارة التغيير"],
    executionPhases: PHASES_AR.consulting,
  },
];

export const trainingServicesAR: ServiceItem[] = [
  {
    id: "training-project-strategy",
    category: "training",
    title: "تدريب المشاريع والاستراتيجية",
    shortDescription: "التحضير لشهادة PMP وإدارة المشاريع وبرامج الاستراتيجية للمديرين وفرق المشاريع.",
    fullDescription: "تدريب عملي على إدارة المشاريع والاستراتيجية، من التحضير لاختبار PMP وأساسيات إدارة المشاريع إلى إدارة دورة المشروع والإطار المنطقي وإدارة الأداء ببطاقة الأداء المتوازن وتطوير نماذج الأعمال.",
    iconName: "Compass",
    metrics: "التدريب",
    deliverables: [
      "التدريب التحضيري لشهادة PMP",
      "دورة مكثفة في إدارة المشاريع",
      "إدارة دورة المشروع والإطار المنطقي",
      "إدارة الأداء باستخدام بطاقة الأداء المتوازن",
      "تطوير نماذج الأعمال",
    ],
    idealFor: "مديرو المشاريع وقادة الفرق والمديرون المسؤولون عن التخطيط وتحقيق النتائج.",
    duration: "برنامج تدريبي",
    tags: ["PMP", "إدارة المشاريع", "الإطار المنطقي", "بطاقة الأداء المتوازن", "نموذج الأعمال"],
    executionPhases: PHASES_AR.training,
  },
  {
    id: "training-lean-quality",
    category: "training",
    title: "تدريب لين والجودة",
    shortDescription: "أحزمة لين ستة سيجما و5S والصيانة الإنتاجية والتحكم الإحصائي وأدوات الجودة لفرق التحسين المستمر.",
    fullDescription: "برامج تطبيقية في لين والجودة، من الحزام الأخضر والأسود في لين ستة سيجما إلى 5S والصيانة الإنتاجية الشاملة والتحكم الإحصائي في العمليات وتحليل البيانات بأدوات الجودة السبع وحلقات ضبط الجودة وتحسين المردود والإنتاجية.",
    iconName: "BarChart3",
    metrics: "التدريب",
    deliverables: [
      "الحزام الأخضر في لين ستة سيجما",
      "الحزام الأسود في لين ستة سيجما",
      "تنظيم مكان العمل 5S",
      "الصيانة الإنتاجية الشاملة (TPM)",
      "التحكم الإحصائي في العمليات (SPC)",
      "تحليل البيانات وأدوات الجودة السبع",
      "حلقات ضبط الجودة",
      "تحسين المردود والإنتاجية",
    ],
    idealFor: "المهندسون والمشرفون وفرق الجودة والتحسين الذين يقودون التغيير في مواقع العمل.",
    duration: "برنامج تدريبي",
    tags: ["لين ستة سيجما", "الحزام الأخضر", "الحزام الأسود", "5S", "TPM", "SPC", "أدوات الجودة"],
    executionPhases: PHASES_AR.training,
  },
  {
    id: "training-operations-risk",
    category: "training",
    title: "تدريب العمليات والمخاطر",
    shortDescription: "مهارات التخطيط ورسم العمليات وتحليل المخاطر وحل المشكلات لفرق العمليات.",
    fullDescription: "تدريب عملي لإدارة العمليات بكفاءة والتعامل مع المخاطر: تخطيط الإنتاج والتحكم فيه، ورسم عمليات الأعمال، وإدارة المخاطر وتحليل FMEA، وحل المشكلات بمنهجية TRIZ، والصحة والسلامة المهنية.",
    iconName: "Scale",
    metrics: "التدريب",
    deliverables: [
      "تخطيط الإنتاج والتحكم فيه (PPC)",
      "رسم عمليات الأعمال",
      "إدارة المخاطر وتحليل FMEA",
      "حل المشكلات بمنهجية TRIZ",
      "الصحة والسلامة المهنية",
    ],
    idealFor: "موظفو العمليات والتخطيط والسلامة الذين يحتاجون إلى أدوات عملية لقراراتهم اليومية.",
    duration: "برنامج تدريبي",
    tags: ["تخطيط الإنتاج", "رسم العمليات", "FMEA", "TRIZ", "الصحة والسلامة"],
    executionPhases: PHASES_AR.training,
  },
  {
    id: "training-people-performance",
    category: "training",
    title: "تدريب الأفراد والأداء",
    shortDescription: "إدارة التغيير وإدارة الوقت وإدارة الضغوط للأفراد في جميع المستويات.",
    fullDescription: "برامج تساعد الأفراد على تقديم أفضل أداء والتكيف مع التغيير: إدارة التغيير بنموذج ADKAR، والإدارة الاستراتيجية للوقت، وإدارة ضغوط العمل.",
    iconName: "Sparkles",
    metrics: "التدريب",
    deliverables: [
      "إدارة التغيير (ADKAR)",
      "الإدارة الاستراتيجية للوقت",
      "إدارة ضغوط العمل",
    ],
    idealFor: "المديرون والموظفون الذين يواجهون التغيير أو ضغط العمل أو أساليب عمل جديدة.",
    duration: "برنامج تدريبي",
    tags: ["ADKAR", "إدارة التغيير", "إدارة الوقت", "إدارة الضغوط"],
    executionPhases: PHASES_AR.training,
  },
];

export const digitalServicesAR: ServiceItem[] = [
  {
    id: "erp-implementation",
    category: "digital",
    title: "تطبيق أنظمة ERP",
    shortDescription: "أنظمة ERP مُعدّة وفق طريقة عمل مؤسستكم، دون تعقيد غير ضروري.",
    fullDescription: "نُعِدّ أنظمة ERP ونطبّقها وفق طريقة عمل مؤسستكم بدلاً من إجبار الفرق على تعقيد غير ضروري. من جمع المتطلبات ومواءمة العمليات إلى ترحيل البيانات والإطلاق والتدريب، نقدّم تطبيق ERPNext الوظيفي والتقني من البداية إلى النهاية.",
    iconName: "Cpu",
    metrics: "ERP والتحول الرقمي",
    deliverables: [
      "إعداد نظام ERP ومواءمته مع عمليات الأعمال",
      "التطبيق الوظيفي والتقني لنظام ERPNext",
      "جمع المتطلبات وتحليل العمليات",
      "إعداد الوحدات وتهيئة النظام",
      "هيكلة البيانات الرئيسية وترحيل البيانات",
      "أدوار المستخدمين والصلاحيات وسير عمل الموافقات",
      "التقارير ولوحات المتابعة ونظم المعلومات الإدارية",
      "التكامل مع الأنظمة والتطبيقات الحالية",
      "الاختبار واختبار قبول المستخدم (UAT) ودعم الإطلاق",
      "تدريب المستخدمين والتوثيق ونقل المعرفة",
      "التحسين بعد التطبيق والتحسين المستمر",
    ],
    idealFor: "المؤسسات التي تنتقل إلى نظام ERP أو تسعى للاستفادة أكثر من نظام قائم مثل ERPNext.",
    duration: "مشروع تطبيق",
    tags: ["ERP", "ERPNext", "ترحيل البيانات", "لوحات المتابعة", "التكامل", "UAT"],
    executionPhases: PHASES_AR.digital,
  },
  {
    id: "workflow-automation",
    category: "digital",
    title: "أتمتة سير العمل",
    shortDescription: "تحويل العمليات اليدوية إلى سير عمل رقمي منظم وقابل للتتبع.",
    fullDescription: "نصمم وننفذ سير عمل يقلل العمل اليدوي غير الضروري ويعزز المساءلة ويمنح الإدارة رؤية أوضح للعمليات، مع موافقات رقمية وتصعيد وسجلات تدقيق وتتبع مباشر للحالة.",
    iconName: "GitMerge",
    metrics: "ERP والتحول الرقمي",
    deliverables: [
      "رسم عمليات الأعمال وسير العمل",
      "سير عمل رقمي للموافقات والتفويض",
      "إسناد المهام والتصعيد والإشعارات",
      "أنظمة الموافقات متعددة المستويات",
      "سير عمل إدارة المستندات والسجلات",
      "جمع البيانات والتحقق منها آلياً",
      "لوحات متابعة سير العمل وتتبع الحالة",
      "التكامل بين الإدارات ووظائف الأعمال",
      "ضوابط العمليات وسجلات التدقيق والمساءلة",
      "تحسين سير العمل بناءً على بيانات الأداء",
    ],
    idealFor: "الفرق التي تعيقها الأوراق وسلاسل البريد الإلكتروني وجداول البيانات وتحتاج إلى موافقات ورؤية واضحة.",
    duration: "مشروع تطبيق",
    tags: ["سير العمل", "الأتمتة", "الموافقات", "سجل التدقيق", "لوحات المتابعة"],
    executionPhases: PHASES_AR.digital,
  },
  {
    id: "custom-software-development",
    category: "digital",
    title: "تطوير البرمجيات المخصصة",
    shortDescription: "برمجيات مبنية وفق متطلبات أعمال محددة عندما لا تكفي وظائف ERP القياسية.",
    fullDescription: "عندما لا تكفي وظائف ERP القياسية، نطوّر حلولاً برمجية وفق متطلبات الأعمال المحددة: تطبيقات وبوابات الأعمال، وتطبيقات الويب والجوال، ولوحات المتابعة، والتكاملات، ووحدات ERPNext المخصصة، وصولاً إلى النشر والدعم.",
    iconName: "BrainCircuit",
    metrics: "ERP والتحول الرقمي",
    deliverables: [
      "تطبيقات أعمال مخصصة وبوابات داخلية",
      "أنظمة إدارة عبر الويب",
      "تطبيقات الجوال والخدمات الميدانية",
      "بوابات العملاء والموظفين",
      "لوحات متابعة وأنظمة تقارير مخصصة",
      "تطوير واجهات API وتكامل الأنظمة",
      "تصميم قواعد البيانات وبنية التطبيقات",
      "تحديث الأنظمة القديمة",
      "وحدات وإضافات مخصصة لنظام ERPNext",
      "اختبار البرمجيات ونشرها وصيانتها ودعمها",
    ],
    idealFor: "المؤسسات ذات الاحتياجات الخاصة التي لا تغطيها الأنظمة الجاهزة.",
    duration: "مشروع تطوير",
    tags: ["برمجيات مخصصة", "تطبيقات ويب", "تطبيقات جوال", "API", "وحدات ERPNext", "بوابات"],
    executionPhases: PHASES_AR.digital,
  },
];

/* ------------------------------------------------------------------ */
/* Accessors                                                           */
/* ------------------------------------------------------------------ */
export function getServicePillars(lang: Language = "en"): ServicePillar[] {
  return lang === "ar" ? servicePillarsAR : servicePillarsEN;
}

export function getServicesByCategory(category: ServiceCategory, lang: Language = "en"): ServiceItem[] {
  return getServices(lang).filter((s) => s.category === category);
}

export function getServices(lang: Language = "en"): ServiceItem[] {
  return lang === "ar"
    ? [...consultingServicesAR, ...trainingServicesAR, ...digitalServicesAR]
    : [...consultingServicesEN, ...trainingServicesEN, ...digitalServicesEN];
}

export function getServiceById(id: string, lang: Language = "en"): ServiceItem | undefined {
  return getServices(lang).find((s) => s.id === id);
}

// Static fallbacks (English)
export const allServices = [...consultingServicesEN, ...trainingServicesEN, ...digitalServicesEN];
