import { execProjectScript } from '../../util'
import { buildProject } from '../build'

const setupProject = async (project, context) => {
  const { logger } = context
  logger.log(`setting up project ${project.name}`)
  await execProjectScript('setup', project, context)
  await buildProject(project, context)
  logger.log(`project ${project.name} setup complete`)
}

export default setupProject
