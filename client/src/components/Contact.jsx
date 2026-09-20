import { useMemo, useState } from "react";
import { Reveal } from "./Reveal.jsx";
import { api } from "../lib/api.js";
import { profile } from "../data/content.js";

const initialForm = {
  name: "",
  email: "",
  institution: "",
  reason: "collaboration",
  message: "",
};

const initialTouched = {
  name: false,
  email: false,
  institution: false,
  reason: false,
  message: false,
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState(initialTouched);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState("");

  const errors = useMemo(() => {
    const errs = {};

    const trimmedName = form.name.trim();
    if (!trimmedName) {
      errs.name = "Please enter your full name.";
    } else if (trimmedName.length < 2) {
      errs.name = "Name must be at least 2 characters long.";
    } else if (trimmedName.length > 80) {
      errs.name = "Name must be under 80 characters.";
    }

    const trimmedEmail = form.email.trim();
    if (!trimmedEmail) {
      errs.email = "Please enter your email address.";
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      errs.email = "Please enter a valid email address (e.g. name@university.edu).";
    }

    if (form.institution && form.institution.length > 100) {
      errs.institution = "Institution name must be under 100 characters.";
    }

    if (!form.reason) {
      errs.reason = "Please select a reason for contact.";
    }

    const trimmedMsg = form.message.trim();
    if (!trimmedMsg) {
      errs.message = "Please write a message.";
    } else if (trimmedMsg.length < 15) {
      errs.message = `Message is too brief (${trimmedMsg.length}/15 chars). Please provide a little more detail.`;
    } else if (trimmedMsg.length > 2000) {
      errs.message = "Message cannot exceed 2000 characters.";
    }

    return errs;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (status === "error") setStatus("idle");
  };

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // Mark all fields as touched to display any remaining validation errors
    setTouched({
      name: true,
      email: true,
      institution: true,
      reason: true,
      message: true,
    });

    if (!isValid) {
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      await api.sendMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        institution: form.institution.trim(),
        reason: form.reason,
        message: form.message.trim(),
      });
      setStatus("sent");
      setForm(initialForm);
      setTouched(initialTouched);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err.message || "Failed to deliver message. Please verify network or try again."
      );
    }
  }

  const handleReset = () => {
    setStatus("idle");
    setForm(initialForm);
    setTouched(initialTouched);
    setErrorMessage("");
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Get in touch</span>
          <h2 className="section-heading">
            Start a <span className="gradient-text">conversation</span>
          </h2>
          <p className="section-intro" style={{ marginBottom: 0 }}>
            For research collaboration, manuscript review, speaking invitations, or doctoral
            guidance enquiries — your message delivers directly to Dr. Ramkumar's inbox.
          </p>

          <div className="contact-info">
            <div className="info-row">
              <span className="dot" />
              <div>
                <span>Direct Email</span>
                <a
                  href="mailto:ramshan081@gmail.com"
                  style={{ color: "#38bdf8", textDecoration: "none", fontWeight: 600 }}
                >
                  ramshan081@gmail.com
                </a>
              </div>
            </div>
            <div className="info-row">
              <span className="dot" />
              <div>
                <span>Location</span>
                <strong>{profile.location}</strong>
              </div>
            </div>
            <div className="info-row">
              <span className="dot" />
              <div>
                <span>Response time</span>
                <strong>Usually within 2–3 working days</strong>
              </div>
            </div>
            <div className="info-row">
              <span className="dot" />
              <div>
                <span>Best for</span>
                <strong>Collaboration, review &amp; mentorship</strong>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card form-card">
            {status === "sent" ? (
              <div className="form-alert success" style={{ flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <strong style={{ fontSize: "16px" }}>Message successfully sent!</strong>
                </div>
                <p style={{ margin: 0, color: "#e2e8f0" }}>
                  Thank you for reaching out. Your note has been delivered to Dr. Ramkumar's inbox
                  (<code>ramshan081@gmail.com</code>). You will receive a response at your email address.
                </p>
                <button
                  type="button"
                  className="form-alert-btn"
                  onClick={handleReset}
                  style={{ alignSelf: "flex-start", marginTop: 8 }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-grid">
                  {/* Name */}
                  <div className="field">
                    <div className="field-header">
                      <label htmlFor="name">
                        Full Name <span style={{ color: "#f87171" }}>*</span>
                      </label>
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Dr. Jane Doe"
                      value={form.name}
                      className={touched.name && errors.name ? "is-invalid" : ""}
                      onChange={(e) => update("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                    />
                    {touched.name && errors.name && (
                      <span className="field-error" role="alert">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="field">
                    <div className="field-header">
                      <label htmlFor="email">
                        Email Address <span style={{ color: "#f87171" }}>*</span>
                      </label>
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@university.edu"
                      value={form.email}
                      className={touched.email && errors.email ? "is-invalid" : ""}
                      onChange={(e) => update("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                    />
                    {touched.email && errors.email && (
                      <span className="field-error" role="alert">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Institution */}
                  <div className="field">
                    <div className="field-header">
                      <label htmlFor="institution">Institution / University (optional)</label>
                    </div>
                    <input
                      id="institution"
                      name="institution"
                      type="text"
                      placeholder="e.g. Oxford University / R&amp;D Center"
                      value={form.institution}
                      className={touched.institution && errors.institution ? "is-invalid" : ""}
                      onChange={(e) => update("institution", e.target.value)}
                      onBlur={() => handleBlur("institution")}
                    />
                    {touched.institution && errors.institution && (
                      <span className="field-error" role="alert">
                        {errors.institution}
                      </span>
                    )}
                  </div>

                  {/* Reason */}
                  <div className="field">
                    <div className="field-header">
                      <label htmlFor="reason">
                        Reason for contact <span style={{ color: "#f87171" }}>*</span>
                      </label>
                    </div>
                    <select
                      id="reason"
                      name="reason"
                      value={form.reason}
                      className={touched.reason && errors.reason ? "is-invalid" : ""}
                      onChange={(e) => update("reason", e.target.value)}
                      onBlur={() => handleBlur("reason")}
                    >
                      <option value="collaboration">Research collaboration</option>
                      <option value="mentorship">Mentorship / thesis guidance</option>
                      <option value="speaking">Speaking invitation</option>
                      <option value="media">Media enquiry</option>
                      <option value="other">Other general inquiry</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="field full">
                    <div className="field-header">
                      <label htmlFor="message">
                        Message <span style={{ color: "#f87171" }}>*</span>
                      </label>
                      <span className="field-char-count">
                        {form.message.trim().length}/2000 chars (min. 15)
                      </span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      placeholder="Please share details about your research topic, collaboration scope, or inquiry..."
                      value={form.message}
                      className={touched.message && errors.message ? "is-invalid" : ""}
                      onChange={(e) => update("message", e.target.value)}
                      onBlur={() => handleBlur("message")}
                    />
                    {touched.message && errors.message && (
                      <span className="field-error" role="alert">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {errors.message}
                      </span>
                    )}
                  </div>
                </div>

                {status === "error" && (
                  <div className="form-alert error" role="alert">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <div>
                      <strong>Unable to send message:</strong>
                      <p style={{ margin: "4px 0 8px" }}>{errorMessage}</p>
                      <p style={{ margin: 0, fontSize: "13px" }}>
                        Alternatively, you can email directly:{" "}
                        <a
                          href={`mailto:ramshan081@gmail.com?subject=Inquiry%20from%20Portfolio%20(${encodeURIComponent(
                            form.name || "Visitor"
                          )})&body=${encodeURIComponent(
                            `Name: ${form.name}\nEmail: ${form.email}\nInstitution: ${form.institution}\nReason: ${form.reason}\n\nMessage:\n${form.message}`
                          )}`}
                          style={{ color: "#38bdf8", textDecoration: "underline" }}
                        >
                          Send directly to ramshan081@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                <div className="form-footer">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={status === "sending"}
                    style={{ minWidth: 160 }}
                  >
                    {status === "sending" ? "Sending email…" : "Send message"}
                  </button>

                  <span style={{ fontSize: 13, color: "var(--text-faint)" }}>
                    Direct delivery to Dr. Ramkumar &bull; No registration needed
                  </span>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
