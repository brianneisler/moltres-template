const { join, resolve } = require('path')
const { execModulesGraph, loadModulesGraph } = require('../common')
const run = require('../../../scripts/common/run')

const exec = async () => {
  const graph = await loadModulesGraph()
  return execModulesGraph((mod) => {
    const jest = resolve(
      require.resolve('jest').replace(join('jest', 'build', 'jest.js'), ''),
      '.bin',
      'jest'
    )
    return [
      `${jest} ${module.path} --passWithNoTests`
    ]
  }, graph)
}

run(exec)
