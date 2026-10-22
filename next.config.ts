import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  // Studio is hosted by Sanity now (kept out of the Worker bundle); old links still work.
  async redirects() {
    return [
      { source: "/studio", destination: "https://fazzadwr.sanity.studio", permanent: true },
      { source: "/studio/:path*", destination: "https://fazzadwr.sanity.studio/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
