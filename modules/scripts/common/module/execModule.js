import { curry } from 'ramda'
import execScripts from '../../../../scripts/common/execScripts'

const execModule = curry(async (scripts, mod) => execScripts(scripts, {
  cwd: mod.path,
  env: process.env,
  prefix: mod.name
}))

export default execModule
