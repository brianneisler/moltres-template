import { createContext } from '../context'
import { uuidv4 } from '../utils/data'
import createTestContext from './createTestContext'

const setupTestAnonymousContext = async (adminContext) => {
  const { config } = adminContext
  const { runId } = config.test
  const namespace = `anonymous:${uuidv4()}.test:${runId}`
  if (config.test.integration) {
    const context = await createContext({
      config,
      namespace,
      source: `${config.api.url}/anonymous?test=${runId}`
    })
    return context
  }
  return createTestContext({
    config,
    namespace,
    source: `${config.api.url}/service_account/${adminContext.serviceAccount.id}?test=${runId}`
  })
}

export default setupTestAnonymousContext
