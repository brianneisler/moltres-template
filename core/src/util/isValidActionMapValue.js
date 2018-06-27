import { identity, isArray, isFunction, isNil } from 'moltres-utils'

const isValidActionMapValue = (actionMapValue) => {
  if (isFunction(actionMapValue) || isNil(actionMapValue)) {
    return true
  }

  if (isArray(actionMapValue)) {
    const [payload = identity, meta] = actionMapValue
    return isFunction(payload) && isFunction(meta)
  }

  return false
}

export default isValidActionMapValue
