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

export async function sendLeadNotification(inquiry: InquiryNotificationPayload): Promise<{ success: boolean; provider: string }> {
  const notificationEmail = process.env.NOTIFICATION_EMAIL || "qadeer@factualsolutions.com";
  const webhookUrl = process.env.LEAD_WEBHOOK_URL; // Discord / Slack / Zapier / Make webhook

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

  // If a Webhook is configured (Slack, Discord, Zapier, Make)
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

  // If Resend API key is provided
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

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: "Factual Solutions Advisory <onboarding@resend.dev>",
          to: [notificationEmail],
          subject: `[Advisory Inquiry] ${inquiry.fullName} - ${inquiry.serviceOfInterest} (#${inquiry.id})`,
          html: htmlContent
        })
      });
      return { success: true, provider: "resend" };
    } catch (err) {
      console.error("Resend dispatch failed:", err);
    }
  }

  return { success: true, provider: "console-logger" };
}
