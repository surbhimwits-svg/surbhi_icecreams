"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutCta() {
  return (
    <section className="bg-sky/25 py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl px-4 text-center md:px-8"
      >
        <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Ready for Your Next Scoop?
        </h2>
        <p className="mt-3 font-body text-lg text-foreground/75">
          Explore our flavours or get in touch — we&apos;d love to hear from
          you.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/#flavours"
            className="w-full rounded-full bg-pink px-8 py-3.5 text-center font-heading text-lg font-semibold text-[#5a2e3a] shadow-md transition-transform hover:scale-105 hover:bg-pink-dark sm:w-auto"
          >
            Explore Our Flavours
          </Link>
          <Link
            href="/contact"
            className="w-full rounded-full border-2 border-sky-deep bg-white/70 px-8 py-3.5 text-center font-heading text-lg font-semibold text-sky-deep transition-transform hover:scale-105 hover:bg-white sm:w-auto"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
