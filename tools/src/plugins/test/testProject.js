import { execProjectScript, mapModules } from '../../util'
import testModule from './testModule'

const testProject = async (project, context) => {
  const { logger } = context
  logger.log(`testing project ${project.name}`)
  await mapModules(project.modules, context, testModule)
  await execProjectScript('test', project, context)
  logger.log(`project ${project.name} tested`)
}

export default testProject
