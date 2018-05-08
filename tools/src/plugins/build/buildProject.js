import { all } from 'bluebird'
import { resolve } from 'path'
import { has, isEmpty, map, values } from 'ramda'
import { execScript, mapModules } from '../../util'
import buildModule from './buildModule'

const buildProject = async (project, context) => {
  const { logger } = context
  logger.log(`building project ${project.name}`)
  await mapModules(project.modules, context, buildModule)

  if (!isEmpty(project.projects)) {
    await all(map(
      (childProject) => buildProject(childProject, context),
      values(project.projects)
    ))
  }
  if (has('build', project.scripts)) {
    await execScript(project.scripts.build, {
      cwd: project.path,
      env: {
        ...process.env,
        PATH: `${process.env.PATH}:${resolve(project.path, 'node_modules', '.bin')}`
      }
    })
  }
  logger.log('project build complete')
}

export default buildProject
