import { join, resolve } from 'path'
import { execScripts } from '../../util'

const testModule = async (module, context) => {
  const { logger } = context
  logger.log(`testing module ${module.name}`)
  const jest = resolve(
    require.resolve('jest').replace(join('jest', 'build', 'jest.js'), ''),
    '.bin',
    'jest'
  )
  return execScripts([
    `${jest} ${module.path} --passWithNoTests`
  ], {
    cwd: module.modulesDir,
    env: {
      ...process.env,
      ...context.env,
      MOLTRES_STAGE: context.stage
    }
  })
}

export default testModule
