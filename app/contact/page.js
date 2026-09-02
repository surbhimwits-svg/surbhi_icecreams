import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/ContactHero";
import ContactUs from "@/components/ContactUs";

const TITLE = "Contact Us | Surbhi Icecreams";
const DESCRIPTION =
  "Get in touch with Surbhi Icecreams for orders, questions, or feedback. Call, email, visit our store, or send us a message online.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ContactHero />
        <ContactUs />
      </main>
      <Footer />
    </>
  );
}
