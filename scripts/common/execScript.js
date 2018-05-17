const { split, trim } = require('ramda')
const spawnCommand = require('./spawnCommand')

const execScript = async (script, { cwd, env }) => {
  const [ command, ...args ] = split(' ', trim(script))
  return spawnCommand(command, args, { env, cwd })
}

module.exports = execScript
