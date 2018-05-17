const execScript = require('./execScript')
const mapSeries = require('./mapSeries')

const execScripts = async (scripts, options) => mapSeries(
  (script) => execScript(script, options),
  scripts
)

module.exports = execScripts
