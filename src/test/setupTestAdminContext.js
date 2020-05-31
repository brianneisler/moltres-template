import { createAdminContext } from '../context'
import { uuidv4 } from '../utils/data'
import setupTestConfig from './setupTestConfig'

const setupTestAdminContext = async (spec) => {
  const namespace = `admin.test:${uuidv4()}`
  const config = setupTestConfig(namespace)
  const source = `${config.api.url}/admin?test_file=${spec.description}`
  return createAdminContext({
    config,
    namespace,
    source
  })
}

export default setupTestAdminContext
