import { invariant, isEmpty, isFunction, isString, isSymbol, toString } from 'moltres-utils'
import { ACTION_TYPE_DELIMITER } from './constants'

const isValidActionType = (type) => isString(type) || isFunction(type) || isSymbol(type)

const isValidActionTypes = (types) => {
  if (isEmpty(types)) {
    return false
  }
  return types.every(isValidActionType)
}

const combineActions = (...actionsTypes) => {
  invariant(
    isValidActionTypes(actionsTypes),
    'Expected action types to be strings, symbols, or action creators'
  )
  const combinedActionType = actionsTypes.map(toString).join(ACTION_TYPE_DELIMITER)
  return { toString: () => combinedActionType }
}

export default combineActions
