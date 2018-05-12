import { execProjectScript, mapModules } from '../../util'
import startModule from './startModule'

const startProject = async (project, context) => {
  const { logger } = context
  logger.log(`starting project ${project.name}`)
  await mapModules(project.modules, context, startModule)
  await execProjectScript('start', project)
  logger.log(`project ${project.name} started`)
}

export default startProject
