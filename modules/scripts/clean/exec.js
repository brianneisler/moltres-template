const { execModulesGraph, loadModulesGraph } = require('../common')
const run = require('../../../scripts/common/run')

const exec = async () => {
  const graph = await loadModulesGraph()
  return execModulesGraph((mod) => {
    const moduleDist = resolve(mod.path, 'dist')
    return [
      `rm -rf ${moduleDist}`
    ]
  }, graph)
}

run(exec)
