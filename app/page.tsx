import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Doctors from "@/components/sections/Doctors";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import Testimonials from "@/components/sections/Testimonials";
import Blogs from "@/components/sections/Blogs";
import Appointment from "@/components/sections/Appointment";
import Contact from "@/components/sections/Contact";
import FAQSection from "@/components/sections/FAQ";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Doctors />
        <Services />
        <WhyUs />
        <Testimonials />
        <Blogs />
        <Appointment />
        <Contact />
        <FAQSection />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
