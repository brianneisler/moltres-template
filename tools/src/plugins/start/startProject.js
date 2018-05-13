import { execProjectScript } from '../../util'

const startProject = async (project, context) => {
  const { logger } = context
  logger.log(`starting project ${project.name}`)
  await execProjectScript('start', project, context)
  logger.log(`project ${project.name} started`)
}

export default startProject
