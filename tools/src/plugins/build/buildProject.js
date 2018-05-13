import { execProjectScript } from '../../util'

const buildProject = async (project, context) => {
  const { logger } = context
  logger.log(`building project ${project.name}`)
  await execProjectScript('build', project, context)
  logger.log(`project ${project.name} built`)
}

export default buildProject
