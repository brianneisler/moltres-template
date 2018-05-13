import { execProjectScript } from '../../util'

const lintProject = async (project, context) => {
  const { logger } = context
  logger.log(`linting project ${project.name}`)
  await execProjectScript('lint', project, context)
  logger.log(`project ${project.name} linted`)
}

export default lintProject
