"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Layers, Coins, Image, Lock, Globe, Zap } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Multi-Chain Support",
      description:
        "Connect and interact with Ethereum, Solana, Polygon, and more from a single interface.",
      icon: <Layers className="h-10 w-10 text-[#00f3ff]" />,
    },
    {
      title: "DAO Governance",
      description:
        "Create, vote, and execute proposals with our intuitive governance tools.",
      icon: <Lock className="h-10 w-10 text-[#bc00ff]" />,
    },
    {
      title: "NFT Marketplace",
      description:
        "Mint, trade, and showcase your digital collectibles with zero platform fees.",
      icon: <Image className="h-10 w-10 text-[#00f3ff]" />,
    },
    {
      title: "DeFi Integration",
      description:
        "Access lending, borrowing, and yield farming protocols all in one place.",
      icon: <Coins className="h-10 w-10 text-[#bc00ff]" />,
    },
    {
      title: "Cross-Chain Bridge",
      description:
        "Transfer assets between blockchains seamlessly with our secure bridge.",
      icon: <Globe className="h-10 w-10 text-[#00f3ff]" />,
    },
    {
      title: "Gas Optimization",
      description:
        "Save on transaction fees with our intelligent gas optimization system.",
      icon: <Zap className="h-10 w-10 text-[#bc00ff]" />,
    },
  ];

  return (
    <section id="features" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
        >
          Powerful Web3 Features
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          Everything you need to build, manage, and scale your decentralized
          applications
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#00f3ff]/30 transition-all duration-300 h-full group">
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle className="text-white group-hover:text-[#00f3ff] transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
