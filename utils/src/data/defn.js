import isFunction from './isFunction'
import isObject from './isObject'

const defn = (name, defaultFn) => {
  const override = function(...args) {
    if (args.length === 0) {
      return defaultFn.apply(this)
    }
    const obj = args[args.length - 1]
    if (isObject(obj) && isFunction(obj[name]) && obj !== this) {
      return obj[name](...args)
    }
    return defaultFn.apply(this, args)
  }
  return override
}

export default defn
