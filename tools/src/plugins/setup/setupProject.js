import { execProjectScript, mapModules } from '../../util'
import setupModule from './setupModule'

const setupProject = async (project, context) => {
  const { logger } = context
  logger.log(`setting up project ${project.name}`)
  await mapModules(project.modules, context, setupModule)
  await execProjectScript('setup', project)
  logger.log(`project ${project.name} setup complete`)
}

export default setupProject
