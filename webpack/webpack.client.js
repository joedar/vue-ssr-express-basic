const path = require('path')
const optimization = require('./part/optimization')
const { clientPlugins } = require('./part/plugins')
const { clientRules } = require('./part/rules')

module.exports = {
  entry: [
    path.join(__dirname, '..', 'src', 'entry-client.js'),
    path.join(__dirname, '..', 'src', 'images', 'favicon.ico'),
  ],
  module: {
    rules: clientRules,
  },
  plugins: clientPlugins,
  optimization,
}