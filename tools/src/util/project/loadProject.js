import { all, props } from 'bluebird'
import { pathExists } from 'fs-extra'
import { map, mapObjIndexed, memoize } from 'moltres-utils'
import { resolve } from 'path'
import { PROJECT_FILE_NAME } from '../constants'
import findModules from '../module/findModules'
import loadProjectFile from './loadProjectFile'
import newProject from './newProject'

const loadProject = memoize(async (projectPath) => {
  const filePath = resolve(projectPath, PROJECT_FILE_NAME)
  if (!await pathExists(filePath)) {
    throw new Error(`Cannot find ${PROJECT_FILE_NAME} at ${projectPath}`)
  }
  const data = await loadProjectFile(filePath)
  const modules = await findModules(projectPath)
  const projects = await props(mapObjIndexed(
    (childProjectPath) => loadProject(resolve(projectPath, childProjectPath)),
    data.projects || {}
  ))
  const dependsOn = await all(map(
    (dependsOnProjectPath) => loadProject(resolve(projectPath, dependsOnProjectPath)),
    data.dependsOn || []
  ))
  return newProject({
    ...data,
    dependsOn,
    modules,
    projects,
    path: projectPath
  })
})

export default loadProject
