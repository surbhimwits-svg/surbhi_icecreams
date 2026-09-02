"use client";

import { motion } from "framer-motion";

const REASONS = [
  {
    title: "Real Ingredients",
    description:
      "Every batch is made with quality milk, real fruit, and honest flavourings — no shortcuts.",
    bg: "bg-butter",
  },
  {
    title: "Made Fresh, Small Batch",
    description:
      "We make our ice creams fresh in small quantities, closer to homemade than mass-produced.",
    bg: "bg-sky",
  },
  {
    title: "Hygiene & Care",
    description:
      "Cleanliness and care matter at every step, from the kitchen to the cone in your hand.",
    bg: "bg-mint",
  },
  {
    title: "Family-Friendly Flavours",
    description:
      "A line-up loved by kids and grown-ups alike, picked for taste everyone can agree on.",
    bg: "bg-pink",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-pink/40 px-4 py-1.5 font-heading text-sm font-semibold text-[#a13f5c]">
            Why Choose Us
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            What Makes Our Ice Cream Different
          </h2>
          <p className="mt-3 font-body text-lg text-foreground/75">
            A few simple things we hold ourselves to, in every tub we make.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`rounded-3xl p-6 text-center shadow-md ${reason.bg}`}
            >
              <h3 className="font-heading text-lg font-bold text-foreground">
                {reason.title}
              </h3>
              <p className="mt-2 font-body text-sm text-foreground/75">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
