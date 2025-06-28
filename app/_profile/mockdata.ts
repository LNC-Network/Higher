import { Article } from '@/types/profile';

export const mockArticle = (data: { title: string; description: string }, index: number): Article => ({
	id: index + 1,
	title: data.title,
	description: data.description,
	publishedAt: '2025-04-18',
	readTime: 5,
	stars: 100,
	views: 1000,
	tags: ['test', 'mock'],
	coverImage: null,
	tokenGated: false,
	nftRequired: '',
	blockchain: 'Polygon',
	tokenReward: 5,
});
