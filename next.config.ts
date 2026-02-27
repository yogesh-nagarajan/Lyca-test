/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "publish-p165370-e1760075.adobeaemcloud.com",
        pathname: "/adobe/dynamicmedia/**",
      },
      {
        protocol: "https",
        hostname: "author-p165370-e1760075.adobeaemcloud.com",
        pathname: "/adobe/dynamicmedia/**",
      },
      {
        protocol: "https",
        hostname: "cms-assets.ldsvcplatform.com"
      },
    ],
  },
};

module.exports = config;