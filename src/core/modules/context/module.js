import {
  assoc,
  assocPath,
  isArray,
  isEmpty,
  isObject,
  isString,
  isUndefined
} from '../../../utils/data'
import { handleActions } from '../../../utils/lang'
import { setContextAction } from './actions'

const mod = {
  reducer: handleActions(
    {
      [setContextAction]: (state, action) => {
        let context = state
        const { selector, value } = action.payload
        if (isUndefined(selector) && isObject(value)) {
          context = value
        } else if (isArray(selector)) {
          if (isEmpty(selector)) {
            context = value
          } else {
            context = assocPath(selector, value, context)
          }
        } else if (isString(selector)) {
          context = assoc(selector, value, context)
        } else {
          throw new Error(`Unsupported selector type ${selector}`)
        }
        return context
      }
    },
    {}
  )
}

export default mod
