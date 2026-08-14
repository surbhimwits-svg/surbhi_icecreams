"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  validateContactForm,
  isHoneypotTriggered,
  HONEYPOT_FIELD,
  NAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PHONE_MAX_LENGTH,
  MESSAGE_MAX_LENGTH,
} from "@/lib/validation";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path
          d="M14 8.5h2.5V5H14c-2.2 0-4 1.8-4 4v2H8v3.5h2V21h3.5v-6.5H16l.5-3.5h-3V9c0-.6.4-1 1.5-1Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function ContactUs() {
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [messageLength, setMessageLength] = useState(0);

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
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-pink/40 px-4 py-1.5 font-heading text-sm font-semibold text-[#a13f5c]">
            Contact Us
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            We&apos;d Love to Hear From You
          </h2>
          <p className="mt-3 font-body text-lg text-foreground/75">
            Questions, catering orders, or just want to say hi? Drop us a
            message.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="relative rounded-3xl bg-sky/20 p-6 shadow-sm sm:p-8"
          >
            <div className="flex flex-col gap-5">
              {/* Honeypot: invisible to sighted users and not reachable by
                  keyboard/screen reader, but present for bots that blindly
                  fill in every field. */}
              <div
                aria-hidden="true"
                className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
              >
                <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
                <input
                  id={HONEYPOT_FIELD}
                  name={HONEYPOT_FIELD}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block font-heading text-sm font-semibold text-foreground"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={NAME_MAX_LENGTH}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="w-full rounded-2xl border border-sky-dark/50 bg-white px-4 py-3 font-body text-foreground shadow-sm focus:border-sky-deep focus:outline-none focus:ring-2 focus:ring-sky-deep/40"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 font-body text-sm text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block font-heading text-sm font-semibold text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={EMAIL_MAX_LENGTH}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="w-full rounded-2xl border border-sky-dark/50 bg-white px-4 py-3 font-body text-foreground shadow-sm focus:border-sky-deep focus:outline-none focus:ring-2 focus:ring-sky-deep/40"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 font-body text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block font-heading text-sm font-semibold text-foreground"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  maxLength={PHONE_MAX_LENGTH}
                  autoComplete="tel"
                  inputMode="tel"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className="w-full rounded-2xl border border-sky-dark/50 bg-white px-4 py-3 font-body text-foreground shadow-sm focus:border-sky-deep focus:outline-none focus:ring-2 focus:ring-sky-deep/40"
                  placeholder="+91 98765 43210"
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1.5 font-body text-sm text-red-600">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <label
                    htmlFor="message"
                    className="mb-1.5 block font-heading text-sm font-semibold text-foreground"
                  >
                    Message
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
                  id="message"
                  name="message"
                  rows={4}
                  required
                  maxLength={MESSAGE_MAX_LENGTH}
                  onChange={(event) => setMessageLength(event.target.value.length)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="w-full rounded-2xl border border-sky-dark/50 bg-white px-4 py-3 font-body text-foreground shadow-sm focus:border-sky-deep focus:outline-none focus:ring-2 focus:ring-sky-deep/40"
                  placeholder="Tell us what's on your mind..."
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 font-body text-sm text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-2 w-full rounded-full bg-pink px-6 py-3.5 font-heading text-lg font-semibold text-[#5a2e3a] shadow-md transition-transform hover:scale-105 hover:bg-pink-dark disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:w-auto sm:self-start"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
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
                {status === "submitted" &&
                  "Thanks for reaching out! We'll get back to you soon."}
                {status === "invalid" &&
                  "Please fix the highlighted fields and try again."}
                {status === "error" &&
                  "Something went wrong. Please try again in a moment."}
                {status === "rate-limited" &&
                  "You've submitted a few messages already — please wait a bit before sending another."}
              </p>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center gap-6"
          >
            <div className="rounded-3xl bg-butter/40 p-6 sm:p-8">
              <h3 className="font-heading text-xl font-bold text-foreground">
                Visit or Reach Us
              </h3>
              <dl className="mt-4 flex flex-col gap-4 font-body text-foreground/80">
                <div>
                  <dt className="font-semibold text-foreground">Phone</dt>
                  <dd>
                    <a href="tel:+911234567890" className="hover:text-sky-deep">
                      +91 12345 67890
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Email</dt>
                  <dd>
                    <a
                      href="mailto:hello@surbhiicecreams.com"
                      className="hover:text-sky-deep"
                    >
                      hello@surbhiicecreams.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Store</dt>
                  <dd>
                    123 Rainbow Street, Model Colony,
                    <br />
                    Pune, Maharashtra 411016
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                Follow the Fun
              </h3>
              <div className="mt-3 flex gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={`Follow us on ${social.name}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-sky text-sky-deep transition-colors hover:bg-pink hover:text-[#5a2e3a]"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
