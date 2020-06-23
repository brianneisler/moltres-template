import { invariant, isObject, isString } from '../lang'

const initializeApp = ({ config, firebase, namespace }) => {
  invariant(isString(namespace), 'namespace must be a defined String')
  invariant(isObject(firebase), 'firebase library must be defined on context')
  invariant(isObject(config), 'config must be a defined Object')
  invariant(
    isObject(config.firebase),
    'firebase config must be a defined Object'
  )

  return firebase.initializeApp(config.firebase, namespace)
}

export default initializeApp
