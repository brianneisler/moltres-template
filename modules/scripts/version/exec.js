import { execModulesGraph, loadModulesGraph } from '../common'
import run from '../../../scripts/common/run'

const exec = async () => {
  const versionType = process.argv[2]
  const graph = await loadModulesGraph()
  return execModulesGraph((mod) => {
    return [
      `npm version ${versionType} --no-git-tag-version`
      //TODO BRN: Also need to bump the version in the module.json files
    ]
  }, graph)
}

run(exec)
