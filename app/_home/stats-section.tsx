"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export function StatsSection() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-lg border border-[#00f3ff]/20 rounded-xl p-8 md:p-12"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Live Protocol Stats
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real-time metrics from across the blockchain ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Value Locked", value: "$8.2B", change: "+5.3%" },
            { label: "24h Trading Volume", value: "$1.4B", change: "+12.7%" },
            { label: "Active Wallets", value: "3.2M", change: "+8.1%" },
            { label: "Ethereum Gas", value: "25 Gwei", change: "-3.2%" },
          ].map((stat, index) => (
            <Card key={index} className="bg-black/60 border border-white/10">
              <CardContent className="p-6">
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {stat.value}
                </p>
                <p
                  className={`text-sm ${
                    stat.change.startsWith("+")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {stat.change} (24h)
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/40 border border-white/10 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Trending Tokens
            </h3>
            <div className="space-y-4">
              {[
                {
                  name: "Ethereum",
                  symbol: "ETH",
                  price: "$3,245.67",
                  change: "+2.4%",
                },
                {
                  name: "Solana",
                  symbol: "SOL",
                  price: "$142.89",
                  change: "+5.7%",
                },
                {
                  name: "Arbitrum",
                  symbol: "ARB",
                  price: "$1.23",
                  change: "-0.8%",
                },
                {
                  name: "Optimism",
                  symbol: "OP",
                  price: "$3.45",
                  change: "+1.2%",
                },
              ].map((token, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00f3ff] to-[#bc00ff] mr-3"></div>
                    <div>
                      <p className="text-white font-medium">{token.name}</p>
                      <p className="text-gray-400 text-sm">{token.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white">{token.price}</p>
                    <p
                      className={`text-sm ${
                        token.change.startsWith("+")
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {token.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Active Proposals
            </h3>
            <div className="space-y-4">
              {[
                {
                  dao: "Uniswap",
                  title: "Fee Structure Update",
                  votes: "12.4M UNI",
                  status: "Active",
                },
                {
                  dao: "Aave",
                  title: "New Market Addition",
                  votes: "387K AAVE",
                  status: "Active",
                },
                {
                  dao: "MakerDAO",
                  title: "Stability Fee Adjustment",
                  votes: "98K MKR",
                  status: "Passed",
                },
                {
                  dao: "Compound",
                  title: "Treasury Allocation",
                  votes: "1.2M COMP",
                  status: "Active",
                },
              ].map((proposal, index) => (
                <div
                  key={index}
                  className="p-3 border border-white/5 rounded-lg bg-black/20"
                >
                  <div className="flex justify-between mb-1">
                    <p className="text-[#00f3ff] font-medium">{proposal.dao}</p>
                    <p
                      className={`text-xs px-2 py-0.5 rounded ${
                        proposal.status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {proposal.status}
                    </p>
                  </div>
                  <p className="text-white text-sm mb-1">{proposal.title}</p>
                  <p className="text-gray-400 text-xs">
                    Votes: {proposal.votes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
