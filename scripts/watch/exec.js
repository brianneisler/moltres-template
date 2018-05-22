const { forEach, prop } = require('ramda')
const build = require('./build')
const test = require('./test')
const execProjectsAll = require('../common/execProjectsAll')
const getProjects = require('../common/getProjects')
const run = require('../common/run')


const COMMANDS = {
  build: 'npm run watch:build',
  test: 'npm run watch:test'
}

const exec = async () => {
  const commandName = process.argv[2]
  const command = prop(commandName, COMMANDS)
  const projects = getProjects()
  if (!command) {
    throw new Error(`watch does not recognize the command ${commandName}`)
  }
  return execProjectsAll([
    command
  ], projects)
}

run(exec)
