import { all } from 'bluebird'
import { resolve } from 'path'
import { has, isEmpty, map, values } from 'ramda'
import mapModules from '../module/mapModules'
import execScript from '../script/execScript'
import lintModule from './lintModule'

const lintProject = async (project, context) => {
  const { logger } = context
  logger.log(`linting project ${project.name}`)
  await mapModules(project.modules, context, lintModule)

  if (!isEmpty(project.projects)) {
    await all(map(
      (childProject) => lintProject(childProject, context),
      values(project.projects)
    ))
  }
  if (has('lint', project.scripts)) {
    await execScript(project.scripts.lint, {
      cwd: project.path,
      env: {
        ...process.env,
        PATH: `${process.env.PATH}:${resolve(project.path, 'node_modules', '.bin')}`
      }
    })
  }
  logger.log('project lint complete')
}

export default lintProject
