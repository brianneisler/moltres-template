const execProject = require('./execProject')
const mapSeries = require('./mapSeries')

const execProjectsSeries = async (scripts, projects) => mapSeries(
  execProject(scripts),
  projects
)

module.exports = execProjectsSeries
