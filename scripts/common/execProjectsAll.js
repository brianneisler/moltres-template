const execProject = require('./execProject')
const mapAll = require('./mapAll')

const execProjectsAll = async (scripts, projects) => mapAll(
  execProject(scripts),
  projects
)

module.exports = execProjectsAll
