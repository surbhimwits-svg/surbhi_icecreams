import { Fredoka, Quicksand } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const TITLE = "Surbhi Icecreams | Scoops of Happiness, Made Fresh Daily";
const DESCRIPTION =
  "Handcrafted ice creams in flavors kids and families love. Real ingredients, real joy, in every scoop. Explore Mango, Vanilla, Butterscotch, Blueberry and more from Surbhi Icecreams.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Surbhi Icecreams",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${quicksand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#33323a]">
        {children}
      </body>
    </html>
  );
}
