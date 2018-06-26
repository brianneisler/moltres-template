import {
  get,
  invariant,
  isMap,
  isPlainObject,
  isUndefined,
  keys,
  map,
  reduceReducers
} from 'moltres-utils'
import { flattenReducerMap } from './util'
import handleAction from './handleAction'

const handleActions = (handlers, defaultProps, options = {}) => {
  invariant(
    isPlainObject(handlers) || isMap(handlers),
    'Expected handlers to be a plain object.'
  )
  const flattenedReducerMap = flattenReducerMap(handlers, options)
  const reducers = map(
    (type) => handleAction(get(type, flattenedReducerMap), type, defaultProps),
    keys(flattenedReducerMap)
  )
  const reducer = reduceReducers(...reducers)
  return (props, action) => {
    if (!action && props && props.type) {
      action = props
      props = defaultProps
    }
    if (isUndefined(props)) {
      props = defaultProps
    }
    return reducer(props, action)
  }
}

export default handleActions
