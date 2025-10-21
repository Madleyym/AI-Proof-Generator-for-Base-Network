/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: false, 
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
      crypto: false,
      pino: false,
    };

    config.module.rules.push({
      test: /node_modules\/@metamask/,
      type: "asset/source",
    });

    return config;
  },
};

module.exports = nextConfig;
