const { outputFile } = require('fs-extra')
const { join } = require('path')
const { execModulesGraph, loadModulesGraph } = require('../common')
const run = require('../../../scripts/common/run')

const exec = async () => {
  const graph = await loadModulesGraph()
  return execModulesGraph((mod) => {
    return [
      async () => outputFile(
        join(mod.path, '.npmrc'),
        `//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}\nemail=${process.env.NPM_EMAIL}\n`
      )
    ]
  }, graph)
}

run(exec)
