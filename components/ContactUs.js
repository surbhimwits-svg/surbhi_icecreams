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

export default function ContactUs() {
  const [status, setStatus] = useState("idle");

  function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitted");
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
                  className="w-full rounded-2xl border border-sky-dark/50 bg-white px-4 py-3 font-body text-foreground shadow-sm focus:border-sky-deep focus:outline-none focus:ring-2 focus:ring-sky-deep/40"
                  placeholder="Your name"
                />
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
                  className="w-full rounded-2xl border border-sky-dark/50 bg-white px-4 py-3 font-body text-foreground shadow-sm focus:border-sky-deep focus:outline-none focus:ring-2 focus:ring-sky-deep/40"
                  placeholder="you@example.com"
                />
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
                  className="w-full rounded-2xl border border-sky-dark/50 bg-white px-4 py-3 font-body text-foreground shadow-sm focus:border-sky-deep focus:outline-none focus:ring-2 focus:ring-sky-deep/40"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-pink px-6 py-3.5 font-heading text-lg font-semibold text-[#5a2e3a] shadow-md transition-transform hover:scale-105 hover:bg-pink-dark sm:w-auto sm:self-start"
              >
                Send Message
              </button>

              <p role="status" aria-live="polite" className="min-h-[1.5rem] font-body text-sm text-[#2f7a54]">
                {status === "submitted" &&
                  "Thanks for reaching out! We'll get back to you soon."}
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
