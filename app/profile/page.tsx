"use client";

import { ProfileSidebar } from "./profile";
import { ArticlesList } from "./article-card";

export default function Profile() {
  // Sample data - in a real app, you would fetch this from an API
  const userData = {
    name: "0xShadowMaster",
    username: "shadowmaster.eth",
    avatarUrl: null, // Will use placeholder
    bio: "Web3 developer and NFT artist. Building the decentralized future one block at a time. DAO contributor and DeFi enthusiast.",
    followers: 1289,
    following: 421,
    location: "Crypto Valley, Zug",
    email: "shadow@web3domain.eth",
    website: "https://shadowmaster.crypto",
    joinDate: "April 2023",
    // Web3 specific fields
    walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    ensName: "shadowmaster.eth",
    tokenBalance: 3.42,
    nftCount: 16,
    verificationBadge: true,
  };

  const articles = [
    {
      id: 1,
      title: "Understanding Zero-Knowledge Proofs for Web3 Privacy",
      description: "Learn how ZK-proofs are revolutionizing privacy in blockchain applications while maintaining transaction verification integrity.",
      publishedAt: "April 2, 2025",
      readTime: 8,
      stars: 142,
      tags: ["ZK-Proofs", "Privacy", "Ethereum", "Cryptography"],
      coverImage: null, // Will use placeholder
      tokenGated: false,
      blockchain: "Ethereum",
      tokenReward: 5,
    },
    {
      id: 2,
      title: "Building Decentralized Autonomous Organizations (DAOs)",
      description: "A comprehensive guide to creating, governing, and scaling DAOs with modern tools and frameworks.",
      publishedAt: "March 15, 2025",
      readTime: 12,
      stars: 278,
      tags: ["DAO", "Governance", "Smart Contracts", "Web3"],
      coverImage: null, // Will use placeholder
      tokenGated: true,
      blockchain: "Polygon",
      nftRequired: "Governance Pass",
    },
    {
      id: 3,
      title: "DeFi Lending Protocols: Risks and Opportunities",
      description: "Analyze the different lending protocols in DeFi, their yield strategies, and potential risks for participants.",
      publishedAt: "February 28, 2025",
      readTime: 15,
      stars: 165,
      tags: ["DeFi", "Lending", "Yield", "Finance"],
      coverImage: null, // Will use placeholder
      blockchain: "Multi-chain",
      tokenReward: 8,
    },
    {
      id: 4,
      title: "NFT Marketplaces: Building the Next Generation",
      description: "Technical deep dive into creating scalable NFT marketplaces with advanced features like fractional ownership and royalty enforcement.",
      publishedAt: "January 20, 2025",
      readTime: 10,
      stars: 203,
      tags: ["NFT", "Marketplace", "Development", "Smart Contracts"],
      coverImage: null, // Will use placeholder
      tokenGated: true,
      blockchain: "Solana",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white overflow-y-auto">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Web3 Profile</h1>
            <p className="text-gray-400 mt-1">Explore blockchain content and connect with creators</p>
          </div>

          <div className="flex items-center space-x-4">
            <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg border border-gray-700 transition">Dashboard</button>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition shadow-lg shadow-purple-900/20">Connect Wallet</button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column: Profile info */}
          <div className="lg:w-1/3">
            <ProfileSidebar {...userData} />
          </div>

          {/* Right column: Published articles */}
          <div className="lg:w-2/3">
            <ArticlesList articles={articles} />
          </div>
        </div>
      </div>
    </div>
  );
}
