import { mapSeries } from 'moltres-utils'
import execScript from './execScript'

const execScripts = async (scripts, options) =>
  mapSeries((script) => execScript(script, options), scripts)

export default execScripts
