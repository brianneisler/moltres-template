import {
  buildModules,
  buildProject,
  createContext,
  findModules,
  loadProject
} from './util'

const build = async (options) => {
  const context = createContext(options)
  const project = await loadProject(process.cwd())
  const modules = await findModules(project.path)
  await buildModules(modules, context)
  return buildProject(project, context)
}

export default build
