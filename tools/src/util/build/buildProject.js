import buildModules from './buildModules'

const buildProject = async (project, context) => {
  const { logger } = context
  logger.log(`building project ${project.name}`)
  await buildModules(project.modules, context)
  logger.log('prject build complete')
}

export default buildProject
