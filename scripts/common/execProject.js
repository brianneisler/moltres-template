import { curry } from 'ramda'
import execScripts from './execScripts'

const execProject = curry(async (scripts, project) => execScripts(scripts, {
  cwd: project.path,
  env: process.env,
  prefix: project.name
}))

export default execProject
