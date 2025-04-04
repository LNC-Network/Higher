"use client";

import { useEffect, useState } from "react";

type CryptoPrice = {
  name: string;
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
};

export function LivePriceTicker() {
  const [prices, setPrices] = useState<CryptoPrice[]>([
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: "$43,567.89",
      change: "+2.4%",
      isPositive: true,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: "$3,245.67",
      change: "+1.8%",
      isPositive: true,
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: "$142.89",
      change: "+5.7%",
      isPositive: true,
    },
    {
      name: "Cardano",
      symbol: "ADA",
      price: "$0.58",
      change: "-0.3%",
      isPositive: false,
    },
    {
      name: "Polkadot",
      symbol: "DOT",
      price: "$7.23",
      change: "+3.1%",
      isPositive: true,
    },
    {
      name: "Avalanche",
      symbol: "AVAX",
      price: "$35.67",
      change: "+4.2%",
      isPositive: true,
    },
    {
      name: "Chainlink",
      symbol: "LINK",
      price: "$14.32",
      change: "-1.2%",
      isPositive: false,
    },
    {
      name: "Uniswap",
      symbol: "UNI",
      price: "$8.76",
      change: "+0.8%",
      isPositive: true,
    },
  ]);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prevPrices) =>
        prevPrices.map((crypto) => {
          // Only update a few prices at a time to reduce re-renders
          if (Math.random() > 0.7) {
            const changePercent = (Math.random() * 2 - 0.5).toFixed(1);
            const isPositive = Number.parseFloat(changePercent) >= 0;
            return {
              ...crypto,
              change: `${isPositive ? "+" : ""}${changePercent}%`,
              isPositive,
            };
          }
          return crypto;
        })
      );
    }, 8000); // Slower updates for better performance

    return () => clearInterval(interval);
  }, []);

  // Create duplicate items for seamless looping
  const duplicatedPrices = [...prices, ...prices];

  return (
    <div className="w-full bg-black/40 backdrop-blur-md border-y border-[#00f3ff]/20 py-3 overflow-hidden">
      <div className="ticker-wrap">
        <div className="ticker">
          {duplicatedPrices.map((crypto, index) => (
            <div
              key={index}
              className="ticker-item flex items-center space-x-3"
            >
              <span className="font-bold text-white">{crypto.symbol}</span>
              <span className="text-white">{crypto.price}</span>
              <span
                className={`${
                  crypto.isPositive ? "text-green-400" : "text-red-400"
                }`}
              >
                {crypto.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
