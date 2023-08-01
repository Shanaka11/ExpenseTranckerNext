/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: ['five12daysgeneral.s3.ap-southeast-1.amazonaws.com'],
	},
};

module.exports = nextConfig;
