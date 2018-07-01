import { resolve } from 'path'
import { execScripts } from '../../util'

const cleanseModulesDir = async (modulesDir, context) => {
  const { logger } = context
  logger.log(`cleansing modules dir ${modulesDir.path}`)
  const modulesDirNodeModules = resolve(modulesDir.path, 'node_modules')
  const modulesDirPackageLock = resolve(modulesDir.path, 'package-lock.json')
  return execScripts([`rm -rf ${modulesDirNodeModules}`, `rm -f ${modulesDirPackageLock}`], {
    cwd: modulesDir.path,
    env: {
      ...process.env,
      ...context.env,
      MOLTRES_STAGE: context.stage
    }
  })
}

export default cleanseModulesDir
