import { publications, achievements } from "../data/content.js";

/**
 * Sends contact message to Dr. Ramkumar.
 * Uses Resend endpoint (/api/send-email) with automatic fallback to FormSubmit
 * for 100% static hosting reliability.
 */
async function sendContactEmail(formData) {
  const { name, email, institution, reason, message } = formData;

  try {
    // Attempt primary Resend endpoint (Vite dev server or Vercel/Netlify serverless)
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, institution, reason, message }),
    });

    if (res.ok) {
      return await res.json();
    }

    // If serverless endpoint fails for any reason, fallback to direct FormSubmit
    console.info("Primary serverless handler returned error; falling back to direct FormSubmit dispatch.");
    return await sendViaFormSubmit(formData);
  } catch (error) {
    // If network error occurred trying /api/send-email
    console.info("Network error on serverless endpoint; falling back to direct FormSubmit dispatch.", error);
    return await sendViaFormSubmit(formData);
  }
}

/**
 * Direct client-side fallback to FormSubmit for pure static deployments (e.g., GitHub Pages)
 */
async function sendViaFormSubmit(formData) {
  const reasonLabels = {
    collaboration: "Research collaboration",
    mentorship: "Mentorship / thesis guidance",
    speaking: "Speaking invitation",
    media: "Media enquiry",
    other: "General enquiry",
  };

  const response = await fetch("https://formsubmit.co/ajax/ramshan081@gmail.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      institution: formData.institution || "N/A",
      reason: reasonLabels[formData.reason] || formData.reason,
      message: formData.message,
      _subject: `[Portfolio Contact] ${formData.name} - ${reasonLabels[formData.reason] || "Inquiry"}`,
      _template: "table",
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Failed to submit message");
  }
  return { success: true, id: data.id || "fs-sent" };
}

export const api = {
  getPublications: async () => publications,
  getAchievements: async () => achievements,
  sendMessage: sendContactEmail,
};
