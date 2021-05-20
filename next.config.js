const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

    //fallback to webpack4 to fix mysql-serverless startup error
    config.node = {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
    return config
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config
  },
}


6
