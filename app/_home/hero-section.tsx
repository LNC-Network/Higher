"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BlockchainVisual } from "./blockchain-visual";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Text & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Build the Future{" "}
            </span>
            <span className="bg-gradient-to-r from-[#bc00ff] to-[#00f3ff] bg-clip-text text-transparent">
              Decentralized
            </span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-lg">
            Publish NFT content and sell it in the marketplace—write your own or
            let AI handle it for you.{" "}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Button
              onClick={() => {
                router.push("/editor");
              }}
              size="lg"
              className="bg-[#00f3ff] text-black hover:bg-[#00f3ff]/90 hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition-all duration-300"
            >
              Publish your article
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              onClick={() => {
                router.push("/marketplace");
              }}
              variant="outline"
              size="lg"
              className="border-[#bc00ff] text-white hover:bg-[#bc00ff]/10 hover:border-[#bc00ff] transition-all duration-300 hover:text-white"
            >
              Explore Marketplace
            </Button>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Easy to use", value: "Easy interface" },
              { label: "Sell at your own price", value: "A market for all" },
              { label: "Copywrite all the contents", value: "NFT made easy" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4"
              >
                <p className="text-[#00f3ff] font-mono">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right side - Visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[400px] md:h-[500px] w-full"
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-lg border-2 border-[#00f3ff]/30 rounded-xl overflow-hidden">
            <BlockchainVisual />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
