/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "anonymous",
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
        {
          protocol: "http",
          hostname: "**",
        },
      ],
    },
  };

export default nextConfig;
