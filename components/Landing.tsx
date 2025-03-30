import { HeroSection } from "./home/hero-section";
import { FeaturesSection } from "./home/features-section";
import { TeamSection } from "./home/team-section";
import { StatsSection } from "./home/stats-section";
import { Navbar } from "./home/navbar";
import { Footer } from "./home/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[#0a0a0a] to-black opacity-80"></div>
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-[#00f3ff] opacity-[0.03] rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#bc00ff] opacity-[0.03] rounded-full blur-[100px] animate-pulse-slow-delayed"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticleEffect />
      </div>

      {/* Content */}
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
    </div>
  );
}

// Simple particle effect component
function ParticleEffect() {
  return (
    <div className="h-full w-full">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${
            i % 2 === 0 ? "bg-[#00f3ff]" : "bg-[#bc00ff]"
          } opacity-[0.15]`}
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}
