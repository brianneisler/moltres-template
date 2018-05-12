import { execProjectScript, mapModules } from '../../util'
import lintModule from './lintModule'

const lintProject = async (project, context) => {
  const { logger } = context
  logger.log(`linting project ${project.name}`)
  await mapModules(project.modules, context, lintModule)
  await execProjectScript('lint', project, context)
  logger.log(`project ${project.name} linted`)
}

export default lintProject
