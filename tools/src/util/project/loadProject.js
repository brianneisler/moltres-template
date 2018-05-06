import { pathExists } from 'fs-extra'
import { resolve } from 'path'
import { PROJECT_FILE_NAME } from '../constants'
import defineProject from './defineProject'
import loadProjectFile from './loadProjectFile'

const loadProject = async (projectPath) => {
  const filePath = resolve(projectPath, PROJECT_FILE_NAME)
  if (!await pathExists(filePath)) {
    throw new Error(`Cannot find ${PROJECT_FILE_NAME} at ${projectPath}`)
  }
  const data = await loadProjectFile(filePath)
  return defineProject(data)
}

export default loadProject
