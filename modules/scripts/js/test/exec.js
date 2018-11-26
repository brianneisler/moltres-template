import { join, resolve } from 'path'
import { execModulesGraph, loadModulesGraph } from '../common'
import run from '../../../../scripts/js/common/run'

const exec = async () => {
  const graph = await loadModulesGraph()
  return execModulesGraph((mod) => {
    const jest = resolve(
      require.resolve('jest').replace(join('jest', 'build', 'jest.js'), ''),
      '.bin',
      'jest'
    )
    return [
      `${jest} ${mod.path} --passWithNoTests`
    ]
  }, graph)
}

run(exec)
