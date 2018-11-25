import execProject from './execProject'
import mapAll from './mapAll'

const execProjectsAll = async (scripts, projects) => mapAll(
  execProject(scripts),
  projects
)

export default execProjectsAll
