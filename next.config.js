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
              path.join(__dirname, '.next', 'static'),
              (err) => {
                if (err) return console.error(err);
                console.log('11ty content copied to Next.js static folder!');
                callback();
              }
            );
          });
        },
      });
    }
    return config;
  },
  // Add rewrites for clean URLs and homepage
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/index.html',
      },
      {
        source: '/:path*',
        destination: '/:path*.html',
      },
      {
        source: '/:path*/',
        destination: '/:path*/index.html',
      },
    ];
  },
  // Add headers to serve HTML content correctly
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/html',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
