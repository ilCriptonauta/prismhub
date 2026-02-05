import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@multiversx/sdk-dapp", "@multiversx/sdk-dapp-ui", "@multiversx/sdk-dapp-utils"],
  // Silence Turbopack/Webpack conflict warning in Next.js 16
  turbopack: {} as any,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
      buffer: require.resolve('buffer/'),
    };
    return config;
  },
};

export default nextConfig;
