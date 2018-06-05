import { join, resolve } from 'path'
import { execScripts } from '../../util'

const buildModule = async (module, context) => {
  const { logger } = context
  logger.log(`building module ${module.name}`)
  const babel = resolve(
    require.resolve('babel-cli').replace(join('babel-cli', 'index.js'), ''),
    '.bin',
    'babel'
  )
  const moduleSrc = resolve(module.path, 'src')
  const moduleDist = resolve(module.path, 'dist')
  const moduleMoltres = resolve(module.path, '.moltres')
  await execScripts([
    `mkdir -p ${moduleDist}`,
    `mkdir -p ${moduleMoltres}`,
    `${babel} ${moduleSrc} -d ${moduleDist} --source-maps --ignore **/*.test.js`,
    `rsync -avz --exclude *.js --exclude __tests__ --exclude node_modules ${moduleSrc}/ ${moduleDist}/`
  ], {
    cwd: module.modulesDir,
    env:  {
      ...process.env,
      ...context.env,
      MOLTRES_STAGE: context.stage
    }
  })
  return execScripts([
    `npm pack ${module.path}`
  ], {
    cwd: moduleMoltres,
    env:  {
      ...process.env,
      ...context.env,
      MOLTRES_STAGE: context.stage
    }
  })
}

export default buildModule
