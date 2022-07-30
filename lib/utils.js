let path = require('path')

module.exports.rootDir = function(dir) {
  return path.resolve(path.join(__dirname, '/..', dir))
}