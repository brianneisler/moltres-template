import { resolve } from 'path'
import { execModulesGraph, loadModulesGraph } from '../common'
import run from '../../../../scripts/js/common/run'

const exec = async () => {
  const graph = await loadModulesGraph()
  return execModulesGraph((mod) => {
    const moduleNodeModules = resolve(mod.path, 'node_modules')
    const modulePackageLock = resolve(mod.path, 'package-lock.json')
    return [
      `rm -rf ${moduleNodeModules}`,
      `rm -f ${modulePackageLock}`
    ]
  }, graph)
}

run(exec)
