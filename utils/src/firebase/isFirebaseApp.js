import isFunction from '../lang/isFunction'
import isObject from '../lang/isObject'
import isString from '../lang/isString'

const isFirebaseApp = (value) =>
  isObject(value) && (isString(value.name) && isFunction(value.database))

export default isFirebaseApp
