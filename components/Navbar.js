"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Close the mobile drawer on Escape and lock body scroll while it's open.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-sky-dark/40 bg-white/90 backdrop-blur-sm shadow-sm">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8"
          aria-label="Primary"
        >
          <Link href="/" className="shrink-0" onClick={() => setIsOpen(false)}>
            <Logo />
          </Link>

          {/* Desktop menu */}
          <ul className="hidden items-center gap-8 font-heading text-base font-medium text-foreground md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-pink-dark"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/#flavours"
            className="hidden rounded-full bg-pink px-5 py-2 font-heading text-sm font-semibold text-[#5a2e3a] shadow-sm transition-transform hover:scale-105 hover:bg-pink-dark md:inline-block"
          >
            Explore Flavours
          </Link>

          {/* Hamburger button (mobile) */}
          <button
            type="button"
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-sky/60 md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-drawer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <motion.span
              className="h-0.5 w-5 rounded-full bg-sky-deep"
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="h-0.5 w-5 rounded-full bg-sky-deep"
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="h-0.5 w-5 rounded-full bg-sky-deep"
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile drawer — rendered outside <header> so its "fixed" positioning
          isn't captured by the header's backdrop-blur containing block. */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-foreground/40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="fixed right-0 top-0 z-40 flex h-full w-72 flex-col gap-2 bg-butter px-6 pt-24 shadow-2xl md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl px-4 py-3 font-heading text-lg font-semibold text-[#2b4a5e] transition-colors hover:bg-white/60"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#flavours"
                onClick={() => setIsOpen(false)}
                className="mt-4 rounded-full bg-pink px-5 py-3 text-center font-heading text-base font-semibold text-[#5a2e3a] shadow-sm"
              >
                Explore Flavours
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
