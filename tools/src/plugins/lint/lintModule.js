import { execScripts } from '../../util'

const lintModule = async (module, context) => {
  const { logger } = context
  logger.log(`linting module ${module.name}`)
  return execScripts([`eslint ${module.path} --cache`], {
    cwd: module.modulesDir.path,
    env: {
      ...process.env,
      ...context.env,
      MOLTRES_STAGE: context.stage
    }
  })
}

export default lintModule
