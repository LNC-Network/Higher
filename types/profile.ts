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
export type { Article, UserData };
