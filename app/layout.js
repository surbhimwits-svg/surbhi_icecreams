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

export const metadata = {
  title: "Surbhi Icecreams | Scoops of Happiness, Made Fresh Daily",
  description:
    "Handcrafted ice creams in flavors kids and families love. Real ingredients, real joy, in every scoop. Explore Mango, Vanilla, Butterscotch, Blueberry and more from Surbhi Icecreams.",
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
