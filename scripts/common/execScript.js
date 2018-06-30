import { is, split, trim } from 'ramda'
import spawnCommand from './spawnCommand'

const execScript = async (script, options) => {
  if (is(Function, script)) {
    return script()
  }
  const [ command, ...args ] = split(' ', trim(script))
  return spawnCommand(command, args, options)
}

export default execScript
