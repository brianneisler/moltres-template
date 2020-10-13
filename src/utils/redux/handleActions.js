import getProperty from '../lang/getProperty'
import invariant from '../lang/invariant'
import isMap from '../lang/isMap'
import isPlainObject from '../lang/isPlainObject'
import isUndefined from '../lang/isUndefined'
import keys from '../lang/keys'
import map from '../lang/map'

import flattenReducerMap from './flattenReducerMap'
import handleAction from './handleAction'
import reduceReducers from './reduceReducers'

// NOTE THIS DOES NOT WORK WITH SAGAS!!!

const handleActions = (handlers, defaultProps, options = {}) => {
  invariant(
    isPlainObject(handlers) || isMap(handlers),
    'Expected handlers to be a plain object.'
  )
  const flattenedReducerMap = flattenReducerMap(handlers, options)
  const reducers = map(
    (type) =>
      handleAction(getProperty(type, flattenedReducerMap), type, defaultProps),
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
