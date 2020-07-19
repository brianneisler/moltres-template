import generateAdminConfig from '../utils/config/generateAdminConfig'
import loadEnv from '../utils/config/loadEnv'
import { uuidv4 } from '../utils/lang'

const setupTestConfig = () => {
  const stage = process.env.STAGE
  const env = loadEnv(process.cwd(), { stage })
  return generateAdminConfig({
    stage,
    test: {
      integration: env.TEST_INTEGRATION,
      runId: uuidv4()
    }
  })
}

export default setupTestConfig
