import Hero from "../components/landing/Hero";
import WhatWeDo from "../components/landing/WhatWeDo";
import Classes from "../components/landing/Classes";
import Programs from "../components/landing/Programs";
import Connect from "../components/landing/Connect";
import Testimonials from "../components/landing/Testimonials";
import Footer from "../components/landing/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <WhatWeDo />
      <Classes />
      <Programs />
      <Connect />
      <Testimonials />
      <Footer />
    </div>
  );
}
