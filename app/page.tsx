import { FeaturesSection } from "@/components/home/features-section";
import { Footer } from "@/components/home/footer";
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { TeamSection } from "@/components/home/team-section";
import { Navbar } from "@/components/home/navbar";
export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <StatsSection />
          <TeamSection />
        </main>
        <Footer />
      </div>
    </main>
  );
}
