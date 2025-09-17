// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'oagsprvqqc.ufs.sh',
			},
		],
	},
};
module.exports = nextConfig;
