const { join } = require('path')
const { append, concat, has, is, keys, map, mergeDeepRight, path, prop, propOr, reduce, values } = require('ramda')
const registry = require('./generators')
const {
  isIgnoreFile,
  isJsFile,
  isJsonFile,
  writeIgnoreConfigFile,
  writeJsConfigFile,
  writeJsonConfigFile
} = require('./utils')


const getConfigTypes = (scaffold) => reduce(
  (accum, generator) => reduce(
    (configTypes, fileConfig) => append(fileConfig.configType, configTypes),
    accum,
    propOr([], 'files', generator)
  ),
  [],
  scaffold.generators
)

const generateConfig = (configType, scaffold) => {
  const configTypes = getConfigTypes(scaffold)
  return reduce(
    (config, generator) => {
      const configGenerator = path(['configs', configType], generator)
      let generatedConfig = configGenerator
      if (is(Function, configGenerator)) {
        generatedConfig = configGenerator(configTypes)
      }
      if (!config) {
        return generatedConfig
      }
      if (!generatedConfig) {
        return config
      }
      if (Array.isArray(config)) {
        return concat(config, generatedConfig)
      }
      return mergeDeepRight(config, generatedConfig)
    },
    null,
    concat(values(scaffold.generators), [scaffold])
  )
}

const generateConfigFile = async ({ configType, fileName, transform }, scaffold, options) => {
  const filePath = join(options.cwd, fileName)
  if (isIgnoreFile(filePath)) {
    let config = generateConfig(configType, scaffold)
    if (transform) {
      config = transform(config)
    }
    return writeIgnoreConfigFile(config, filePath)
  } else if (isJsFile(filePath)) {
    return writeJsConfigFile(configType, filePath)
  } else if (isJsonFile(filePath)) {
    let config = generateConfig(configType, scaffold)
    if (transform) {
      config = transform(config)
    }
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
            async (fileConfig) => generateConfigFile(fileConfig, scaffold, options),
            generator.files || []
          )),
        scaffold.generators
      ))
  }
}

module.exports = newGenerator
