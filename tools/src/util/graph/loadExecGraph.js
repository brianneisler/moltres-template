import generateModuleGraph from '../module/generateModuleGraph'
import isModulePath from '../module/isModulePath'
import loadModule from '../module/loadModule'
import generateProjectGraph from '../project/generateProjectGraph'
import isProjectPath from '../project/isProjectPath'
import loadProject from '../project/loadProject'

const loadExecGraph = async (cwd) => {
  if (await isModulePath(cwd)) {
    const mod = await loadModule(cwd)
    return generateModuleGraph(mod)
  } else if (await isProjectPath(cwd)) {
    const project = await loadProject(cwd)
    return generateProjectGraph(project)
  }
  return null
}

export default loadExecGraph
