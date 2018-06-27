import {
  identity,
  invariant,
  isArray,
  isPlainObject,
  isString,
  keys,
  last,
  reduce
} from 'moltres-utils'
import { DEFAULT_NAMESPACE } from './constants'
import {
  camelCaseAction,
  flattenActionMap,
  isValidActionMapValue,
  unflattenActionCreators
} from './util'
import createAction from './createAction'

const actionMapToActionCreators = (actionMap, { prefix, namespace = DEFAULT_NAMESPACE } = {}) =>
  reduce(
    (partialActionCreators, type) => {
      const actionMapValue = actionMap[type]
      invariant(
        isValidActionMapValue(actionMapValue),
        'Expected function, undefined, null, or array with payload and meta ' +
          `functions for ${type}`
      )
      const prefixedType = prefix ? `${prefix}${namespace}${type}` : type
      const actionCreator = isArray(actionMapValue)
        ? createAction(prefixedType, ...actionMapValue)
        : createAction(prefixedType, actionMapValue)
      return { ...partialActionCreators, [type]: actionCreator }
    },
    {},
    keys(actionMap)
  )

const actionCreatorsFromActionMap = (actionMap, options) => {
  const flatActionMap = flattenActionMap(actionMap, options)
  const flatActionCreators = actionMapToActionCreators(flatActionMap)
  return unflattenActionCreators(flatActionCreators, options)
}

const actionCreatorsFromIdentityActions = (identityActions, options) => {
  const actionMap = reduce(
    (partialActionMap, type) => ({ ...partialActionMap, [type]: identity }),
    {},
    identityActions
  )
  const actionCreators = actionMapToActionCreators(actionMap, options)
  return reduce(
    (partialActionCreators, type) => ({
      ...partialActionCreators,
      [camelCaseAction(type)]: actionCreators[type]
    }),
    {},
    keys(actionCreators)
  )
}

const createActions = (actionMap, ...identityActions) => {
  const options = isPlainObject(last(identityActions)) ? identityActions.pop() : {}
  invariant(
    identityActions.every(isString) && (isString(actionMap) || isPlainObject(actionMap)),
    'Expected optional object followed by string action types'
  )
  if (isString(actionMap)) {
    return actionCreatorsFromIdentityActions([actionMap, ...identityActions], options)
  }
  return {
    ...actionCreatorsFromActionMap(actionMap, options),
    ...actionCreatorsFromIdentityActions(identityActions, options)
  }
}

export default createActions
