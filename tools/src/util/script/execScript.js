import spawnCommand from './spawnCommand'

const execScript = async (script) => {

  return spawnCommand(npmCommand, [ 'run', 'build' ], { env: process.env, cwd: dir })
}

export default execScript
