import { join, resolve } from 'path'
import { execScripts } from '../../util'

const cleanseModule = async (module, context) => {
  const { logger } = context
  logger.log(`cleansing module ${module.name}`)
  const moduleNodeModules = resolve(module.path, 'node_modules')
  const modulePackageLock = resolve(module.path, 'package-lock.json')
  return execScripts([
    `rm -rf ${moduleNodeModules}`,
    `rm -f ${modulePackageLock}`
  ], {
    cwd: module.modulesDir,
    env: {
      ...process.env,
      MOLTRES_STAGE: context.stage
    }
  })
}

export default cleanseModule
