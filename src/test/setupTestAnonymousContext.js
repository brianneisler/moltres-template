import { createContext } from '../context'
import { uuidv4 } from '../utils/lang'

const setupTestAnonymousContext = async (adminContext) => {
  const { config } = adminContext
  const { runId } = config.test
  const namespace = `anonymous:${uuidv4()}.test:${runId}`
  const source = `${config.api.url}/anonymous?test=${runId}`
  return createContext({
    config,
    namespace,
    source
  })
}

export default setupTestAnonymousContext
