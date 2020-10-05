import {
  assoc,
  assocPath,
  isArray,
  isEmpty,
  isObject,
  isString,
  isUndefined,
  merge
} from '../../../utils/lang'
import { handleActions } from '../../../utils/redux'

import * as actions from './actions'
import * as schemas from './schemas'
import { MergeContextAction, SetContextAction } from './schemas'
import * as selectors from './selectors'

const mod = () => ({
  actions,
  reducer: handleActions(
    {
      [MergeContextAction.name]: (state, action) =>
        merge(state, action.payload),
      [SetContextAction.name]: (state, action) => {
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
  ),
  schemas,
  selectors
})

export default mod
