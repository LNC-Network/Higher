"use client";

import { MapPin, Link as LinkIcon, Mail, Users, Calendar, Hexagon, Wallet, ExternalLink, Shield } from "lucide-react";

interface UserData {
  avatarUrl: string | null;
  name: string;
  username: string;
  bio: string;
  followers: number;
  following: number;
  location: string;
  email: string;
  website: string;
  joinDate: string;
  // Web3 specific fields
  walletAddress?: string;
  ensName?: string;
  tokenBalance?: number;
  nftCount?: number;
  verificationBadge?: boolean;
}

export const ProfileSidebar = (userData: UserData) => {
  // Truncate wallet address for display
  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="w-full max-w-sm space-y-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg">
      {/* Profile Image with Hexagon Frame */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 rounded-full blur-md opacity-70 animate-pulse"></div>
          <div className="relative p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full">
            <img src={userData.avatarUrl || "/api/placeholder/200/200"} alt="Profile" className="w-48 h-48 rounded-full border-2 border-gray-800 p-1" />
          </div>
          {userData.verificationBadge && (
            <div className="absolute bottom-2 right-2 bg-blue-500 p-1 rounded-full">
              <Shield size={20} className="text-white" />
            </div>
          )}
        </div>
        <h1 className="mt-4 text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">{userData.name}</h1>
        <h2 className="text-lg text-gray-400 font-medium flex items-center gap-1">
          {userData.username}
          {userData.ensName && <span className="text-green-400 text-sm ml-1">{userData.ensName}</span>}
        </h2>
      </div>

      {/* Wallet Address */}
      {userData.walletAddress && (
        <div className="bg-gray-800 rounded-lg p-2 flex items-center justify-between border border-gray-700">
          <div className="flex items-center space-x-2">
            <Wallet size={16} className="text-blue-400" />
            <span className="text-gray-300 font-mono text-sm">{truncateAddress(userData.walletAddress)}</span>
          </div>
          <button className="text-gray-400 hover:text-white">
            <ExternalLink size={14} />
          </button>
        </div>
      )}

      {/* Bio */}
      <div className="text-gray-300 p-3 bg-gray-800/50 rounded-lg border border-gray-700">{userData.bio}</div>

      {/* Token Holdings */}
      {userData.tokenBalance !== undefined && (
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-3 rounded-lg text-center border border-blue-700">
            <p className="text-blue-300 text-xs font-medium">TOKEN BALANCE</p>
            <p className="text-xl font-bold text-white">
              {userData.tokenBalance} <span className="text-xs text-blue-300">ETH</span>
            </p>
          </div>
          {userData.nftCount !== undefined && (
            <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-3 rounded-lg text-center border border-purple-700">
              <p className="text-purple-300 text-xs font-medium">NFT COLLECTION</p>
              <p className="text-xl font-bold text-white">{userData.nftCount}</p>
            </div>
          )}
        </div>
      )}

      {/* Connect/Follow Button */}
      <button className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-md font-medium text-white transition-all duration-300 shadow-lg shadow-blue-700/30">Connect</button>

      {/* Stats */}
      <div className="flex items-center justify-around py-3 bg-gray-800/50 rounded-lg border border-gray-700">
        <div className="text-center">
          <p className="text-sm text-gray-400">Followers</p>
          <p className="text-xl font-bold text-white">{userData.followers}</p>
        </div>
        <div className="h-8 w-px bg-gray-700"></div>
        <div className="text-center">
          <p className="text-sm text-gray-400">Following</p>
          <p className="text-xl font-bold text-white">{userData.following}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-3 text-sm bg-gray-800/30 rounded-lg p-3 border border-gray-700">
        {userData.location && (
          <div className="flex items-center">
            <MapPin size={16} className="mr-2 text-purple-400" />
            <span className="text-gray-300">{userData.location}</span>
          </div>
        )}
        {userData.email && (
          <div className="flex items-center">
            <Mail size={16} className="mr-2 text-purple-400" />
            <span className="text-gray-300">{userData.email}</span>
          </div>
        )}
        {userData.website && (
          <div className="flex items-center">
            <LinkIcon size={16} className="mr-2 text-purple-400" />
            <a href={userData.website} className="text-blue-400 hover:text-blue-300 transition">
              {userData.website.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}
        {userData.joinDate && (
          <div className="flex items-center">
            <Calendar size={16} className="mr-2 text-purple-400" />
            <span className="text-gray-300">Joined {userData.joinDate}</span>
          </div>
        )}
      </div>
    </div>
  );
};
