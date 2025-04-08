"use client";

import { useState } from "react";
import { BookOpen, Star, Calendar, Search, Zap, TrendingUp, Clock, Filter, ArrowRight, Tag, BarChart3, Shield } from "lucide-react";
import type { Article } from "@/types/profile";

// Article Card Component with Web3 styling
export const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <div className="border border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-5 hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300">
      <div className="flex justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {article.tokenGated && (
              <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-xs font-bold px-2 py-1 rounded-full text-black flex items-center">
                <Zap size={12} className="mr-1" />
                TOKEN GATED
              </span>
            )}
            {article.blockchain && <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-xs font-bold px-2 py-1 rounded-full text-white">{article.blockchain}</span>}
            {article.nftRequired && (
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 text-xs font-bold px-2 py-1 rounded-full text-white flex items-center">
                <Shield size={12} className="mr-1" />
                NFT REQUIRED
              </span>
            )}
          </div>

          <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:from-blue-400 hover:to-purple-500 transition-all">
            <a href={`/articles/${article.id}`} className="flex items-center">
              {article.title}
              <ArrowRight size={18} className="ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
            </a>
          </h3>

          <p className="mt-2 text-gray-400">{article.description}</p>

          <div className="mt-4 flex items-center text-sm text-gray-500">
            <div className="flex items-center mr-4">
              <Calendar size={14} className="mr-1 text-blue-400" />
              <span className="text-gray-400">{article.publishedAt}</span>
            </div>
            <div className="flex items-center mr-4">
              <Clock size={14} className="mr-1 text-blue-400" />
              <span className="text-gray-400">{article.readTime} min read</span>
            </div>
            <div className="flex items-center">
              <Star size={14} className="mr-1 text-yellow-500" />
              <span className="text-gray-400">{article.stars}</span>
            </div>
            {article.tokenReward && (
              <div className="flex items-center ml-4">
                <Zap size={14} className="mr-1 text-yellow-400" />
                <span className="text-yellow-400">+{article.tokenReward} tokens</span>
              </div>
            )}
          </div>
        </div>

        {article.coverImage && (
          <div className="ml-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-30 blur-sm"></div>
            <img src={article.coverImage || "/api/placeholder/120/70"} alt={article.title} className="w-32 h-24 object-cover rounded-lg border border-gray-700 relative z-10" />
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap">
        {article.tags.map((tag, index) => (
          <span key={index} className="mr-2 mb-2 px-3 py-1 text-xs rounded-full bg-gray-800 text-blue-400 border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer flex items-center">
            <Tag size={10} className="mr-1" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

// Articles List Component with Web3 styling
export const ArticlesList = ({ articles }: { articles: Article[] }) => {
  const [activeTab, setActiveTab] = useState("articles");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.description.toLowerCase().includes(searchQuery.toLowerCase()) || article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));

  return (
    <div className="w-full bg-gray-900 rounded-xl border border-gray-800 shadow-xl overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-purple-800 p-4">
        <h2 className="text-2xl font-bold text-white">Published Content</h2>
        <p className="text-blue-200">Browse through the latest blockchain articles</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 bg-gray-900 px-2">
        <button className={`px-4 py-3 font-medium flex items-center ${activeTab === "articles" ? "text-blue-400 border-b-2 border-blue-500" : "text-gray-400 hover:text-gray-300"}`} onClick={() => setActiveTab("articles")}>
          <BookOpen size={16} className="mr-2" />
          Articles
        </button>
        <button className={`px-4 py-3 font-medium flex items-center ${activeTab === "popular" ? "text-blue-400 border-b-2 border-blue-500" : "text-gray-400 hover:text-gray-300"}`} onClick={() => setActiveTab("popular")}>
          <TrendingUp size={16} className="mr-2" />
          Popular
        </button>
        <button className={`px-4 py-3 font-medium flex items-center ${activeTab === "analytics" ? "text-blue-400 border-b-2 border-blue-500" : "text-gray-400 hover:text-gray-300"}`} onClick={() => setActiveTab("analytics")}>
          <BarChart3 size={16} className="mr-2" />
          Analytics
        </button>
      </div>

      {/* Search */}
      <div className="p-4 bg-gray-900">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Articles */}
      <div className="p-4 space-y-4 bg-gray-900">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-10 text-gray-500 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex flex-col items-center p-6">
              <Search size={48} className="text-gray-700 mb-4" />
              <h3 className="text-lg font-medium text-gray-400">No articles found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
            </div>
          </div>
        ) : (
          filteredArticles.map((article) => <ArticleCard key={article.id} article={article} />)
        )}
      </div>
    </div>
  );
};
