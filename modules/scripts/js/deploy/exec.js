import { execModulesGraph, loadModulesGraph } from '../common'
import run from '../../../../scripts/js/common/run'

const exec = async () => {
  const graph = await loadModulesGraph()
  return execModulesGraph((mod) => {
    return [
      'npm publish'
    ]
  }, graph)
}

run(exec)
