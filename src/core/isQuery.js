import { isFunction, isObject } from '../utils/lang'

const isQuery = (value) => isObject(value) && isFunction(value.onSnapshot)

export default isQuery
