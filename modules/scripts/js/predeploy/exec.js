import { outputFile } from 'fs-extra'
import { join } from 'path'
import { execModulesGraph, loadModulesGraph } from '../common'
import run from '../../../../scripts/js/common/run'

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
