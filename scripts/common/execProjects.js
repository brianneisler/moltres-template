const execProject = require('./execProject')
const mapSeries = require('./mapSeries')

const execProjects = async (scripts, projects) => mapSeries(
  execProject(scripts),
  projects
)

module.exports = execProjects
