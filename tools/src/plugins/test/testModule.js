import { execScripts } from '../../util'

const testModule = async (module, context) => {
  const { logger } = context
  logger.log(`testing module ${module.name}`)
  return execScripts([
    `jest ${module.path}`
  ], {
    cwd: module.modulesDir,
    env: {
      ...process.env,
      MOLTRES_STAGE: context.stage
    }
  })
}

export default testModule
