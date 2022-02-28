const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
const settings = {
  webpack5: true,
  env: {},
  devIndicators: { autoPrerender: false },
  pwa: { dest: 'public', disable: process.env.NODE_ENV === 'development' },
}

module.exports = withPWA(settings)
