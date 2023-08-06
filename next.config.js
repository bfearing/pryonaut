/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/terms",
        destination: "https://pryon.com/terms-of-use/",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "https://pryon.com/legal/",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       fs: false,
  //     };
  //   }

  //   return config;
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "product-images.tcgplayer.com",
      },
      {
        protocol: "https",
        hostname: "proper-rhythm-9ab067e008.media.strapiapp.com",
      },
    ],
  },
};

module.exports = nextConfig;
