const { execModulesGraph, loadModulesGraph } = require('../common')
const run = require('../../../scripts/common/run')

const exec = async () => {
  const versionType = process.argv[2]
  const graph = await loadModulesGraph()
  return execModulesGraph((mod) => {
    return [
      `npm version ${versionType}`,
      TODO BRN: Also need to bump the version in the module.json files
    ]
  }, graph)
}

run(exec)
