import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Add a rule to handle .node files
    config.module.rules.push({
      test: /\.node$/,
      use: "node-loader",
    });

    return config;
  },
};

export default nextConfig;
