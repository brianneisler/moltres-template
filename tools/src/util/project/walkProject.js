import { curry, forEach, values } from 'ramda'

const walkProject = curry((fn, project) => {
  fn(project)
  forEach(walkProject(fn), values(project.projects))
})

export default walkProject
