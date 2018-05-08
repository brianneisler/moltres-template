import { execScripts } from '../../util'

const lintModule = async (module, context) => {
  const { logger } = context
  logger.log(`linting module ${module.name}`)
  return execScripts([
    `eslint ${module.path} --cache`
  ], {
    cwd: module.modulesDir,
    env: process.env
  })
}

export default lintModule
