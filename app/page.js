import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Flavours from "@/components/Flavours";
import ContactTeaser from "@/components/ContactTeaser";
import Footer from "@/components/Footer";
import OrderPopup from "@/components/OrderPopup";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AboutUs />
        <Flavours />
        <ContactTeaser />
      </main>
      <Footer />
      <OrderPopup />
    </>
  );
}
