/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Recommended for the `pages` directory, default in `app`.
  images: {
    remotePatterns: [{ hostname: 'localhost' }],
  },
};

module.exports = nextConfig;
