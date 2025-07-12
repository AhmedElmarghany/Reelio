import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  devIndicators: false,
  serverExternalPackages: ['mongoose'],
  images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'img.clerk.com'
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "https",
        hostname: "**.ufs.sh", // for UploadThing
      },      {
        protocol: "https",
        hostname: "utfs.io",
      },

    ],
  },
};

export default nextConfig;
