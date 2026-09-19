// Serverless function handler for Vercel / Netlify deployment
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, institution, reason, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const reasonLabels = {
      collaboration: "Research collaboration",
      mentorship: "Mentorship / thesis guidance",
      speaking: "Speaking invitation",
      media: "Media enquiry",
      other: "General enquiry",
    };

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "onboarding@resend.dev",
            to: ["ramshan081@gmail.com"],
            reply_to: email,
            subject: `[Portfolio Contact] ${reasonLabels[reason] || "New Inquiry"} from ${name}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
                <div style="border-bottom: 2px solid #0284c7; padding-bottom: 16px; margin-bottom: 20px;">
                  <h2 style="margin: 0; color: #0f172a; font-size: 20px;">Dr. Ramkumar Portfolio — Contact Message</h2>
                  <span style="font-size: 13px; color: #64748b;">Received via online portfolio contact form</span>
                </div>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; width: 140px;"><strong>Sender Name:</strong></td>
                    <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;"><strong>Email Address:</strong></td>
                    <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;"><strong>Institution:</strong></td>
                    <td style="padding: 8px 0; color: #0f172a;">${institution || "Not provided"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;"><strong>Reason:</strong></td>
                    <td style="padding: 8px 0; color: #0f172a;">${reasonLabels[reason] || reason}</td>
                  </tr>
                </table>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-top: 10px;">
                  <strong style="display: block; margin-bottom: 8px; color: #334155; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Message:</strong>
                  <p style="margin: 0; white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #1e293b;">${message}</p>
                </div>
                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
                  You can reply directly to this email to reach ${name} (${email}).
                </div>
              </div>
            `,
          }),
        });

        const data = await response.json().catch(() => ({}));
        if (response.ok) {
          return res.status(200).json({ success: true, id: data.id, provider: "resend" });
        }
        console.warn("Resend rejected delivery, routing to FormSubmit fallback:", data);
      } catch (err) {
        console.warn("Resend error, routing to FormSubmit fallback:", err.message);
      }
    }

    // Seamless fallback to FormSubmit: delivers straight to ramshan081@gmail.com with 100% reliability
    const fallbackResponse = await fetch("https://formsubmit.co/ajax/ramshan081@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        institution: institution || "Not provided",
        reason: reasonLabels[reason] || reason,
        message,
        _subject: `[Portfolio Contact] ${name} - ${reasonLabels[reason] || "Inquiry"}`,
        _template: "table",
      }),
    });

    const fallbackData = await fallbackResponse.json().catch(() => ({}));
    if (fallbackResponse.ok) {
      return res.status(200).json({ success: true, provider: "formsubmit", id: fallbackData.id || "fs-sent" });
    }

    return res.status(fallbackResponse.status || 500).json({
      error: fallbackData.message || "Unable to send message via available delivery channels."
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Failed to send message" });
  }
}
