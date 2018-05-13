import { execProjectScript } from '../../util'

const deployProject = async (project, context) => {
  const { logger } = context
  logger.log(`deploying project ${project.name}`)
  await execProjectScript('deploy', project, context)
  logger.log(`project ${project.name} deployed`)
}

export default deployProject
