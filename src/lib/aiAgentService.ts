import { contactDetails } from "@/data/companyData";
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
                    text: `You are an elite Senior Management Consultant and AI Agent representing Factual Solutions, a consulting, training, and ERP & digital transformation firm specializing in Lean Six Sigma, operational excellence, strategy, quality, and continuous improvement.
Analyze this incoming business inquiry and generate a professional, executive-grade preliminary response in JSON format.

Client Name: ${fullName}
Company: ${company}
Service Requested: ${serviceOfInterest}
Inquiry Message: ${message}

Output strictly valid JSON with keys:
- clientName
- industryCategory (e.g. Textiles & Apparel, Pharmaceuticals, Food & Beverages, IT & Technology)
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
  
  let industry = "Operational Excellence & Performance";
  let path = "Consulting Engagement — Operational Excellence";
  let strategicPoints = [
    "Current process mapping and performance measurement",
    "Improvement priorities based on data, not assumptions",
    "Implementation plan with capability building for your team"
  ];

  if (serviceLower.includes("erp") || serviceLower.includes("workflow") || serviceLower.includes("software") || serviceLower.includes("digital") || serviceLower.includes("automation") || serviceLower.includes("system")) {
    industry = "ERP & Digital Transformation";
    path = "ERP / Workflow Implementation — process first, then technology";
    strategicPoints = [
      "Requirements gathering and business process analysis",
      "System configuration, workflows, and reporting needs",
      "Data migration, user training, and go-live support"
    ];
  } else if (serviceLower.includes("training") || serviceLower.includes("belt") || serviceLower.includes("pmp") || serviceLower.includes("course")) {
    industry = "Training & Capability Building";
    path = "Training Program tailored to your teams";
    strategicPoints = [
      "Learning objectives and participant profile",
      "Program content, format, and schedule",
      "Applying the tools to your own processes"
    ];
  } else if (serviceLower.includes("strategy") || serviceLower.includes("balanced scorecard") || serviceLower.includes("swot") || serviceLower.includes("vision")) {
    industry = "Strategy & Performance";
    path = "Consulting Engagement — Strategy & Performance Management";
    strategicPoints = [
      "Mission, vision, and SWOT / organizational analysis",
      "Strategic objectives and Balanced Scorecard measures",
      "Performance review and management routines"
    ];
  } else if (serviceLower.includes("quality") || serviceLower.includes("risk") || serviceLower.includes("sop") || serviceLower.includes("fmea") || serviceLower.includes("spc")) {
    industry = "Quality, Risk & Compliance";
    path = "Consulting Engagement — Quality, Risk & Compliance";
    strategicPoints = [
      "Quality system and SOP review",
      "Risk assessment and FMEA priorities",
      "Statistical process control and improvement plan"
    ];
  } else if (serviceLower.includes("hr") || serviceLower.includes("people") || serviceLower.includes("change") || serviceLower.includes("competenc") || serviceLower.includes("survey")) {
    industry = "People & Organizational Development";
    path = "Consulting Engagement — People & Organizational Development";
    strategicPoints = [
      "Organizational and HR assessment",
      "Competency frameworks and satisfaction surveys",
      "Change management using ADKAR"
    ];
  } else if (serviceLower.includes("tpm") || serviceLower.includes("maintenance") || serviceLower.includes("5s") || serviceLower.includes("energy") || serviceLower.includes("safety")) {
    industry = "Operations & Maintenance";
    path = "Consulting Engagement — Operations & Maintenance";
    strategicPoints = [
      "Equipment reliability and TPM baseline",
      "5S workplace organization",
      "Energy, ergonomics, and health & safety review"
    ];
  }

  const emailBody = `Dear ${fullName},

Thank you for reaching out to Factual Solutions regarding ${serviceOfInterest}.

Our Senior Advisory Team has received your inquiry for ${company}. We help organizations perform better through consulting, training, and ERP & digital transformation.

Preliminary Assessment & Next Steps:
1. Review: Our lead consultant (Lean Six Sigma Master Black Belt / PMP) is reviewing your requirements (${serviceOfInterest}).
2. Focus Areas: We will prepare specific discussion points addressing:
   • ${strategicPoints[0]}
   • ${strategicPoints[1]}
   • ${strategicPoints[2]}
3. Discovery Consultation: Our team will contact you at ${inquiry.workEmail} within 24 business hours to schedule your preliminary advisory session.

All discussions are strictly confidential and protected under our standard mutual non-disclosure framework.

Warm regards,

Client Advisory Practice
Factual Solutions
Direct: ${contactDetails.phone}
Email: ${contactDetails.email}
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
