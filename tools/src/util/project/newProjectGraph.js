import { newGraph } from 'moltres-utils'
import { forEach, forEachObjIndexed } from 'ramda'
import walkProject from './walkProject'

const moduleNodeId = (mod) => `module:${mod.name}`
const projectNodeId = (project) => `project:${project.name}`

const newProjectGraph = (project) => {
  const graph = newGraph()
  walkProject(
    (proj) => {
      graph.setNode(projectNodeId(proj), proj)
      forEachObjIndexed(
        (mod) => graph.setNode(moduleNodeId(mod), mod),
        proj.modules
      )
    },
    project
  )
  walkProject(
    (proj) => {
      forEachObjIndexed(
        (subProject) => graph.setEdge(
          projectNodeId(proj),
          projectNodeId(subProject)
        ),
        proj.projects
      )
      forEach(
        (depProject) => graph.setEdge(
          projectNodeId(proj),
          projectNodeId(depProject)
        ),
        proj.dependsOn
      )
      forEachObjIndexed(
        (mod) => graph.setEdge(
          projectNodeId(proj),
          moduleNodeId(mod)
        ),
        proj.modules
      )
    },
    project
  )
  return graph
}

export default newProjectGraph
