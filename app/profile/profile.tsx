'use client';

import {
  MapPin,
  Link as LinkIcon,
  Mail,
  Calendar,
  Wallet,
  Shield,
  Copy,
  Check,
} from 'lucide-react';
import {useState} from 'react';
import type {UserData} from '@/types/profile';

export const ProfileSidebar = (userData: UserData) => {
  const [copied, setCopied] = useState(false);

  const truncateAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(userData.walletAddress || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className='w-full max-w-sm space-y-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-xl mx-auto p-6'>
      {/* Avatar */}
      <div className='flex flex-col items-center'>
        <div className='relative'>
          <div className='absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 rounded-full blur-md opacity-70 animate-pulse'></div>
          <div className='relative p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full'>
            <img
              src={userData.avatarUrl || '/api/placeholder/200/200'}
              alt='Profile'
              className='w-44 h-44 rounded-full border-2 border-gray-800 p-1'
            />
          </div>
          {userData.verificationBadge && (
            <div className='absolute bottom-2 right-2 bg-blue-600 p-1 rounded-full'>
              <Shield size={20} className='text-white' />
            </div>
          )}
        </div>
        <h1 className='mt-4 text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent'>
          {userData.name}
        </h1>
        <h2 className='text-gray-400 font-medium text-sm flex items-center gap-2'>
          @{userData.username}
          {userData.ensName && <span className='text-green-400 text-xs'>{userData.ensName}</span>}
        </h2>
      </div>

      {/* Wallet */}
      {userData.walletAddress && (
        <div className='bg-gray-800 rounded-lg p-3 flex items-center justify-between border border-gray-700'>
          <div className='flex items-center gap-2'>
            <Wallet size={16} className='text-blue-400' />
            <span className='text-gray-300 font-mono text-sm'>
              {truncateAddress(userData.walletAddress)}
            </span>
          </div>
          <button onClick={handleCopy} className='text-gray-400 hover:text-white transition'>
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      )}

      {/* Bio */}
      <div className='text-gray-300 p-3 bg-gray-800/50 rounded-lg border border-gray-700 text-sm'>
        {userData.bio}
      </div>

      {/* Featured Work */}
      {userData.featuredWorkTitle && (
        <div className='p-3 bg-blue-950/60 rounded-lg border border-blue-800'>
          <p className='text-xs text-blue-300 mb-1'>Featured Publication</p>
          <a
            href={userData.featuredWorkUrl}
            className='text-white font-medium hover:underline block'>
            {userData.featuredWorkTitle}
          </a>
        </div>
      )}

      {/* Stats */}
      <div className='grid grid-cols-2 gap-2'>
        {userData.tokenBalance !== undefined && (
          <div className='bg-gradient-to-br from-blue-900 to-blue-800 p-3 rounded-xl text-center border border-blue-700'>
            <p className='text-blue-300 text-xs'>TOKEN BALANCE</p>
            <p className='text-xl font-bold text-white'>
              {userData.tokenBalance} <span className='text-xs'>ETH</span>
            </p>
          </div>
        )}
        {userData.nftCount !== undefined && (
          <div className='bg-gradient-to-br from-purple-900 to-purple-800 p-3 rounded-xl text-center border border-purple-700'>
            <p className='text-purple-300 text-xs'>NFT COLLECTION</p>
            <p className='text-xl font-bold text-white'>{userData.nftCount}</p>
          </div>
        )}
      </div>

      {/* Tags / Expertise */}
      {Array.isArray(userData.tags) && userData.tags.length > 0 && (
        <div className='flex flex-wrap gap-2 text-xs'>
          {userData.tags.map((tag) => (
            <span
              key={tag}
              className='bg-gray-700 text-white px-3 py-1 rounded-full border border-gray-600'>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Follow */}
      <button className='w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-medium text-white transition-all duration-300 shadow-lg shadow-blue-700/30'>
        Follow
      </button>

      {/* Followers */}
      <div className='flex items-center justify-around py-3 bg-gray-800/50 rounded-xl border border-gray-700'>
        <div className='text-center'>
          <p className='text-sm text-gray-400'>Followers</p>
          <p className='text-xl font-bold text-white'>{userData.followers}</p>
        </div>
        <div className='h-8 w-px bg-gray-700'></div>
        <div className='text-center'>
          <p className='text-sm text-gray-400'>Following</p>
          <p className='text-xl font-bold text-white'>{userData.following}</p>
        </div>
      </div>

      {/* Contact */}
      <div className='space-y-3 text-sm bg-gray-800/30 rounded-xl p-3 border border-gray-700'>
        {userData.location && (
          <div className='flex items-center'>
            <MapPin size={16} className='mr-2 text-purple-400' />
            <span className='text-gray-300'>{userData.location}</span>
          </div>
        )}
        {userData.email && (
          <div className='flex items-center'>
            <Mail size={16} className='mr-2 text-purple-400' />
            <span className='text-gray-300'>{userData.email}</span>
          </div>
        )}
        {userData.website && (
          <div className='flex items-center'>
            <LinkIcon size={16} className='mr-2 text-purple-400' />
            <a href={userData.website} className='text-blue-400 hover:text-blue-300 transition'>
              {userData.website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
        {userData.joinDate && (
          <div className='flex items-center'>
            <Calendar size={16} className='mr-2 text-purple-400' />
            <span className='text-gray-300'>Joined {userData.joinDate}</span>
          </div>
        )}
      </div>

      {/* Proof Links */}
      {Array.isArray(userData.proofs) && userData.proofs.length > 0 && (
        <div className='space-y-1'>
          <p className='text-xs text-gray-400'>Verifications</p>
          {userData.proofs.map((proof) => (
            <a
              key={proof.platform}
              href={proof.link}
              className='text-blue-400 hover:underline text-sm block'>
              ✅ Verified on {proof.platform}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
