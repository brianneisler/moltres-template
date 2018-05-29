const { is, split, trim } = require('ramda')
const spawnCommand = require('./spawnCommand')

const execScript = async (script, { cwd, env }) => {
  if (is(Function, script)) {
    return script()
  }
  const [ command, ...args ] = split(' ', trim(script))
  return spawnCommand(command, args, { env, cwd })
}

module.exports = execScript
