import { newGraph } from 'moltres-utils'
import { forEach, forEachObjIndexed } from 'ramda'
import walkProject from './walkProject'

const newProjectGraph = (project) => {
  const graph = newGraph()
  walkProject(
    (proj) => graph.setNode(proj.name, proj),
    project
  )
  walkProject(
    (proj) => {
      forEachObjIndexed(
        (subProject) => graph.setEdge(proj.name, subProject.name),
        proj.projects
      )
      forEach(
        (depProject) => graph.setEdge(proj.name, depProject.name),
        proj.dependsOn
      )
    },
    project
  )
  return graph
}

export default newProjectGraph
