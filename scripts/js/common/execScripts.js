import execScript from './execScript'
import mapSeries from './mapSeries'

const execScripts = async (scripts, options) => mapSeries(
  (script) => execScript(script, options),
  scripts
)

export default execScripts
