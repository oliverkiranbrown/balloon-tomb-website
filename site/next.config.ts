import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // catch case sensitivity issues before deployment
  reactStrictMode: true,

  images: {
    remotePatterns: [
      // YouTube stills, used as the poster on /video
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
};

export default nextConfig;
  