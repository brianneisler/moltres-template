import { execProjectScript } from '../../util'

const testProject = async (project, context) => {
  const { logger } = context
  logger.log(`testing project ${project.name}`)
  await execProjectScript('test', project, context)
  logger.log(`project ${project.name} tested`)
}

export default testProject
