import { resolve } from 'path'
import generateAdminConfig from '../utils/config/generateAdminConfig'
import loadEnv from '../utils/config/loadEnv'

const getStage = () => {
  if (process.env.STAGE) {
    // eslint-disable-next-line no-console
    console.log('found stage from process.env.STAGE:', process.env.STAGE)
    return process.env.STAGE
  }

  // eslint-disable-next-line no-console
  console.log('no stage found')
  return null
}

const setupFunctionConfig = () => {
  loadEnv(resolve(__dirname, '..', '..'), { stage: getStage() })
  return generateAdminConfig({})
}

export default setupFunctionConfig
