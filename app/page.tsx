import { FeaturesSection } from "@/app/_home/features-section";
import { Footer } from "@/app/_home/footer";
import { HeroSection } from "@/app/_home/hero-section";
import { StatsSection } from "@/app/_home/stats-section";
import { TeamSection } from "@/app/_home/team-section";
import { Navbar } from "@/app/_home/navbar";
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
