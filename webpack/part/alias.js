const path = require('path')
const root = path.join(__dirname, '..', '..')

module.exports = {
  '@components': path.join(root, 'src', 'components'),
  '@images': path.join(root, 'src', 'images'),
  '@routes': path.join(root, 'src', 'routes'),
  '@public': path.join(root, 'dist'),
}