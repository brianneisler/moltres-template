import { forEach, forEachObjIndexed, newGraph } from 'moltres-utils'
import generateModuleGraph from '../module/generateModuleGraph'
import moduleNodeId from '../module/moduleNodeId'
import projectNodeId from './projectNodeId'
import walkProject from './walkProject'

const generateProjectGraph = (project, options = {}, graph = newGraph()) => {
  if (!options.only) {
    walkProject((proj) => {
      graph.setNode(projectNodeId(proj), proj)
      forEachObjIndexed((mod) => generateModuleGraph(mod, options, graph), proj.modules)
    }, project)
    walkProject((proj) => {
      forEachObjIndexed(
        (subProject) => graph.setEdge(projectNodeId(proj), projectNodeId(subProject)),
        proj.projects
      )
      forEach(
        (depProject) => graph.setEdge(projectNodeId(proj), projectNodeId(depProject)),
        proj.dependsOn
      )
      forEachObjIndexed(
        (mod) => graph.setEdge(projectNodeId(proj), moduleNodeId(mod)),
        proj.modules
      )
    }, project)
  } else {
    graph.setNode(projectNodeId(project), project)
  }
  return graph
}

export default generateProjectGraph
