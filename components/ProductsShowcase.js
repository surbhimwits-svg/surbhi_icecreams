"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/lib/products";

// Sticky header is ~79px on desktop / ~71px on mobile. On a client-side Link
// transition (e.g. clicking a flavour card on the Home page), Next.js scrolls
// to the target before this section's whileInView entrance animation has
// settled, while it's still offset by translateY(20px) — so the landing spot
// is ~20px short of where scroll-mt actually points. 112px = header height +
// that 20px + a small buffer, so the heading clears the header either way.
export default function ProductsShowcase() {
  return (
    <section id="products" className="bg-mint/25 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-white px-4 py-1.5 font-heading text-sm font-semibold text-sky-deep shadow-sm">
            Our Products
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Every Flavour We Make
          </h2>
          <p className="mt-3 font-body text-lg text-foreground/75">
            Four family favourites, each made in small batches with real
            ingredients. Here&apos;s a closer look at what makes every one of
            them worth a scoop.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {PRODUCTS.map((product, index) => (
            <motion.article
              key={product.id}
              id={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`flex scroll-mt-[112px] flex-col items-center gap-5 rounded-3xl p-6 text-center shadow-md sm:flex-row sm:items-start sm:text-left ${product.bg}`}
            >
              <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-white/70 shadow-inner">
                <Image
                  src={product.image}
                  alt={`Scoop of ${product.name} ice cream`}
                  width={300}
                  height={300}
                  unoptimized
                  className="h-24 w-24 object-contain"
                />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  {product.name}
                </h3>
                <p className="mt-1 font-body text-sm font-semibold text-foreground/70">
                  {product.shortDescription}
                </p>
                <p className="mt-3 font-body text-sm leading-relaxed text-foreground/80">
                  {product.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
