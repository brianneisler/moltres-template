import { execModulesGraph, loadModulesGraph } from '../common'
import run from '../../../scripts/common/run'

const exec = async () => {
  const graph = await loadModulesGraph()
  return execModulesGraph((mod) => {
    return [
      `eslint ${mod.path} --cache --fix`
    ]
  }, graph)
}

run(exec)
