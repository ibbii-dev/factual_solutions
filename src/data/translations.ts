export type Language = "en" | "ar";

export interface TranslationDictionary {
  // Navigation
  nav: {
    home: string;
    services: string;
    about: string;
    contact: string;
    requestConsultation: string;
    businessSolutions: string;
    consultancyServices: string;
    businessDesc: string;
    consultancyDesc: string;
    exploreServices: string;
    quizPrompt: string;
    takeQuiz: string;
    langName: string;
    switchLang: string;
  };

  // Hero Section
  hero: {
    badge: string;
    headline: string;
    headlineHighlight: string;
    subheadline: string;
    viewServices: string;
    requestConsultation: string;
    handsOn: string;
    confidential: string;
    actionable: string;
    businessSolutionsTitle: string;
    businessSolutionsDesc: string;
    consultancyTitle: string;
    consultancyDesc: string;
    empiricalTitle: string;
    empiricalDesc: string;
  };

  // Client / Trust Section
  trust: {
    title: string;
    confidentialityTitle: string;
    confidentialityDesc: string;
    actionPlansTitle: string;
    actionPlansDesc: string;
    partnerAdvisoryTitle: string;
    partnerAdvisoryDesc: string;
  };

  // Services Section (Divided Cards with Hover)
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    learnMore: string;
    exploreAll: string;
    cards: {
      id: string;
      title: string;
      shortDescription: string;
      hoverDetail: string;
    }[];
  };

  // Methodology Section
  methodology: {
    eyebrow: string;
    title: string;
    subtitle: string;
    phase: string;
    phaseOutcome: string;
    leadershipTitle: string;
    leadershipDesc: string;
    learnLeadership: string;
    steps: {
      step: string;
      title: string;
      description: string;
      outcome: string;
    }[];
  };

  // Consultation Banner
  cta: {
    badge: string;
    title: string;
    description: string;
    confidential: string;
    callback: string;
    requestButton: string;
    exploreButton: string;
    callUs: string;
    whatsapp: string;
    directEmail: string;
  };

  // About Page
  aboutPage: {
    badge: string;
    headline: string;
    subheadline: string;
    philosophyTitle: string;
    philosophyP1: string;
    philosophyP2: string;
    point1: string;
    point2: string;
    point3: string;
    leadershipBadge: string;
    principalTitle: string;
    principalSubtitle: string;
    consultantName: string;
    consultantRole: string;
    focusTitle: string;
    consultantBio: string;
    skillsTitle: string;
    scheduleButton: string;
    missionTitle: string;
    missionDesc: string;
    visionTitle: string;
    visionDesc: string;
    headOfficeTitle: string;
    headOfficeSubtitle: string;
  };

  // Contact Page
  contactPage: {
    headline: string;
    subheadline: string;
    formTitle: string;
    formSubtitle: string;
    fullNameLabel: string;
    emailLabel: string;
    companyLabel: string;
    phoneLabel: string;
    serviceLabel: string;
    servicePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    submittingButton: string;
    confidentialNote: string;
    successTitle: string;
    successMessage: string;
    sendAnother: string;
    directContactTitle: string;
    directPhone: string;
    corporateEmail: string;
    headOfficeTitle: string;
  };

  // Services Directory Page
  servicesPage: {
    badge: string;
    headline: string;
    subheadline: string;
    allTab: string;
    businessTab: string;
    consultingTab: string;
    searchPlaceholder: string;
    deliverableLabel: string;
    viewDetails: string;
    noResultsTitle: string;
    noResultsDesc: string;
    resetFilters: string;
  };

  // Footer
  footer: {
    desc: string;
    insightsTitle: string;
    subscribed: string;
    emailPlaceholder: string;
    headOffice: string;
    rights: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About Us",
      contact: "Contact",
      requestConsultation: "Request Consultation",
      businessSolutions: "Business Solutions",
      consultancyServices: "Consultancy Services",
      businessDesc: "Market analysis, capital budgeting, business planning & sales expansion.",
      consultancyDesc: "Management consulting, Lean Six Sigma, ERP transformation, and operational excellence.",
      exploreServices: "Explore 5 Services",
      quizPrompt: "Need a tailored recommendation?",
      takeQuiz: "Take 60-Sec Advisor Quiz →",
      langName: "English",
      switchLang: "العربية"
    },
    hero: {
      badge: "Business Solutions & Management Consulting",
      headline: "Consulting People to Grow Their Business.",
      headlineHighlight: "Grow",
      subheadline: "We provide practical business planning, market analysis, investment modeling, and management consulting to help companies build solid operations and steady commercial growth.",
      viewServices: "View All Services",
      requestConsultation: "Request a Consultation",
      handsOn: "Direct Hands-On Advisory",
      confidential: "Confidential Client Engagements",
      actionable: "Actionable Roadmaps",
      businessSolutionsTitle: "Business Solutions",
      businessSolutionsDesc: "New business idea modeling, comprehensive market analysis, capital budgeting, and sales growth strategies.",
      consultancyTitle: "Consultancy Advisory",
      consultancyDesc: "Strategic management consulting, risk mitigation, performance tracking, and organizational leadership.",
      empiricalTitle: "Empirical & Practical",
      empiricalDesc: "Clear, step-by-step guidance tailored to your industry, team capability, and real market conditions."
    },
    trust: {
      title: "Advising Businesses Across Key Industry Sectors",
      confidentialityTitle: "Strict Confidentiality",
      confidentialityDesc: "All financial audits, business models, and strategic plans are protected under mutual non-disclosure agreements.",
      actionPlansTitle: "Practical Action Plans",
      actionPlansDesc: "Every client engagement delivers a clear, step-by-step implementation roadmap with achievable milestones.",
      partnerAdvisoryTitle: "Partner-Level Advisory",
      partnerAdvisoryDesc: "Direct access to senior business consultants with continuous communication and progress tracking."
    },
    services: {
      eyebrow: "Our Advisory Services",
      title: "Comprehensive Consulting Services",
      subtitle: "Structured business advisory, financial feasibility, and operational excellence designed to drive sustainable growth.",
      learnMore: "Learn more",
      exploreAll: "Explore all services and detailed engagement deliverables",
      cards: [
        {
          id: "strategic-consulting",
          title: "Strategic Management Consulting",
          shortDescription: "Driving success through tailored strategic plans with a seasoned advisory team. Unlock your operational potential with structured corporate governance.",
          hoverDetail: "We help organizations align leadership, resolve operational bottlenecks, and execute structured corporate growth strategies."
        },
        {
          id: "investment-planning",
          title: "Financial Modeling & Budgeting",
          shortDescription: "Realistic financial forecasting, unit economics, cash flow modeling, and investor-ready documentation for growing companies.",
          hoverDetail: "We construct 3-year cash flow projections, unit-economic models, and CapEx/OpEx budgets for banks, partners, and executive decisions."
        },
        {
          id: "projects-management",
          title: "Projects & Lean Management",
          shortDescription: "We provide project management and Lean Six Sigma services to ensure initiatives are executed efficiently, on time, within budget, and with top quality.",
          hoverDetail: "Certified PMP and Master Black Belt leadership ensuring zero-waste project execution, milestone accountability, and verified ROI."
        },
        {
          id: "process-transformation",
          title: "Process & ERP Transformation",
          shortDescription: "Streamlining business operations, eliminating shop-floor waste, and supervising ERP implementation to ensure maximum productivity and compliance.",
          hoverDetail: "We optimize departmental handovers, eliminate operational scrap, and manage ERP software rollouts to modernize enterprise workflows."
        },
        {
          id: "studies-research",
          title: "Studies & Feasibility Research",
          shortDescription: "Rigorous market analysis, unit-economic modeling, capital budgeting, and commercial feasibility studies for new ventures and enterprise expansions.",
          hoverDetail: "Empirical market research, customer demand surveys, competitor benchmarking, and bank-ready commercial feasibility studies."
        },
        {
          id: "business-growth",
          title: "Specialized Business Solutions",
          shortDescription: "Tailored commercial advisory, sales funnel optimization, customer retention strategies, and transparent monthly KPI analytics reporting.",
          hoverDetail: "Identifying sales conversion bottlenecks, restructuring customer acquisition funnels, and scaling recurring commercial revenue."
        }
      ]
    },
    methodology: {
      eyebrow: "Our Advisory Process",
      title: "A Structured 4-Step Advisory Framework",
      subtitle: "We follow a practical, disciplined consulting process from initial business review through to hands-on execution and performance tracking.",
      phase: "Phase",
      phaseOutcome: "Phase Outcome",
      leadershipTitle: "Led by Senior Business Consultants (Master Black Belt & PMP)",
      leadershipDesc: "Direct engagement oversight with executive accountability.",
      learnLeadership: "Learn About Our Leadership",
      steps: [
        {
          step: "01",
          title: "Discovery & Business Assessment",
          description: "We review your existing operations, market position, and financial goals to identify practical bottlenecks and growth opportunities.",
          outcome: "Diagnostic Review"
        },
        {
          step: "02",
          title: "Strategic Planning & Analysis",
          description: "We conduct detailed market research, evaluate unit economics, and prepare a realistic action plan tailored to your budget and capacity.",
          outcome: "Action Roadmap"
        },
        {
          step: "03",
          title: "Execution & Hands-On Guidance",
          description: "We work directly with your leadership and team to implement business changes, sales processes, and risk management practices.",
          outcome: "Operational Delivery"
        },
        {
          step: "04",
          title: "Review & Performance Tracking",
          description: "We provide clear, transparent progress reports with practical KPIs to make sure your business stays on track and achieves steady growth.",
          outcome: "Verified Outcomes"
        }
      ]
    },
    cta: {
      badge: "Advisory & Consultation",
      title: "Ready to Discuss Your Business Goals?",
      description: "Connect directly with our consulting team to explore market research, business idea validation, financial planning, or sales expansion.",
      confidential: "Confidential Discussion",
      callback: "Direct Consultant Callback",
      requestButton: "Request a Consultation",
      exploreButton: "Explore All Services",
      callUs: "Call Us",
      whatsapp: "WhatsApp",
      directEmail: "Direct Office Email:"
    },
    aboutPage: {
      badge: "About Factual Solutions",
      headline: "Practical Guidance for Growing Businesses",
      subheadline: "Factual Solutions was founded to provide business owners and management teams with actionable advisory—helping companies turn promising ideas into profitable, steady operations.",
      philosophyTitle: "Our Core Philosophy: The Interlocking Puzzle",
      philosophyP1: "In business, every piece matters. A great product idea requires solid financial planning, and strong sales need reliable operations and risk management to support them.",
      philosophyP2: "At Factual Solutions, our interlocking cube represents practical alignment across all operational functions—market research, sales strategy, team structure, and financial modeling.",
      point1: "Fact-based market and competitive research",
      point2: "Practical financial planning without unnecessary complexity",
      point3: "Hands-on management support during execution",
      leadershipBadge: "Practice Leadership",
      principalTitle: "Principal Consultant",
      principalSubtitle: "Direct executive advisory, operational transformation, and business excellence.",
      consultantName: "Qadeer Ahmad Bhatti",
      consultantRole: "Principal Business Excellence Consultant & Strategic Advisor",
      focusTitle: "Professional Focus & Expertise",
      consultantBio: "Senior management consultant and business excellence practitioner specializing in operational restructuring, strategic planning, process optimization, ERP transformation, and commercial performance enhancement.",
      skillsTitle: "Core Competencies & Frameworks",
      scheduleButton: "Schedule Advisory Consultation",
      missionTitle: "Our Mission",
      missionDesc: "To provide business owners and managers with clear, practical roadmaps—reducing operational friction and building steady, long-term commercial growth.",
      visionTitle: "Our Vision",
      visionDesc: "To be a dependable, trusted consulting partner for commercial enterprises—known for practical advice, integrity, and measurable business improvement.",
      headOfficeTitle: "Head Office",
      headOfficeSubtitle: "Supporting clients with strategic advisory and operational excellence."
    },
    contactPage: {
      headline: "Contact Our Advisory Team",
      subheadline: "Get in touch directly with our consultants to discuss your business requirements, market analysis, or operational strategy.",
      formTitle: "Send a Message",
      formSubtitle: "Fill in the form below and we will get back to you promptly.",
      fullNameLabel: "Full Name *",
      emailLabel: "Email Address *",
      companyLabel: "Company Name",
      phoneLabel: "Phone Number",
      serviceLabel: "Service Area of Interest",
      servicePlaceholder: "Select a Service (Optional)",
      messageLabel: "How Can We Help Your Business? *",
      messagePlaceholder: "Briefly describe your requirements or business challenge...",
      submitButton: "Submit Consultation Request",
      submittingButton: "Sending Inquiry...",
      confidentialNote: "Confidential & Direct Partner Consultation",
      successTitle: "Inquiry Received Successfully",
      successMessage: "Thank you, {name}. Our team will review your inquiry and contact you shortly.",
      sendAnother: "Send Another Inquiry",
      directContactTitle: "Direct Contact",
      directPhone: "Direct Phone",
      corporateEmail: "Corporate Email",
      headOfficeTitle: "Head Office Location"
    },
    servicesPage: {
      badge: "Dual-Category Capabilities",
      headline: "Comprehensive Business Solutions & Advisory",
      subheadline: "Choose between our hands-on Business Solutions for commercial launch and sales expansion, or our senior Consultancy Advisory for management strategy and operational excellence.",
      allTab: "All",
      businessTab: "Business",
      consultingTab: "Consulting",
      searchPlaceholder: "Search services...",
      deliverableLabel: "Practical Deliverable",
      viewDetails: "View Full Details →",
      noResultsTitle: "No Matching Capabilities Found",
      noResultsDesc: "Try adjusting your keyword search or switch to 'All' categories.",
      resetFilters: "Reset Filters"
    },
    footer: {
      desc: "Practical business modeling, market research, financial planning, and management consulting for steady enterprise growth.",
      insightsTitle: "Monthly Advisory Insights",
      subscribed: "Subscribed! You will receive our monthly brief.",
      emailPlaceholder: "Enter business email",
      headOffice: "Head Office",
      rights: "All rights reserved."
    }
  },

  ar: {
    nav: {
      home: "الرئيسية",
      services: "خدماتنا",
      about: "من نحن",
      contact: "تواصل معنا",
      requestConsultation: "طلب استشارة",
      businessSolutions: "حلول الأعمال",
      consultancyServices: "الخدمات الاستشارية",
      businessDesc: "دراسات السوق، الميزانيات الرأسمالية، تخطيط الأعمال وتطوير المبيعات.",
      consultancyDesc: "الاستشارات الإدارية، اللين ستة سيجما، تحول أنظمة ERP والتميز التشغيلي.",
      exploreServices: "استكشف 5 خدمات",
      quizPrompt: "هل تبحث عن توصية مخصصة؟",
      takeQuiz: "ابدأ تقييم الاستشارة خلال دقيقة ←",
      langName: "العربية",
      switchLang: "English"
    },
    hero: {
      badge: "حلول الأعمال والاستشارات الإدارية",
      headline: "نقدّم الاستشارات لتمكين الشركات من تنمية أعمالها.",
      headlineHighlight: "تنمية",
      subheadline: "نقدّم استشارات عملية في تخطيط الأعمال، دراسات السوق، النمذجة الاستثمارية، والاستشارات الإدارية لمساعدة الشركات على بناء عمليات قوية ونمو تجاري مستدام.",
      viewServices: "استعراض كافة الخدمات",
      requestConsultation: "طلب جلسة استشارية",
      handsOn: "استشارات تنفيذية مباشرة",
      confidential: "سرية تامة ومحمية باتفاقيات",
      actionable: "خطط عمل تطبيقية",
      businessSolutionsTitle: "حلول الأعمال",
      businessSolutionsDesc: "نمذجة الأفكار التجارية، دراسات السوق الشاملة، ميزانيات رأس المال، واستراتيجيات تنمية المبيعات.",
      consultancyTitle: "الاستشارات الإدارية",
      consultancyDesc: "الاستشارات الاستراتيجية، إدارة المخاطر، تتبع مؤشرات الأداء، والقيادة التنظيمية.",
      empiricalTitle: "منهجية عملية وتطبيقية",
      empiricalDesc: "إرشادات واضحة ومدروسة تناسب قطاعك التجاري وقدرات فريقك وظروف السوق الفعلية."
    },
    trust: {
      title: "نقدّم الاستشارات لقطاعات الأعمال والشركات الرائدة",
      confidentialityTitle: "سرية مطلقة وموثوقة",
      confidentialityDesc: "تخضع كافة التدقيقات المالية ونماذج الأعمال والخطط الاستراتيجية لاتفاقيات عدم إفصاح متبادلة.",
      actionPlansTitle: "خطط عمل تنفيذية",
      actionPlansDesc: "تتضمن كل استشارة خارطة طريق تنفيذية محددة الخطوات مع مؤشرات إنجاز قابلة للتحقيق.",
      partnerAdvisoryTitle: "إشراف استشاري مباشر",
      partnerAdvisoryDesc: "تواصل مباشر مع كبار المستشارين الإداريين مع متابعة دورية مستمرة للتقدم."
    },
    services: {
      eyebrow: "خدماتنا الاستشارية",
      title: "خدمات استشارية شاملة ومتكاملة",
      subtitle: "استشارات إدارية مهيكلة، دراسات جدوى مالية، وتميز تشغيلي مصمم لدفع عجلة النمو المستدام.",
      learnMore: "المزيد",
      exploreAll: "استكشف كافة الخدمات ومخرجات العمل التفصيلية",
      cards: [
        {
          id: "strategic-consulting",
          title: "الاستشارات الإدارية والاستراتيجية",
          shortDescription: "قيادة النجاح المؤسسي من خلال خطط استراتيجية مخصصة بإشراف فريق استشاري متمرس لتطوير الحوكمة والعمليات.",
          hoverDetail: "نساعد المنظمات على مواءمة القيادة، وتجاوز العقبات التشغيلية، وتنفيذ استراتيجيات النمو المؤسسي بكفاءة."
        },
        {
          id: "investment-planning",
          title: "النمذجة المالية وإعداد الميزانيات",
          shortDescription: "توقعات مالية واقعية، تحليل اقتصاديات الوحدة، نمذجة التدفقات النقدية، وإعداد ملفات المستثمرين للشركات النامية.",
          hoverDetail: "نبني توقعات مالية لـ 3 سنوات ونماذج تدفقات نقدية وميزانيات رأسمالية للمصارف والشركاء والقرارات التنفيذية."
        },
        {
          id: "projects-management",
          title: "إدارة المشاريع والتميز التشغيلي",
          shortDescription: "خدمات إدارة المشاريع وتطبيق منهجية اللين ستة سيجما لضمان تنفيذ المبادرات بكفاءة وفي الوقت المحدد وضمن الميزانية.",
          hoverDetail: "قيادة معتمدة (PMP و Master Black Belt) لضمان تنفيذ المشاريع بأعلى جودة وخلو العمليات من الهدر."
        },
        {
          id: "process-transformation",
          title: "تحول العمليات وتطبيق أنظمة ERP",
          shortDescription: "تبسيط العمليات التشغيلية، تقليص الهدر، والإشراف على تطبيق برمجيات تخطيط موارد المؤسسات لتحقيق أعلى إنتاجية.",
          hoverDetail: "تحسين عمليات التسليم بين الأقسام، خفض هدر الإنتاج، والإشراف على إطلاق أنظمة ERP لتحديث بيئة العمل."
        },
        {
          id: "studies-research",
          title: "الدراسات وأبحاث الجدوى الاقتصادية",
          shortDescription: "تحليلات سوقية دقيقة، نمذجة اقتصاديات الوحدة، ميزانيات الاستثمار، ودراسات جدوى تجارية للمشاريع والتوسعات الجديدة.",
          hoverDetail: "أبحاث سوقية تجريبية، استبيانات طلب العملاء، مقارنات المنافسين، ودراسات جدوى معتمدة للمصارف والمستثمرين."
        },
        {
          id: "business-growth",
          title: "حلول الأعمال وتطوير المبيعات",
          shortDescription: "استشارات تجارية مخصصة، تحسين قنوات البيع، استراتيجيات ولاء العملاء، وتقارير دورية شفافة لمؤشرات الأداء (KPIs).",
          hoverDetail: "تحديد نقاط الاختناق في مسار المبيعات، إعادة هيكلة قنوات اكتساب العملاء، وتوسيع الإيرادات التجارية المتكررة."
        }
      ]
    },
    methodology: {
      eyebrow: "منهجية العمل الاستشارية",
      title: "إطار استشاري مهيكل من 4 مراحل",
      subtitle: "نتبع منهجية استشارية منضبطة وعملية تبدأ بالتشخيص والتقييم وصولاً إلى التنفيذ الميداني ومتابعة النتائج.",
      phase: "المرحلة",
      phaseOutcome: "مخرجات المرحلة",
      leadershipTitle: "بإشراف مستشارين معتمدين (Master Black Belt & PMP)",
      leadershipDesc: "متابعة تنفيذية مباشرة تضمن المساءلة وتحقيق الأهداف.",
      learnLeadership: "تعرف على قيادتنا وخبراتنا",
      steps: [
        {
          step: "01",
          title: "الاستكشاف والتقييم التشغيلي",
          description: "مراجعة شاملة لعملياتك وموقعك التنافسي وأهدافك المالية لتحديد نقاط الاختناق والفرص المتاحة.",
          outcome: "تقرير تشخيصي شامل"
        },
        {
          step: "02",
          title: "التخطيط الاستراتيجي والتحليل",
          description: "إجراء أبحاث سوقية تفصيلية وتحليل اقتصاديات الوحدة وإعداد خطة عمل متكاملة تتناسب مع ميزانيتك.",
          outcome: "خارطة طريق تنفيذية"
        },
        {
          step: "03",
          title: "التنفيذ والمتابعة الميدانية",
          description: "العمل المباشر مع قيادتك وفريقك لتطبيق التغييرات المؤسسية وإجراءات المبيعات وإدارة المخاطر.",
          outcome: "تسليم تشغيلي متكامل"
        },
        {
          step: "04",
          title: "المراجعة وتتبع مؤشرات الأداء",
          description: "تقديم تقارير تقدم واضحة وشفافة بمؤشرات أداء عملية تضمن بقاء عملك على مسار النمو المستدام.",
          outcome: "نتائج موثقة ومحققة"
        }
      ]
    },
    cta: {
      badge: "الاستشارات والمشورة المهنية",
      title: "هل أنت مستعد لمناقشة أهداف عملك وتوسعه؟",
      description: "تواصل مباشرة مع فريقنا الاستشاري لبحث دراسات الجدوى، أبحاث السوق، النمذجة المالية، أو تطوير المبيعات.",
      confidential: "مناقشة سرية ومحمية",
      callback: "اتصال مباشر من المستشار",
      requestButton: "طلب جلسة استشارية",
      exploreButton: "استكشاف كافة الخدمات",
      callUs: "اتصل بنا",
      whatsapp: "واتساب",
      directEmail: "البريد الإلكتروني المباشر:"
    },
    aboutPage: {
      badge: "عن فاكتشوال سوليوشنز",
      headline: "استشارات وإرشادات عملية لنمو الشركات وتطورها",
      subheadline: "تأسست فاكتشوال سوليوشنز لتقديم استشارات عملية وتنفيذية لأصحاب الأعمال وفرق الإدارة—لمساعدة الشركات على تحويل الأفكار الواعدة إلى عمليات تشغيلية مربحة ومستقرة.",
      philosophyTitle: "فلسفتنا الجوهرية: مكعب التوافق المتكامل",
      philosophyP1: "في عالم الأعمال، كل جزء له أهمية حاسمة. فالفكرة المميزة تتطلب تخطيطاً مالياً محكماً، والمبيعات القوية تحتاج إلى عمليات تشغيل وإدارة مخاطر موثوقة.",
      philosophyP2: "في فاكتشوال سوليوشنز، يرمز مكعب علامتنا إلى التوافق العملي بين جميع الوظائف التشغيلية—أبحاث السوق، استراتيجية المبيعات، الهيكل التنظيمي، والنمذجة المالية.",
      point1: "أبحاث سوقية ودراسات تنافسية مبنية على الحقائق",
      point2: "تخطيط مالي وتوقعات واقعية دون تعقيدات غير ضرورية",
      point3: "دعم إداري ميداني ومتابعة مباشرة أثناء التنفيذ",
      leadershipBadge: "قيادة الممارسة الاستشارية",
      principalTitle: "كبير المستشارين الاستراتيجيين",
      principalSubtitle: "استشارات تنفيذية مباشرة، تحول تشغيلي، وتميز مؤسسي.",
      consultantName: "قدير أحمد بهاتي",
      consultantRole: "كبير مستشاري التميز المؤسسي والمستشار الاستراتيجي",
      focusTitle: "مجالات التركيز والخبرة المهنية",
      consultantBio: "مستشار إداري وخبير تميز مؤسسي متخصص في إعادة الهيكلة التشغيلية، التخطيط الاستراتيجي، تحسين العمليات، تحول أنظمة ERP، وتعزيز الأداء التجاري.",
      skillsTitle: "الكفاءات الأساسية ومنهجيات العمل",
      scheduleButton: "حجز جلسة استشارية تنفيذية",
      missionTitle: "رسالتنا",
      missionDesc: "تزويد قادة الأعمال والمديرين التنفيذيين بخرائط طريق واضحة وقابلة للتطبيق—لتقليص الاحتكاك التشغيلي وبناء نمو تجاري مستدام طويل الأجل.",
      visionTitle: "رؤيتنا",
      visionDesc: "أن نكون الشريك الاستشاري الأكثر موثوقية لقطاعات الأعمال—المعروف بالاستشارات العملية، والنزاهة المهنية، والتحسين الملموس للأداء التجاري.",
      headOfficeTitle: "المكتب الرئيسي",
      headOfficeSubtitle: "دعم عملائنا باستشارات استراتيجية وتميز تشغيلي موثوق."
    },
    contactPage: {
      headline: "تواصل مع فريقنا الاستشاري",
      subheadline: "تواصل مباشرة مع مستشارينا لمناقشة متطلبات عملك، دراسات السوق، أو استراتيجيات التحول التشغيلي.",
      formTitle: "إرسال رسالة",
      formSubtitle: "املأ النموذج أدناه وسيقوم فريقنا بالتواصل معك في أقرب وقت.",
      fullNameLabel: "الاسم الكامل *",
      emailLabel: "البريد الإلكتروني للعمل *",
      companyLabel: "اسم الشركة / المنشأة",
      phoneLabel: "رقم الهاتف",
      serviceLabel: "مجال الخدمة المطلوب",
      servicePlaceholder: "اختر الخدمة (اختياري)",
      messageLabel: "كيف يمكننا مساعدة عملك؟ *",
      messagePlaceholder: "يرجى تقديم نبذة مختصرة عن متطلبات عملك أو التحديات التي تواجهها...",
      submitButton: "إرسال طلب الاستشارة",
      submittingButton: "جارٍ الإرسال...",
      confidentialNote: "استشارة سرية ومباشرة مع كبار المستشارين",
      successTitle: "تم استلام طلبك بنجاح",
      successMessage: "شكراً لك، {name}. سيقوم فريقنا بمراجعة تفاصيل طلبك والتواصل معك قريباً.",
      sendAnother: "إرسال طلب استشارة آخر",
      directContactTitle: "التواصل المباشر",
      directPhone: "الهاتف المباشر",
      corporateEmail: "البريد المؤسسي",
      headOfficeTitle: "مقر المكتب الرئيسي"
    },
    servicesPage: {
      badge: "قدرات وقطاعات استشارية مزدوجة",
      headline: "حلول الأعمال المتكاملة والاستشارات الإدارية",
      subheadline: "اختر بين حلول الأعمال التطبيقية لإطلاق المشاريع وتوسيع المبيعات، أو الاستشارات الإدارية العليا للاستراتيجية والتميز التشغيلي.",
      allTab: "الكل",
      businessTab: "حلول الأعمال",
      consultingTab: "الاستشارات",
      searchPlaceholder: "ابحث في الخدمات...",
      deliverableLabel: "مخرجات العمل الرئيسية",
      viewDetails: "عرض التفاصيل الكاملة ←",
      noResultsTitle: "لم يتم العثور على خدمات مطابقة",
      noResultsDesc: "يرجى تجربة كلمات بحث أخرى أو التبديل إلى تصنيف 'الكل'.",
      resetFilters: "إعادة ضبط التصفية"
    },
    footer: {
      desc: "استشارات عملية في تخطيط الأعمال، دراسات الجدوى، التخطيط المالي، والاستشارات الإدارية لتحقيق نمو مؤسسي مستدام.",
      insightsTitle: "النشرة الاستشارية الشهرية",
      subscribed: "تم الاشتراك بنجاح! ستصلك نشرتنا الدورية.",
      emailPlaceholder: "أدخل البريد الإلكتروني للعمل",
      headOffice: "المكتب الرئيسي",
      rights: "جميع الحقوق محفوظة."
    }
  }
};
