import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <Footer />
    </>
  );
}
