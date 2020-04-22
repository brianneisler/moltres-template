import { createAdminContext } from '../context'
import { uuidv4 } from '../utils/data'
import createTestAdminContext from './createTestAdminContext'
import setupTestConfig from './setupTestConfig'

const setupTestAdminContext = async (spec) => {
  const config = setupTestConfig()
  const namespace = `admin.test:${uuidv4()}`
  const source = `${config.api.url}/admin?test_file=${spec.description}`
  if (config.test.integration) {
    return createAdminContext({
      config,
      namespace,
      source
    })
  }
  return createTestAdminContext({
    config,
    namespace,
    source
  })
}

export default setupTestAdminContext
