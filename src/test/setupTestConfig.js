import { loadConfig } from '../utils/config'
import { uuidv4 } from '../utils/lang'

const setupTestConfig = () => {
  return loadConfig(
    {},
    {
      test: {
        runId: uuidv4()
      }
    }
  )
}

export default setupTestConfig
