import {
  isFunction,
  isObject,
  isString,
  whereEquals
} from '../../../../utils/lang'
import { takeEvery } from '../../../../utils/redux'
import { ProcessEventAction } from '../schemas'

const shouldHandleEvent = (event, predicate) => {
  if (isFunction(predicate)) {
    return predicate(event)
  }
  if (isString(predicate)) {
    return predicate === event.type
  }
  if (isObject(predicate)) {
    return whereEquals(predicate, event)
  }
  throw new TypeError('predicate must be either a Function, String or Object')
}

const takeEveryEvent = (predicate, handler, args) =>
  takeEvery(
    (action) =>
      action.type === ProcessEventAction.name &&
      shouldHandleEvent(action.payload.event, predicate),
    handler,
    args
  )

export default takeEveryEvent
