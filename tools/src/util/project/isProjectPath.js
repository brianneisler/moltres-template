import { pathExists } from 'fs-extra'
import { resolve } from 'path'
import { PROJECT_FILE_NAME } from '../constants'

const isProjectPath = async (maybeProjectPath) =>
  pathExists(resolve(maybeProjectPath, PROJECT_FILE_NAME))

export default isProjectPath
