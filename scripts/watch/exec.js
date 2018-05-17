const { spawn } = require('child_process')
const { resolve } = require('path')
const { forEach, prop } = require('ramda')
const build = require('./build')
const test = require('./test')
const getProjects = require('../common/getProjects')

const projects = getProjects()

const COMMANDS = {
  build,
  test
}

const exec = () => {
  const commandName = process.argv[2]
  const command = prop(commandName, COMMANDS)
  if (!command) {
    throw new Error(`watch does not recognize the command ${commandName}`)
  }
  forEach(
    ({ path, name }) => command(path, name),
    projects
  )
}

exec()
