import { execProjectScript, mapModules } from '../../util'
import cleanModule from './cleanModule'

const cleanProject = async (project, context) => {
  const { logger } = context
  logger.log(`cleaning project ${project.name}`)
  await mapModules(project.modules, context, cleanModule)
  await execProjectScript('clean', project, context)
  logger.log(`project ${project.name} cleaned`)
}

export default cleanProject
