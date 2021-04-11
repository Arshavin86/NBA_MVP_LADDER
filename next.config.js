const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  cssLoaderOptions: {
    url: false
  },
  webpack: (config, options) => {
    config.node = { fs: 'empty' }
    return config
  }
})
