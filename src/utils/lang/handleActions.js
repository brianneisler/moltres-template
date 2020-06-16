import flattenReducerMap from './flattenReducerMap'
import getProp from '../data/getProp'
import handleAction from './handleAction'
import invariant from './invariant'
import isMap from '../data/isMap'
import isPlainObject from '../data/isPlainObject'
import isUndefined from '../data/isUndefined'
import keys from '../data/keys'
import map from '../data/map'
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
      handleAction(getProp(type, flattenedReducerMap), type, defaultProps),
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
