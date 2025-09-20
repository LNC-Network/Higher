// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'ui-avatars.com',
				pathname: '/api/**',
			},
		],
	},
	devIndicators: false,
};
module.exports = nextConfig;
