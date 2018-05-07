import execScripts from '../script/execScripts'

const buildModule = async (module, context) => {
  const { logger } = context
  logger.log(`building module ${module.name}`)
  return execScripts([
    'rm -rf dist',
    'mkdir -p dist',
    'babel src -d dist --source-maps',
    'rsync -avz --exclude *.js --exclude __tests__ --exclude node_modules src/ dist/'
  ], {
    cwd: module.path,
    env: process.env
  })
}

export default buildModule
