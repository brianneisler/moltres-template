import { all } from 'bluebird'
import { resolve } from 'path'
import { has, isEmpty, map, values } from 'ramda'
import { execScript, mapModules } from '../../util'
import setupModule from './setupModule'

const setupProject = async (project, context) => {
  const { logger } = context
  logger.log(`setting up project ${project.name}`)
  await mapModules(project.modules, context, setupModule)

  if (!isEmpty(project.projects)) {
    await all(map(
      (childProject) => setupProject(childProject, context),
      values(project.projects)
    ))
  }
  if (has('setup', project.scripts)) {
    await execScript(project.scripts.setup, {
      cwd: project.path,
      env: {
        ...process.env,
        PATH: `${process.env.PATH}:${resolve(project.path, 'node_modules', '.bin')}`
      }
    })
  }
  logger.log(`project ${project.name} setup complete`)
}

export default setupProject
