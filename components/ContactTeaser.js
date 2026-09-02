"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactTeaser() {
  return (
    <section id="contact" className="bg-white py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl px-4 text-center md:px-8"
      >
        <span className="inline-block rounded-full bg-pink/40 px-4 py-1.5 font-heading text-sm font-semibold text-[#a13f5c]">
          Contact Us
        </span>
        <h2 className="mt-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
          We&apos;d Love to Hear From You
        </h2>
        <p className="mt-3 font-body text-lg text-foreground/75">
          Questions, catering orders, or just want to say hi? Reach out and
          we&apos;ll get back to you soon.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="w-full rounded-full bg-pink px-8 py-3.5 text-center font-heading text-lg font-semibold text-[#5a2e3a] shadow-md transition-transform hover:scale-105 hover:bg-pink-dark sm:w-auto"
          >
            Contact Us
          </Link>
          <a
            href="tel:+911234567890"
            className="w-full rounded-full border-2 border-sky-deep bg-white/70 px-8 py-3.5 text-center font-heading text-lg font-semibold text-sky-deep transition-transform hover:scale-105 hover:bg-white sm:w-auto"
          >
            Call Us
          </a>
        </div>
      </motion.div>
    </section>
  );
}
