import { execProjectScript } from '../../util'

const cleanseProject = async (project, context) => {
  const { logger } = context
  logger.log(`cleansing project ${project.name}`)
  await execProjectScript('cleanse', project, context)
  logger.log(`project ${project.name} cleansed`)
}

export default cleanseProject
