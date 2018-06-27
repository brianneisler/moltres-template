import { resolve } from 'path'
import { execScripts } from '../../util'

const cleanModule = async (module, context) => {
  const { logger } = context
  logger.log(`cleaning module ${module.name}`)
  const moduleDist = resolve(module.path, 'dist')
  const moduleMoltres = resolve(module.path, '.moltres')
  return execScripts([`rm -rf ${moduleDist}`, `rm -rf ${moduleMoltres}`], {
    cwd: module.modulesDir,
    env: {
      ...process.env,
      ...context.env,
      MOLTRES_STAGE: context.stage
    }
  })
}

export default cleanModule
