type UserData = {
  name: string;
  username: string;
  ensName?: string;
  avatarUrl?: string;
  verificationBadge?: boolean;
  walletAddress?: string;
  bio?: string;
  tokenBalance?: number;
  nftCount?: number;
  followers?: number;
  following?: number;
  location?: string;
  email?: string;
  website?: string;
  joinDate?: string;
  featuredWorkTitle?: string;
  featuredWorkUrl?: string;
  tags?: string[];
  proofs?: {platform: string; link: string}[];
};

interface Article {
  views: any;
  id: number;
  title: string;
  description: string;
  publishedAt: string;
  readTime: number;
  stars: number;
  tags: string[];
  coverImage: string | null;
  // Web3 specific fields
  tokenGated?: boolean;
  blockchain?: string;
  tokenReward?: number;
  nftRequired?: string;
}
export type {Article, UserData};
