"use client";

import { motion } from "framer-motion";
import FlavourCard from "./FlavourCard";

const FLAVOURS = [
  {
    name: "Mango",
    description: "Rich, creamy, and bursting with real mango pulp.",
    image: "/images/flavours/mango.svg",
    bg: "bg-butter",
  },
  {
    name: "Vanilla",
    description: "Classic and smooth, with real vanilla bean flecks.",
    image: "/images/flavours/vanilla.svg",
    bg: "bg-sky",
  },
  {
    name: "Butterscotch",
    description: "Buttery caramel swirls with crunchy toffee bits.",
    image: "/images/flavours/butterscotch.svg",
    bg: "bg-butter",
  },
  {
    name: "Blueberry",
    description: "Sweet-tart blueberries in a velvety, fruity swirl.",
    image: "/images/flavours/blueberry.svg",
    bg: "bg-sky",
  },
];

export default function Flavours() {
  return (
    <section id="flavours" className="bg-mint/25 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-white px-4 py-1.5 font-heading text-sm font-semibold text-sky-deep shadow-sm">
            Our Flavours
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            A Flavour for Every Smile
          </h2>
          <p className="mt-3 font-body text-lg text-foreground/75">
            Four family favorites, made fresh with real ingredients kids
            (and grown-ups) keep asking for.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FLAVOURS.map((flavour, index) => (
            <motion.div
              key={flavour.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <FlavourCard {...flavour} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
