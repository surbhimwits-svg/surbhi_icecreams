import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata = {
  title: "Thank You | Surbhi Icecreams",
  description:
    "Thank you for contacting Surbhi Icecreams. We have received your request and will get in touch with you soon.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-gradient-to-b from-sky/40 to-white px-4 py-16 text-center">
      <Link href="/">
        <Logo />
      </Link>

      <div className="thank-you-check flex h-20 w-20 items-center justify-center rounded-full bg-mint shadow-md">
        <svg
          viewBox="0 0 24 24"
          className="h-10 w-10"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 13l4 4L19 7"
            stroke="#2f7a54"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="max-w-md">
        <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
          Thank You! 🍦
        </h1>
        <p className="mt-4 font-body text-lg font-semibold text-foreground/90">
          Thank you for reaching out to Surbhi Icecreams!
        </p>
        <p className="mt-3 font-body text-foreground/75">
          We have received your request successfully. Our team will get in
          touch with you soon.
        </p>
        <p className="mt-3 font-body text-foreground/75">
          Until then, keep enjoying every delicious scoop!
        </p>
      </div>

      <Image
        src="/images/hero-illustration.svg"
        alt="Three colorful hand-drawn ice cream cones with sprinkles, in mint, butterscotch and strawberry"
        width={800}
        height={620}
        unoptimized
        className="mx-auto h-auto w-full max-w-xs drop-shadow-xl sm:max-w-sm"
      />

      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-pink px-8 py-3.5 font-heading text-lg font-semibold text-[#5a2e3a] shadow-md transition-transform hover:scale-105 hover:bg-pink-dark"
        >
          Back to Home
        </Link>
        <Link
          href="/#flavours"
          className="rounded-full bg-white px-8 py-3.5 font-heading text-lg font-semibold text-sky-deep shadow-md transition-transform hover:scale-105 hover:bg-sky/30"
        >
          Explore Our Flavours
        </Link>
      </div>
    </main>
  );
}
