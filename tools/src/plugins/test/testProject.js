import { all } from 'bluebird'
import { resolve } from 'path'
import { has, isEmpty, map, values } from 'ramda'
import { execScript, mapModules } from '../../util'
import testModule from './testModule'

const testProject = async (project, context) => {
  const { logger } = context
  logger.log(`testing project ${project.name}`)
  await mapModules(project.modules, context, testModule)

  if (!isEmpty(project.projects)) {
    await all(map(
      (childProject) => testProject(childProject, context),
      values(project.projects)
    ))
  }
  if (has('test', project.scripts)) {
    await execScript(project.scripts.test, {
      cwd: project.path,
      env: {
        ...process.env,
        PATH: `${process.env.PATH}:${resolve(project.path, 'node_modules', '.bin')}`
      }
    })
  }
  logger.log('project test complete')
}

export default testProject
