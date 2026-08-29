"use client";

import { useEffect, useRef } from "react";

// Elements that should make the follower "expand" when hovered.
const HOVER_TARGET_SELECTOR =
  'a, button, input, textarea, select, label, img, [role="button"], [data-cursor-hover]';

export default function CursorFollower() {
  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // Skip entirely on touch/coarse-pointer devices and when the user
    // prefers reduced motion — the element stays hidden via CSS either way,
    // but there's no reason to also pay for listeners/rAF on those devices.
    const supportsFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!supportsFinePointer || prefersReducedMotion) return;

    // Target = raw mouse position, current = eased position the dot is
    // actually drawn at. Interpolating current toward target every frame
    // is what produces the smooth "lag behind the cursor" motion.
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    const easing = 0.18;
    let rafId;

    const handleMouseMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const handleMouseOver = (event) => {
      if (event.target.closest(HOVER_TARGET_SELECTOR)) {
        dot.classList.add("is-active");
      }
    };

    const handleMouseOut = (event) => {
      if (event.target.closest(HOVER_TARGET_SELECTOR)) {
        dot.classList.remove("is-active");
      }
    };

    const tick = () => {
      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;
      dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return <div ref={dotRef} className="cursor-follower" aria-hidden="true" />;
}
