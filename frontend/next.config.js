/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Recommended for the `pages` directory, default in `app`.
  images: {
    remotePatterns: [{ hostname: 'localhost' }],
  },
  webpack: (config, { dev, isServer }) => {
    if (dev || isServer) {
      config.devtool = 'source-map';
    }
    return config;
  },
};

module.exports = nextConfig;
