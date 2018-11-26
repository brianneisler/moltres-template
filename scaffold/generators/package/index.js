const { keys, omit, pick } = require('ramda')
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
      transform: (config) => {
        config = sortKeysDeepWith(sorterAlphabetical, config)
        const { peerDependencies, devDependencies, dependencies } = config

        // NOTE BRN: Remove anyting in dependencies from devDependencies
        if (devDependencies && dependencies) {
          config = {
            ...config,
            devDependencies: omit(
              keys(dependencies),
              devDependencies
            )
          }
        }

        // NOTE BRN: Remove anyting in dependencies from peerDependencies
        if (peerDependencies && dependencies) {
          config = {
            ...config,
            peerDependencies: omit(
              keys(dependencies),
              peerDependencies
            )
          }
        }
        return {
          ...pick(orderedPackageKeys, config),
          ...omit(orderedPackageKeys, config)
        }
      }
    }
  ]
}
