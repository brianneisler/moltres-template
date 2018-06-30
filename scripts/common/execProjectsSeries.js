import execProject from './execProject'
import mapSeries from './mapSeries'

const execProjectsSeries = async (scripts, projects) => mapSeries(
  execProject(scripts),
  projects
)

export default execProjectsSeries
