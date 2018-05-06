const { spawn } = require('child_process')
const { resolve } = require('path')
const { forEachObjIndexed, prop } = require('ramda')
const build = require('./build')
const test = require('./test')

const projects = {
  'cli': './cli',
  'core': './core',
  'test': './test',
  'tools': './tools',
  'utils': './utils'
}

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
  forEachObjIndexed(
    (path, name) => command(path, name)
    projects
  )
}

exec()
