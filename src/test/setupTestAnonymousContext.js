import { createContext } from '../context'
import { uuidv4 } from '../utils/data'
import createTestContext from './createTestContext'

const setupTestAnonymousContext = async (adminContext, testContext) => {
  const { config } = adminContext
  const { testRunId } = testContext
  const namespace = `anonymous:${uuidv4()}.test:${testRunId}`
  if (config.test.integration) {
    const context = await createContext({
      config,
      namespace,
      source: `${config.api.url}/anonymous?test=${testRunId}`
    })
    return context
  }
  return createTestContext({
    config,
    namespace,
    source: `${config.api.url}/service_account/${adminContext.serviceAccount.id}?test=${testRunId}`
  })
}

export default setupTestAnonymousContext
