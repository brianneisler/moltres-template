import os from 'os'
import { execScripts } from '../../util'

const setupModulesDir = async (modulesDir, context) => {
  const { logger } = context
  logger.log(`setting up modules dir ${modulesDir.path}`)
  const npmCommand = os.platform().startsWith('win') ? 'npm.cmd' : 'npm'
  return execScripts([`${npmCommand} install`], {
    cwd: modulesDir.path,
    env: {
      ...process.env,
      ...context.env,
      MOLTRES_STAGE: context.stage
    }
  })
}

export default setupModulesDir
