import Navbar from "@/component/Navbar/Navbar";
import Hero from "@/component/Hero/Hero";
import Features from "@/component/Features/Features";
import Estimator from "@/component/Estimator/Estimator";
import Packages from "@/component/Packages/Packages";
import Assistant from "@/component/Assistant/Assistant";
import About from "@/component/About/About";
import Showcase from "@/component/Showcase/Showcase";
import HowItWorks from "@/component/HowItWorks/HowItWorks";
import Footer from "@/component/Footer/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Estimator />
      <Packages />
      <Assistant />
      <About />
      <Showcase />
      <HowItWorks />
      <Footer />
    </main>
  );
}
