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
  return execScripts([
    `rm -rf ${moduleDist}`,
    `mkdir -p ${moduleDist}`,
    `${babel} ${moduleSrc} -d ${moduleDist} --source-maps`,
    `rsync -avz --exclude *.js --exclude __tests__ --exclude node_modules ${moduleSrc} ${moduleDist}`
  ], {
    cwd: module.modulesDir,
    env:  {
      ...process.env,
      MOLTRES_STAGE: context.stage
    }
  })
}

export default buildModule
