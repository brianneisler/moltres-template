import {
  always,
  contains,
  identity,
  invariant,
  isFunction,
  isNil,
  isPlainObject,
  isString,
  isUndefined,
  map,
  split,
  toString
} from 'moltres-utils'
import { ACTION_TYPE_DELIMITER } from './constants'
import isResolvable from './isResolvable'
import resolveToPromise from './resolveToPromise'

const handleAction = (handler = identity, type = always(true), defaultProps = {}) => {
  let typeFilter = type
  if (isString(type)) {
    const types = split(ACTION_TYPE_DELIMITER, toString(type))
    typeFilter = (action) => {
      const { type: actionType } = action
      if (!actionType || !contains(toString(actionType), types)) {
        return false
      }
      return true
    }
  }
  invariant(isFunction(typeFilter), 'Expected type to be a string or a filter function')
  invariant(
    isFunction(handler) || isPlainObject(handler),
    'Expected handler to be a function or object with next and throw methods'
  )

  const [nextHandler, throwHandler] = isFunction(handler)
    ? [handler, handler]
    : map((aHandler) => (isNil(aHandler) ? identity : aHandler), [handler.next, handler.throw])

  return (props, action) => {
    if (!action && props && props.type) {
      action = props
      props = defaultProps
    }
    if (isUndefined(props)) {
      props = defaultProps
    }
    if (!typeFilter(action)) {
      return props
    }

    if (action && action.error === true) {
      return throwHandler(props, action)
    }

    const result = nextHandler(props, action)
    if (isResolvable(result) && action.promise) {
      const resolver = resolveToPromise(result)
      action.promise.push(resolver.promise)
      return resolver
    }
    return result
  }
}

export default handleAction
