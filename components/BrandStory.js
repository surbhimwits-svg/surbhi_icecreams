"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BrandStory() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:gap-16 md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="order-2 md:order-1"
        >
          <Image
            src="/images/about-illustration.svg"
            alt="A smiling ice cream cone character surrounded by hearts and sprinkles"
            width={600}
            height={600}
            unoptimized
            className="mx-auto h-auto w-full max-w-md"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="order-1 text-center md:order-2 md:text-left"
        >
          <span className="inline-block rounded-full bg-mint/60 px-4 py-1.5 font-heading text-sm font-semibold text-[#2f7a54]">
            Who We Are
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Homegrown Happiness, Scoop by Scoop
          </h2>
          <p className="mt-5 font-body text-lg leading-relaxed text-foreground/80">
            Surbhi Icecreams started as a small neighbourhood kitchen with one
            simple goal: make ice cream families could trust and genuinely
            enjoy together. That idea hasn&apos;t changed. We&apos;re a
            homegrown brand crafting handmade ice creams in small batches,
            using quality milk, fruit, and flavourings, with hygiene and care
            at every step.
          </p>
          <p className="mt-4 font-body text-lg leading-relaxed text-foreground/80">
            What we offer is straightforward — a small line-up of flavours
            done properly, rather than a huge menu done carelessly. Each tub
            is made fresh in limited quantities, so what you get is closer to
            homemade than mass-produced. It&apos;s this attention to
            ingredients and process, more than anything else, that sets us
            apart.
          </p>
          <p className="mt-4 font-body text-lg leading-relaxed text-foreground/80">
            Whether it&apos;s a birthday treat, a summer evening cone, or a
            family dessert, we want every scoop to feel a little special. Good
            ice cream should be simple, wholesome, and fun — that&apos;s the
            promise we keep batch after batch.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
