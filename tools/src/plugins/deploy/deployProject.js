import { execProjectScript, mapModules } from '../../util'
import deployModule from './deployModule'

const deployProject = async (project, context) => {
  const { logger } = context
  logger.log(`deploying project ${project.name}`)
  await mapModules(project.modules, context, deployModule)
  await execProjectScript('deploy', project)
  logger.log(`project ${project.name} deployed`)
}

export default deployProject
