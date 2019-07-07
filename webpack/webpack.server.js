const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { serverPlugins } = require('./part/plugins')
const { serverRules } = require('./part/rules')

module.exports = {
  entry : path.join(__dirname, '..', 'src', 'entry-server.js')
  ,target : 'node'
  ,output : {
    filename: 'server.bundle.js'
    ,libraryTarget: 'commonjs2'
  }
  ,module : { rules: serverRules }
  ,externals: nodeExternals({ whitelist: /\.css$/ })
  ,plugins : serverPlugins
}
