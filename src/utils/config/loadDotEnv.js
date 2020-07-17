import { isAbsolute, resolve } from '../path'
import { prepend } from '../lang'
import { readFileSync } from 'fs-extra'
import dotenv from 'dotenv'

const loadDotEnv = (envPath, options = {}) => {
  const { cwd } = options
  let { stage } = options
  if (!stage) {
    stage = process.env.STAGE
  }
  // eslint-disable-next-line no-console
  console.log(`stage is ${stage}`)
  let fileName = '.env'
  fileName += `-${stage}`
  let pathParts = [envPath, fileName]
  if (!isAbsolute(envPath)) {
    pathParts = prepend(cwd, pathParts)
  }
  const envFilePath = resolve(...pathParts)
  let loadedEnv = {}
  try {
    const data = readFileSync(envFilePath, 'utf8')
    // eslint-disable-next-line no-console
    console.log('Found .env file:', stage)
    const values = dotenv.parse(data)
    loadedEnv = {
      ...loadedEnv,
      ...values
    }
  } catch (error) {
    if (!error.message.includes('ENOENT')) {
      throw error
    }
  }
  return loadedEnv
}

export default loadDotEnv
