/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    turbopack: {
      root: '.'
    }
  }
};

export default nextConfig;
