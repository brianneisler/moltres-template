import { pathExists } from 'fs-extra'
import { resolve } from 'path'
import { PROJECT_FILE_NAME } from '../constants'
import findModules from '../module/findModules'
import loadProjectFile from './loadProjectFile'
import newProject from './newProject'

const loadProject = async (projectPath) => {
  const filePath = resolve(projectPath, PROJECT_FILE_NAME)
  if (!await pathExists(filePath)) {
    throw new Error(`Cannot find ${PROJECT_FILE_NAME} at ${projectPath}`)
  }
  const data = await loadProjectFile(filePath)
  const modules = await findModules(projectPath)
  return newProject({
    ...data,
    modules,
    path: projectPath
  })
}

export default loadProject
