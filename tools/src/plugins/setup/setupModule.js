import execScripts from '../script/execScripts'

const setupModule = async (module, context) => {
  const { logger } = context
  logger.log(`setting up module ${module.name}`)
  const npmCommand = os.platform().startsWith('win') ? 'npm.cmd' : 'npm'
  return execScripts([
    `${npmCommand} install`
  ], {
    cwd: module.path,
    env: process.env
  })
}

export default setupModule
