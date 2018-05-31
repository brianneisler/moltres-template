const { execModulesGraph, loadModulesGraph } = require('../common')
const run = require('../../../scripts/common/run')

const exec = async () => {
  const graph = await loadModulesGraph()
  return execModulesGraph((mod) => {
    return [
      'npm publish'
    ]
  }, graph)
}

run(exec)