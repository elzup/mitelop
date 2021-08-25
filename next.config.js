const withPWA = require('next-pwa')

const settings = {
  webpack5: true,
  env: {},
  devIndicators: { autoPrerender: false },
  pwa: { dest: 'public' },
}

module.exports = withPWA(settings)
// process.env.NODE_ENV === 'development' ? settings :
