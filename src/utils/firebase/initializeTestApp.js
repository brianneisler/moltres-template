import * as testing from '@firebase/testing'
import { invariant } from '../lang'
import { isNil, isObject, isString } from '../data'

const initializeTestApp = ({ auth, config, namespace }) => {
  invariant(isString(namespace), 'namespace must be a defined String')
  invariant(isObject(config), 'config must be a defined Object')
  invariant(
    isObject(config.firebase),
    'firebase config must be a defined Object'
  )
  invariant(
    isString(config.firebase.projectId),
    'firebase projectId must be a defined String'
  )
  invariant(isNil(auth) || isObject(auth), 'auth must be nil or an object')

  return testing.initializeTestApp(
    {
      auth,
      databaseName: config.firebase.projectId,
      projectId: config.firebase.projectId
    },
    namespace
  )
}

export default initializeTestApp
