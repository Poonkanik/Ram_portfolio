import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getResendKey() {
  try {
    const envFile = path.resolve(__dirname, ".env");
    if (fs.existsSync(envFile)) {
      const content = fs.readFileSync(envFile, "utf-8");
      const match = content.match(/^\s*RESEND_API_KEY\s*=\s*(["']?)(.*?)\1\s*$/m);
      if (match && match[2].trim()) {
        return match[2].trim();
      }
    }
  } catch {
    // ignore
  }
  return process.env.RESEND_API_KEY || "";
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: "resend-dev-handler",
      configureServer(server) {
        server.middlewares.use("/api/send-email", async (req, res) => {
          if (req.method !== "POST") {
            res.statusCode = 405;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Method not allowed" }));
            return;
          }

          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });

          req.on("end", async () => {
            try {
              const data = JSON.parse(body || "{}");
              const { name, email, institution, reason, message } = data;

              if (!name || !email || !message) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Missing required fields" }));
                return;
              }

              const reasonLabels = {
                collaboration: "Research collaboration",
                mentorship: "Mentorship / thesis guidance",
                speaking: "Speaking invitation",
                media: "Media enquiry",
                other: "General enquiry",
              };

              let apiKey = getResendKey();

              const sendEmailPayload = (key) =>
                fetch("https://api.resend.com/emails", {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${key}`,
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

              let resendResponse = await sendEmailPayload(apiKey);
              let result = await resendResponse.json().catch(() => ({}));



              if (!resendResponse.ok) {
                res.statusCode = resendResponse.status;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: result.message || "Failed to send email via Resend" }));
                return;
              }

              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: true, id: result.id }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: err.message || "Server error" }));
            }
          });
        });
      },
    },
  ],
  server: {
    port: 5173,
  },
});
