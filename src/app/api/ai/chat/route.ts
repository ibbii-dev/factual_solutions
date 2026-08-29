import { NextRequest, NextResponse } from "next/server";
import { allServices } from "@/data/servicesData";
import { dbSaveInquiry } from "@/lib/mongodb";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, userProfile } = body as {
      messages: ChatMessage[];
      userProfile?: { name?: string; email?: string; company?: string; phone?: string; service?: string };
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const latestMessage = messages[messages.length - 1].content.trim();
    const latestLower = latestMessage.toLowerCase();

    // 1. Check for Lead Capture Intent (if user shares email or phone or asks to book/schedule)
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
    const phoneRegex = /(\+?[0-9]{8,15})/;
    const detectedEmail = latestMessage.match(emailRegex)?.[0];
    const detectedPhone = latestMessage.match(phoneRegex)?.[0];

    let leadCaptured = false;
    let captureDetails = null;

    if (detectedEmail || (userProfile?.email && (latestLower.includes("book") || latestLower.includes("call") || latestLower.includes("contact") || latestLower.includes("hire") || latestLower.includes("schedule")))) {
      const leadEmail = detectedEmail || userProfile?.email || "advisor-chat-lead@factualsolutions.com";
      const leadName = userProfile?.name || (detectedEmail ? detectedEmail.split("@")[0] : "Executive Client");
      const leadCompany = userProfile?.company || "Enterprise Inquirer";
      const leadPhone = detectedPhone || userProfile?.phone || "Via Live AI Chat";

      const matchedService = allServices.find((s) =>
        latestLower.includes(s.title.toLowerCase()) ||
        latestLower.includes(s.id) ||
        latestLower.includes("idea") ||
        latestLower.includes("financial") ||
        latestLower.includes("operation")
      )?.title || "Strategic Management Consulting";

      try {
        const leadId = `INQ-AI-${Date.now().toString().slice(-4)}`;
        await dbSaveInquiry({
          id: leadId,
          fullName: leadName,
          workEmail: leadEmail,
          companyName: leadCompany,
          phone: leadPhone,
          serviceOfInterest: matchedService,
          message: `[AI Chatbot Lead] Recent Client Query: "${latestMessage}"`,
          date: new Date().toISOString().slice(0, 16).replace("T", " "),
          status: "New",
          priority: "High",
          aiAssessment: {
            clientName: leadName,
            industryCategory: "AI Conversational Inquiry",
            executiveSummary: `Prospective corporate client engaged via 24/7 AI Advisor. Inquired about ${matchedService}.`,
            keyStrategicFocus: [
              "Immediate Executive Discovery Call",
              "Tailored Preliminary Feasibility Assessment",
              "Commercial Proposal Delivery"
            ],
            recommendedConsultingPath: `Direct Partner Engagement — ${matchedService}`
          }
        });
        leadCaptured = true;
        captureDetails = { id: leadId, email: leadEmail, service: matchedService };
      } catch (err) {
        console.error("Lead save error in chat:", err);
      }
    }

    // 2. Intelligent Context-Aware Consulting Response Generator
    let reply = "";

    if (leadCaptured) {
      reply = `Thank you! I have registered your consultation request directly with our Senior Advisory Partners (Reference: **${captureDetails?.id}**).\n\nOur advisory team will review your inquiry and connect with you at **${captureDetails?.email}** within 1 business day. In the meantime, would you like me to generate a preliminary feasibility framework for your project?`;
    } else if (
      latestLower.includes("business idea") ||
      latestLower.includes("startup") ||
      latestLower.includes("new venture") ||
      latestLower.includes("concept")
    ) {
      reply = `At **Factual Solutions**, our *Business Idea & Model Development* practice turns concepts into bankable commercial ventures. \n\n**Key Deliverables:**\n• **Commercial Viability Audit**: Assessing customer demand and willingness-to-pay.\n• **Unit Economics & Margin Architecture**: Modeling startup CapEx, OpEx, and realistic payback horizons.\n• **Step-by-Step Rollout Blueprint**: 3-phase commercial launch timeline.\n\nWould you like to share your project scope or schedule a consultation with our planning team?`;
    } else if (
      latestLower.includes("scrap") ||
      latestLower.includes("waste") ||
      latestLower.includes("factory") ||
      latestLower.includes("operations") ||
      latestLower.includes("lean")
    ) {
      reply = `For industrial and manufacturing clients, our *Operational Excellence & Process Engineering* practice uses DMAIC and Lean Six Sigma methodologies.\n\n**How we address scrap and floor efficiency:**\n1. **Shift Handover Standardization**: Eliminating communication lag between operating shifts.\n2. **Defect & Scrap Root-Cause Mapping**: Isolating machine, material, and operator variance.\n3. **Throughput Bottleneck Elimination**: Unlocking 15%–30% capacity gains without additional CapEx.\n\nWould you like us to prepare an initial operational diagnostic for your facility?`;
    } else if (
      latestLower.includes("retail") ||
      latestLower.includes("store") ||
      latestLower.includes("branch") ||
      latestLower.includes("expansion")
    ) {
      reply = `Expanding multi-unit retail requires rigorous working capital modeling. Our *Specialized Business Solutions* practice builds:\n\n• **Store-Level Unit Economics**: Payback period per square meter and inventory velocity benchmarks.\n• **Centralized Working Capital Forecast**: Balancing inventory lead times with cash flow.\n• **Regional Site Feasibility Analysis**: Validating footfall and competitor saturation.\n\nWould you like our partners to review your store expansion model?`;
    } else if (
      latestLower.includes("financial") ||
      latestLower.includes("feasibility") ||
      latestLower.includes("roi") ||
      latestLower.includes("investment") ||
      latestLower.includes("model")
    ) {
      reply = `Our *Studies & Feasibility Research* practice builds comprehensive, bank-grade financial models:\n\n• **Dynamic 3-Statement Modeling**: Integrated P&L, Balance Sheet, and Cash Flow Projections.\n• **Sensitivity & Scenario Stress-Testing**: Testing profitability under supply chain shocks and inflation.\n• **IRR & NPV Calculation**: Providing clear hurdle-rate metrics for equity partners and banks.\n\nShall we schedule an investment modeling discovery session?`;
    } else if (
      latestLower.includes("service") ||
      latestLower.includes("what do you do") ||
      latestLower.includes("all services") ||
      latestLower.includes("practices")
    ) {
      reply = `**Factual Solutions** provides 12 specialized corporate consulting practices across two core divisions:\n\n**1. Practical Business Solutions:**\n• Business Idea & Model Development\n• Market Analysis & Industry Research\n• Financial Feasibility & Investment Modeling\n• Risk Management & Mitigation Strategy\n• Business Growth & Sales Optimization\n• Specialized Business Planning\n\n**2. Management Consultancy:**\n• Strategic Management Consulting\n• Operational Excellence & Process Engineering\n• Organizational Performance & KPIs\n• Change Management & Corporate Restructuring\n• Supply Chain & Procurement Strategy\n• Human Capital & Executive Leadership\n\nWhich area is most relevant to your current business objectives?`;
    } else if (
      latestLower.includes("cost") ||
      latestLower.includes("price") ||
      latestLower.includes("pricing") ||
      latestLower.includes("fee") ||
      latestLower.includes("quote")
    ) {
      reply = `Our consulting engagements are structured to provide guaranteed ROI tailored to your exact organizational scale:\n\n• **Tier 1 — Commercial Advisory**: For fast-growth ventures, market studies, and business model validation.\n• **Tier 2 — Strategic Transformation**: For multi-week operational audits, KPI rollouts, and supply chain restructuring.\n• **Tier 3 — Retained Advisory**: Ongoing executive fractional advisory for boards and senior leadership.\n\nIf you share your work email or phone number, our Managing Partner can provide a tailored proposal within 24 hours.`;
    } else if (
      latestLower.includes("partner") ||
      latestLower.includes("contact") ||
      latestLower.includes("call") ||
      latestLower.includes("consultation") ||
      latestLower.includes("talk")
    ) {
      reply = `I would be delighted to connect you directly with our Senior Consulting Partners.\n\nPlease type your **Work Email** and **Phone Number** (or Company Name) here in the chat, and I will instantly create an executive consultation lead in our system!`;
    } else {
      reply = `Thank you for reaching out to **Factual Solutions Corporate Advisory**.\n\nWe provide empirical, data-backed business planning, market feasibility analysis, and strategic management consulting across Saudi Arabia, Pakistan, and the GCC.\n\nHow can our advisory team support your strategic goals today? You can ask about our 12 consulting practices, request an operational audit, or ask to book a partner consultation.`;
    }

    return NextResponse.json({
      reply,
      leadCaptured,
      captureDetails
    });
  } catch (error: any) {
    console.error("AI Chat API Error:", error);
    return NextResponse.json(
      {
        reply: "Thank you for reaching out to Factual Solutions Advisory. Our partners are available for discovery consultations. Please leave your email or contact us at contact@factualsolutions.com.",
        leadCaptured: false
      },
      { status: 200 }
    );
  }
}
