import { forEach, prop } from 'ramda'
import execProjectsAll from '../common/execProjectsAll'
import getProjects from '../common/getProjects'
import run from '../common/run'


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
