const execModules = require('../common/execModules')
const getModules = require('../common/getModules')
const run = require('../../../scripts/common/run')

const exec = async () => {
  const versionType = process.argv[2]
  const modules = getModules()
  return execModules([
    `npm version ${versionType}`,
    TODO BRN: Also need to bump the version in the module.json files
  ], modules)
}

run(exec)

const { execModulesGraph, loadModulesGraph } = require('../common')
const run = require('../../../scripts/common/run')

const exec = async () => {
  const versionType = process.argv[2]
  const graph = await loadModulesGraph()
  return execModulesGraph((mod) => {
    return [
      `npm version ${versionType}`
    ]
  }, graph)
}

run(exec)
