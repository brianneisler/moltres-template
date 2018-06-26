const { is, split, trim } = require('ramda')
const spawnCommand = require('./spawnCommand')

const execScript = async (script, options) => {
  if (is(Function, script)) {
    return script()
  }
  const [ command, ...args ] = split(' ', trim(script))
  return spawnCommand(command, args, options)
}

module.exports = execScript
