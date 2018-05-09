import { all } from 'bluebird'
import { resolve } from 'path'
import { has, isEmpty, map, values } from 'ramda'
import { execScript, mapModules } from '../../util'
import deployModule from './deployModule'

const deployProject = async (project, context) => {
  const { logger } = context
  logger.log(`deploying project ${project.name}`)
  await mapModules(project.modules, context, deployModule)

  if (!isEmpty(project.projects)) {
    await all(map(
      (childProject) => deployProject(childProject, context),
      values(project.projects)
    ))
  }
  if (has('deploy', project.scripts)) {
    await execScript(project.scripts.deploy, {
      cwd: project.path,
      env: {
        ...process.env,
        PATH: `${process.env.PATH}:${resolve(project.path, 'node_modules', '.bin')}`
      }
    })
  }
  logger.log(`project ${project.name} deployed`)
}

export default deployProject
