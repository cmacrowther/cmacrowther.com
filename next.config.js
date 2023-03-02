const glob = require('glob')

module.exports = {
  webpack: function(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
  exportPathMap: async function() {
    const routes = {
      '/': { page: '/' },
      '/projects': { page: '/projects' },
      '/contact': { page: '/contact' },
    }
    
    return routes
  },
}
