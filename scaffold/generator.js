const { has, is, keys, map, mergeDeepRight, path, prop, reduce, values } = require('ramda')
const registry = require('./generators')
const {
  isIgnoreFile,
  isJsFile,
  isJsonFile,
  writeIgnoreConfigFile,
  writeJsConfigFile,
  writeJsonConfigFile
} = require('./utils')

const generateConfig = (configType, generators) => {
  const generatorKeys = keys(generators)
  return reduce(
    (config, generator) => {
      const configGenerator = path(['configs', configType], generator)
      let generatedConfig = configGenerator
      if (is(Function, configGenerator)) {
        generatedConfig = configGenerator(generatorKeys)
      }
      if (!config) {
        return generatedConfig
      }
      if (!generatedConfig) {
        return config
      }
      return mergeDeepRight(config, generatedConfig)
    },
    null,
    values(generators)
  )
}

const generateConfigFile = async (configType, fileName, generators, options) => {
  const filePath = join(options.cwd, fileName)
  if (isIgnoreFile(filePath)) {
    const config = generateConfig(configType, generators)
    return writeIgnoreConfigFile(config, filePath)
  } else if (isJsFile(filePath)) {
    return writeJsConfigFile(configType, filePath)
  } else if (isJsonFile(filePath)) {
    const config = generateConfig(configType, generators)
    return writeJsonConfigFile(config, filePath)
  }
}

const newGenerator = ({ generators }, options) => {
  generators = map((name) => {
    if (!has(name, registry)) {
      throw new Error(`Unknown generator ${name}`)
    }
    return prop(name, registry)
  }, generators)

  return {
    config: (configType) => generateConfig(configType, generators)
    generate: async () => {
      async () =>
        Promise.all(map(
          async (generatorType) => {
            const generator = prop(generatorType, generators)
            return Promise.all(map(
              async ({ configType, fileName }) => generateConfigFile(configType, fileName, generators),
              generator.files
            ))
          },
          scaf.generators
        ))
    }
  }
}

module.exports = newGenerator
