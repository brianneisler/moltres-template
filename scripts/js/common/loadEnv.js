import dotenv from 'dotenv'
import { readFileSync } from 'fs-extra'
import { isAbsolute, resolve } from 'path'
import { prepend } from 'ramda'

const loadEnv = (envPath, options = {}) => {
  const { cwd, stage } = options
  let fileName = '.env'
  if (stage) {
    fileName += `-${stage}`
  }
  let pathParts = [envPath, fileName]
  if (!isAbsolute(envPath)) {
    pathParts = prepend(cwd, pathParts)
  }
  const envFilePath = resolve(...pathParts)
  try {
    const data = readFileSync(envFilePath, 'utf8')
    return dotenv.parse(data)
  } catch (error) {
    if (!error.message.includes('ENOENT')) {
      throw error
    }
  }
  return {}
}

export default loadEnv
