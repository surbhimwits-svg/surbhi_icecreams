import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/AboutHero";
import BrandStory from "@/components/BrandStory";
import ProductsShowcase from "@/components/ProductsShowcase";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutCta from "@/components/AboutCta";

const TITLE = "About Us | Surbhi Icecreams";
const DESCRIPTION =
  "Learn the story behind Surbhi Icecreams — a homegrown, small-batch ice cream brand made with real ingredients. Discover our Mango, Vanilla, Butterscotch and Blueberry flavours.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <AboutHero />
        <BrandStory />
        <ProductsShowcase />
        <WhyChooseUs />
        <AboutCta />
      </main>
      <Footer />
    </>
  );
}
