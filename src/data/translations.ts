export type Language = "en" | "ar";

export interface TranslationDictionary {

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
}


export const translations: Record<Language, TranslationDictionary> = {
  en: {
    contactPage: {
      headline: "Contact Our Advisory Team",
      subheadline: "Talk to our consultants about consulting, training, or ERP and digital transformation for your organization.",
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
      badge: "What We Do",
      headline: "From Strategy to Shop Floor, We Help Organizations Perform Better",
      subheadline: "Improvement only creates value when it works in practice. We combine consulting, training, and digital implementation to help organizations design better ways of working, build the capabilities to sustain them, and embed improvement into daily operations.",
      allTab: "All Practices",
      businessTab: "Commercial Solutions",
      consultingTab: "Management Consulting",
      searchPlaceholder: "Search services...",
      deliverableLabel: "Practical Deliverable",
      viewDetails: "View Details",
      noResultsTitle: "No Matching Services Found",
      noResultsDesc: "Try a different keyword or show all services.",
      resetFilters: "Clear Search"
    },
  },

  ar: {
    contactPage: {
      headline: "تواصل مع فريقنا الاستشاري",
      subheadline: "تحدث مع مستشارينا حول الاستشارات أو التدريب أو أنظمة ERP والتحول الرقمي لمؤسستك.",
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
      badge: "ما نقوم به",
      headline: "من الاستراتيجية إلى أرض المصنع، نساعد المؤسسات على تحسين أدائها",
      subheadline: "لا يخلق التحسين قيمة إلا عندما ينجح في الواقع. نجمع بين الاستشارات والتدريب والتطبيق الرقمي لمساعدة المؤسسات على تصميم أساليب عمل أفضل وبناء القدرات اللازمة لاستدامتها وترسيخ التحسين في العمليات اليومية.",
      allTab: "كافة الممارسات",
      businessTab: "حلول الأعمال",
      consultingTab: "الاستشارات الإدارية",
      searchPlaceholder: "ابحث في الخدمات...",
      deliverableLabel: "مخرجات العمل الرئيسية",
      viewDetails: "عرض التفاصيل الكاملة",
      noResultsTitle: "لم يتم العثور على خدمات مطابقة",
      noResultsDesc: "يرجى تجربة كلمات بحث أخرى للوصول إلى الممارسات المطلوبة.",
      resetFilters: "مسح البحث"
    },
  }
};
