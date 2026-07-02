import Header from "../components/site/Header";
import Hero from "../components/site/Hero";
import WhyChooseUs from "../components/site/WhyChooseUs";
import Process from "../components/site/Process";
import Pricing from "../components/site/Pricing";
import Testimonials from "../components/site/Testimonials";
import EnquiryForm from "../components/site/EnquiryForm";
import Footer from "../components/site/Footer";
import WhatsAppButton from "../components/site/WhatsAppButton";

export default function Landing() {
  return (
    <div data-testid="landing-page" className="min-h-screen bg-white text-navy">
      <Header />
      <main>
        <Hero />
        <WhyChooseUs />
        <Process />
        <Pricing />
        <Testimonials />
        <EnquiryForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
