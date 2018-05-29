const { join, resolve } = require('path')
const { execModulesGraph, loadModulesGraph } = require('../common')
const run = require('../../../scripts/common/run')

const exec = async () => {
  const graph = await loadModulesGraph()
  return execModulesGraph((mod) => {
    const babel = resolve(
      require.resolve('babel-cli').replace(join('babel-cli', 'index.js'), ''),
      '.bin',
      'babel'
    )
    const moduleSrc = resolve(mod.path, 'src')
    const moduleDist = resolve(mod.path, 'dist')
    return [
      `mkdir -p ${moduleDist}`,
      `${babel} ${moduleSrc} -d ${moduleDist} --source-maps --ignore **/*.test.js`,
      `rsync -avz --exclude *.js --exclude __tests__ --exclude node_modules ${moduleSrc} ${moduleDist}`
    ]
  }, graph)
}

run(exec)
