import {
  curry,
  isArray,
  isDate,
  isFunction,
  isObject,
  isPlainObject,
  map
} from '../lang'

import fromDate from './fromDate'

const convertDataToFirebase = curry((context, data) =>
  map((value) => {
    if (isArray(value) || isPlainObject(value)) {
      return convertDataToFirebase(context, value)
    }
    if (isObject(value) && isFunction(value.toMillis)) {
      const { firebase } = context
      return firebase.firestore.Timestamp.fromMillis(value.toMillis())
    }
    if (isDate(value)) {
      return fromDate(context, value)
    }
    return value
  }, data)
)

export default convertDataToFirebase
