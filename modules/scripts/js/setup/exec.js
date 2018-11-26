import os from 'os'
import { execModulesGraph, loadModulesGraph } from '../common'
import run from '../../../../scripts/js/common/run'

const exec = async () => {
  const graph = await loadModulesGraph()
  return execModulesGraph((mod) => {
    const npmCommand = os.platform().startsWith('win') ? 'npm.cmd' : 'npm'
    return [
      `${npmCommand} install`
    ]
  }, graph)
}

run(exec)
