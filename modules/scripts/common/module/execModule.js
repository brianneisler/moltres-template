const { curry } = require('ramda')
const execScripts = require('../../../../scripts/common/execScripts')

const execModule = curry(async (scripts, project) => execScripts(scripts, {
  cwd: project.path,
  env: process.env
}))

module.exports = execProject
