const { curry } = require('ramda')
const execScripts = require('../../../../scripts/common/execScripts')

const execModule = curry(async (scripts, mod) => execScripts(scripts, {
  cwd: mod.path,
  env: process.env,
  prefix: mod.name
}))

module.exports = execModule
