import generateAdminConfig from '../utils/config/generateAdminConfig'
import loadEnv from '../utils/config/loadEnv'

const setupTestConfig = () => {
  const env = loadEnv(process.cwd(), { stage: process.env.STAGE })
  return generateAdminConfig({
    test: {
      integration: env.TEST_INTEGRATION
    }
  })
}

export default setupTestConfig
