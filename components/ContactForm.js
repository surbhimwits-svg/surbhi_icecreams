"use client";

import { useState } from "react";
import {
  validateContactForm,
  isHoneypotTriggered,
  sanitizePhoneInput,
  HONEYPOT_FIELD,
  NAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PHONE_MAX_LENGTH,
  MESSAGE_MAX_LENGTH,
} from "@/lib/validation";

const DEFAULT_SUCCESS_MESSAGE = "Thanks for reaching out! We'll get back to you soon.";

// Shared by the main Contact Us section and the Order Now popup so both
// submit through the exact same client-side validation and the same
// /api/contact route (which itself talks to Supabase + Resend). idPrefix
// keeps input ids unique when both forms are mounted on the page at once.
export default function ContactForm({
  idPrefix = "",
  submitLabel = "Send Message",
  loadingLabel = "Sending...",
  successMessage = DEFAULT_SUCCESS_MESSAGE,
}) {
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [messageLength, setMessageLength] = useState(0);
  const [phone, setPhone] = useState("");

  const id = (name) => (idPrefix ? `${idPrefix}-${name}` : name);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);

    // Bots that auto-fill every field on the page will fill this one in;
    // real visitors never see it. If it's populated, silently pretend the
    // submission succeeded instead of hitting the API at all.
    if (isHoneypotTriggered({ [HONEYPOT_FIELD]: data.get(HONEYPOT_FIELD) })) {
      setStatus("submitted");
      setErrors({});
      form.reset();
      setPhone("");
      return;
    }

    const { errors: validationErrors, isValid, values } = validateContactForm({
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      message: data.get("message"),
    });

    setErrors(validationErrors);

    if (!isValid) {
      setStatus("invalid");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.status === 429) {
        setStatus("rate-limited");
        return;
      }

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("submitted");
      setErrors({});
      setMessageLength(0);
      setPhone("");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-5">
      {/* Honeypot: invisible to sighted users and not reachable by
          keyboard/screen reader, but present for bots that blindly
          fill in every field. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor={id(HONEYPOT_FIELD)}>Leave this field empty</label>
        <input
          id={id(HONEYPOT_FIELD)}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label
          htmlFor={id("name")}
          className="mb-1.5 block font-heading text-sm font-semibold text-foreground"
        >
          Name
        </label>
        <input
          id={id("name")}
          name="name"
          type="text"
          required
          maxLength={NAME_MAX_LENGTH}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? id("name-error") : undefined}
          className="w-full rounded-2xl border border-sky-dark/50 bg-white px-4 py-3 font-body text-foreground shadow-sm focus:border-sky-deep focus:outline-none focus:ring-2 focus:ring-sky-deep/40"
          placeholder="Your name"
        />
        {errors.name && (
          <p id={id("name-error")} className="mt-1.5 font-body text-sm text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor={id("email")}
          className="mb-1.5 block font-heading text-sm font-semibold text-foreground"
        >
          Email
        </label>
        <input
          id={id("email")}
          name="email"
          type="email"
          required
          maxLength={EMAIL_MAX_LENGTH}
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? id("email-error") : undefined}
          className="w-full rounded-2xl border border-sky-dark/50 bg-white px-4 py-3 font-body text-foreground shadow-sm focus:border-sky-deep focus:outline-none focus:ring-2 focus:ring-sky-deep/40"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p id={id("email-error")} className="mt-1.5 font-body text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor={id("phone")}
          className="mb-1.5 block font-heading text-sm font-semibold text-foreground"
        >
          Phone Number
        </label>
        <input
          id={id("phone")}
          name="phone"
          type="tel"
          inputMode="numeric"
          pattern="\d*"
          required
          maxLength={PHONE_MAX_LENGTH}
          autoComplete="tel"
          value={phone}
          onChange={(event) => setPhone(sanitizePhoneInput(event.target.value))}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? id("phone-error") : undefined}
          className="w-full rounded-2xl border border-sky-dark/50 bg-white px-4 py-3 font-body text-foreground shadow-sm focus:border-sky-deep focus:outline-none focus:ring-2 focus:ring-sky-deep/40"
          placeholder="9876543210"
        />
        {errors.phone && (
          <p id={id("phone-error")} className="mt-1.5 font-body text-sm text-red-600">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <label
            htmlFor={id("message")}
            className="mb-1.5 block font-heading text-sm font-semibold text-foreground"
          >
            Message <span className="font-body font-normal text-foreground/50">(optional)</span>
          </label>
          <span
            aria-hidden="true"
            className={`font-body text-xs ${
              messageLength > MESSAGE_MAX_LENGTH
                ? "text-red-600"
                : "text-foreground/50"
            }`}
          >
            {messageLength}/{MESSAGE_MAX_LENGTH}
          </span>
        </div>
        <textarea
          id={id("message")}
          name="message"
          rows={4}
          maxLength={MESSAGE_MAX_LENGTH}
          onChange={(event) => setMessageLength(event.target.value.length)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? id("message-error") : undefined}
          className="w-full rounded-2xl border border-sky-dark/50 bg-white px-4 py-3 font-body text-foreground shadow-sm focus:border-sky-deep focus:outline-none focus:ring-2 focus:ring-sky-deep/40"
          placeholder="Tell us what's on your mind..."
        />
        {errors.message && (
          <p id={id("message-error")} className="mt-1.5 font-body text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 w-full rounded-full bg-pink px-6 py-3.5 font-heading text-lg font-semibold text-[#5a2e3a] shadow-md transition-transform hover:scale-105 hover:bg-pink-dark disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:w-auto sm:self-start"
      >
        {status === "sending" ? loadingLabel : submitLabel}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`min-h-[1.5rem] font-body text-sm ${
          status === "invalid" || status === "error" || status === "rate-limited"
            ? "text-red-600"
            : "text-[#2f7a54]"
        }`}
      >
        {status === "submitted" && successMessage}
        {status === "invalid" &&
          "Please fix the highlighted fields and try again."}
        {status === "error" &&
          "Something went wrong. Please try again in a moment."}
        {status === "rate-limited" &&
          "You've submitted a few messages already — please wait a bit before sending another."}
      </p>
    </form>
  );
}
