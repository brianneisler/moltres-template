import buildModules from './buildModules'

const buildProject = async (project, context) => {
  console.log('building project:', project)
  await buildModules(project.modules, context)
}

export default buildProject
