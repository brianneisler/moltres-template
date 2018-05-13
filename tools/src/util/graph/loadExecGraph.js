import isModulePath from '../module/isModulePath'
import loadModule from '../module/loadModule'
import newModuleGraph from '../module/newModuleGraph'
import isProjectPath from '../project/isProjectPath'
import loadProject from '../project/loadProject'
import newProjectGraph from '../project/newProjectGraph'

const loadExecGraph = async (cwd) => {
  if (await isModulePath(cwd)) {
    const mod = await loadModule(cwd)
    return newModuleGraph(mod)
  } else if (await isProjectPath(cwd)) {
    const project = await loadProject(cwd)
    return newProjectGraph(project)
  }
  throw new Error(`Could not find a project or a module at the path ${cwd}`)
}

export default loadExecGraph
