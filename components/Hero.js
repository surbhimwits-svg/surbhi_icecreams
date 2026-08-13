"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-sky via-sky/70 to-butter/40"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-12 md:px-8 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 text-center md:order-1 md:text-left"
        >
          <span className="inline-block rounded-full bg-white/80 px-4 py-1.5 font-heading text-sm font-semibold text-sky-deep shadow-sm">
            Fresh &bull; Fun &bull; Family-Loved
          </span>

          <h1 className="mt-5 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl">
            Scoops of Happiness,
            <span className="text-pink-dark"> Made Fresh Daily!</span>
          </h1>

          <p className="mx-auto mt-5 max-w-md font-body text-lg text-foreground/80 md:mx-0">
            Handcrafted ice creams in flavors kids and families love. Real
            ingredients, real joy, in every scoop.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
            <a
              href="#flavours"
              className="w-full rounded-full bg-pink px-8 py-3.5 text-center font-heading text-lg font-semibold text-[#5a2e3a] shadow-md transition-transform hover:scale-105 hover:bg-pink-dark sm:w-auto"
            >
              Explore Flavours
            </a>
            <a
              href="#about"
              className="w-full rounded-full border-2 border-sky-deep bg-white/70 px-8 py-3.5 text-center font-heading text-lg font-semibold text-sky-deep transition-transform hover:scale-105 hover:bg-white sm:w-auto"
            >
              Our Story
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="order-1 md:order-2"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/hero-illustration.svg"
              alt="Three colorful hand-drawn ice cream cones with sprinkles, in mint, butterscotch and strawberry"
              width={800}
              height={620}
              priority
              unoptimized
              className="mx-auto h-auto w-full max-w-lg drop-shadow-xl"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Wavy divider into the next section */}
      <svg
        className="block w-full text-white"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0 40 C240 90 480 0 720 30 C960 60 1200 10 1440 40 L1440 80 L0 80 Z"
        />
      </svg>
    </section>
  );
}
