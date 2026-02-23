import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@multiversx/sdk-dapp", "@multiversx/sdk-dapp-ui", "@multiversx/sdk-dapp-utils"],
  // Exclude native addon packages from webpack bundling
  serverExternalPackages: ["@resvg/resvg-js", "satori"],

  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
      buffer: require.resolve('buffer/'),
    };

    // Handle native .node files
    if (isServer) {
      config.externals = [...(config.externals || []), '@resvg/resvg-js'];
    }

    return config;
  },
};

export default nextConfig;
