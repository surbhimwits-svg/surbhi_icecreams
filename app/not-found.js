import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata = {
  title: "Page Not Found | Surbhi Icecreams",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-gradient-to-b from-sky/40 to-white px-4 py-24 text-center">
      <Logo />
      <div>
        <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
          404
        </h1>
        <p className="mt-3 font-body text-lg text-foreground/75">
          Looks like this scoop melted away. The page you&apos;re looking for
          doesn&apos;t exist.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-full bg-pink px-8 py-3.5 font-heading text-lg font-semibold text-[#5a2e3a] shadow-md transition-transform hover:scale-105 hover:bg-pink-dark"
      >
        Back to Home
      </Link>
    </main>
  );
}
