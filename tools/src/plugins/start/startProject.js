import { all } from 'bluebird'
import { resolve } from 'path'
import { has, isEmpty, map, values } from 'ramda'
import { execScript, mapModules } from '../../util'
import startModule from './startModule'

const startProject = async (project, context) => {
  const { logger } = context
  logger.log(`starting project ${project.name}`)
  await mapModules(project.modules, context, startModule)

  if (!isEmpty(project.projects)) {
    await all(map(
      (childProject) => startProject(childProject, context),
      values(project.projects)
    ))
  }
  if (has('start', project.scripts)) {
    await execScript(project.scripts.start, {
      cwd: project.path,
      env: {
        ...process.env,
        PATH: `${process.env.PATH}:${resolve(project.path, 'node_modules', '.bin')}`
      }
    })
  }
  logger.log('project start complete')
}

export default startProject
