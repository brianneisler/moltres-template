import { execProjectScript, mapModules } from '../../util'
import cleanseModule from './cleanseModule'

const cleanseProject = async (project, context) => {
  const { logger } = context
  logger.log(`cleansing project ${project.name}`)
  await mapModules(project.modules, context, cleanseModule)
  await execProjectScript('cleanse', project)
  logger.log(`project ${project.name} cleansed`)
}

export default cleanseProject
