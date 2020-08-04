import generateAdminConfig from '../config/generateAdminConfig'
import loadEnv from '../utils/config/loadEnv'
import { pathResolve } from '../utils/path'

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
  const stage = getStage()
  loadEnv(pathResolve(__dirname, '..', '..'), { stage })
  return generateAdminConfig({
    stage
  })
}

export default setupFunctionConfig
