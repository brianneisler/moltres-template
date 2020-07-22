// NOTE BRN: Stopped using this because it had dependencies that made it only
// work in node js
// import * as testing from '@firebase/testing'

import { encodeUnsecuredJwt } from '../jwt'
import { invariant, isNil, isObject, isString } from '../lang'

import initializeEmulatorApp from './initializeEmulatorApp'

const initializeTestApp = ({ auth, config, firebase, namespace }) => {
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

  const { projectId } = config.firebase

  return initializeEmulatorApp({
    accessToken: auth ? encodeUnsecuredJwt(auth) : undefined,
    databaseName: projectId,
    firebase,
    namespace,
    projectId
  })
}

export default initializeTestApp
