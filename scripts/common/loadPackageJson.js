const { join } = require('path')

const loadPackageJson = (packagePath) => require(join(packagePath, 'package.json'))

module.exports = loadPackageJson
