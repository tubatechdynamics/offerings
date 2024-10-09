const path = require('path');
const fs = require('fs-extra');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Custom webpack config to copy 11ty-generated content
  webpack: (config, { isServer }) => {
    // Only run on the client-side build
    if (!isServer) {
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.afterEmit.tapAsync('Copy11tyContent', (compilation, callback) => {
            fs.copy(
              path.join(__dirname, '_site'),
              path.join(__dirname, 'public'),
              (err) => {
                if (err) return console.error(err);
                console.log('11ty content copied to Next.js public folder!');
                callback();
              }
            );
          });
        },
      });
    }
    return config;
  },
  // Handle all routes
  async rewrites() {
    return [
      // Rewrite everything to `pages/index.js`
      {
        source: '/:path*',
        destination: '/',
      },
    ];
  },
}

module.exports = nextConfig
