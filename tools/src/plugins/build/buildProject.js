import { execProjectScript, mapModules } from '../../util'
import buildModule from './buildModule'

const buildProject = async (project, context) => {
  const { logger } = context
  logger.log(`building project ${project.name}`)
  // await mapModules(project.modules, context, buildModule)
  await execProjectScript('build', project, context)
  logger.log(`project ${project.name} built`)
}

export default buildProject
