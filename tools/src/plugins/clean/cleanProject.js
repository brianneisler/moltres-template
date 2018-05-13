import { execProjectScript } from '../../util'

const cleanProject = async (project, context) => {
  const { logger } = context
  logger.log(`cleaning project ${project.name}`)
  await execProjectScript('clean', project, context)
  logger.log(`project ${project.name} cleaned`)
}

export default cleanProject
