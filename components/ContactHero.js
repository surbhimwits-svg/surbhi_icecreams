"use client";

import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <section className="bg-gradient-to-b from-sky via-sky/70 to-butter/40 py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full bg-white/80 px-4 py-1.5 font-heading text-sm font-semibold text-sky-deep shadow-sm">
            Get In Touch
          </span>
          <h1 className="mt-5 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-body text-lg text-foreground/80">
            Got a question, a catering order, or just want to say hi?
            We&apos;d love to hear from you — send us a message and our team
            will get back to you soon.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
