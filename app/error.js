"use client";

import { useEffect } from "react";
import Logo from "@/components/Logo";

export default function GlobalError({ error, retry }) {
  useEffect(() => {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: "error",
      event: "app.render_error",
      message: error?.message,
      digest: error?.digest,
    }));
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-gradient-to-b from-sky/40 to-white px-4 py-24 text-center">
      <Logo />
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-3 font-body text-lg text-foreground/75">
          We hit an unexpected hiccup. Please try again in a moment.
        </p>
      </div>
      <button
        type="button"
        onClick={() => retry()}
        className="rounded-full bg-pink px-8 py-3.5 font-heading text-lg font-semibold text-[#5a2e3a] shadow-md transition-transform hover:scale-105 hover:bg-pink-dark"
      >
        Try Again
      </button>
    </main>
  );
}
