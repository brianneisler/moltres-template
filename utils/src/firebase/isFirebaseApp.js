import { isFunction, isObject, isString } from '../data'

const isFirebaseApp = (value) =>
  isObject(value) && (isString(value.name) && isFunction(value.database))

export default isFirebaseApp
