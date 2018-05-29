const { curry } = require('ramda')
const execScripts = require('../../../../scripts/common/execScripts')

const execModule = curry(async (scripts, mod) => execScripts(scripts, {
  cwd: mod.path,
  env: process.env
}))

module.exports = execModule
