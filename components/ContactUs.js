"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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

const NAME_PATTERN = /^[A-Za-z][A-Za-z\s'.-]{1,49}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^(?:\+91[\s-]?)?[6-9]\d{9}$/;

function validateForm(data) {
  const errors = {};

  const name = data.get("name").trim();
  if (!name) {
    errors.name = "Please enter your name.";
  } else if (!NAME_PATTERN.test(name)) {
    errors.name = "Name should only contain letters and be at least 2 characters.";
  }

  const email = data.get("email").trim();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  const phone = data.get("phone").trim();
  if (!phone) {
    errors.phone = "Please enter your phone number.";
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone = "Please enter a valid 10-digit Indian mobile number.";
  }

  const message = data.get("message").trim();
  if (!message) {
    errors.message = "Please enter a message.";
  } else if (message.length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }

  return errors;
}

export default function ContactUs() {
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const validationErrors = validateForm(data);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("invalid");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("submitted");
      setErrors({});
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
            className="rounded-3xl bg-sky/20 p-6 shadow-sm sm:p-8"
          >
            <div className="flex flex-col gap-5">
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
                <label
                  htmlFor="message"
                  className="mb-1.5 block font-heading text-sm font-semibold text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
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
                  status === "invalid" || status === "error"
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
