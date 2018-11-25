const { omit, pick } = require('ramda')
const { sorterAlphabetical, sortKeysDeepWith } =  require('../../utils')

const orderedPackageKeys = [
  'name',
  'version',
  'description',
  'main',
  'license',
  'repository',
  'author',
  'homepage',
  'bugs',
  'keywords',
  'scripts',
  'dependencies',
  'devDependencies',
  'peerDependencies'
]

module.exports = {
  configs: require('./configs'),
  files: [
    {
      configType: 'package',
      fileName: 'package.json',
      format: (config) => {
        config = sortKeysDeepWith(sorterAlphabetical, config)
        return {
          ...pick(orderedPackageKeys, config),
          ...omit(orderedPackageKeys, config)
        }
      }
    }
  ]
}
