import { resolve } from 'path'
import { execModulesGraph, loadModulesGraph } from '../common'
import run from '../../../../scripts/js/common/run'

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
