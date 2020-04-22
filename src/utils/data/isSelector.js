import isFunction from './isFunction'

const isSelector = (value) => value && isFunction(value.select)

export default isSelector
