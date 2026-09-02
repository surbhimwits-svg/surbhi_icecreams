"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FlavourCard({ id, name, description, image, bg }) {
  return (
    <Link
      href={`/about#${id}`}
      aria-label={`Read more about ${name} on the About page`}
      className="block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-deep/60 focus-visible:ring-offset-2"
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`flex flex-col items-center rounded-3xl p-6 text-center shadow-md ${bg}`}
      >
        <div className="flex h-36 w-36 items-center justify-center rounded-full bg-white/70 shadow-inner sm:h-40 sm:w-40">
          <Image
            src={image}
            alt={`Scoop of ${name} ice cream`}
            width={300}
            height={300}
            unoptimized
            className="h-28 w-28 object-contain sm:h-32 sm:w-32"
          />
        </div>
        <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
          {name}
        </h3>
        <p className="mt-2 font-body text-sm text-foreground/75">
          {description}
        </p>
      </motion.div>
    </Link>
  );
}
