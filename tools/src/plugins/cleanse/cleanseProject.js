import { all } from 'bluebird'
import { resolve } from 'path'
import { has, isEmpty, map, values } from 'ramda'
import { execScript, mapModules } from '../../util'
import cleanseModule from './cleanseModule'

const cleanseProject = async (project, context) => {
  const { logger } = context
  logger.log(`cleansing project ${project.name}`)
  await mapModules(project.modules, context, cleanseModule)

  if (!isEmpty(project.projects)) {
    await all(map(
      (childProject) => cleanseProject(childProject, context),
      values(project.projects)
    ))
  }
  if (has('cleanse', project.scripts)) {
    await execScript(project.scripts.cleanse, {
      cwd: project.path,
      env: {
        ...process.env,
        PATH: `${process.env.PATH}:${resolve(project.path, 'node_modules', '.bin')}`
      }
    })
  }
  logger.log(`project ${project.name} cleansed`)
}

export default cleanseProject
