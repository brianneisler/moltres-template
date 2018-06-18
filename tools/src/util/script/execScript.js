import { split, trim } from 'moltres-utils'
import spawnCommand from './spawnCommand'

const execScript = async (script, { cwd, env }) => {
  const [ command, ...args ] = split(' ', trim(script))
  return spawnCommand(command, args, { env, cwd })
}

export default execScript
