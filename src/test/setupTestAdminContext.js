import { createAdminContext } from '../context'
import { isTestAppConfigured } from '../utils/config'
import { uuidv4 } from '../utils/data'
import createTestAdminContext from './createTestAdminContext'
import setupTestConfig from './setupTestConfig'

const setupTestAdminContext = async (spec) => {
  const namespace = `admin.test:${uuidv4()}`
  const config = setupTestConfig(namespace)
  const source = `${config.api.url}/admin?test_file=${spec.description}`
  if (!isTestAppConfigured(config)) {
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
