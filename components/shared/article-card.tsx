"use client";

import { Star, Calendar, Zap, Clock, Tag, Shield, Eye } from "lucide-react";
import type { Article } from "@/types/profile";
import Image from "next/image";

export const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <div className="group relative rounded-xl border border-gray-800 bg-[#0c111c] p-5 hover:border-blue-500 transition-all duration-300 mt-5 shadow-md">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Left content */}
        <div className="flex-1">
          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors text-left">{article.title}</h3>

          {/* Metadata Row */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-blue-400" />
              {article.publishedAt}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} className="text-blue-400" />
              {article.readTime} min read
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-300 mb-4 text-left">{article.description}</p>

          {/* Web3 Tags */}
          <div className="flex flex-wrap gap-2 text-xs mb-4">
            {article.tokenGated && (
              <span className="bg-yellow-400/10 text-yellow-300 border border-yellow-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Zap size={12} />
                Token Gated
              </span>
            )}
            {article.nftRequired && (
              <span className="bg-purple-500/10 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Shield size={12} />
                NFT Access
              </span>
            )}
            {article.blockchain && (
              <span className="bg-blue-500/10 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Tag size={12} />
                {article.blockchain}
              </span>
            )}
            {article.tokenReward && (
              <span className="bg-amber-300/10 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Zap size={12} />+{article.tokenReward} tokens
              </span>
            )}
            {article.views && (
              <span className="flex items-center gap-1 text-green-300">
                <Eye size={12} />
                {article.views}
              </span>
            )}
            <span className="flex items-center gap-1 text-yellow-400">
              <Star size={12} />
              {article.stars}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <span key={index} className="bg-gray-800 text-blue-300 text-xs px-2.5 py-1 rounded-full border border-gray-700 hover:border-blue-500 transition">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right image */}
        {article.coverImage && (
          <div className="shrink-0 self-start">
            <div className="relative rounded-lg overflow-hidden border border-gray-700 shadow-lg hover:scale-105 transition-transform duration-300">{/* <Image src={article.coverImage} alt={article.title} fill className="object-cover rounded-lg w-28 h-14" /> */}</div>
          </div>
        )}
      </div>
    </div>
  );
};
