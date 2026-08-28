export interface AiAssessmentResult {
  clientName: string;
  industryCategory: string;
  executiveSummary: string;
  keyStrategicFocus: string[];
  recommendedConsultingPath: string;
  consultantPrepNotes: string;
  autoReplyEmailBody: string;
}

export async function generateAiAutoReply(inquiry: {
  fullName: string;
  workEmail: string;
  companyName: string;
  serviceOfInterest: string;
  message: string;
}): Promise<AiAssessmentResult> {
  const { fullName, companyName, serviceOfInterest, message } = inquiry;
  const company = companyName || "your enterprise";

  // Check if an external LLM API key is configured (Gemini / OpenAI)
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (geminiApiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are an elite Senior Management Consultant and AI Agent representing Factual Solutions (a premier business planning, feasibility, and management advisory firm).
Analyze this incoming business inquiry and generate a professional, executive-grade preliminary response in JSON format.

Client Name: ${fullName}
Company: ${company}
Service Requested: ${serviceOfInterest}
Inquiry Message: ${message}

Output strictly valid JSON with keys:
- clientName
- industryCategory (e.g. Retail & Distribution, Industrial Manufacturing, Commercial Services)
- executiveSummary (A concise 2-sentence empathetic analysis of their situation)
- keyStrategicFocus (array of 3 specific actionable points we will address)
- recommendedConsultingPath (the exact engagement framework suited for them)
- consultantPrepNotes (internal brief for the consultant before calling the client)
- autoReplyEmailBody (professional, warm, and highly structured auto-reply text ready to send)`
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        const cleanJson = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsed = JSON.parse(cleanJson);
        return parsed as AiAssessmentResult;
      }
    } catch (err) {
      console.error("Gemini AI generation error, using deterministic neural fallback:", err);
    }
  }

  // High-Quality Executive Rule-Based Neural Engine Fallback
  const serviceLower = (serviceOfInterest + " " + message).toLowerCase();
  
  let industry = "Commercial Business & Growth";
  let path = "Structured 4-Week Strategic Advisory & Roadmapping";
  let strategicPoints = [
    "Baseline Operational & Cost-Structure Audit",
    "Unit Economics & Revenue Optimization Modeling",
    "Actionable Step-by-Step Implementation Roadmap"
  ];

  if (serviceLower.includes("financial") || serviceLower.includes("budget") || serviceLower.includes("investment") || serviceLower.includes("cash")) {
    industry = "Financial Planning & Capital Budgeting";
    path = "36-Month Dynamic Financial & Working Capital Modeling";
    strategicPoints = [
      "Historical Cash Flow & Burn-Rate Diagnostics",
      "Multi-Scenario Sensitivity & Working Capital Forecasting",
      "Investor/Bank-Grade Executive Presentation Pack"
    ];
  } else if (serviceLower.includes("erp") || serviceLower.includes("process") || serviceLower.includes("software") || serviceLower.includes("system")) {
    industry = "Operations & Digital Systems Transformation";
    path = "Business Process Re-Engineering & ERP Implementation Supervision";
    strategicPoints = [
      "As-Is vs. To-Be Departmental Handover Mapping",
      "Functional Requirements Specification (FRS) Preparation",
      "Vendor Milestone Verification & Change Management Protocol"
    ];
  } else if (serviceLower.includes("feasibility") || serviceLower.includes("idea") || serviceLower.includes("market") || serviceLower.includes("research")) {
    industry = "Market Feasibility & Venture Launch";
    path = "Empirical Feasibility Study & Market Entry Strategy";
    strategicPoints = [
      "Competitor Pricing Benchmarking & Demand Survey Analysis",
      "CapEx / OpEx Recovery Timeline & Break-Even Modeling",
      "Commercial Go-To-Market Execution Blueprint"
    ];
  } else if (serviceLower.includes("lean") || serviceLower.includes("pmp") || serviceLower.includes("project") || serviceLower.includes("quality")) {
    industry = "Projects & Operational Excellence (Lean Six Sigma)";
    path = "PMP Project Governance & Zero-Waste Lean Execution";
    strategicPoints = [
      "DMAIC Root-Cause & Process Variation Reduction",
      "Milestone Accountability & Critical-Path Scheduling",
      "Standard Operating Procedure (SOP) Deployment"
    ];
  }

  const emailBody = `Dear ${fullName},

Thank you for reaching out to Factual Solutions regarding ${serviceOfInterest}.

Our Senior Advisory Team has received your inquiry for ${company}. We specialize in structured commercial planning, financial feasibility, and operational excellence tailored to growing enterprises.

Preliminary Assessment & Next Steps:
1. Review: Our practice lead (Master Black Belt / PMP certified) is reviewing your requirements (${serviceOfInterest}).
2. Focus Areas: We will prepare specific discussion points addressing:
   • ${strategicPoints[0]}
   • ${strategicPoints[1]}
   • ${strategicPoints[2]}
3. Discovery Consultation: Our team will contact you at ${inquiry.workEmail} within 24 business hours to schedule your preliminary advisory session.

All discussions are strictly confidential and protected under our standard mutual non-disclosure framework.

Warm regards,

Client Advisory Practice
Factual Solutions
Direct: +92 321 884 1029
Email: qadeer@factualsolutions.com
Web: https://factual-solutions.vercel.app`;

  return {
    clientName: fullName,
    industryCategory: industry,
    executiveSummary: `Inquiry received from ${fullName} representing ${company}. Objective focuses on ${serviceOfInterest}, requiring structured analytical assessment and executive guidance.`,
    keyStrategicFocus: strategicPoints,
    recommendedConsultingPath: path,
    consultantPrepNotes: `Review ${company}'s operational scope and prepare preliminary baseline questions regarding ${strategicPoints[0]}.`,
    autoReplyEmailBody: emailBody
  };
}
