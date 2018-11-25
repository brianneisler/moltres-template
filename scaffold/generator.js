const { join } = require('path')
const { concat, has, is, keys, map, mergeDeepRight, path, prop, reduce, values } = require('ramda')
const registry = require('./generators')
const {
  isIgnoreFile,
  isJsFile,
  isJsonFile,
  writeIgnoreConfigFile,
  writeJsConfigFile,
  writeJsonConfigFile
} = require('./utils')

const generateConfig = (configType, scaffold) => {
  const generatorKeys = keys(scaffold.generators)
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
    concat(values(scaffold.generators), [scaffold])
  )
}

const generateConfigFile = async (configType, fileName, scaffold, options) => {
  const filePath = join(options.cwd, fileName)
  if (isIgnoreFile(filePath)) {
    const config = generateConfig(configType, scaffold)
    return writeIgnoreConfigFile(config, filePath)
  } else if (isJsFile(filePath)) {
    return writeJsConfigFile(configType, filePath)
  } else if (isJsonFile(filePath)) {
    const config = generateConfig(configType, scaffold)
    return writeJsonConfigFile(config, filePath)
  }
}

const newGenerator = (scaffold, options) => {

  scaffold = {
    ...scaffold,
    generators: map((name) => {
      if (!has(name, registry)) {
        throw new Error(`Unknown generator ${name}`)
      }
      return prop(name, registry)
    }, scaffold.generators)
  }

  return {
    config: (configType) => generateConfig(configType, scaffold),
    generate: async () =>
      Promise.all(map(
        async (generator) =>
          Promise.all(map(
            async ({ configType, fileName }) => generateConfigFile(configType, fileName, scaffold, options),
            generator.files
          )),
        scaffold.generators
      ))
  }
}

module.exports = newGenerator
