"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ContactForm from "./ContactForm";

const SESSION_STORAGE_KEY = "surbhiOrderPopupShown";
const SCROLL_TRIGGER_PERCENT = 50;

export default function OrderPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef(null);

  // Watch scroll depth and open the popup once per session at ~50% of the
  // page. Guards against short pages (little/no scrollable height) and
  // recalculates on resize since viewport/content height can change.
  useEffect(() => {
    let hasShown = false;
    try {
      hasShown = sessionStorage.getItem(SESSION_STORAGE_KEY) === "true";
    } catch {
      // sessionStorage can throw in some privacy modes; fail open to "not shown".
    }
    if (hasShown) return;

    let throttleTimer = null;

    function checkScrollDepth() {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const scrollPercentage = (window.scrollY / scrollableHeight) * 100;
      if (scrollPercentage >= SCROLL_TRIGGER_PERCENT) {
        setIsOpen(true);
        try {
          sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
        } catch {
          // Best-effort only; worst case the popup can reappear this session.
        }
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
      }
    }

    // Timer-based throttle (rather than requestAnimationFrame) so the check
    // still runs promptly even if the tab is backgrounded/occluded, where
    // rAF callbacks can be paused.
    function handleScroll() {
      if (throttleTimer) return;
      throttleTimer = setTimeout(() => {
        throttleTimer = null;
        checkScrollDepth();
      }, 100);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    // Catch the case where the page was already scrolled past the trigger
    // point before this effect ran (slow hydration, scroll restoration, a
    // mid-page anchor link) — otherwise there's no further "scroll" event
    // left to fire and the popup would never open this session.
    checkScrollDepth();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, []);

  // Close on Escape and lock body scroll while open, same pattern as the
  // mobile nav drawer.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-foreground/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-popup-heading"
            className="relative max-h-[85vh] w-[calc(100%-30px)] max-w-[480px] overflow-y-auto rounded-3xl bg-butter p-6 shadow-2xl sm:p-7"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close Order Now popup"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-foreground shadow-sm transition-transform hover:scale-105 hover:bg-pink focus:outline-none focus:ring-2 focus:ring-sky-deep/40"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <span className="inline-block rounded-full bg-white px-4 py-1.5 font-heading text-sm font-semibold text-[#8a6d1f]">
              Limited Time
            </span>
            <h2
              id="order-popup-heading"
              className="mt-3 font-heading text-3xl font-bold text-foreground"
            >
              Order Now
            </h2>
            <p className="mt-2 font-body text-foreground/75">
              Craving something sweet? Order your favourite Surbhi Icecreams
              flavour today!
            </p>

            <div className="mt-6 rounded-3xl bg-white p-4 sm:p-6">
              <ContactForm
                idPrefix="popup"
                submitLabel="Order Now"
                loadingLabel="Submitting..."
                successMessage="Thank you! Your order request has been received. We'll get in touch with you soon."
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
