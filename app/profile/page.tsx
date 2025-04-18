'use client';
import { ProfileSidebar } from './profile';
import { ArticleCard } from '@/components/shared/article-card';
import { mockArticles } from './mockdata';
import { UserData } from '@/types/profile';
import { useEffect, useState } from 'react';
export default function Profile() {
	const [WalletId, setWalletId] = useState<string | null>(null);
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		setWalletId(params.get('walletId'));
	}, []);

	const mockData: UserData = {
		avatarUrl: 'https://oagsprvqqc.ufs.sh/f/UfD2xF6GnX2EcfL01UJlA8B2dm9fC0gPJsvMEn6zkheIaXpO',
		name: 'Jit Debnath',
		username: 'jit',
		bio: 'Bankai',
		followers: 2000,
		following: 1,
		location: 'Some unknown place',
		email: 'something',
		website: 'something',
		joinDate: '2022',
		walletAddress: WalletId || '',
		ensName: 'something',
		tokenBalance: 0,
		nftCount: 0,
		verificationBadge: true,
	};

	return (
		<div className='bg-gradient-to-b from-gray-950 to-black text-white overflow-y-auto m-4'>
			<div className='flex flex-col lg:flex-row'>
				{/* Left column: Profile info */}
				<div className='lg:w-1/3'>
					<ProfileSidebar {...mockData} />
				</div>

				{/* Right column: Published articles */}
				<div className='lg:w-2/3'>
					{mockArticles.map((article) => (
						<ArticleCard key={article.id} article={article} />
					))}
				</div>
			</div>
		</div>
	);
}
