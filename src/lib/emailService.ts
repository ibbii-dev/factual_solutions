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
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: "Factual Solutions <leads@factualsolutions.com>",
          to: [notificationEmail],
          subject: `New Lead: ${inquiry.fullName} - ${inquiry.serviceOfInterest}`,
          html: `
            <h2>New Consultation Request</h2>
            <p><strong>Name:</strong> ${inquiry.fullName}</p>
            <p><strong>Email:</strong> ${inquiry.workEmail}</p>
            <p><strong>Phone:</strong> ${inquiry.phone || "Not provided"}</p>
            <p><strong>Company:</strong> ${inquiry.companyName || "N/A"}</p>
            <p><strong>Service:</strong> ${inquiry.serviceOfInterest}</p>
            <p><strong>Message:</strong></p>
            <p>${inquiry.message}</p>
          `
        })
      });
      return { success: true, provider: "resend" };
    } catch (err) {
      console.error("Resend dispatch failed:", err);
    }
  }

  return { success: true, provider: "console-logger" };
}
