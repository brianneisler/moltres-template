import * as testing from '@firebase/testing'
import { invariant } from '../lang'
import { isObject, isString } from '../data'

const initializeTestAdminApp = ({ config, namespace }) => {
  invariant(isString(namespace), 'namespace must be a defined String')
  invariant(isObject(config), 'config must be a defined Object')
  invariant(isObject(config.firebase), 'firebase config must be a defined Object')
  invariant(isString(config.firebase.projectId), 'firebase projectId must be a defined String')

  return testing.initializeAdminApp(
    {
      projectId: config.firebase.projectId
    },
    namespace
  )
}

export default initializeTestAdminApp
