export interface InquiryNotificationPayload {
  id: string;
  fullName: string;
  workEmail: string;
  companyName: string;
  phone: string;
  serviceOfInterest: string;
  message: string;
  date: string;
}

export interface ConsultantReplyEmailPayload {
  to: string;
  clientName: string;
  inquiryId: string;
  serviceOfInterest?: string;
  author: string;
  subject?: string;
  content: string;
  originalMessage?: string;
}

export interface MailingSystemStatus {
  provider: "resend" | "webhook" | "console-logger";
  providerName: string;
  isConfigured: boolean;
  senderAddress: string;
  notificationEmail: string;
  hasResendKey: boolean;
  hasWebhook: boolean;
}

export function getMailingSystemStatus(): MailingSystemStatus {
  const hasResend = Boolean(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim().length > 0);
  const hasWebhook = Boolean(process.env.LEAD_WEBHOOK_URL && process.env.LEAD_WEBHOOK_URL.trim().length > 0);
  const notificationEmail = process.env.NOTIFICATION_EMAIL || "qadeer@factualsolutions.com";
  const senderAddress = process.env.EMAIL_FROM || "Factual Solutions Advisory <onboarding@resend.dev>";

  let provider: "resend" | "webhook" | "console-logger" = "console-logger";
  let providerName = "Direct Audit Logger (Local)";

  if (hasResend) {
    provider = "resend";
    providerName = "Resend API (Live SMTP Gateway)";
  } else if (hasWebhook) {
    provider = "webhook";
    providerName = "Webhook Dispatch Relay";
  }

  return {
    provider,
    providerName,
    isConfigured: hasResend || hasWebhook,
    senderAddress,
    notificationEmail,
    hasResendKey: hasResend,
    hasWebhook: hasWebhook
  };
}

/**
 * Send internal notification when a new inquiry arrives
 */
export async function sendLeadNotification(inquiry: InquiryNotificationPayload): Promise<{ success: boolean; provider: string; details?: string }> {
  const notificationEmail = process.env.NOTIFICATION_EMAIL || "qadeer@factualsolutions.com";
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  console.log(`\n========================================`);
  console.log(`📧 [LEAD DISPATCH] New Consultation Request`);
  console.log(`----------------------------------------`);
  console.log(`ID:        ${inquiry.id}`);
  console.log(`Client:    ${inquiry.fullName} (${inquiry.workEmail})`);
  console.log(`Company:   ${inquiry.companyName || "Independent"}`);
  console.log(`Phone:     ${inquiry.phone || "Not provided"}`);
  console.log(`Service:   ${inquiry.serviceOfInterest}`);
  console.log(`Message:   ${inquiry.message}`);
  console.log(`Date:      ${inquiry.date}`);
  console.log(`Target:    ${notificationEmail}`);
  console.log(`========================================\n`);

  // 1. Webhook Notification
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🚀 **New Consultation Lead (${inquiry.id})**\n**Name:** ${inquiry.fullName}\n**Email:** ${inquiry.workEmail}\n**Phone:** ${inquiry.phone || "N/A"}\n**Company:** ${inquiry.companyName || "N/A"}\n**Service:** ${inquiry.serviceOfInterest}\n**Message:** ${inquiry.message}`
        })
      });
      return { success: true, provider: "webhook" };
    } catch (err) {
      console.error("Webhook dispatch failed:", err);
    }
  }

  // 2. Resend API Email Notification
  if (process.env.RESEND_API_KEY) {
    try {
      const cleanPhone = (inquiry.phone || "").replace(/[^0-9]/g, "");
      const whatsappUrl = `https://wa.me/${cleanPhone || "923241775662"}?text=${encodeURIComponent(
        `Hello ${inquiry.fullName}, regarding your consultation inquiry #${inquiry.id} on ${inquiry.serviceOfInterest} with Factual Solutions Advisory:`
      )}`;

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f6f9; color: #152238; }
            .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background: #152238; padding: 24px; color: #ffffff; text-align: center; }
            .badge { display: inline-block; padding: 4px 12px; background: #A33C29; color: #ffffff; font-size: 11px; font-weight: bold; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; }
            .body { padding: 28px; }
            .metric-table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
            .metric-table td { padding: 10px 0; border-bottom: 1px solid #edf2f7; }
            .metric-table td.label { width: 35%; color: #64748b; font-weight: 600; }
            .metric-table td.val { font-weight: 700; color: #152238; }
            .message-box { background: #f8fafc; border-left: 4px solid #A33C29; padding: 14px; margin-top: 20px; border-radius: 6px; font-size: 13px; line-height: 1.5; color: #334155; }
            .actions { margin-top: 24px; text-align: center; }
            .btn { display: inline-block; padding: 10px 20px; background: #A33C29; color: #ffffff !important; text-decoration: none; font-size: 12px; font-weight: bold; border-radius: 8px; margin: 0 6px; }
            .btn-wa { background: #10b981; }
            .footer { padding: 18px; text-align: center; font-size: 11px; color: #94a3b8; background: #f8fafc; border-top: 1px solid #edf2f7; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <span class="badge">New Consultation Lead</span>
              <h2 style="margin: 12px 0 4px 0; font-size: 20px;">Factual Solutions Advisory</h2>
              <div style="font-size: 12px; color: #94a3b8;">Reference: ${inquiry.id} &bull; ${inquiry.date}</div>
            </div>
            <div class="body">
              <table class="metric-table">
                <tr><td class="label">Client Name:</td><td class="val">${inquiry.fullName}</td></tr>
                <tr><td class="label">Work Email:</td><td class="val"><a href="mailto:${inquiry.workEmail}" style="color: #A33C29;">${inquiry.workEmail}</a></td></tr>
                <tr><td class="label">Direct Phone:</td><td class="val">${inquiry.phone || 'Not provided'}</td></tr>
                <tr><td class="label">Company / Group:</td><td class="val">${inquiry.companyName || 'Independent'}</td></tr>
                <tr><td class="label">Service Requested:</td><td class="val" style="color: #A33C29;">${inquiry.serviceOfInterest}</td></tr>
              </table>

              <div class="message-box">
                <strong>Project Scope &amp; Strategic Inquiries:</strong><br />
                ${inquiry.message.replace(/\n/g, '<br/>')}
              </div>

              <div class="actions">
                <a href="${whatsappUrl}" class="btn btn-wa" target="_blank">Reply via WhatsApp</a>
                <a href="mailto:${inquiry.workEmail}?subject=${encodeURIComponent(`Factual Solutions Advisory: Regarding Inquiry #${inquiry.id}`)}" class="btn">Reply via Email</a>
              </div>
            </div>
            <div class="footer">
              This is an automated executive notification generated by Factual Solutions Web Platform.
            </div>
          </div>
        </body>
        </html>
      `;

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "Factual Solutions Advisory <onboarding@resend.dev>",
          to: [notificationEmail],
          subject: `[Advisory Inquiry] ${inquiry.fullName} - ${inquiry.serviceOfInterest} (#${inquiry.id})`,
          html: htmlContent
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Resend API notification error:", errorText);
        return { success: false, provider: "resend", details: errorText };
      }

      return { success: true, provider: "resend" };
    } catch (err: any) {
      console.error("Resend dispatch failed:", err);
      return { success: false, provider: "resend", details: err?.message };
    }
  }

  return { success: true, provider: "console-logger" };
}

/**
 * Send official executive reply email to the client directly from the Admin Panel
 */
export async function sendConsultantReplyEmail(
  payload: ConsultantReplyEmailPayload
): Promise<{ success: boolean; provider: string; messageId?: string; error?: string }> {
  const replySubject = payload.subject || `Factual Solutions Advisory: Response to Consultation #${payload.inquiryId}`;
  const senderFrom = process.env.EMAIL_FROM || "Factual Solutions Advisory <onboarding@resend.dev>";
  const replyToEmail = process.env.NOTIFICATION_EMAIL || "qadeer@factualsolutions.com";

  console.log(`\n========================================`);
  console.log(`📤 [CONSULTANT OUTBOUND EMAIL]`);
  console.log(`----------------------------------------`);
  console.log(`To:        ${payload.clientName} <${payload.to}>`);
  console.log(`Inquiry:   #${payload.inquiryId}`);
  console.log(`Service:   ${payload.serviceOfInterest || "Corporate Advisory"}`);
  console.log(`Author:    ${payload.author}`);
  console.log(`Subject:   ${replySubject}`);
  console.log(`From:      ${senderFrom}`);
  console.log(`Reply-To:  ${replyToEmail}`);
  console.log(`Content:\n${payload.content}`);
  console.log(`========================================\n`);

  // Convert plain text newlines into formatted HTML paragraphs
  const formattedHtmlParagraphs = payload.content
    .split(/\n{2,}/)
    .map((p) => `<p style="margin: 0 0 16px 0; line-height: 1.7; color: #1e293b; font-size: 15px;">${p.replace(/\n/g, "<br/>")}</p>`)
    .join("");

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${replySubject}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 24px 12px; background-color: #f1f5f9; color: #0f172a; }
        .wrapper { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06); }
        .header { background: #0E1726; padding: 32px 28px; text-align: left; border-bottom: 3px solid #A33C29; }
        .brand-badge { display: inline-block; padding: 4px 12px; background: rgba(163, 60, 41, 0.2); color: #E58370; font-size: 11px; font-weight: 700; border-radius: 999px; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 12px; border: 1px solid rgba(163, 60, 41, 0.4); }
        .brand-title { margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; }
        .brand-sub { margin: 4px 0 0 0; font-size: 12px; color: #94a3b8; letter-spacing: 0.5px; }
        .body-content { padding: 32px 28px; }
        .greeting { font-size: 17px; font-weight: 700; color: #0E1726; margin-bottom: 18px; }
        .inquiry-meta-box { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px 20px; margin: 24px 0; font-size: 12.5px; }
        .inquiry-meta-row { display: flex; justify-content: space-between; padding: 4px 0; color: #475569; }
        .inquiry-meta-row strong { color: #0E1726; }
        .signature-box { margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0; font-size: 13.5px; color: #334155; }
        .signature-name { font-size: 15px; font-weight: 800; color: #0E1726; margin-bottom: 2px; }
        .signature-role { font-size: 12.5px; color: #A33C29; font-weight: 600; }
        .cta-container { margin: 28px 0 12px 0; text-align: left; }
        .cta-btn { display: inline-block; padding: 12px 24px; background: #A33C29; color: #ffffff !important; text-decoration: none; font-size: 13px; font-weight: 700; border-radius: 8px; margin-right: 10px; margin-bottom: 8px; box-shadow: 0 4px 10px rgba(163,60,41,0.25); }
        .cta-btn-alt { display: inline-block; padding: 12px 24px; background: #0E1726; color: #ffffff !important; text-decoration: none; font-size: 13px; font-weight: 700; border-radius: 8px; margin-bottom: 8px; }
        .footer { background: #F8FAFC; padding: 20px 28px; border-top: 1px solid #E2E8F0; font-size: 11.5px; color: #64748b; line-height: 1.6; text-align: center; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <div class="brand-badge">Executive Advisory Response</div>
          <h1 class="brand-title">Factual Solutions Advisory</h1>
          <p class="brand-sub">Corporate Turnaround &bull; Industrial Engineering &bull; Feasibility Advisory</p>
        </div>

        <div class="body-content">
          <div class="greeting">Dear ${payload.clientName},</div>

          <div style="font-family: inherit;">
            ${formattedHtmlParagraphs}
          </div>

          <div class="inquiry-meta-box">
            <div style="font-weight: 700; color: #0E1726; margin-bottom: 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Consultation Reference</div>
            <div style="line-height: 1.8;">
              <div><strong>Reference ID:</strong> #${payload.inquiryId}</div>
              <div><strong>Service Practice:</strong> ${payload.serviceOfInterest || "General Consultation"}</div>
              <div><strong>Prepared By:</strong> ${payload.author}</div>
            </div>
          </div>

          <div class="cta-container">
            <a href="https://wa.me/923241775662?text=${encodeURIComponent(`Hello, regarding consultation response #${payload.inquiryId} from Factual Solutions Advisory:`)}" class="cta-btn" target="_blank">Connect via WhatsApp</a>
            <a href="mailto:${replyToEmail}?subject=${encodeURIComponent(`Re: ${replySubject}`)}" class="cta-btn-alt">Reply to Partner</a>
          </div>

          <div class="signature-box">
            <div style="margin-bottom: 8px; color: #64748b;">Warm regards,</div>
            <div class="signature-name">${payload.author}</div>
            <div class="signature-role">Factual Solutions Advisory Practice</div>
            <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Al-Khobar &bull; Riyadh, KSA &bull; International Advisory</div>
          </div>
        </div>

        <div class="footer">
          This confidential communication was dispatched on behalf of Factual Solutions Advisory Partners regarding Consultation Request #${payload.inquiryId}.<br/>
          If you have received this message in error, please disregard and notify <a href="mailto:${replyToEmail}" style="color: #A33C29;">${replyToEmail}</a>.
        </div>
      </div>
    </body>
    </html>
  `;

  // 1. Deliver via Resend if RESEND_API_KEY is configured
  if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim().length > 0) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY.trim()}`
        },
        body: JSON.stringify({
          from: senderFrom,
          to: [payload.to],
          reply_to: replyToEmail,
          subject: replySubject,
          html: htmlContent
        })
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        console.error("Resend API outbound reply error:", data);
        return {
          success: false,
          provider: "resend",
          error: data?.message || `Resend API returned status ${response.status}`
        };
      }

      return {
        success: true,
        provider: "resend",
        messageId: data?.id
      };
    } catch (err: any) {
      console.error("Exception sending via Resend:", err);
      return {
        success: false,
        provider: "resend",
        error: err?.message || "Failed to reach Resend API"
      };
    }
  }

  // 2. Fallback to Local Audit Logger (Atlas Database preserves entire transcript)
  return {
    success: true,
    provider: "console-logger",
    messageId: `AUDIT-${Date.now().toString().slice(-6)}`
  };
}

/**
 * Send a verification test email to verify mailing system setup
 */
export async function sendTestEmail(targetEmail: string): Promise<{ success: boolean; provider: string; message?: string }> {
  return sendConsultantReplyEmail({
    to: targetEmail,
    clientName: "Executive Administrator",
    inquiryId: "TEST-" + Math.floor(1000 + Math.random() * 9000),
    serviceOfInterest: "System Verification & Diagnostics",
    author: "Factual Solutions Platform Administrator",
    subject: "Factual Solutions Advisory: Mailing System Diagnostic Verification",
    content: `This is a verification test email transmitted from the Factual Solutions Admin Portal.\n\nYour outbound mailing system is successfully operational. Partner responses and consultation proposals can now be dispatched directly to prospective clients.`
  });
}
