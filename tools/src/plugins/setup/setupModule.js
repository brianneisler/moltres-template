import os from 'os'
import { execScripts } from '../../util'
import { buildModule } from '../build'

const setupModule = async (module, context) => {
  const { logger } = context
  logger.log(`setting up module ${module.name}`)
  const npmCommand = os.platform().startsWith('win') ? 'npm.cmd' : 'npm'
  await execScripts([`${npmCommand} install`], {
    cwd: module.path,
    env: {
      ...process.env,
      ...context.env,
      MOLTRES_STAGE: context.stage
    }
  })
  return buildModule(module, context)
}

export default setupModule
