"use client";

import { useState, useEffect } from "react";
import { ProfileSidebar } from "./profile";
import type { UserData, Article } from "@/types/profile";

export default function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Get URL parameters to see if we're requesting a specific profile
        const params = new URLSearchParams(window.location.search);
        const username = params.get("username");
        const address = params.get("address");

        // Construct the API URL with any query parameters
        let apiUrl = "/api/auth/profile";
        if (username) {
          apiUrl += `?username=${encodeURIComponent(username)}`;
        } else if (address) {
          apiUrl += `?address=${encodeURIComponent(address)}`;
        }

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Error fetching profile: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setUserData(data.profile);
        setArticles(data.articles);
        setIsOwnProfile(data.isOwnProfile);
      } catch (err: any) {
        console.error("Failed to load profile:", err);
        setError(err.message || "Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white flex items-center justify-center">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-md mx-auto text-center">
          <h2 className="text-xl font-bold text-red-400 mb-2">Profile Not Found</h2>
          <p className="text-gray-400 mb-4">{error || "Could not load profile data"}</p>
          <button onClick={() => (window.location.href = "/")} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg transition">
            Return Home
          </button>
        </div>
      </div>
    );
  }

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
            {!isOwnProfile ? (
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition shadow-lg shadow-purple-900/20">Connect Wallet</button>
            ) : (
              <button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg transition shadow-lg shadow-teal-900/20">Edit Profile</button>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column: Profile info */}
          <div className="lg:w-1/3">
            <ProfileSidebar {...userData} />
          </div>

          {/* Right column: Published articles */}
          <div className="lg:w-2/3">
            
          </div>
        </div>
      </div>
    </div>
  );
}
