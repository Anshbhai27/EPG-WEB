/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ltsk-cdn.s3.eu-west-1.amazonaws.com'],
    unoptimized: true
  },
  output: 'standalone',
  swcMinify: true
}

module.exports = nextConfig
