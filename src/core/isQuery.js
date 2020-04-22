import { isFunction, isObject } from '../utils/data'

const isQuery = (value) => isObject(value) && isFunction(value.onSnapshot)

export default isQuery
