const { curry } = require('ramda')
const execScripts = require('./execScripts')

const execProject = curry(async (scripts, project) => execScripts(scripts, {
  cwd: project.path,
  env: process.env
}))

module.exports = execProject
