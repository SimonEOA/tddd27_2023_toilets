/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ssr: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/image/**",
      },
    ],
  },
};

module.exports = nextConfig;
