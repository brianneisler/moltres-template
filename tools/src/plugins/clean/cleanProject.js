import { all } from 'bluebird'
import { resolve } from 'path'
import { has, isEmpty, map, values } from 'ramda'
import mapModules from '../module/mapModules'
import execScript from '../script/execScript'
import cleanModule from './cleanModule'

const cleanProject = async (project, context) => {
  const { logger } = context
  logger.log(`cleaning project ${project.name}`)
  await mapModules(project.modules, context, cleanModule)

  if (!isEmpty(project.projects)) {
    await all(map(
      (childProject) => cleanProject(childProject, context),
      values(project.projects)
    ))
  }
  if (has('clean', project.scripts)) {
    await execScript(project.scripts.clean, {
      cwd: project.path,
      env: {
        ...process.env,
        PATH: `${process.env.PATH}:${resolve(project.path, 'node_modules', '.bin')}`
      }
    })
  }
  logger.log('project clean complete')
}

export default cleanProject
