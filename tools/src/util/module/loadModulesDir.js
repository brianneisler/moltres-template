import { pathExists } from 'fs-extra'
import { identity, memoizeWith } from 'moltres-utils'
import { resolve } from 'path'
import newModulesDir from './newModulesDir'

const loadModulesDir = memoizeWith(identity, async (modulesDirPath) => {
  const modulesDir = resolve(modulesDirPath)
  if (!(await pathExists(modulesDir))) {
    throw new Error(`Cannot find modules dir at ${modulesDirPath}`)
  }
  return newModulesDir({
    path: modulesDir
  })
})

export default loadModulesDir
