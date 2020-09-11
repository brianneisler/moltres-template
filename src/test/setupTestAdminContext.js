import { createAdminContext } from '../context'
import { uuidv4 } from '../utils/lang'

import setupTestConfig from './setupTestConfig'

const setupTestAdminContext = async (spec) => {
  const namespace = `admin.test:${uuidv4()}`
  const config = await setupTestConfig()
  const source = `${config.api.url}/admin?test_file=${spec.description}`
  return createAdminContext({
    config,
    namespace,
    source
  })
}

export default setupTestAdminContext
